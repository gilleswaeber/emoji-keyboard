<?php

include_once 'DataParser.php';

class DataBuilder{
	private $keys;
	private $chars;
	private $annotations;
	private $unidata;
	private $config;
	private $keymaps;

	// Don't use these characters as part of the full name
	private $ignoreList = [
		8205, // ZERO WIDTH JOINER
		65039 // VARIATION SELECTOR-16
	];

	/**
	 * @param dp DataParser
	 */
	function __construct($dp) {
		$this->keys = $dp->parseKeys();
		$this->chars = $dp->parseAttributes();
		$this->annotations = $dp->parseAnnotations();
		$this->unidata = $dp->parseUnidata();
		$this->config = $dp->parseConfig();
		$this->keymaps = $dp->parseKeymaps();
	}

	function applySecondPass(&$e, &$groups = []){
		if(!isset($groups[$e['group']])) $groups[$e['group']] = [];
		$groups[$e['group']][$e['subGroup']] = 0;

		if(!isset($e['code'])) $e['code'] = array_map('DataParser::ord', preg_split("##u", $e['symbol'], -1, PREG_SPLIT_NO_EMPTY));

		$e['fullName'] = implode(', ', array_map(function($cp){
				return $this->unidata[$cp]['name'];
			}, array_filter($e['code'], function($code){
				return !in_array($code, $this->ignoreList);
			})));
		
		$e['version'] = floatval($this->chars[$e['code'][0]]['Version']);
		
		if(!isset($e['keywords']) && isset($this->annotations[$e['code'][0]]['keywords']))
			$e['keywords'] = $this->annotations[$e['code'][0]]['keywords'];

		if(isset($this->config->iconFallback)){
			if(
				(isset($this->config->iconFallback->version) && $e['version'] >= $this->config->iconFallback->version) ||
				(isset($this->config->iconFallback->sequences) && in_array($e['symbol'], $this->config->iconFallback->sequences)) ||
				(isset($this->config->iconFallback->characters) && count(array_filter($this->config->iconFallback->characters, function($c)use($e){
					return $e['symbol'] > $c->from && $e['symbol'] <= $c->to;
				})) > 0)
			) $e['fallbackIcon'] = true;
		}
		if(isset($e['alternates'])) foreach($e['alternates'] as &$a) $this->applySecondPass($a);
	}

	function build(){
		$emojis = [];
		$keyboards = $this->config->keyboards;

		$groups = [];

		// First pass
		foreach ($this->keys as $key) {
			if($key['Type'] != 'fully-qualified') continue;
			
			$data = [
				'symbol' => $key['Symbol'],
				'group' => $key['Group'],
				'subGroup' => $key['SubGroup'],
				'name' => $key['Name'],
				'code' => $key['Code']
			];

			if(
				isset($emojis[explode(': ', $key['Name'])[0]]) &&
				(!isset($this->config->nogroup) || !in_array(explode(': ', $key['Name'])[0], $this->config->nogroup))
			){
				$base = explode(': ', $key['Name'])[0];
				if(!isset($emojis[$base]['alternates'])) $emojis[$base]['alternates'] = [$emojis[$base]];
				$emojis[$base]['alternates'][] = $data;
			} else {
				$emojis[$key['Name']] = $data;
			}
		}
		if(isset($this->config->addons)) foreach ($this->config->addons as $addon) {
			$emojis[$addon->name] = [
				'symbol' => $addon->symbol,
				'group' => $addon->group,
				'subGroup' => $addon->subGroup,
				'name' => $addon->name
			];
			if(isset($addon->keywords)) $emojis[$addon->name]['keywords'] = $addon->keywords;
		}

		// Second pass (add additional informations if possible)
		foreach ($emojis as &$e) {
			$this->applySecondPass($e, $groups);
		}
		echo "Got ".count($emojis)." base emojis\n";

		// Keyboards
		foreach ($keyboards as $k) {
			foreach ($k->content as $c) {
				if(!isset($groups[$c->group])) echo "[WARNING] Keyboard ".$k->name.": group ".$c->group." doesn't exist\n";
				elseif(!isset($groups[$c->group][$c->subGroup])) echo "[WARNING] Keyboard ".$k->name.": subgroup ".$c->group.'.'.$c->subGroup." doesn't exist\n";
				else $groups[$c->group][$c->subGroup]++;
			}
		}
		foreach ($groups as $g => $sub) {
			foreach ($sub as $s => $n) {
				if($n == 0) echo "[WARNING] Subgroup $g.$s is not used on any keyboard.\n";
				elseif($n > 1) echo "[WARNING] Subgroup $g.$s is used more than once.\n";
			}
		}

		$keymaps = $this->keymaps;
		if(isset($this->config->keymaps)) $keymaps = array_merge($keymaps, (array) $this->config->keymaps);

		$data = [
			'emojis' => array_values($emojis),
			'keyboards' => $keyboards,
			'keymaps' => $keymaps
		];
		file_put_contents('data/data.exp.js', "// Use the builder inside the res folder to edit this file\nvar data = ".json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
		file_put_contents('data/data.js', "// Use the builder inside the res folder to edit this file\nvar data = ".json_encode($data, JSON_UNESCAPED_UNICODE));
		echo "File written in data/data.js\n";
		return $data;
	}
}