<?php

include_once 'DataParser.php';

class DataBuilder{
	private $keys;
	private $chars;
	private $sequences;
	private $annotations;
	private $unidata;
	private $config;
	private $keymaps;
	private $versions;

	// Don't use these characters as part of the full name
	private $ignoreList = [
		8205, // ZERO WIDTH JOINER
		65039 // VARIATION SELECTOR-16
	];

	function __construct(DataParser $dp){
		$this->keys = $dp->parseKeys();
		$this->chars = $dp->parseAttributes();
		$this->sequences = $dp->parseSequences();
		$this->annotations = $dp->parseAnnotations();
		$this->unidata = $dp->parseUnidata();
		$this->config = $dp->parseConfig();
		$this->keymaps = $dp->parseKeymaps();

		$this->versions = $this->buildVersions();
	}

	/**
	 * Build Emoji version tables
	 * @return array
	 */
	private function buildVersions(){
		$versions = [];

		foreach ($this->chars['previous'] as $v => $chars){
			foreach ($chars as $char => $data){
				if (!isset($versions[$char]) || version_compare($v, '<', $versions[$char])) {
					$versions[$char] = $v;
				}
			}
		}

		foreach ($this->sequences as $v => $sequences){
			foreach ($sequences as $sequence){
				if (!isset($versions[$sequence]) || version_compare($v, '<', $versions[$sequence])) {
					$versions[$sequence] = $v;
				}
			}
		}

		file_put_contents('data/versions.json', json_encode($versions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
		return $versions;
	}

	function findEmojiVersion($e){
		if (isset($this->versions[implode('-', $e['code'])])) return floatval($this->versions[implode('-', $e['code'])]);
		else for ($i = count($e['code']); $i > 0; $i--){
			$code = implode('-', array_slice($e['code'], 0, $i));
			if (isset($this->versions[$code])) return $this->versions[$code];
		}
		if (App::$verbose) echo "[WARNING] Emoji Version not found for " . implode('-', $e['code']) . ": " . $e['symbol'] . "\n";
		return "0";
	}

	function setRequiredVersion(&$e){
		if (isset($this->config->iconFallback)) foreach ($this->config->iconFallback as $rules){
			if (
				(isset($rules->version) && $e['version'] >= $rules->version) ||
				(isset($rules->emojiVersion) && $e['emojiVersion'] >= $rules->emojiVersion) ||
				(isset($rules->sequences) && in_array($e['symbol'], $rules->sequences)) ||
				(isset($rules->characters) && count(array_filter($rules->characters, function ($c) use ($e){
						return $e['symbol'] > $c->from && $e['symbol'] <= $c->to;
					})) > 0)
			) $e['requiredVersion'] = $rules->windows;
		}
	}

	function applySecondPass(&$e, &$groups = []){
		if (!isset($groups[$e['group']])) $groups[$e['group']] = [];
		$groups[$e['group']][$e['subGroup']] = 0;

		if (!isset($e['code'])) $e['code'] = DataBuilder::splitChars($e['symbol']);
		if (!isset($e['fullName'])) $e['fullName'] = $this->getFullName($e['code']);

		if (count($e['code'])) {
			$e['version'] = array_key_exists($e['code'][0], $this->chars['latest']) ? floatval($this->chars['latest'][$e['code'][0]]['Version']) : 0;
			$e['emojiVersion'] = $this->findEmojiVersion($e);
		} else {
			$e['version'] = $e['emojiVersion'] = 0;
		}

		if (!isset($e['show'])) $e['show'] = $e['symbol'];

		if (!isset($e['keywords']) && count($e['code']) && isset($this->annotations[$e['code'][0]]['keywords']))
			$e['keywords'] = $this->annotations[$e['code'][0]]['keywords'];

		$this->setRequiredVersion($e);

		if (isset($e['alternates'])) foreach ($e['alternates'] as &$a) $this->applySecondPass($a);
	}

	function build(){
		$emojis = [];
		$keyboards = $this->config->keyboards;

		$groups = [];

		// First pass
		foreach ($this->keys as $n => $key){
			if ($key['Type'] != 'fully-qualified') continue;

			$data = [
				'symbol' => $key['Symbol'],
				'group' => $key['Group'],
				'subGroup' => $key['SubGroup'],
				'name' => $key['Name'],
				'code' => $key['Code']
			];

			$basename = explode(': ', $key['Name'])[0];
			if (
				isset($emojis[$basename]) &&
				(!isset($this->config->nogroup) || !in_array($basename, $this->config->nogroup))
			) {
				$base = explode(': ', $key['Name'])[0];
				if (!isset($emojis[$base]['alternates'])) $emojis[$base]['alternates'] = [$emojis[$base]];
				$emojis[$base]['alternates'][] = $data;
			} else {
				if (isset($emojis[$key['Name']])) $emojis[$key['Name'] . $n] = $data;
				else $emojis[$key['Name']] = $data;
			}
		}
		if (isset($this->config->addons)) foreach ($this->config->addons as $addon){
			if (isset($addon->symbols)) {
				foreach ($addon->symbols as $symbol){
					if (isset($symbol->from, $symbol->to)) {
						$fromCode = DataBuilder::splitChars($symbol->from);
						$toCode = DataBuilder::splitChars($symbol->to);
						if (count($fromCode) != 1 || count($toCode) != 1 || $fromCode[0] > $toCode[0]) throw new InvalidArgumentException("Range not supported: " . $symbol->from . " — " . $symbol->to);
						$from = $fromCode[0];
						$to = $toCode[0];
						for ($c = $from; $c <= $to; $c++){
							$emoji = $this->getEmoji($addon, DataParser::chr($c));
							$emojis[$emoji['name']] = $emoji;
						}
					} else {
						$emoji = $this->getEmoji($addon, $symbol);
						$emojis[$emoji['name']] = $emoji;
					}
				}
			} else {
				$name = property_exists($addon, 'name') ? $addon->name : $this->getFullName(DataBuilder::splitChars($addon->symbol));
				$style = property_exists($addon, 'style') ? $addon->style : null;
				$emojis[$name] = [
					'symbol' => $addon->symbol,
					'group' => $addon->group,
					'subGroup' => $addon->subGroup,
					'name' => $name,
					'show' => property_exists($addon, 'show') ? $addon->show : $addon->symbol
				];
				if (!is_null($style)) $emojis[$name]['style'] = $style;
				if (isset($addon->keywords)) $emojis[$addon->name]['keywords'] = $addon->keywords;
				if (isset($addon->alternates)) {
					$emojis[$addon->name]['alternates'] = [$emojis[$addon->name]];
					foreach ($addon->alternates as $alt){
						$c = [
							'symbol' => $alt->symbol,
							'group' => $addon->group,
							'subGroup' => $addon->subGroup,
							'name' => $alt->name,
							'show' => property_exists($alt, 'show') ? $alt->show : $alt->symbol
						];
						if (isset($alt->keywords)) $c['keywords'] = $addon->keywords;
						if (!is_null($style)) $c['style'] = $style;
						$emojis[$addon->name]['alternates'][] = $c;
					}
				}
			}
		}

		// Second pass (add additional information if possible)
		foreach ($emojis as &$e){
			$this->applySecondPass($e, $groups);
		}
		echo "Got " . count($emojis) . " base emojis\n";

		// Keyboards
		foreach ($keyboards as &$k){
			foreach ($k->content as $c){
				if (!isset($groups[$c->group])) echo "[WARNING] Keyboard " . $k->name . ": group " . $c->group . " doesn't exist\n";
				elseif (!isset($groups[$c->group][$c->subGroup])) echo "[WARNING] Keyboard " . $k->name . ": subgroup " . $c->group . '.' . $c->subGroup . " doesn't exist\n";
				else $groups[$c->group][$c->subGroup]++;
			}

			$e = [
				'symbol' => $k->symbol,
				'code' => DataBuilder::splitChars($k->symbol),
			];
			$e['version'] = array_key_exists($e['code'][0], $this->chars['latest']) ? floatval($this->chars['latest'][$e['code'][0]]['Version']) : 0;
			$e['emojiVersion'] = $this->findEmojiVersion($e);
			$this->setRequiredVersion($e);

			if (isset($e['requiredVersion'])) $k->requiredVersion = $e['requiredVersion'];
		}

		foreach ($groups as $g => $sub){
			foreach ($sub as $s => $n){
				if ($n == 0) echo "[WARNING] Subgroup $g.$s is not used on any keyboard.\n";
				elseif ($n > 1) echo "[WARNING] Subgroup $g.$s is used more than once.\n";
			}
		}

		$keymaps = $this->keymaps;
		if (isset($this->config->keymaps)) $keymaps = array_merge($keymaps, (array)$this->config->keymaps);

		$data = [
			'emojis' => array_values($emojis),
			'keyboards' => $keyboards,
			'keymaps' => $keymaps
		];
		file_put_contents('data/data.exp.js', "// Use the builder inside the res folder to edit this file\nvar data = " . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
		file_put_contents('data/data.js', "// Use the builder inside the res folder to edit this file\nvar data = " . json_encode($data, JSON_UNESCAPED_UNICODE));
		echo "File written in data/data.js\n";
		return $data;
	}

	function getEmoji($addon, $symbol){
		static $blank = 0;
		if (is_null($symbol)) {
			return [
				'symbol' => "",
				'group' => $addon->group,
				'subGroup' => $addon->subGroup,
				'name' => "BLANK " . $blank++
			];
		} elseif (is_string($symbol)) {
			$code = DataBuilder::splitChars($symbol);
			$fullName = $this->getFullName($code);
			$name = mb_convert_case($fullName, MB_CASE_TITLE);
			return [
				'symbol' => $symbol,
				'group' => $addon->group,
				'subGroup' => $addon->subGroup,
				'fullName' => $fullName,
				'name' => $name,
				'code' => $code,
			];
		} elseif (is_array($symbol)) {
			$emoji = $this->getEmoji($addon, $symbol[0]);
			$emoji['alternates'] = [];
			foreach ($symbol as $sym) $emoji['alternates'][] = $this->getEmoji($addon, $sym);
			return $emoji;
		} else throw new UnexpectedValueException($symbol);
	}

	private static function splitChars($symbol){
		return array_map('DataParser::ord', preg_split("##u", $symbol, -1, PREG_SPLIT_NO_EMPTY));
	}

	private function getFullName($code){
		$parts = [];
		foreach ($code as $c){
			if (in_array($c, $this->ignoreList)) continue;
			if ($c >= 19968 && $c <= 40956) {
				$parts[] = "CJK UNIFIED IDEOGRAPH-" . dechex($c);
			}
			else $parts[] = $this->unidata[$c]['name'];
		}
		return implode(', ', $parts);
	}
}
