<?php

include_once 'DataGrabber.php';

class DataParser{
	private $cldrdir;
	private $emojidir;
	private $ucddir;

	/**
	 * @param dataGrabber DataGrabber
	 */
	function __construct($dataGrabber) {
		$this->cldrdir = $dataGrabber->download_cldr();
		$this->emojidir = $dataGrabber->download_unicode_emoji();
		$this->ucddir = $dataGrabber->download_ucd();
	}

	static function ord($str){
		return unpack('V', iconv('UTF-8', 'UCS-4LE', $str))[1];
	}

	function parseAttributes() {
		$chars = [];

		foreach (file($this->emojidir.'emoji-data.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
			if(preg_match("/^(?P<char>[0-9a-f]+) +; (?P<attr>[a-z_]+) *# *(?P<version>[0-9.]+) *\[1]/i", $line, $m)) {
				$char = hexdec($m['char']);
				if(!isset($chars[$char])) $chars[$char] = [];
				$chars[$char][$m['attr']] = true;
				$chars[$char]['Version'] = $m['version'];
			} elseif(preg_match("/(?P<from>[0-9a-f]+)..(?P<to>[0-9a-f]+) +; (?P<attr>[a-z_]+) *# *(?P<version>[0-9.]+) *\[(?P<nb>[0-9]+)\]/i", $line, $m)) {
				$from = hexdec($m['from']);
				$to = hexdec($m['to']);
				for ($char = $from; $char <= $to; $char++) {
					if(!isset($chars[$char])) $chars[$char] = [];
					$chars[$char][$m['attr']] = true;
					$chars[$char]['Version'] = $m['version'];
				}
			} else {
				//echo $line."\n";
			}
		}

		file_put_contents('data/chars.json', json_encode($chars, JSON_PRETTY_PRINT |  JSON_UNESCAPED_UNICODE));
		return $chars;
	}

	function parseKeys() {
		$keys = [];

		$group = 'none';
		$subgroup = 'none';
		foreach (file($this->emojidir.'emoji-test.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
			if(preg_match("/^# group: (?P<group>.+)$/", $line, $m)) {
				$group = $m['group'];
			} elseif(preg_match("/^# subgroup: (?P<subgroup>.+)$/", $line, $m)) {
				$subgroup = $m['subgroup'];
			} elseif(preg_match("/^(?P<code>[0-9a-f]+(?: [0-9a-f]+)*) +; +(?P<type>[a-z-]+) +# (?P<symbol>[^ ]+) (?P<name>.+)$/i", $line, $m)) {
				$keys[] = [
					"Code" => array_map('hexdec', explode(' ', $m['code'])),
					"Type" => $m['type'],
					"Symbol" => $m['symbol'],
					"Name" => $m['name'],
					"Group" => $group,
					"SubGroup" => $subgroup
				];
			} else {
				//echo $line."\n";
			}
		}

		file_put_contents('data/keys.json', json_encode($keys, JSON_PRETTY_PRINT |  JSON_UNESCAPED_UNICODE));
		return $keys;
	}

	function parseAnnotations() {
		$annotations = [];

		$xml = simplexml_load_file($this->cldrdir.'common/annotations/en.xml');
		$annotations ;
		foreach ($xml->annotations->annotation as $annotation) {
			$char = $this->ord($annotation['cp']);
			if(!isset($annotations[$char])) $annotations[$char] = [];
			if(isset($annotation['type'])) $annotations[$char][(string)$annotation['type']] = (string)$annotation;
			else $annotations[$char]['keywords'] = explode(' | ', (string)$annotation);
		}

		file_put_contents('data/annotations.json', json_encode($annotations, JSON_PRETTY_PRINT |  JSON_UNESCAPED_UNICODE));
		return $annotations;
	}

	function parseUnidata() {
		$unidata = [];

		foreach (file($this->ucddir.'UnicodeData.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
			$line = explode(';', $line);
			$unidata[hexdec($line[0])] = [
				'name' => $line[1],
				'category' => $line[2],
				'combining' => $line[3],
				'bidirectional' => $line[4],
				'decomposition' => $line[5],
				'decimaldigit' => $line[6],
				'digit' => $line[7],
				'numeric' => $line[8],
				'mirrored' => $line[9],
				'unicode1' => $line[10],
				'comment' => $line[11],
				'uppercase' => $line[12],
				'lowercase' => $line[13],
				'titlecase' => $line[14],
			];
		}

		file_put_contents('data/unidata.json', json_encode($unidata, JSON_PRETTY_PRINT |  JSON_UNESCAPED_UNICODE));
		return $unidata;
	}

	function parseConfig() {
        $config = json_decode(file_get_contents('config.json'));
		return $config;
	}
}