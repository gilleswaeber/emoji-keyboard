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

	private function find_latest($folder) {
		$versions = $this->find_versions($folder);

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
	
	private function find_versions($folder) {
		$folders = scandir($folder);
		if(!$folders){
			echo "[ERROR] Could not connect to unicode website.\n";
			echo "Please check that ftp support is enabled and that $folder is accessible and try again.\n";
			die();
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
		echo "Downloading $address... ";
		if(is_file($destination)) {
			echo "already present, skipping\n";
		} else {
			$data = file_get_contents($address);
			if(!$data){
				echo "Could not connect to unicode website.\n";
				echo "Please check that ftp support is enabled and that $address exists and try again.\n";
				die();
			} else {
				file_put_contents($destination, $data);
				echo "done\n";
			}
		}
	}

	/**
	* @return string path to cldr folder
	*/
	function download_cldr(){
		echo "Grabbing CLDR...\n";
		if(isset($this->config->forceVersion->cldr)) $latestcldr = $this->config->forceVersion->cldr;
		else $latestcldr = $this->find_latest('ftp://www.unicode.org/Public/cldr');
		$cldrdir = 'data/cldr-'.$latestcldr.'/';
		$this->create_dir($cldrdir);

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
		echo "Grabbing Unicode Emoji Data Files...\n";
		if(isset($this->config->forceVersion->emoji)) $latestemoji = $this->config->forceVersion->emoji;
		else $latestemoji = $this->find_latest('ftp://unicode.org/Public/emoji/');
		$emojidir = 'data/emoji-'.$latestemoji.'/';
		$this->create_dir($emojidir);

		$this->download_file("http://unicode.org/Public/emoji/$latestemoji/emoji-data.txt", $emojidir.'emoji-data.txt');
		$this->download_file("http://unicode.org/Public/emoji/$latestemoji/emoji-test.txt", $emojidir.'emoji-test.txt');

		return $emojidir;
	}

	/**
	* @return string[] path to emoji folders for previous versions
	*/
	function download_unicode_emoji_previous(){
		echo "Grabbing Unicode Emoji (previous versions) Data Files...\n";
		if(isset($this->config->forceVersion->emoji)) $latestemoji = $this->config->forceVersion->emoji;
		else $latestemoji = $this->find_latest('ftp://unicode.org/Public/emoji/');
		$versions = $this->find_versions('ftp://unicode.org/Public/emoji/');
		$versions = $this->versions_filter($versions, '>=', '2.0');
		$versions = $this->versions_filter($versions, '<=', $latestemoji);
		$folders = [];

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
		echo "Grabbing UCD...\n";
		if(isset($this->config->forceVersion->ucd)) $latestucd = $this->config->forceVersion->ucd;
		else $latestucd = $this->find_latest('ftp://www.unicode.org/Public/');
		$ucddir = 'data/ucd-'.$latestucd.'/';
		$this->create_dir($ucddir);

		$ucdfile = FALSE;
		foreach(scandir('ftp://www.unicode.org/Public/'.$latestucd.'/ucd') as $file){
			if(preg_match("#^UnicodeData.*\.txt$#", $file)) $ucdfile = $file;
		}

		if(!$ucdfile) die('Unable to find UCD file in ftp://www.unicode.org/Public/'.$latestucd.'/ucd');

		$this->download_file('http://www.unicode.org/Public/'.$latestucd.'/ucd/'.$ucdfile, $ucddir.$ucdfile);
		copy($ucddir.$ucdfile, $ucddir.'UnicodeData.txt');
		
		return $ucddir;
	}
}