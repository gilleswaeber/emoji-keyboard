declare module Data{
	interface DataStatic{
		emojis: Emoji[];

		keyboards: Keyboard[];

		keymaps: _.Dictionary<Keymap>
	}

	interface Emoji{
		symbol: string,
		group: string,
		subGroup: string,
		fullName: string,
		name?: string,
		keywords?: string[],
		fallbackIcon?: boolean,
		alternates?: Data.Emoji[]
	}

	interface Keyboard{
		name: string,
		symbol: string,
		fallbackIcon?: boolean,
		content: {
			group: string,
			subGroup: string
		}[]
	}

	interface Keymap{
		name: string,
		keys: _.Dictionary<string>
	}
}
declare var data: Data.DataStatic;