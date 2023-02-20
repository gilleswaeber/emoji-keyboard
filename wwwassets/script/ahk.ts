type HostObject = {
	openDevTools(): void;
	saveConfig(config: string): void;
	send(text: string): void;
	setOpacity(opacity: number): void;
	setTitle(title: string): void;
	setSearch(enable: boolean): void;
	setSize(width: number, height: number): void;
	ready(): void;
};
let AHK: HostObject | null = null;
(window as any).chrome?.webview?.hostObjects?.ahk.then((ahk: HostObject) => AHK = ahk);

function isAHK(): boolean {
	return AHK !== null;
}

export function ahkTitle(title: string) {
	if (isAHK()) AHK!.setTitle(title);
	else document.title = title;
}

export function ahkReady() {
	if (isAHK()) AHK!.ready();
	else console.log("Ready");
}

export function ahkSend(symbol: string) {
	if (isAHK()) AHK!.send(symbol);
	else console.log("Send", symbol);
}

export function ahkSetSearch(state: boolean) {
	if (isAHK()) AHK!.setSearch(state);
	else console.log("SetSearch", state);
}

export function ahkSaveConfig(config: string) {
	if (isAHK()) AHK!.saveConfig(config);
	else console.log("SaveConfig", config)
}

export function ahkSetSize(width: number, height: number) {
	if (isAHK()) AHK!.setSize(width, height);
	else console.log("SetSize", width, height);
}

export function ahkSetOpacity(opacity: number) {
	if (isAHK()) AHK!.setOpacity(opacity);
	else console.log("SetOpacity", opacity);
}

export function ahkOpenDevTools() {
	if (isAHK()) AHK!.openDevTools();
	else console.log("OpenDevTools")
}