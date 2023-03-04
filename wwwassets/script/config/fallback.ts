export const IconFallback: {
	/** Windows version in which the elements are supported */
	windows: string;
	/** Use fallback icon if unicode version >= number */
	version?: number;
	/** Use fallback icon if emoji version >= number */
	emojiVersion?: number;
	/** Use fallback icon for a given text range */
	ranges?: {
		from: string,
		to: string,
	}[],
	/** Use fallback icon for given sequences or characters */
	clusters?: Set<string>;
}[] = [
	{
		// Not supported on Windows
		windows: "99",
		ranges: [
			{from: "🇦", to: "🇿🇿"},
			{
				from: "\ud83c\udff4\udb40\udc61", // WAVING BLACK FLAG, TAG LATIN SMALL LETTER A
				to: "\ud83c\udff4\udb40\udc7a\udb40\udc7a", // WAVING BLACK FLAG, TAG LATIN SMALL LETTER Z, TAG LATIN SMALL LETTER Z
			}
		]
	},
	{
		windows: "10.0.25300",
		version: 15,
	},
	{
		// Windows 11 Fluent emoji font
		windows: "10.0.22563",
		version: 14,
	},
	{
		// Windows 11 Preview
		windows: "10.0.21277",
		version: 13,
		clusters: new Set([
			"*️⃣",
			// Unicode 12.1: partial support
			"🧑‍🦰","🧑🏻‍🦰","🧑🏼‍🦰","🧑🏽‍🦰","🧑🏾‍🦰","🧑🏿‍🦰", // Person Red Hair
			"🧑‍🦱","🧑🏻‍🦱","🧑🏼‍🦱","🧑🏽‍🦱","🧑🏾‍🦱","🧑🏿‍🦱", // Person Curly Hair
			"🧑‍🦳","🧑🏻‍🦳","🧑🏼‍🦳","🧑🏽‍🦳","🧑🏾‍🦳","🧑🏿‍🦳", // Person White Hair
			"🧑‍🦲","🧑🏻‍🦲","🧑🏼‍🦲","🧑🏽‍🦲","🧑🏾‍🦲","🧑🏿‍🦲", // Person Bald
			"🧑‍⚕️","🧑🏻‍⚕","🧑🏼‍⚕","🧑🏽‍⚕","🧑🏾‍⚕","🧑🏿‍⚕", //  Health Worker
			"🧑‍🎓","🧑🏻‍🎓","🧑🏼‍🎓","🧑🏽‍🎓","🧑🏾‍🎓","🧑🏿‍🎓", // Student
			"🧑‍🏫","🧑🏻‍🏫","🧑🏼‍🏫","🧑🏽‍🏫","🧑🏾‍🏫","🧑🏿‍🏫", // Teacher
			"🧑‍⚖️","🧑🏻‍⚖","🧑🏼‍⚖","🧑🏽‍⚖","🧑🏾‍⚖","🧑🏿‍⚖", //  Judge
			"🧑‍🌾","🧑🏻‍🌾","🧑🏼‍🌾","🧑🏽‍🌾","🧑🏾‍🌾","🧑🏿‍🌾", // Farmer
			"🧑‍🍳","🧑🏻‍🍳","🧑🏼‍🍳","🧑🏽‍🍳","🧑🏾‍🍳","🧑🏿‍🍳", // Cook
			"🧑‍🔧","🧑🏻‍🔧","🧑🏼‍🔧","🧑🏽‍🔧","🧑🏾‍🔧","🧑🏿‍🔧", // Mechanic
			"🧑‍🏭","🧑🏻‍🏭","🧑🏼‍🏭","🧑🏽‍🏭","🧑🏾‍🏭","🧑🏿‍🏭", // Factory Worker
			"🧑‍💼","🧑🏻‍💼","🧑🏼‍💼","🧑🏽‍💼","🧑🏾‍💼","🧑🏿‍💼", // Office Worker
			"🧑‍🔬","🧑🏻‍🔬","🧑🏼‍🔬","🧑🏽‍🔬","🧑🏾‍🔬","🧑🏿‍🔬", // Scientist
			"🧑‍💻","🧑🏻‍💻","🧑🏼‍💻","🧑🏽‍💻","🧑🏾‍💻","🧑🏿‍💻", // Technologist
			"🧑‍🎤","🧑🏻‍🎤","🧑🏼‍🎤","🧑🏽‍🎤","🧑🏾‍🎤","🧑🏿‍🎤", // Singer
			"🧑‍🎨","🧑🏻‍🎨","🧑🏼‍🎨","🧑🏽‍🎨","🧑🏾‍🎨","🧑🏿‍🎨", // Artist
			"🧑‍✈️","🧑🏻‍✈","🧑🏼‍✈","🧑🏽‍✈","🧑🏾‍✈","🧑🏿‍✈", //  Pilot
			"🧑‍🚀","🧑🏻‍🚀","🧑🏼‍🚀","🧑🏽‍🚀","🧑🏾‍🚀","🧑🏿‍🚀", // Astronaut
			"🧑‍🚒","🧑🏻‍🚒","🧑🏼‍🚒","🧑🏽‍🚒","🧑🏾‍🚒","🧑🏿‍🚒", // Firefighter
			"🧑‍🦯","🧑🏻‍🦯","🧑🏼‍🦯","🧑🏽‍🦯","🧑🏾‍🦯","🧑🏿‍🦯", // Person with White Cane
			"🧑‍🦼","🧑🏻‍🦼","🧑🏼‍🦼","🧑🏽‍🦼","🧑🏾‍🦼","🧑🏿‍🦼", // Person in Motorized Wheelchair
			"🧑‍🦽","🧑🏻‍🦽","🧑🏼‍🦽","🧑🏽‍🦽","🧑🏾‍🦽","🧑🏿‍🦽", // Person in Manual Wheelchair
		]),
	},
	{
		// Windows 19H1
		windows: "10.0.18277",
		version: 12,
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
		windows: "10.0.17723",
		version: 11
	},
	{
		// Windows Fall Creator Update
		windows: "10.0.16226",
		version: 5,
		// emojiVersion: 5,
		// version: 10
	},
	{
		// Windows Creator Update
		windows: "10.0.15063",
		version: 4,
		// emojiVersion: 4
	},
	{
		// Windows Anniversary Update
		windows: "10.0.14393",
		// version: 9
	},
	{
		windows: "10",
		version: 0,
		// version: 5
	},
];
