/// <reference path="../lib/jquery/jquery.d.ts" />


class Main{
	private jBase: JQuery;
	private view: View.View;

	constructor(
		private base: HTMLElement
	){
		this.jBase = $(base);
		this.jBase.empty();
		this.view = new View.View(base);
		this.view.show(Workers.Keyboards.getMainKeyboard());
	}

	input(key: number, shift: boolean = false){
		this.view.input(key, shift);
	}

	setKeymap(keymap: string){
		this.view.setKeymap(keymap);
	}
}


var main: Main;
$(document).ready(()=>{
	main = (<any>document).ahk = new Main(document.querySelector('main') as HTMLElement);
	setTimeout(()=>AHK("Ready"), 0);
});