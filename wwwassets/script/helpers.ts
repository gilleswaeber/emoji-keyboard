import {Dictionary} from "./data";

/** Mark as unreachable */
export function unreachable(x: never): never {
	console.error("Unexpected", x);
	throw new Error("Unexpected: " + x);
}

/** Class name builder */
export function cl(...args: (null|undefined|string|Dictionary<any>)[]) {
	return args.flatMap(a => {
		if (typeof a === "string") return a;
		if (a === null || a === undefined) return "";
		return Object.entries(a).map(([k, v]) => v ? k : "");
	}).join(' ');
}
