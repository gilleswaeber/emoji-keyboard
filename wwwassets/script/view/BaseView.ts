module View{

	export class BaseView{
		private view: View.View;

		private keyboardView: View.KeyboardView;
		private searchView: View.SearchView;

		constructor(
			private base: HTMLElement
		){
			this.keyboardView = new KeyboardView();
			this.keyboardView.show(Workers.Keyboards.getMainKeyboard());

			this.searchView = new SearchView();

			this.loadKeyboard();
		}

		public loadKeyboard(){
			$(this.base).children().detach();
			this.view = this.keyboardView;
			this.base.appendChild(this.view.getElement());
		}
		
		public loadSearch(){
			$(this.base).children().detach();
			this.view = this.searchView;
			this.base.appendChild(this.view.getElement());
		}
		
		input(key: number, shift: boolean = false){
			this.view.input(key, shift);
		}
		
		charInput(char: string){
			this.view.charInput(char);
		}

		setKeymap(keymap: string){
			this.keyboardView.setKeymap(keymap);
		}
		
		setOS(os: string){
			this.keyboardView.setOS(os);
		}
		
		setSearch(search: boolean){
			if(search){
				this.loadSearch();
			} else {
				this.loadKeyboard();
			}
		}
	}

	export abstract class View{
		abstract getElement(): HTMLElement;
		input(key: number, shift: boolean = false): void{}
		charInput(char: string): void{}
	}
}