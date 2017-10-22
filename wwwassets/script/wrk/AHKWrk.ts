module Wrk{

	declare function AHK(command: string, ...args: any[]): any;

	/**
	 * AHK Wrapper
	 */
	export class AHKWrk{

		private isAHK(): boolean{
			return typeof AHK !== 'undefined';
		}

		public setTitle(title: string){
			if(this.isAHK()) AHK("SetTitle", title);
			else document.title = title;
		}

		public ready(){
			if(this.isAHK()) AHK("Ready");
			else console.log("Ready");
		}

		public send(symbol: string){
			if(this.isAHK()) AHK("Send", symbol);
			else console.log("Send", symbol);
		}
	}
}