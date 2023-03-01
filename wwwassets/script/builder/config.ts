type SymbolAddon = {
	symbol: string;
	name?: string;
	style?: "space" | null;
	keywords?: string[];
	symbols: undefined;
	show?: string;
	alternates?: {
		symbol: string;
		name?: string;
		show?: string;
		keywords?: string[];
	}[];
}
type GroupAddon = {
	symbols: (null | string | { from: string, to: string })[];
}
export type ConfigAddon = (SymbolAddon | GroupAddon) & {
	group: string;
	subGroup: string;
};
type IconFallback = {
	/** Windows version in which the elements are supported */
	windows: string;
	/** Use fallback icon if unicode version >= number */
	version?: string;
	/** Use fallback icon if emoji version >= number */
	emojiVersion?: string;
	/** Use fallback icon for a given text range */
	characters?: { from: string, to: string }[];
	/** Use fallback icon for given sequences or characters */
	sequences?: string[];
}
type Keyboard = {
	name: string;
	symbol: string;
	content: {group: string, subGroup: string}[];
};

export type Config = {
	/** Additional character/sequences to add */
	addons: ConfigAddon[];
	iconFallback: IconFallback[];
	/** Force a version for remote resources. Include trailing zeros. */
	forceVersion?: {
		cldr?: string;
		emoji?: string;
		ucd?: string;
	};
	keyboards: Keyboard[];
	/** Disable automatic grouping */
	noGroup: string[];
	/** Add metadata to codepoints and sequences */
	symbols: {}[];
}
export type Paths = {
	emojiTestPath: string;
	emojiDataPath: string;
	unicodeDataPath: string;
	namesListPath: string;
}
