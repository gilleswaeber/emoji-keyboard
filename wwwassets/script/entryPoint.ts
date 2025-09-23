import {startApp} from "./app";
import {parseUnicodeResources, UnicodeResources} from "./builder/unicode";
import memoizeOne from "memoize-one";
import {ConsolidatedUnicodeData, consolidateUnicodeData} from "./builder/consolidated";

if (typeof window != "undefined") {
	startApp();
}

export async function nodeBuild({ucdVersion, cldrVersion}: {ucdVersion: string, cldrVersion: string}): Promise<ConsolidatedUnicodeData> {
	const resources: UnicodeResources = {
		emojiTest: memoizeOne(() => fetch(`https://unicode.org/Public/${ucdVersion}/emoji/emoji-test.txt`).then(r => r.text())),
		emojiData: memoizeOne(() => fetch(`https://unicode.org/Public/${ucdVersion}/ucd/emoji/emoji-data.txt`).then(r => r.text())),
		unicodeData: memoizeOne(() => fetch(`https://unicode.org/Public/${ucdVersion}/ucd/UnicodeData.txt`).then(r => r.text())),
		namesList: memoizeOne(() => fetch(`https://unicode.org/Public/${ucdVersion}/ucd/NamesList.txt`).then(r => r.text())),
		namedSequences: memoizeOne(() => fetch(`https://unicode.org/Public/${ucdVersion}/ucd/NamedSequences.txt`).then(r => r.text())),
		annotations: memoizeOne(() => fetch(`https://raw.githubusercontent.com/unicode-org/cldr-json/${cldrVersion}/cldr-json/cldr-annotations-full/annotations/en/annotations.json`).then(r => r.text())),
	}

	const ctx = await parseUnicodeResources(resources);

	return consolidateUnicodeData(ctx);
}
