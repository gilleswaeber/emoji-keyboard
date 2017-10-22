/// <reference path="AHKWrk.ts" />


module Workers{

	const ahk = new Wrk.AHKWrk();

	export abstract class Key{
		public key: number;
		public active: boolean = false;
		protected keyboard: Keyboard;

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

		getSymbolDiv(requiredVersion: string): HTMLDivElement{
			let container = $('<div class="symbol">');
			let useFallback = View.KeyboardView.compareToOS(requiredVersion) > 0;
			if(!useFallback)
				container.text(this.symbol);
			else{
				container.append($('<img>').attr('src', 'img/'+Key.toTwemojiFilename(this.getSymbol())).attr('alt', this.symbol));
			}
			return container.get(0) as HTMLDivElement;
		}

		static toTwemojiFilename(symbol: string){
			let name: string[] = [];
			for(var i=0; i<symbol.length; i++){
				let c = symbol.codePointAt(i).toString(16);
				name.push(c);
				if(symbol.charCodeAt(i) != symbol.codePointAt(i))i++;
			}
			let filename = name.join('-')+'.svg';
			if(filename.indexOf('200d') === -1) filename = filename.replace(/-fe0f/g, '');
			return filename;
		}
		
		setKeyboard(keyboard: Keyboard){
			this.keyboard = keyboard;
		}

		act(view: View.IViewKey): void{
			// Default: do nothing
		}

		actAlternate(view: View.IViewKey): void{
			this.act(view);
			// Default: do nothing
		}

		hasAlternate(): boolean{
			return false;
		}
	}

	export class CharKey extends Key{
		constructor(private char: Data.Emoji){
			super((char.name || char.fullName).toLowerCase(), char.symbol);
		}

		getSymbolDiv(){
			 return super.getSymbolDiv(this.char.requiredVersion);
		}

		act(){
			ahk.send(this.getSymbol());
		}

		actAlternate(view: View.IViewKey){
			if(!this.hasAlternate()) return this.act();
			let ak = new AlternatesKeyboard(this.keyboard, this.char);
			ak.setParent(this.keyboard);
			view.show(ak);
		}

		hasAlternate(): boolean{
			return !!this.char.alternates;
		}
	}

	export class KeyboardKey extends Key{
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

		getSymbolDiv(){
			return super.getSymbolDiv(this.target.getRequiredVersion());
		}
	}

	export class PageKey extends Key{
		constructor(private page: number){
			super('page '+(page+1), ''+(page+1));
		}

		act(view: View.IViewKey){
			this.keyboard.setPage(this.page);
			view.refresh();
		}
	}

	export class BackKey extends Key{
		constructor(){
			super('back', '←');
		}

		act(view: View.IViewKey){
			if(this.keyboard.getParent()) view.show(this.keyboard.getParent());
		}
	}

	export class SearchKey extends Key{
		constructor(){
			super('search', '🔎');
		}

		act(view: View.IViewKey){
			document.ahk.setSearch(true);
		}
	}

	export class BlankKey extends Key{
		constructor(){
			super('', '');
		}
	}
}