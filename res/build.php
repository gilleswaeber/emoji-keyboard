<?php

// Jump into script directory
chdir(__DIR__);

include_once 'DataParser.php';
include_once 'DataGrabber.php';
include_once 'DataBuilder.php';

abstract class App {
	static $verbose = false;
	static $help = false;
	static $offline = false;
	static $install = false;
}

foreach(array_slice($argv, 1) as $arg){
	$found = false;
	if (preg_match("#^(?:[-/][a-z]*[h?][a-z]*|--help)$#i", $arg)) {
		App::$help = true;
		$found = true;
	}
	if (preg_match("#^(?:[-/][a-z]*v[a-z]*|--verbose)$#i", $arg)) {
		App::$verbose = true;
		$found = true;
	}
	if (preg_match("#^(?:[-/][a-z]*l[a-z]*|--offline|--local)$#i", $arg)) {
		App::$offline = true;
		$found = true;
	}
	if (preg_match("#^(?:[-/][a-z]*i[a-z]*|--install)$#i", $arg)) {
		App::$install = true;
		$found = true;
	}
	if (!$found) echo "[WARNING] Unrecognized argument ".$arg."\n";
}

if(App::$help){
	echo "Please refer to the README.md file\n";
	die();
}

function errHandle($errNo, $errStr, $errFile, $errLine) {
    $msg = "$errStr in $errFile on line $errLine";
    if ($errNo == E_NOTICE || $errNo == E_WARNING) {
        throw new ErrorException($msg, $errNo);
    } else {
        echo "$msg\n";
    }
}

set_error_handler('errHandle');

$dg = new DataGrabber();
$dg->create_dir('data');

$dp = new DataParser($dg);

$db = new DataBuilder($dp);

$db->build();

echo "Done!\n";

if(App::$install){
	echo "Copying data.js... ";
	echo copy('data/data.js', '../wwwassets/script/data.js') ? 'success' : 'fail!';
	echo "\n";
}