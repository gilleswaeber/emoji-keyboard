export class Version {
	private readonly version: number[];
	private readonly known = new Set<string | number>();
	private readonly knownLesser = new Set<string | number>();
	private readonly knownGreater = new Set<string | number>();
	private readonly knownSame = new Set<string | number>();

	public constructor(version: string) {
		this.version = Version.parse(version);
	}

	private static parse(v: string | number): number[] {
		if (typeof v === "number") {
			return [Math.floor(v), Math.floor((v % 1) * 10)];
		} else {
			if (!/^[.0-9]+$/.test(v.trim())) {
				console.error("Invalid version", v);
				return [0];
			}

			return v.split(/\./).map(part => parseInt(part, 10));
		}
	}

	private static compare(a: number[], b: number[]): number {
		for (let i = 0; i < a.length; i++) {
			if (i >= b.length) return a.slice(i).some((p) => p > 0) ? 1 : 0;

			if (a[i] > b[i]) return 1;
			if (a[i] < b[i]) return -1;
		}
		if (a.length == b.length) return 0;
		return b.slice(a.length).some((p) => p > 0) ? -1 : 0;
	}

	private add(other: string | number) {
		const cmp = Version.compare(this.version, Version.parse(other));
		this.known.add(other);

		if (cmp > 0) this.knownLesser.add(other);
		else if (cmp < 0) this.knownGreater.add(other);
		else this.knownSame.add(other);
	}

	/** < operator */
	public lt(other: string | number): boolean {
		if (!this.known.has(other)) this.add(other);
		return this.knownGreater.has(other);
	}

	/** > operator */
	public gt(other: string | number): boolean {
		if (!this.known.has(other)) this.add(other);
		return this.knownLesser.has(other);
	}

	/** ≥ operator */
	public gte(other: string | number): boolean {
		return !this.lt(other);
	}

	/** ≤ operator */
	public lte(other: string | number): boolean {
		return !this.gt(other);
	}

	/** == operator */
	public eq(other: string | number): boolean {
		if (!this.known.has(other)) this.add(other);
		return this.knownSame.has(other);
	}
}
