module Workers{

	export module Emojis{
		var indexedEmojis: _.Dictionary<_.Dictionary<Data.Emoji[]>> = {};

		data.emojis.forEach((emoji)=>{
			if(!indexedEmojis[emoji.group]) indexedEmojis[emoji.group] = {};
			if(!indexedEmojis[emoji.group][emoji.subGroup]) indexedEmojis[emoji.group][emoji.subGroup] = [];

			indexedEmojis[emoji.group][emoji.subGroup].push(emoji);
		})

		export function getSubGroup(group: string, subGroup: string): Data.Emoji[]{
			if(indexedEmojis[group] && indexedEmojis[group][subGroup]){
				return indexedEmojis[group][subGroup];
			}else{
				return [];
			}
		}
	}
}