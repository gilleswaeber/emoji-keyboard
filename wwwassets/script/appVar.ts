import {Board, SlottedKeys} from "./board";
import {AppConfig, ConfigPage} from "./config";
import {AppMode} from "./app";
import {createContext} from "preact";
import {AnsiLayout, Layout} from "./layout";

export interface AppActions {
	keyHandlers: SlottedKeys;

	setBoard(parent: Board): void;

	setSearchBoard(searchBoard: Board): void;

	setConfigPage(configPage: ConfigPage): void;

	setSearchText(searchText: string): void;

	updateConfig(config: Partial<AppConfig>): void;

	setPage(page: number): void;

	updateStatus(name: string): void;

	setMode(mode: AppMode): void;

	back(): void;
}

let appVar: AppActions;
export function setApp(app: AppActions) {
	appVar = app;
}
export function app(): AppActions {
	return appVar;
}

export const LayoutContext = createContext<Layout>(AnsiLayout);
