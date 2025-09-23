import {Version} from "../osversion";

export type IconRequirement = {
	type: "windows";
	/** Windows version in which the elements are supported */
	windows: string;
} | {
	type: "zwjEmoji";
	/** Sequence with ZWJ to check: supported if the ZWJ sequence is shorter than the sequence with the ZWJs removed */
	zwjEmoji: string;
} | {
	type: "emoji";
	/** Emoji to check: supported if the width is non-zero with a fallback on a zero-width font */
	emoji: string;
};
/** Fallback configuration: for each sequence we look for the first item matching and then use the fallback font if the conditions don't match. */
export const IconFallback: {
	requirement: IconRequirement;
	/** Match when unicode version >= number */
	version?: Version;
	/** Match when emoji version >= number */
	emojiVersion?: number;
	/** Match for a given text range */
	ranges?: {
		from: string,
		to: string,
	}[],
	/** Match for given sequences or characters */
	clusters?: Set<string>;
}[] = [
	{
		// Not supported on Windows
		requirement: {type: "windows", windows: "99"},
		ranges: [
			{from: "🇦", to: "🇿🇿"},
			{
				from: "\ud83c\udff4\udb40\udc61", // WAVING BLACK FLAG, TAG LATIN SMALL LETTER A
				to: "\ud83c\udff4\udb40\udc7a\udb40\udc7a", // WAVING BLACK FLAG, TAG LATIN SMALL LETTER Z, TAG LATIN SMALL LETTER Z
			}
		]
	},
	{
		requirement: {type: "emoji", emoji: "🫈"},  // Hairy Creature
		version: new Version("17"),
	},
	{
		requirement: {type: "emoji", emoji: "🪉"},  // Harp
		version: new Version("16"),
	},
	{
		requirement: {type:"zwjEmoji", zwjEmoji: "🐦‍🔥"},  // Phoenix
		version: new Version("15.1"),
	},
	{
		requirement: {type:"zwjEmoji", zwjEmoji: "🐦‍⬛"},  // Black Bird
		version: new Version("15"),
	},
	{
		// Windows 11 Fluent emoji font
		requirement: {type:"zwjEmoji", zwjEmoji: "🫱‍🫲"},  // Handshake
		version: new Version("14"),
	},
	{
		// Windows 11 Preview
		requirement: {type: "windows", windows: "10.0.21277"},
		version: new Version("13"),
		clusters: new Set([
			"*️⃣",
			// Unicode 12.1: partial support
			"🧑‍🦰", "🧑🏻‍🦰", "🧑🏼‍🦰", "🧑🏽‍🦰", "🧑🏾‍🦰", "🧑🏿‍🦰", // Person Red Hair
			"🧑‍🦱", "🧑🏻‍🦱", "🧑🏼‍🦱", "🧑🏽‍🦱", "🧑🏾‍🦱", "🧑🏿‍🦱", // Person Curly Hair
			"🧑‍🦳", "🧑🏻‍🦳", "🧑🏼‍🦳", "🧑🏽‍🦳", "🧑🏾‍🦳", "🧑🏿‍🦳", // Person White Hair
			"🧑‍🦲", "🧑🏻‍🦲", "🧑🏼‍🦲", "🧑🏽‍🦲", "🧑🏾‍🦲", "🧑🏿‍🦲", // Person Bald
			"🧑‍⚕️", "🧑🏻‍⚕", "🧑🏼‍⚕", "🧑🏽‍⚕", "🧑🏾‍⚕", "🧑🏿‍⚕", //  Health Worker
			"🧑‍🎓", "🧑🏻‍🎓", "🧑🏼‍🎓", "🧑🏽‍🎓", "🧑🏾‍🎓", "🧑🏿‍🎓", // Student
			"🧑‍🏫", "🧑🏻‍🏫", "🧑🏼‍🏫", "🧑🏽‍🏫", "🧑🏾‍🏫", "🧑🏿‍🏫", // Teacher
			"🧑‍⚖️", "🧑🏻‍⚖", "🧑🏼‍⚖", "🧑🏽‍⚖", "🧑🏾‍⚖", "🧑🏿‍⚖", //  Judge
			"🧑‍🌾", "🧑🏻‍🌾", "🧑🏼‍🌾", "🧑🏽‍🌾", "🧑🏾‍🌾", "🧑🏿‍🌾", // Farmer
			"🧑‍🍳", "🧑🏻‍🍳", "🧑🏼‍🍳", "🧑🏽‍🍳", "🧑🏾‍🍳", "🧑🏿‍🍳", // Cook
			"🧑‍🔧", "🧑🏻‍🔧", "🧑🏼‍🔧", "🧑🏽‍🔧", "🧑🏾‍🔧", "🧑🏿‍🔧", // Mechanic
			"🧑‍🏭", "🧑🏻‍🏭", "🧑🏼‍🏭", "🧑🏽‍🏭", "🧑🏾‍🏭", "🧑🏿‍🏭", // Factory Worker
			"🧑‍💼", "🧑🏻‍💼", "🧑🏼‍💼", "🧑🏽‍💼", "🧑🏾‍💼", "🧑🏿‍💼", // Office Worker
			"🧑‍🔬", "🧑🏻‍🔬", "🧑🏼‍🔬", "🧑🏽‍🔬", "🧑🏾‍🔬", "🧑🏿‍🔬", // Scientist
			"🧑‍💻", "🧑🏻‍💻", "🧑🏼‍💻", "🧑🏽‍💻", "🧑🏾‍💻", "🧑🏿‍💻", // Technologist
			"🧑‍🎤", "🧑🏻‍🎤", "🧑🏼‍🎤", "🧑🏽‍🎤", "🧑🏾‍🎤", "🧑🏿‍🎤", // Singer
			"🧑‍🎨", "🧑🏻‍🎨", "🧑🏼‍🎨", "🧑🏽‍🎨", "🧑🏾‍🎨", "🧑🏿‍🎨", // Artist
			"🧑‍✈️", "🧑🏻‍✈", "🧑🏼‍✈", "🧑🏽‍✈", "🧑🏾‍✈", "🧑🏿‍✈", //  Pilot
			"🧑‍🚀", "🧑🏻‍🚀", "🧑🏼‍🚀", "🧑🏽‍🚀", "🧑🏾‍🚀", "🧑🏿‍🚀", // Astronaut
			"🧑‍🚒", "🧑🏻‍🚒", "🧑🏼‍🚒", "🧑🏽‍🚒", "🧑🏾‍🚒", "🧑🏿‍🚒", // Firefighter
			"🧑‍🦯", "🧑🏻‍🦯", "🧑🏼‍🦯", "🧑🏽‍🦯", "🧑🏾‍🦯", "🧑🏿‍🦯", // Person with White Cane
			"🧑‍🦼", "🧑🏻‍🦼", "🧑🏼‍🦼", "🧑🏽‍🦼", "🧑🏾‍🦼", "🧑🏿‍🦼", // Person in Motorized Wheelchair
			"🧑‍🦽", "🧑🏻‍🦽", "🧑🏼‍🦽", "🧑🏽‍🦽", "🧑🏾‍🦽", "🧑🏿‍🦽", // Person in Manual Wheelchair
		]),
	},
	{
		// Windows 19H1
		requirement: {type: "windows", windows: "10.0.18277"},
		version: new Version("12"),
		clusters: new Set([
			"🏴‍☠️",
			"#\ufe0f\u20e3",
			"0\ufe0f\u20e3",
			"1\ufe0f\u20e3",
			"2\ufe0f\u20e3",
			"3\ufe0f\u20e3",
			"4\ufe0f\u20e3",
			"5\ufe0f\u20e3",
			"6\ufe0f\u20e3",
			"7\ufe0f\u20e3",
			"8\ufe0f\u20e3",
			"9\ufe0f\u20e3"
		])
	},
	{
		// Redstone 5
		requirement: {type: "windows", windows: "10.0.17723"},
		version: new Version("11"),
	},
	{
		// Windows Fall Creator Update
		requirement: {type: "windows", windows: "10.0.16226"},
		version: new Version("5"),
		// emojiVersion: 5,
		// version: 10
	},
	{
		// Windows Creator Update
		requirement: {type: "windows", windows: "10.0.15063"},
		version: new Version("4"),
		// emojiVersion: 4
	},
	{
		// Windows Anniversary Update
		requirement: {type: "windows", windows: "10.0.14393"},
		// version: 9
	},
	{
		requirement: {type: "windows", windows: "10"},
		version: new Version("0.01"),
		// version: 5
	},
];
