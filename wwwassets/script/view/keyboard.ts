/// <reference path="../../lib/jquery/jquery.d.ts" />
/// <reference path="../wrk/Keyboard.ts" />


module View{
	var LOCALES: {[locale: string]: {[id: number]: string}} = {};
	LOCALES['default'] = {
		0: '', 1: 'ESC', 59: 'F1', 60: 'F2', 61: 'F3', 62: 'F4', 63: 'F5', 64: 'F6', 65: 'F7', 66: 'F8', 67: 'F9', 68: 'F10', 87: 'F11', 88: 'F12',
		14: 'BKSP', 15: 'Tab', 58: 'Caps Lk', 28: 'Enter', 42: 'Shift', 29: 'CTRL', 91: 'WIN', 56: 'ALT',
		41: '`', 2: '1', 3: '2', 4: '3', 5: '4', 6: '5', 7: '6', 8: '7', 9: '8', 10: '9', 11: '0', 12: '-', 13: '=',
		16: 'q', 17: 'w', 18: 'e', 19: 'r', 20: 't', 21: 'y', 22: 'u', 23: 'i', 24: 'o', 25: 'p', 26: '[', 27: ']',
		30: 'a', 31: 's', 32: 'd', 33: 'f', 34: 'g', 35: 'h', 36: 'j', 37: 'k', 38: 'l', 39: ';', 40: '\'', 43: '\\',
		86: '\\', 44: 'z', 45: 'x', 46: 'c', 47: 'v', 48: 'b', 49: 'n', 50: 'm', 51: ',', 52: '.', 53: '/'
	};
	LOCALES['en-US'] = LOCALES['default'];
	LOCALES['fr-CH'] = _.extend({}, LOCALES['default'], {41: '§', 12: '\'', 13: '^', 21: 'z', 26: 'è', 27: '¨', 39: 'é', 40: 'à', 43: '$', 86: '<', 44: 'y', 51: ',', 52: '.', 53: '-'});
	LOCALES['de-CH'] = _.extend({}, LOCALES['fr-CH'], {26: 'ü', 39: 'ö', 40: 'ä'});

	var keysLocale: {[id: number]: string} = LOCALES['fr-CH'];
	const KEYS: number[] = [41, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
	const KEYMAP: number[][] = [
		[41, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
		[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
		[58, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43],
		[42, 86, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 0]
	];
	const BLANKKEY: Workers.BlankKey = new Workers.BlankKey();

	export class View implements IViewKey{
		private jBase: JQuery;
		private keyboard: Workers.Keyboard;
		private idxKeys: {[id: number]: Workers.Key};

		private jKeyboard: JQuery;

		constructor(
			private base: HTMLElement
		){
			this.jBase = $(base);
			this.jBase.empty();
			this.jKeyboard = $('<div class="keyboard">').appendTo(this.jBase);
		}

		show(keyboard: Workers.Keyboard): void{
			this.keyboard = keyboard;

			keyboard.setKeys(KEYS);

			this.refresh();
		}

		input(key: number): void{
			if(this.idxKeys[key]){
				var k = this.idxKeys[key]; 
				if(k instanceof Workers.ActionKey) k.act(this);
				else if(k instanceof Workers.CharKey) AHK("Send", k.getSymbol());
			}
		}

		refresh(): void{
			this.jKeyboard.empty();
			this.idxKeys = _.indexBy(this.keyboard.getVisible(), (key)=>key.key);
			KEYMAP.forEach((row)=>{
				var jRow = $('<div class="row">').appendTo(this.jKeyboard);
				row.forEach((keyCode)=>{
					BLANKKEY.key = keyCode;
					if(!this.idxKeys[keyCode]) jRow.append(this.showKey(BLANKKEY));
					else jRow.append(this.showKey(this.idxKeys[keyCode]));
				})
			})
		}

		private showKey(key: Workers.Key): JQuery{
			return $('<div class="key">')
				.append($('<div class="keyname">').text(keysLocale[key.key]))
				.append($('<div class="name">').text(key.getName()))
				.append($('<div class="symbol">').text(key.getSymbol()))
				.click(()=>{
					if(key instanceof Workers.ActionKey){
						key.act(this);
					}
					else if(key instanceof Workers.CharKey) AHK("Send", key.getSymbol());
				});
		}
	}

	export interface IViewKey{
		show(keyboard: Workers.Keyboard): void;
		refresh(): void;
	}
}