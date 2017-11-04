module Workers{

	export module Emojis{
		var indexedEmojis: _.Dictionary<_.Dictionary<Data.Emoji[]>> = {};
		var flatEmojis: Data.Emoji[] = [];
		
		const ESCAPE_REGEX = new RegExp('(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );

		data.emojis.forEach((emoji)=>{
			if(!indexedEmojis[emoji.group]) indexedEmojis[emoji.group] = {};
			if(!indexedEmojis[emoji.group][emoji.subGroup]) indexedEmojis[emoji.group][emoji.subGroup] = [];

			indexedEmojis[emoji.group][emoji.subGroup].push(emoji);

			if(!emoji.alternates || !emoji.alternates.length) flatEmojis.push(emoji);
			else emoji.alternates.forEach(e => flatEmojis.push(e));
		})
		
		function escapeRegex(str: string): string{
			return str.replace(ESCAPE_REGEX, '\\$1');
		}

		export function getSubGroup(group: string, subGroup: string): Data.Emoji[]{
			if(indexedEmojis[group] && indexedEmojis[group][subGroup]){
				return indexedEmojis[group][subGroup];
			}else{
				return [];
			}
		}
		
		export function search(value: string){
			var re = new RegExp(escapeRegex(value), 'i');
			return flatEmojis.filter(
				e => 
					re.test(e.fullName) ||
					re.test(e.name) ||
					(e.keywords && e.keywords.some(k => re.test(k)))
			);
		}
	}
}