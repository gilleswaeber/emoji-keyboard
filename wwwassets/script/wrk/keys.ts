module Workers{

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

		getSymbolDiv(requiredVersion: string = null): HTMLDivElement{
			let container = $('<div class="symbol">');
			let useFallback = View.View.compareToOS(requiredVersion) <= 0;
			if(!useFallback)
				container.text(this.symbol);
			else{
				let symbol = this.getSymbol();
				let name: string[] = [];
				for(var i=0; i<symbol.length; i++){
					let c = symbol.codePointAt(i).toString(16);
					name.push(c);
					if(symbol.charCodeAt(i) != symbol.codePointAt(i))i++;
				}
				container.append($('<img>').attr('src', 'img/'+name.join('-')+'.svg').attr('alt', this.symbol));
			}
			return container.get(0) as HTMLDivElement;
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
			AHK("Send", this.getSymbol());
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

	export class BlankKey extends Key{
		constructor(){
			super('', '');
		}
	}
}