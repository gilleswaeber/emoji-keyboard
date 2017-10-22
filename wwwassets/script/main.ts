/// <reference path="../lib/jquery/jquery.d.ts" />


class Main{
	private view: View.BaseView;

	constructor(
		private base: HTMLElement
	){
		this.view = new View.BaseView(this.base);
		(<any>document).ahk = this.view;
	}
}

var main: Main;
$(document).ready(()=>{
	main = new Main(document.querySelector('main') as HTMLElement);
	setTimeout(()=>(new Wrk.AHKWrk()).ready(), 0);
});