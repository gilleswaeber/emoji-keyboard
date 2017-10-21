/// <reference path="../wrk/keyboard.ts" />
/// <reference path="../wrk/keys.ts" />

module View{
	var defaultLocale = {
		0: '', 1: 'ESC', 59: 'F1', 60: 'F2', 61: 'F3', 62: 'F4', 63: 'F5', 64: 'F6', 65: 'F7', 66: 'F8', 67: 'F9', 68: 'F10', 87: 'F11', 88: 'F12',
		14: 'BKSP', 15: 'Tab', 58: 'Caps Lk', 28: 'Enter', 42: 'Shift', 29: 'CTRL', 91: 'WIN', 56: 'ALT',
		41: '`', 2: '1', 3: '2', 4: '3', 5: '4', 6: '5', 7: '6', 8: '7', 9: '8', 10: '9', 11: '0', 12: '-', 13: '=',
		16: 'q', 17: 'w', 18: 'e', 19: 'r', 20: 't', 21: 'y', 22: 'u', 23: 'i', 24: 'o', 25: 'p', 26: '[', 27: ']', 43: '\\',
		30: 'a', 31: 's', 32: 'd', 33: 'f', 34: 'g', 35: 'h', 36: 'j', 37: 'k', 38: 'l', 39: ';', 40: '\'',
		86: '\\', 44: 'z', 45: 'x', 46: 'c', 47: 'v', 48: 'b', 49: 'n', 50: 'm', 51: ',', 52: '.', 53: '/'
	};
	
	var os = [99];

	var keysLocale: {[id: number]: string} = defaultLocale;
	const KEYS: number[] = [41, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
	const KEYMAP: number[][] = [
		[41,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13], //, 59, 60, 61
		[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], //, 62, 63, 64
		[58, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43], //, 65, 66, 67
		[42, 86, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,  0]  //, 68, 87, 88
	];
	const BLANKKEY: Workers.BlankKey = new Workers.BlankKey();

	export class View implements IViewKey{
		private jBase: JQuery;
		private keyboard: Workers.Keyboard;
		private idxKeys: {[id: number]: Workers.Key};
		private title = "Emoji Keyboard";

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

			this.title = "Emoji Keyboard - " + this.toTitleCase(keyboard.getName());
			document.title = this.title;
			if(window.AHK) AHK("SetTitle", this.title);
		}

		input(key: number, shift: boolean): void{
			if(this.idxKeys[key]){
				if(!shift) this.idxKeys[key].act(this);
				else this.idxKeys[key].actAlternate(this);
			}
		}

		setKeymap(keymap: string): void{
			if(data.keymaps[keymap]){
				keysLocale = _.extend({}, defaultLocale, data.keymaps[keymap].keys);
				this.refresh();
			}
			else alert(keymap + " is not a valid keymap!\nValid keymaps are "+_.keys(data.keymaps).slice(1).join(", "));
		}
		
		setOS(_os: string): void{
			if(!/^[.0-9]+$/.test(_os)){
				console.error("Invalid OS version " + _os);
				return;
			}
			os = _os.split(/./).map(part => parseInt(part));
			this.refresh();
		}
		
		static compareToOS(os2: string): number{
			if(!/^[.0-9]+$/.test(os2)){
				console.error("Invalid version " + os2);
				return -1;
			}
			let vos2 = os2.split(/./).map(part => parseInt(part));
			
			for(let i=0; i<os.length; i++){
				if(i >= vos2.length) return -1;
				if(vos2[i] > os[i]) return 1;
				if(vos2[i] < os[i]) return -1;
			}
			if(vos2.length == os.length) return 0;
			else return 1;
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

		showStatus(str: string): void{
			if(!str.length) return this.hideStatus();
			document.title = this.title + ": " + this.toTitleCase(str);
			AHK("SetTitle", this.title + ": " + this.toTitleCase(str));
		}

		hideStatus(): void{
			document.title = this.title;
			AHK("SetTitle", this.title);
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
				//.mouseout(() => this.hideStatus());
		}

		private toTitleCase(str: string){
			return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	}

	export interface IViewKey{
		show(keyboard: Workers.Keyboard): void;
		refresh(): void;
	}
}