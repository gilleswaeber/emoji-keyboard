<?php

include_once 'DataParser.php';
include_once 'DataGrabber.php';
include_once 'DataBuilder.php';

// Jump into script directory
chdir(__DIR__);

$dg = new DataGrabber();
$dg->create_dir('data');

$dp = new DataParser($dg);

$db = new DataBuilder($dp);

$db->build();

echo "Done!\n";