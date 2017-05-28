module Workers{

	export module Keyboards{
		export function getMainKeyboard(): Keyboard{
			return new Keyboard('Main keyboard', '⌨', data.keyboards.map((kdata)=>new KeyboardKey(new EmojiKeyboard(null, kdata))));
		}
	}

	export class Keyboard{
		private multipage: boolean;
		private pages: number;
		private page: number = 0;
		private fixedKeys: Key[] = [];
		private pagedKeys: Key[][] = [];
		private parent: Keyboard;

		constructor(
			private name: string,
			private symbol: string,
			private keys: Key[],
			private fallbackIcon: boolean = false
		){
			this.fixedKeys.push(new BlankKey());
			this.multipage = this.keys.length > 46;
			if(this.multipage){
				this.pages = 1;
				while(this.keys.length > this.pages*(45-Math.min(this.pages,10))){
					this.pages++;
				}
				var perpage = 45-Math.min(this.pages,10);
				for(var i=0; i<Math.min(this.pages,10); i++){
					this.fixedKeys.push(new PageKey(i));
				}
				var keysStack = this.keys.slice(0);
				for(var i=0; i<this.pages; i++){
					this.pagedKeys[i] = keysStack.splice(0, perpage+1);
				}
			}else{
				this.fixedKeys = this.fixedKeys.concat(this.keys);
			}
			this.fixedKeys.forEach((k)=>{if(k instanceof Key) k.setKeyboard(this);});
			this.pagedKeys.forEach((p)=>p.forEach((k)=>{if(k instanceof Key) k.setKeyboard(this);}));
		}

		getName(): string{
			return this.name;
		}

		getSymbol(): string{
			return this.symbol;
		}

		hasFallbackIcon(): boolean{
			return this.fallbackIcon;
		}

		getVisible(): Key[]{
			if(this.multipage) return [].concat(this.fixedKeys, this.pagedKeys[this.page]);
			else return [].concat(this.fixedKeys);
		}

		getParent(): Keyboard{
			return this.parent;
		}

		setParent(keyboard: Keyboard){
			this.parent = keyboard;
			var back = new BackKey();
			back.setKeyboard(this);
			this.fixedKeys[0] = back;
		}

		setKeys(keyNames: number[]){
			for(var i=0; i<this.fixedKeys.length; i++){
				this.fixedKeys[i].key = keyNames[i];
			}
			if(this.multipage) this.pagedKeys.forEach((page)=>page.forEach((key, i)=>key.key=keyNames[i+this.fixedKeys.length]));
		}

		setPage(page: number){
			this.page = page;
		}
	}

	export class EmojiKeyboard extends Keyboard{
		constructor(parent: Keyboard, kdata: Data.Keyboard){
			var keys: CharKey[] = [];
			kdata.content.forEach((content)=>{
				Emojis.getSubGroup(content.group, content.subGroup).forEach((chr)=>{
					keys.push(new CharKey(chr));
				});
			});
			super(kdata.name, kdata.symbol, keys, kdata.fallbackIcon);
		}
	}

	export class AlternatesKeyboard extends Keyboard{
		constructor(parent: Keyboard, base: Data.Emoji){
			var keys: CharKey[] = [];
			base.alternates.forEach((chr)=>{
				keys.push(new CharKey(chr));
			});
			super(base.name, base.symbol, keys, base.fallbackIcon);
		}
	}
}