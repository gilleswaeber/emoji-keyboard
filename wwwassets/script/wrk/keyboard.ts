/// <reference path="data.d.ts" />
/// <reference path="Emojis.ts" />
/// <reference path="../polyfills/codePoint.ts" />


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
				Emojis.getSubGroup(content.group, content.subGroup).forEach((char)=>{
					keys.push(new CharKey(char));
				});
			});
			super(kdata.name, kdata.symbol, keys, kdata.fallbackIcon);
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
		fillSymbol(symbolDiv: HTMLDivElement): HTMLDivElement{
			$(symbolDiv).text(this.symbol);
			return symbolDiv;
		}
	}

	export class CharKey extends Key{
		constructor(private char: Data.Emoji){
			super((char.name || char.fullName).toLowerCase(), char.symbol);
		}

		fillSymbol(symbolDiv: HTMLDivElement): HTMLDivElement{
			if(!this.char.fallbackIcon) return super.fillSymbol(symbolDiv);
			let symbol = this.getSymbol();
			let name = [];
			for(var i=0; i<symbol.length; i++){
				let c = symbol.codePointAt(i).toString(16);
				if(c != 'fe0f') name.push(c);
				if(symbol.charCodeAt(i) != symbol.codePointAt(i))i++;
			}
			$(symbolDiv).append($('<img>').attr('src', 'img/'+name.join('-')+'.svg'));
			return symbolDiv;
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

		fillSymbol(symbolDiv: HTMLDivElement): HTMLDivElement{
			if(!this.target.hasFallbackIcon()) return super.fillSymbol(symbolDiv);
			let symbol = this.getSymbol();
			let name = [];
			for(var i=0; i<symbol.length; i++){
				let c = symbol.codePointAt(i).toString(16);
				if(c != 'feof') name.push(c);
				if(symbol.charCodeAt(i) != symbol.codePointAt(i))i++;
			}
			$(symbolDiv).append($('<img>').attr('src', 'img/'+name.join('-')+'.svg'));
			return symbolDiv;
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
			super('back', '←');
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