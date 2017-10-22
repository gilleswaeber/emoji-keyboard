<?php

$files = scandir('../wwwassets/img');
$emojis = json_decode(file_get_contents('data/keys.json'));

$allFiles = [];
foreach ($files as $f) {
	$allFiles[$f] = true;
}

$found = [
	"fully-qualified" => 0,
	"non-fully-qualified" => 0,
];
$notFound = [
	"fully-qualified" => 0,
	"non-fully-qualified" => 0,
];
$wrongName = [
	"fully-qualified" => 0,
	"non-fully-qualified" => 0,
];
foreach($emojis as $e){
	$file = implode(
		'-',
		array_map('dechex', $e->Code)
	).'.svg';

	$fileAlt = str_replace('-fe0f', '', $file);

	if(!in_array($file, $files)){
		if(in_array($fileAlt, $files)){
			// echo "$fileAlt should be $file\n";
			$wrongName[$e->Type]++;
			//$notFound[$e->Type]++;
			//rename('../wwwassets/img/'.$fileAlt, '../wwwassets/img/'.$file);
			echo "$fileAlt should be $file ($e->Type) $e->Symbol\n";
		} else {
			$notFound[$e->Type]++;
		}
	} else {
		unset($allFiles[$file]);
		$found[$e->Type]++;
	}
}

foreach ($found as $type => $found) {
	echo "$found files found ($type)\n";
}
foreach ($wrongName as $type => $wrongName) {
	echo "$wrongName files wrongly named ($type)\n";
}
foreach ($notFound as $type => $notFound) {
	echo "$notFound files not found ($type)\n";
}

foreach ($allFiles as $f => $x) {
	//echo "$f not expected\n";
}