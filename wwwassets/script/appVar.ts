import {Board, SlottedKeys} from "./board";
import {AppConfig} from "./config";
import {AppMode} from "./app";
import {createContext} from "preact";
import {AnsiLayout, Layout, SystemLayoutUS} from "./layout";
import {Version} from "./osversion";

export interface AppActions {
	keyHandlers: SlottedKeys;

	setBoard(parent: Board): void;

	setSearchText(searchText: string): void;

	updateConfig(config: Partial<AppConfig>): void;

	setPage(page: number): void;

	updateStatus(name: string): void;

	setMode(mode: AppMode): void;

	back(): void;

	setBuilding(building: boolean): void;
}

let appVar: AppActions;

export function setApp(app: AppActions) {
	appVar = app;
}

export function app(): AppActions {
	return appVar;
}

export const LayoutContext = createContext<Layout>({...AnsiLayout, sys: SystemLayoutUS});
export const OSContext = createContext<Version>(new Version('99'));
export const ConfigContext = createContext<AppConfig>(undefined as any);
export const ConfigBuildingContext = createContext<boolean>(true);
export const SearchContext = createContext<string>('');
