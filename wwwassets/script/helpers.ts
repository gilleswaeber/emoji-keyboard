/** Mark as unreachable */
export function unreachable(x: never): never {
	console.error("Unexpected", x);
	throw new Error("Unexpected: " + x);
}
