/// <reference path="BaseView.ts" />

module View{
	const KEYMAP: number[][] = [
		[41,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13], //, 59, 60, 61
	];
	const BLANKKEY: Workers.BlankKey = new Workers.BlankKey();
	const ESCAPE_REGEX = new RegExp('(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );
	var defaultLocale = {
		0: '', 1: 'ESC', 59: 'F1', 60: 'F2', 61: 'F3', 62: 'F4', 63: 'F5', 64: 'F6', 65: 'F7', 66: 'F8', 67: 'F9', 68: 'F10', 87: 'F11', 88: 'F12',
		14: 'BKSP', 15: 'Tab', 58: 'Caps Lk', 28: 'Enter', 42: 'Shift', 29: 'CTRL', 91: 'WIN', 56: 'ALT',
		41: '`', 2: '1', 3: '2', 4: '3', 5: '4', 6: '5', 7: '6', 8: '7', 9: '8', 10: '9', 11: '0', 12: '-', 13: '=',
		16: 'q', 17: 'w', 18: 'e', 19: 'r', 20: 't', 21: 'y', 22: 'u', 23: 'i', 24: 'o', 25: 'p', 26: '[', 27: ']', 43: '\\',
		30: 'a', 31: 's', 32: 'd', 33: 'f', 34: 'g', 35: 'h', 36: 'j', 37: 'k', 38: 'l', 39: ';', 40: '\'',
		86: '\\', 44: 'z', 45: 'x', 46: 'c', 47: 'v', 48: 'b', 49: 'n', 50: 'm', 51: ',', 52: '.', 53: '/'
	};
	var keysLocale: {[id: number]: string} = defaultLocale;

	export class SearchView extends View{
		private jBase: JQuery;
		private searchE: HTMLInputElement;
		private element: HTMLElement;
		private jKeyboard: JQuery;

		constructor(){
			super();
			this.jBase = $(this.element = document.createElement('div'));
			this.jBase.empty();
			this.element.classList.add('searchpane');
			this.jBase.append(
				this.searchE = $('<input type="search">').on('input properychange', () => this.refresh()).get(0) as HTMLInputElement
			).append(
				$('<button>').text("OK").click(() => document.ahk.setSearch(false))
			);
			this.jKeyboard = $('<div class="keyboard">').appendTo(this.jBase);
		}

		public getElement(){
			return this.element;
		}

		public charInput(key: string){
			this.searchE.value += key;
		}

		private escapeRegex(str: string): string{
			return str.replace(ESCAPE_REGEX, '\\$1');
		}

		private permute(permutation: string[]): string[][] {
			var length = permutation.length,
				result = [permutation.slice()],
				c = new Array(length).fill(0),
				i = 1, k, p;
			while (i < length) {
				if (c[i] < i) {
					k = i % 2 && c[i];
					p = permutation[i];
					permutation[i] = permutation[k];
					permutation[k] = p;
					++c[i];
					i = 1;
					result.push(permutation.slice());
				} else {
					c[i] = 0;
					++i;
				}
			}
			return result;
		}

		private searchKeys(){
			var sr = this.escapeRegex(this.searchE.value);
			//sr = this.permute(sr.split(/ /g).filter(s => s.length > 0)).map(prts => prts.join('.*')).join('|');
			console.log(sr);
			var re = new RegExp(sr, 'i');
			var results = data.emojis.filter(
				e => 
					re.test(e.fullName) ||
					re.test(e.name) ||
					(e.keywords && e.keywords.some(k => re.test(k)))
			);
			return results;
		}

		private showKey(key: Workers.Key): JQuery{
			var keyType = " action";
			if (key instanceof Workers.CharKey) { var keyType = " char"; }
			if (key instanceof Workers.BlankKey) { var keyType = " empty"; }
			if (key.getName() == "back") { var keyType = " back"; }
            return $('<div class="key' + keyType + (key.hasAlternate()?' alt':'') + (key.active?' active':'') + '">')
				.append($('<div class="keyname">').text(keysLocale[key.key]))
				.append($('<div class="name">').text(key.getName()))
				.append(key.getSymbolDiv(null))
				.click((e)=>{
					e.preventDefault();
					key.act(this);
				})
				.contextmenu((e)=>{
					e.preventDefault();
					key.actAlternate(this);
				})
		}

		private refresh(): void{
			var r = this.searchKeys(), i = 0;
			this.jKeyboard.empty();
			KEYMAP.forEach((row)=>{
				var jRow = $('<div class="row">').appendTo(this.jKeyboard);
				row.forEach((keyCode)=>{
					if(i < r.length){
						var k = new Workers.CharKey(r[i]);
						k.key = keyCode;
						jRow.append(this.showKey(k));
					}else{
						BLANKKEY.key = keyCode;
						jRow.append(this.showKey(BLANKKEY));
					}
					i++;
				})
			})
		}
	}
}