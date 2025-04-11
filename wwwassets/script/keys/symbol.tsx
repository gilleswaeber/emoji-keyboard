import {useContext, useMemo} from "preact/hooks";
import {OSContext, PluginsContext} from "../appVar";
import {charInfo, symbolRequirements} from "../unicodeInterface";
import {toCodePoints} from "../builder/builder";
import {GeneralCategory} from "../builder/unicode";
import {VarSel15} from "../chars";
import {cl} from "../helpers";
import {KeyCap, SpriteRef} from "../config/boards";
import {Fragment, h} from "preact";
import {Version} from "../osversion";
import {supportsRequirements} from "../utils/emojiSupportTest";

function meetsRequirements(symbol: string, os: Version) {
	const req = symbolRequirements(symbol);
	return supportsRequirements(req, os);
}

export function Symbol({symbol}: { symbol: KeyCap }) {
	const os = useContext(OSContext);
	return useMemo(() => {
		if (typeof symbol === 'string') {
			if ([...symbol].length == 1) {
				const info = charInfo(toCodePoints(symbol)[0]);
				if (info?.ca === GeneralCategory.Space_Separator || info?.ca === GeneralCategory.Format || info?.ca === GeneralCategory.Control) {
					return <div className="symbol s-space">{info.n}</div>
				} else if (info?.ca === GeneralCategory.Nonspacing_Mark) {
					symbol = '◌' + symbol;
				}
			}
			// here we consider that symbol = 1 grapheme cluster
			// note that the browser doesn't apply the text-style selector by itself since the chars are in different fonts
			// also, we may need a fallback for a sequence so font-family fallback won't work either
			const fallbackFont = !meetsRequirements(symbol, os);
			const textStyle = symbol.endsWith(VarSel15);
			return <div className={cl(`symbol`, {fallbackFont, textStyle})}>
				{symbol}
			</div>
		} else {
			return <div className="symbol"><Sprite symbol={symbol}/></div>
		}
	}, [symbol, os]);
}

export function Sprite({symbol}: { symbol: SpriteRef }) {
	const plugins = useContext(PluginsContext);
	for (const plugin of plugins) {
		const spriteMap = plugin.data.spriteMaps?.[symbol.spriteMap];
		if (spriteMap && spriteMap.index[symbol.sprite]) {
			const scale = (spriteMap.width + 2 * (spriteMap.padding ?? 0)) / spriteMap.width;
			return <div className="sprite" style={{
				backgroundImage: `url("plugins/${spriteMap.path}")`,
				backgroundSize: `${spriteMap.cols * 100}%`,
				backgroundPosition: `${spriteMap.index[symbol.sprite].col / (spriteMap.cols - 1) * 100}% ${spriteMap.index[symbol.sprite].row / (spriteMap.rows - 1) * 100}%`,
				transform: `scale(${scale})`,
			}}/>
		}
	}
	return <Fragment>?</Fragment>;
}
