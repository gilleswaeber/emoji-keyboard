import {useContext, useMemo} from "preact/hooks";
import {OSContext} from "../appVar";
import {charInfo, requiredOS} from "../unicodeInterface";
import {toCodePoints} from "../builder/builder";
import {GeneralCategory} from "../builder/unicode";
import {VarSel15} from "../chars";
import {cl} from "../helpers";
import {h} from "preact";

export function Symbol({symbol}: { symbol: string }) {
	const os = useContext(OSContext);
	return useMemo(() => {
		if ([...symbol].length == 1) {
			const info = charInfo(toCodePoints(symbol)[0]);
			if (info?.ca === GeneralCategory.Space_Separator || info?.ca === GeneralCategory.Format || info?.ca === GeneralCategory.Control) {
				return <div className="symbol s-space">{info.n}</div>
			} else if (info?.ca === GeneralCategory.Nonspacing_Mark) {
				symbol = '◌' + symbol;
			}
		}
		const req = requiredOS(symbol);
		// here we consider that symbol = 1 grapheme cluster
		// note that the browser doesn't apply the text-style selector by itself since the chars are in different fonts
		// also, we may need a fallback for a sequence so font-family fallback won't work either
		const fallbackFont = os.lt(req);
		const textStyle = symbol.endsWith(VarSel15);
		return <div className={cl(`symbol`, {fallbackFont, textStyle})}>
			{symbol}
		</div>
	}, [symbol, os]);
}
