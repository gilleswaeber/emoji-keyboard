import {parseUnicodeResources, Paths, UnicodeResources} from "./unicode";
import {consolidateUnicodeData} from "./consolidated";
import {ahkDownloadUnicode, ahkSaveUnicodeData, ahkVersions} from "../ahk";
import {app} from "../appVar";
import memoizeOne from "memoize-one";

export function toCodePoints(s: string): number[] {
	return [...s].map(c => c.codePointAt(0)!);
}

let building = false;

export async function makeBuild() {
	if (building) return;
	try {
		app().setBuilding(true);
		building = true;
		await buildAhk();
	} catch (e) {
		console.error(e);
		alert(`Build failed: ${e}`)
	} finally {
		app().setBuilding(false);
		building = false;
	}
}

async function buildAhk() {
	await ahkDownloadUnicode();
	const v = await ahkVersions();
	const paths: Paths = {
		emojiTestPath: `../res/data/emoji/${v.emoji}/emoji-test.txt`,
		emojiDataPath: `../res/data/${v.ucd}/ucd/emoji/emoji-data.txt`,
		unicodeDataPath: `../res/data/${v.ucd}/ucd/UnicodeData.txt`,
		namedSequencesPath: `../res/data/${v.ucd}/ucd/NamedSequences.txt`,
		namesListPath: `../res/data/${v.ucd}/ucd/NamesList.txt`,
		annotationsPath: `../res/data/cldr-json/${v.cldr}/cldr-json/cldr-annotations-full/annotations/en/annotations.json`,
	};

	const resources: UnicodeResources = {
		emojiTest: memoizeOne(() => fetch(paths.emojiTestPath).then(r => r.text())),
		emojiData: memoizeOne(() => fetch(paths.emojiDataPath).then(r => r.text())),
		unicodeData: memoizeOne(() => fetch(paths.unicodeDataPath).then(r => r.text())),
		namedSequences: memoizeOne(() => fetch(paths.namedSequencesPath).then(r => r.text())),
		namesList: memoizeOne(() => fetch(paths.namesListPath).then(r => r.text())),
		annotations: memoizeOne(() => fetch(paths.annotationsPath).then(r => r.text())),
	}

	const ctx = await parseUnicodeResources(resources);

	const u = consolidateUnicodeData(ctx);
	console.log(u);

	ahkSaveUnicodeData(u);

	const emojiCount = u.groups.map(g => g.sub.reduce((v, s) => v + (s.clusters?.length ?? 0), 0)).reduce((a, b) => a + b, 0);
	alert(
		`Finished building “${u.name}”\n` +
		` – ${u.chars.length} codepoints in ${u.blocks.length} blocks\n` +
		` – ${u.clusters.length} grapheme clusters with length > 1\n` +
		` – ${u.groups.length} emoji groups with ${emojiCount} base emojis\n\n` +
		`Reload the app to load the new data file`
	)
}























