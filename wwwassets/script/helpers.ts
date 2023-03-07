export declare type Dictionary<T> = { [key: string]: T };

/** Mark as unreachable */
export function unreachable(x: never): never {
	console.error("Unexpected", x);
	throw new Error("Unexpected: " + x);
}

/** Class name builder, e.g. for React */
export function cl(...args: (null|undefined|string|Dictionary<any>)[]) {
	return args.flatMap(a => {
		if (typeof a === "string") return a;
		if (a === null || a === undefined) return "";
		return Object.entries(a).map(([k, v]) => v ? k : "");
	}).join(' ');
}

type FromEntries<E extends readonly (readonly [keyof any, any])[]> = {
	[K in E[number][0]]: Extract<E[number], readonly [K, any]>[1]
};

/** Same as Object.fromEntries but properly typed */
export function fromEntries<T extends readonly (readonly [keyof any, any])[]>(entries: T): FromEntries<T> {
	const object: any = {};
	for (const [k, v] of entries) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
		object[k] = v;
	}
	return object as FromEntries<T>;
}
