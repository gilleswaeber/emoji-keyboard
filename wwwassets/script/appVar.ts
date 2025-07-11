import {createContext} from "preact";
import type {AppMode} from "./app";
import type {Board} from "./board";
import type {AppConfig} from "./config";
import {AnsiLayout, Layout, SystemLayoutUS} from "./layout";
import {Version} from "./osversion";
import {SlottedKeys} from "./boards/utils";
import {Plugin} from "./config/boards";

export interface AppActions {
	keyHandlers: SlottedKeys;

	setBoard(board: Board): void;

	setSearchText(searchText: string): void;

	/** Get current config. Inside Preact, use useContext(ConfigContext) instead. */
	getConfig(): AppConfig;

	updateConfig(config: Partial<AppConfig> | ((prev: AppConfig) => Partial<AppConfig>), save?: boolean): void;

	setPage(page: number): void;

	updateStatus(name?: string): void;

	setMode(mode: AppMode): void;

	back(): void;

	setBuilding(building: boolean): void;

	send(cluster: string, p: { noRecent?: boolean, variantOf?: string, alt: boolean }): void;
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
export const PluginsContext = createContext<Plugin[]>([]);
