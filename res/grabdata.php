<?php

function err($message){
	die('[ERROR] '.$message);
}

function create_dir($dir){
	if(!is_dir($dir) && !mkdir($dir)) err('Failed to create folder');
}

function find_latest($folder) {
	$versions = scandir($folder);
	if(!$versions){
		echo "[ERROR] Could not connect to unicode website.\n";
		echo "Please check that ftp support is enabled and that $folder is accessible and try again.\n";
		die();
	}

	// Folders should be named x((.y)?.z)?
	$latest = '0'; $found = 0;
	foreach($versions as $v){
		if(preg_match("#^[0-9]+(?:\.[0-9]+)+#", $v, $m)){
			$found++;
			if(version_compare($m[0], $latest, '>=')){
				$latest = $m[0];
			}
		}
	}
	echo "Found $found, most recent seems to be $latest.\n";
	return $latest;
}

function download_file($address, $destination) {
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

// Jump into script directory
chdir(__DIR__);
create_dir('data');

echo "Grabbing CLDR...\n";
$latestcldr = find_latest('ftp://www.unicode.org/Public/cldr');
$cldrdir = 'data/'.$latestcldr.'/';
create_dir($cldrdir);

download_file('ftp://www.unicode.org/Public/cldr/'.$latestcldr.'/core.zip', $cldrdir.'core.zip');

echo "Extracting required files...\n";
$zip = new ZipArchive();
$zip->open($cldrdir.'core.zip');
if(!$zip->extractTo($cldrdir, [
	'common/annotations/en.xml',
])) err('Could not extract files');
$zip->close();
echo "\n";

echo "Grabbing Unicode Data Files...\n";
$latestemoji = find_latest('ftp://unicode.org/Public/emoji/');
$emojidir = 'data/emoji-'.$latestemoji.'/';
create_dir($emojidir);

download_file("ftp://unicode.org/Public/emoji/$latestemoji/emoji-data.txt", $emojidir.'emoji-data.txt');
download_file("ftp://unicode.org/Public/emoji/$latestemoji/emoji-sequences.txt", $emojidir.'emoji-sequences.txt');
download_file("ftp://unicode.org/Public/emoji/$latestemoji/emoji-test.txt", $emojidir.'emoji-test.txt');
download_file("ftp://unicode.org/Public/emoji/$latestemoji/emoji-variation-sequences.txt", $emojidir.'emoji-variation-sequences.txt');
download_file("ftp://unicode.org/Public/emoji/$latestemoji/emoji-zwj-sequences.txt", $emojidir.'emoji-zwj-sequences.txt');