/// <reference path="BaseView.ts" />
/// <reference path="../wrk/Emojis.ts" />

module View{

	import AHKWrk = Workers.AHKWrk;
	import Emojis = Workers.Emojis;

	const KEYMAP: number[][] = [
		[41,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13],
		[1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013],
		[1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026],
	];
	const KEYS: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026];
	const BLANKKEY = new Workers.BlankKey();
	const EXITKEY = new Workers.ExitSearchKey();

	export class SearchView extends View implements IViewKey{
		private jBase: JQuery;
		private searchE: HTMLInputElement;
		private element: HTMLElement;
		private idxKeys: {[id: number]: Workers.Key};
		private jKeyboard: JQuery;

		constructor(private baseView: BaseView){
			super();
			this.jBase = $(this.element = document.createElement('div'));
			this.jBase.empty();
			this.jBase.append(
				$('<div class="searchpane">').append(
					this.searchE = $('<input type="search">').attr('placeholder', 'Search…').on('input properychange', () => this.refresh()).get(0) as HTMLInputElement
				)
			);
			this.jKeyboard = $('<div class="keyboard">').appendTo(this.jBase);
			this.refresh();
		}

		public getElement(){
			return this.element;
		}

		public charInput(key: string){
			if(key == '%') return;
			this.searchE.value += key;
			setTimeout(() => this.refresh(), 0);
		}
		
		public input(key: number, shift: boolean){
			if(key == 15) this.baseView.loadKeyboard(); // Tab
			else if(key == 14){
				if (shift) this.searchE.value = '';
				else this.searchE.value = this.searchE.value.replace(/.$/, ''); // Backspace
				setTimeout(() => this.refresh(), 0);
			}
			else if(this.idxKeys[key]){
				if (!shift) this.idxKeys[key].act(this);
				else this.idxKeys[key].actAlternate(this);
			}
		}
		
		public showStatus(str: string): void{
			if(!str.length) return this.hideStatus();
			AHKWrk.setTitle("Emoji Keyboard - Search: " + this.toTitleCase(str));
		}

		hideStatus(): void{
			AHKWrk.setTitle("Emoji Keyboard - Search");
		}

		private showKey(key: Workers.Key): JQuery{
			var keyType = " action";
			if (key instanceof Workers.CharKey) { var keyType = " char"; }
			if (key instanceof Workers.BlankKey) { var keyType = " empty"; }
			if (key.getName() == "back") { var keyType = " back"; }
            return $('<div class="key' + keyType + (key.hasAlternate()?' alt':'') + (key.active?' active':'') + '">')
				.append($('<div class="keyname">').text(keysLocale[key.key]))
				.append($('<div class="name">').text(key.getName()))
				.append(key.getSymbolDiv())
				.click((e)=>{
					e.preventDefault();
					key.act(this);
				})
				.contextmenu((e)=>{
					e.preventDefault();
					key.actAlternate(this);
				})
				.mouseover(() => this.showStatus(key.getName()))
		}

		public refresh(): void{
			this.showStatus("");
			var r = Emojis.search(this.searchE.value), i = 0;
			this.idxKeys = {};
			this.idxKeys[41] = EXITKEY;
			for(var i = 0; i < KEYS.length && i < r.length; i++){
				this.idxKeys[KEYS[i]] = new Workers.CharKey(r[i]);
			}

			this.jKeyboard.empty();
			KEYMAP.forEach((row)=>{
				var jRow = $('<div class="row">').appendTo(this.jKeyboard);
				row.forEach((keyCode)=>{
					if(this.idxKeys[keyCode]){
						var k = this.idxKeys[keyCode];
						k.key = keyCode;
						jRow.append(this.showKey(k));
					}else{
						BLANKKEY.key = keyCode;
						jRow.append(this.showKey(BLANKKEY));
					}
				})
			});
		}
		
		private toTitleCase(str: string){
			return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}

		getBaseView(): BaseView {
			return this.baseView;
		}
		
		show(keyboard: Workers.Keyboard): void {
			throw new Error("Method not implemented.");
		}
	}
}