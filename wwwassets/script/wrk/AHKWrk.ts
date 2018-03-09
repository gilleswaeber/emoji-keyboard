module Workers{

	declare function AHK(command: string, ...args: any[]): any;

	/**
	 * AHK Wrapper
	 */
	export abstract class AHKWrk{

		private static isAHK(): boolean{
			return typeof AHK !== 'undefined';
		}

		public static setTitle(title: string){
			if(this.isAHK()) AHK("SetTitle", title);
			else document.title = title;
		}

		public static ready(){
			if(this.isAHK()) AHK("Ready");
			else console.log("Ready");
		}

		public static send(symbol: string){
			if(this.isAHK()) AHK("Send", symbol);
			else console.log("Send", symbol);
		}

		public static setSearch(state: boolean){
			if(this.isAHK()) AHK("SetSearch", state);
			else{
				console.log("SetSearch", state);
			}
		}
	}
}