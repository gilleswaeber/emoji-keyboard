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
}

foreach(array_slice($argv, 1) as $arg){
	if(preg_match("#^(?:[-/][h?]|--help)$#i", $arg)) App::$help = true;
	elseif(preg_match("#^(?:[-/]v|--verbose)$#i", $arg)) App::$verbose = true;
	elseif(preg_match("#^(?:[-/]l|--offline|--local)$#i", $arg)) App::$offline = true;
	else echo "[WARNING] Unrecognized argument ".$arg."\n";
}

if(App::$help){
	echo "Please refer to the README.md file\n";
	die();
}

$dg = new DataGrabber();
$dg->create_dir('data');

$dp = new DataParser($dg);

$db = new DataBuilder($dp);

$db->build();

echo "Done!\n";