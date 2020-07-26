declare function AHK(command: string, ...args: any[]): any;

function isAHK(): boolean {
	return typeof AHK !== 'undefined';
}

export function ahkTitle(title: string) {
	if (isAHK()) AHK("SetTitle", title);
	else document.title = title;
}

export function ahkReady() {
	if (isAHK()) AHK("Ready");
	else console.log("Ready");
}

export function ahkSend(symbol: string) {
	if (isAHK()) AHK("Send", symbol);
	else console.log("Send", symbol);
}

export function ahkSetSearch(state: boolean) {
	if (isAHK()) {
		AHK("SetSearch", state);
	} else {
		console.log("SetSearch", state);
		(window as any).document.ahk.setSearch(state);
	}
}
