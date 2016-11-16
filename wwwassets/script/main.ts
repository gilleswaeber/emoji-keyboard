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

	input(key: number){
		this.view.input(key);
	}
}


var main: Main;
$(document).ready(()=>main = new Main(document.querySelector('main') as HTMLElement));

document.ahk = {input: (key: number)=>main.input(key)};