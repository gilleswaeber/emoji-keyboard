module Workers{

	export abstract class Key{
		public key: number;
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

		getSymbolDiv(useFallback = false): HTMLDivElement{
			let container = $('<div class="symbol">');
			if(!useFallback)
				container.text(this.symbol);
			else{
				let symbol = this.getSymbol();
				let name = [];
				for(var i=0; i<symbol.length; i++){
					let c = symbol.codePointAt(i).toString(16);
					if(c != 'fe0f') name.push(c);
					if(symbol.charCodeAt(i) != symbol.codePointAt(i))i++;
				}
				container.append($('<img>').attr('src', 'img/'+name.join('-')+'.svg'));
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
			// Default: do nothing
		}
	}

	export class CharKey extends Key{
		constructor(private char: Data.Emoji){
			super((char.name || char.fullName).toLowerCase(), char.symbol);
		}

		getSymbolDiv(){
			 return super.getSymbolDiv(this.char.fallbackIcon);
		}

		act(){
			AHK("Send", this.getSymbol());
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
			return super.getSymbolDiv(this.target.hasFallbackIcon());
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