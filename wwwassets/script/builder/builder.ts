import {
	parseAnnotations,
	parseEmojiTest,
	parseEmojiVersions,
	parseNamedSequences,
	parseNamesList,
	parseUnicodeData,
	Paths
} from "./unicode";
import {consolidateUnicodeData, UnicodeDataSource} from "./consolidated";
import {ahkDownloadUnicode, ahkSaveUnicodeData, ahkVersions} from "../ahk";
import {app} from "../appVar";

export function toCodePoints(s: string): number[] {
	return [...s].map(c => c.codePointAt(0)!);
}

type FirstPassEmoji = {
	keywords?: string[];
	symbol: string;
	group: string;
	subGroup: string;
	name: string;
	fullName?: string;
	code?: number[];
	alternates?: FirstPassEmoji[];
	style?: "space" | null;
	show?: string;
}

let building = false;

export async function makeBuild() {
	if (building) return;
	try {
		app().setBuilding(true);
		building = true;
		await build();
	} catch (e) {
		console.error(e);
		alert(`Build failed: ${e}`)
	} finally {
		app().setBuilding(false);
		building = false;
	}
}

async function build() {
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

	const ctx: UnicodeDataSource = {
		unicodeData: await parseUnicodeData(paths),
		emojiVersion: await parseEmojiVersions(paths.emojiDataPath),
		emojiTest: await parseEmojiTest(paths),
		namedSequences: await parseNamedSequences(paths),
		namesList: await parseNamesList(paths),
		annotations: await parseAnnotations(paths),
	};

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























