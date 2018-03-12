<?php

include_once 'DataParser.php';

class DataGrabber{
	private $config;

	function __construct() {
		$this->config = DataParser::parseConfig();
	}

	private function err($message){
		die('[ERROR] '.$message);
	}

	function create_dir($dir){
		if(!is_dir($dir) && !mkdir($dir)) $this->err('Failed to create folder');
	}

	private function find_latest($folder, $localf) {
		$versions = $this->find_versions($folder, $localf);

		// Folders should be named x((.y)?.z)?
		$latest = '0';
		foreach($versions as $v){
			if(version_compare($v, $latest, '>=')){
				$latest = $v;
			}
		}
		echo "Found ".count($versions)." folders, latest seems to be $latest.\n";
		return $latest;
	}
	
	private function find_versions($folder, $localf) {
		$folders = [];
		if(App::$offline){
			foreach(scandir('data') as $f){
				if(strpos($f, $localf) === 0) $folders[] = substr($f, strlen($localf));
			}
		} else {
			$folders = scandir($folder);
			if(!$folders){
				echo "[ERROR] Could not connect to unicode website.\n";
				echo "Please check that ftp support is enabled and that $folder is accessible and try again.\n";
				die();
			}
		}

		$versions = [];

		// Version folders should be named x((.y)?.z)?
		foreach($folders as $v){
			if(preg_match("#^[0-9]+(?:\.[0-9]+)+#", $v, $m)){
				$versions[] = $m[0];
			}
		}
		
		return $versions;
	}

	private function versions_filter($versions, $comp, $compare_to){
		return array_filter($versions, function($v)use($comp, $compare_to){
			return version_compare($v, $compare_to, $comp);
		});
	}

	private function download_file($address, $destination) {
		if(App::$offline){
			if(is_file($destination)){
				if(App::$verbose) echo "File $destination is present\n";
			} else {
				echo "[ERROR] File $destination is missing\nRestart in online mode or download it from $address";
				die();
			}
		} else {
			if(App::$verbose) echo "Downloading $address... ";
			if(is_file($destination)) {
				if(App::$verbose) echo "already present, skipping\n";
			} else {
				$data = file_get_contents($address);
				if(!$data){
					echo "[ERROR] Could not connect to unicode website.\n";
					echo "Please check that ftp support is enabled and that $address exists and try again.\n";
					die();
				} else {
					file_put_contents($destination, $data);
					if(App::$verbose) echo "done\n";
				}
			}
		}
	}

	/**
	* @return string path to cldr folder
	*/
	function download_cldr(){
		echo "Grabbing CLDR... ";
		if(isset($this->config->forceVersion->cldr)) $latestcldr = $this->config->forceVersion->cldr;
		else $latestcldr = $this->find_latest('ftp://www.unicode.org/Public/cldr', 'cldr-');
		$cldrdir = 'data/cldr-'.$latestcldr.'/';
		$this->create_dir($cldrdir);
		echo "using version $latestcldr\n";

		$this->download_file('http://www.unicode.org/Public/cldr/'.$latestcldr.'/core.zip', $cldrdir.'core.zip');
		$this->download_file('http://www.unicode.org/Public/cldr/'.$latestcldr.'/keyboards.zip', $cldrdir.'keyboards.zip');

		echo "Extracting required files...";

		$zip = new ZipArchive();
		$zip->open($cldrdir.'core.zip');
		if(!$zip->extractTo($cldrdir, [
			'common/annotations/en.xml',
		])) $this->err('Could not extract files');
		$zip->close();

		$zip = new ZipArchive();
		$zip->open($cldrdir.'keyboards.zip');
		$zipContent = [];
		for($i = 0; $i < $zip->numFiles; $i++) $zipContent[] = $zip->getNameIndex($i);
		if(!$zip->extractTo($cldrdir, 
			array_values(array_filter($zipContent, function($f){return preg_match('#^keyboards/windows/.+\.xml$#', $f);}))
		)) $this->err('Could not extract files');
		$zip->close();

		echo "\n";
		return $cldrdir;
	}

	/**
	* @return string path to emoji folder
	*/
	function download_unicode_emoji(){
		echo "Grabbing Unicode Emoji Data Files... ";
		if(isset($this->config->forceVersion->emoji)) $latestemoji = $this->config->forceVersion->emoji;
		else $latestemoji = $this->find_latest('ftp://unicode.org/Public/emoji/', 'emoji-');
		$emojidir = 'data/emoji-'.$latestemoji.'/';
		$this->create_dir($emojidir);
		echo "using version $latestemoji\n";

		$this->download_file("http://unicode.org/Public/emoji/$latestemoji/emoji-data.txt", $emojidir.'emoji-data.txt');
		$this->download_file("http://unicode.org/Public/emoji/$latestemoji/emoji-test.txt", $emojidir.'emoji-test.txt');

		return $emojidir;
	}

	/**
	* @return string[] path to emoji folders for previous versions
	*/
	function download_unicode_emoji_previous(){
		echo "Grabbing Unicode Emoji (previous versions) Data Files... ";
		if(isset($this->config->forceVersion->emoji)) $latestemoji = $this->config->forceVersion->emoji;
		else $latestemoji = $this->find_latest('ftp://unicode.org/Public/emoji/', 'emoji-');
		$versions = $this->find_versions('ftp://unicode.org/Public/emoji/', 'emoji-');
		$versions = $this->versions_filter($versions, '>=', '2.0');
		$versions = $this->versions_filter($versions, '<=', $latestemoji);
		$folders = [];
		echo "using versions ".implode(", ", $versions)."\n";

		foreach($versions as $version){
			$emojidir = 'data/emoji-'.$version.'/';
			$folders[$version] = $emojidir;
			$this->create_dir($emojidir);

			$this->download_file("http://unicode.org/Public/emoji/$version/emoji-data.txt", $emojidir.'emoji-data.txt');
			$this->download_file("http://unicode.org/Public/emoji/$version/emoji-sequences.txt", $emojidir.'emoji-sequences.txt');
			$this->download_file("http://unicode.org/Public/emoji/$version/emoji-zwj-sequences.txt", $emojidir.'emoji-zwj-sequences.txt');
		}

		return $folders;
	}

	/**
	* @return string path to ucd folder
	*/
	function download_ucd(){
		echo "Grabbing UCD... ";
		if(isset($this->config->forceVersion->ucd)) $latestucd = $this->config->forceVersion->ucd;
		else $latestucd = $this->find_latest('ftp://www.unicode.org/Public/', 'ucd-');
		$ucddir = 'data/ucd-'.$latestucd.'/';
		$this->create_dir($ucddir);
		echo "using UCD $latestucd\n";

		$ucdfile = FALSE;
		foreach(scandir(App::$offline ? $ucddir : 'ftp://www.unicode.org/Public/'.$latestucd.'/ucd') as $file){
			if(preg_match("#^UnicodeData.*\.txt$#", $file)) $ucdfile = $file;
		}

		if(!$ucdfile) die('Unable to find UCD file in ftp://www.unicode.org/Public/'.$latestucd.'/ucd');

		$this->download_file('http://www.unicode.org/Public/'.$latestucd.'/ucd/'.$ucdfile, $ucddir.$ucdfile);
		copy($ucddir.$ucdfile, $ucddir.'UnicodeData.txt');
		
		return $ucddir;
	}
}