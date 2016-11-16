/// <reference path="data.d.ts" />
/// <reference path="Emojis.ts" />


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
			private keys: Key[]
		){
			this.fixedKeys.push(new BlankKey());
			console.log(this.keys.length);
			this.multipage = this.keys.length > 47;
			if(this.multipage){
				this.pages = 1;
				while(this.keys.length > this.pages*(45-Math.min(this.pages,10))){
					this.pages++;
				}
				var perpage = 46-Math.min(this.pages,10);
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
			this.fixedKeys.forEach((k)=>{if(k instanceof ActionKey) k.setKeyboard(this);});
			this.pagedKeys.forEach((p)=>p.forEach((k)=>{if(k instanceof ActionKey) k.setKeyboard(this);}));
		}

		getName(): string{
			return this.name;
		}

		getSymbol(): string{
			return this.symbol;
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
				Emojis.getSubGroup(content.group, content.subGroup).forEach((char)=>{
					keys.push(new CharKey(char));
				});
			});
			super(kdata.name, kdata.symbol, keys);
		}

	}

	export abstract class Key{
		public key: number;

		constructor(
			private name: string,
			private symbol: string
		){}

		getName(): string{
			return this.name;
		}
		getSymbol(): string{
			return this.symbol;
		}
	}

	export class CharKey extends Key{
		constructor(private char: Data.Emoji){
			super((char.name || char.fullName).toLowerCase(), char.symbol);
		}
	}

	export abstract class ActionKey extends Key{
		protected keyboard: Keyboard;

		constructor(
			name: string,
			symbol: string
		){
			super(name, symbol);
		}

		abstract act(view: View.IViewKey): void;

		setKeyboard(keyboard: Keyboard){
			this.keyboard = keyboard;
		}
	}

	export class KeyboardKey extends ActionKey{
		constructor(private target: Keyboard){
			super(target.getName(), target.getSymbol());
		}

		act(view: View.IViewKey){
			view.show(this.target);
		}

		setKeyboard(keyboard: Keyboard){
			super.setKeyboard(keyboard);
			this.target.setParent(keyboard);
		}
	}

	export class PageKey extends ActionKey{
		constructor(private page: number){
			super('page '+(page+1), ''+(page+1));
		}

		act(view: View.IViewKey){
			this.keyboard.setPage(this.page);
			view.refresh();
		}
	}

	export class BackKey extends ActionKey{
		constructor(){
			super('back', 'ESC');
		}

		act(view: View.IViewKey){
			if(this.keyboard.getParent()) view.show(this.keyboard.getParent());
		}
	}

	export class BlankKey extends Key{
		constructor(){
			super('', '');
		}
	}
}