import {ConsolidatedUnicodeData} from "./builder/consolidated";
import {AppConfig} from "./config";

type HostObject = {
	downloadUnicode(callbackNumber: number): void;
	hide(): void;
	loaded(): void;
	openDevTools(): void;
	openLink(url: string): void;
	reload(): void;
	saveConfig(config: string): void;
	saveUnicodeData(data: string, types: string): void;
	send(text: string, mode: "clipboard" | "ctrl+v" | "shift+insert" | "raw"): void;
	setOpenAt(at: string): void;
	setOpacity(opacity: number): void;
	setTitle(title: string): void;
	setSearch(enable: boolean): void;
	setPosSize(x: number, y: number, width: number, height: number): void;
	ready(): void;
	versions(): {
		cldr: Promise<string>;
		emoji: Promise<string>;
		ucd: Promise<string>;
	}
};
export type AhkVersions = {
	cldr: string;
	ucd: string;
};
let AHK: HostObject | null = null;
if (typeof window !== "undefined") {
	(window as any).chrome?.webview?.hostObjects?.ahk.then((ahk: HostObject) => AHK = ahk);
}

function isAHK(): boolean {
	return AHK !== null;
}

let nextNumber = 0;

/**
 * Wait for a callback from the host application, only handles ok/error with message.
 * This system is necessary since all exchanges with the host application are asynchronous
 */
function waitForCallback(): [number, Promise<void>] {
	const c = nextNumber++;
	return [c, new Promise<void>((resolve, reject) => {
		const ok = `done,${c},`;
		const error = `error,${c},`;
		const listener = (e: MessageEvent) => {
			if (typeof e.data === 'string') {
				if (e.data.startsWith(ok)) {
					resolve();
					(window as any).chrome?.webview?.removeEventListener('message', listener);
				}
				if (e.data.startsWith(error)) {
					reject(e.data.substring(error.length));
					(window as any).chrome?.webview?.removeEventListener('message', listener);
				}
			}
		};
		(window as any).chrome?.webview?.addEventListener('message', listener);
		AHK!.downloadUnicode(c);
	})];
}

export async function ahkDownloadUnicode() {
	if (isAHK()) {
		const [c, p] = waitForCallback();
		setTimeout(() => AHK!.downloadUnicode(c), 10);
		return p;
	} else console.log("DownloadUnicode");
}

export function ahkHide() {
	if (isAHK()) AHK!.hide();
	else console.log("Hide");
}

export function ahkTitle(title: string) {
	if (isAHK()) AHK!.setTitle(title);
	else document.title = title;
}

export async function ahkVersions(): Promise<AhkVersions> {
	if (isAHK()) {
		const v = AHK!.versions();
		return {
			cldr: await v.cldr,
			ucd: await v.ucd,
		};
	} else {
		console.log("Versions");
		return Promise.reject("Not in AHK");
	}
}

export function ahkLoaded() {
	if (isAHK()) AHK!.loaded();
	else console.log("Loaded");
}

export function ahkReady() {
	if (isAHK()) AHK!.ready();
	else console.log("Ready");
}

export function ahkReload() {
	if (isAHK()) AHK!.reload();
	else document.location.reload();
}

export function ahkSend(text: string, mode: "clipboard" | "ctrl+v" | "shift+insert" | "raw") {
	if (isAHK()) AHK!.send(text, mode);
	else console.log("Send", text, mode);
}

export function ahkSetSearch(state: boolean) {
	if (isAHK()) AHK!.setSearch(state);
	else console.log("SetSearch", state);
}

export function ahkSaveConfig(config: AppConfig) {
	if (isAHK()) AHK!.saveConfig(JSON.stringify(config, null, 4));
	else console.log("SaveConfig", config);
}

export function ahkSaveUnicodeData(data: ConsolidatedUnicodeData) {
	if (isAHK()) {
		AHK!.saveUnicodeData(
			JSON.stringify(data),
			'export type UnicodeEmojiGroup = \n\t' + data.groups.flatMap(g => g.sub.flatMap(
				s => `{group: ${JSON.stringify(g.name)}, subGroup: ${JSON.stringify(s.name)}}`
			)).join('\n\t| ') + ';\n'
		);
	}
	else console.log("SaveUnicodeData", data);
}

export function ahkSetPosSize(x: number, y: number, width: number, height: number) {
	if (isAHK()) AHK!.setPosSize(x, y, width, height);
	else console.log("SetPosSize", x, y, width, height);
}

export function ahkSetOpenAt(at: string) {
	if (isAHK()) AHK!.setOpenAt(at);
	else console.log("SetOpenAt", at);
}

export function ahkSetOpacity(opacity: number) {
	if (isAHK()) AHK!.setOpacity(opacity);
	else console.log("SetOpacity", opacity);
}

export function ahkOpenDevTools() {
	if (isAHK()) AHK!.openDevTools();
	else console.log("OpenDevTools")
}

export function ahkOpenLink(url: string) {
	if (isAHK()) AHK!.openLink(url);
	else window.open(url);
}
