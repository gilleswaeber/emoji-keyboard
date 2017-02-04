

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
		keywords?: string[],
		fallbackIcon?: boolean
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
}
declare var data: Data.DataStatic;