

declare module Data{
	interface DataStatic{
		emojis: Emoji[];

		keyboards: Keyboard[];
	}

	interface Emoji{
		symbol: string,
		group: string,
		subGroup: string,
		fullName: string,
		name?: string,
		keywords?: string[]
	}

	interface Keyboard{
		name: string,
		symbol: string,
		content: {
			group: string,
			subGroup: string
		}[]
	}
}
declare var data: Data.DataStatic;