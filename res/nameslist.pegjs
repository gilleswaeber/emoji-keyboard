{{
	function dropNA(arr) {
		return arr.filter(e => e !== null && typeof e !== 'undefined')
	}

	function flatJoin(arr) {
		if (Array.isArray(arr)) {
			return dropNA(arr).map(e => flatJoin(e)).join('')
		} else {
			return arr
		}
	}

	function mergeInfo(info) {
		const merged = {}
		for (const e of dropNA(info)) {
			for (const [k, v] of Object.entries(e)) {
				if (typeof merged[k] === 'undefined') merged[k] = []
				if (Array.isArray(v)) merged[k].push(...v)
				else merged[k].push(v)
			}
		}
		return merged
	}

	function block(info) {
		const sub = []
		let current = []
		let name = "base"
		for (const e of dropNA(info)) {
			if (typeof e.sub !== 'undefined') {
				if (current.length) sub.push({name, ...mergeInfo(current)})
				current = []
				name = e.sub
			} else {
				current.push(e)
			}
		}
		if (current.length) sub.push({name, ...mergeInfo(current)})
		return sub
	}
}}

NAMELIST "NAMELIST"
	= title: TITLE_PAGE* block: EXTENDED_BLOCK* {return {title, block}}

TITLE_PAGE "TITLE_PAGE"
	= FILE_COMMENT* title: TITLE info:
		( subtitle: SUBTITLE {return {subtitle}}
		/ sub: SUBHEADER {return {sub}}
		/ IGNORED_LINE {}
		/ EMPTY_LINE {}
		/ notice: NOTICE_LINE {return {notice}}
		/ comment: COMMENT_LINE {return {comment}}
		/ PAGEBREAK {return {break: true}}
		/ FILE_COMMENT {})* {return {title, info: mergeInfo(info)}}


EXTENDED_BLOCK "EXTENDED_BLOCK"
	= block: BLOCK summary: SUMMARY? {return block}


BLOCK "BLOCK"
	= header: BLOCKHEADER INDEX_TAB? info:
		( char: CHAR_ENTRY {return {char}}
		/ sub: SUBHEADER  {return {sub}}
		/ ref: CROSS_REF {return {ref}}
		/ notice: NOTICE_LINE  {return {notice}}
		/ EMPTY_LINE {}
		/ IGNORED_LINE {}
		/ SIDEBAR_LINE {}
		/ PAGEBREAK {}
		/ FILE_COMMENT {})* {return {...header, sub: block(info)}}


CHAR_ENTRY "CHAR_ENTRY"
	= name: (NAME_LINE / RESERVED_LINE)
	info:
		( alias: ALIAS_LINE {return {alias}}
		/ falias: FORMALALIAS_LINE {return {falias}}
		/ ref: CROSS_REF {return {ref}}
		/ decomposition: DECOMPOSITION {return {decomposition}}
		/ compat: COMPAT_MAPPING {return {compat}}
		/ variation: VARIATION_LINE {return {variation}}
		/ notice: NOTICE_LINE {return {notice}}
		/ comment: COMMENT_LINE {return {comment}}
		/ IGNORED_LINE {}
		/ EMPTY_LINE {}
		/ FILE_COMMENT {})* {return {...name, ...mergeInfo(info)}}

SUMMARY "SUMMARY"
	= ALTGLYPH_SUMMARY
	/ VARIATION_SUMMARY
	/ ALTGLYPH_SUMMARY VARIATION_SUMMARY
	/ MIXED_SUMMARY

ALTGLYPH_SUMMARY "ALTGLYPH_SUMMARY"
	= ALTGLYPH_SUBHEADER SUMMARY_LINE*

VARIATION_SUMMARY "VARIATION_SUMMARY"
	= VARIATION_SUBHEADER SUMMARY_LINE*

MIXED_SUMMARY "MIXED_SUMMARY"
	= MIXED_SUBHEADER SUMMARY_LINE*

SUMMARY_LINE "SUMMARY_LINE"
	= SUBHEADER
	/ NOTICE_LINE
	/ FILE_COMMENT
	/ EMPTY_LINE

NAME_LINE "NAME_LINE"
	= code: CHAR TAB name: NAME LF {return {code, name}}
	/ code: CHAR TAB "<" cname: LCNAME ">" LF {return {code, name: "<" + cname + ">"}}
	/ code: CHAR TAB name: NAME SP COMMENT LF {return {code, name}}
	/ code: CHAR TAB "<" cname: LCNAME ">" SP COMMENT LF {return {code, name: "<" + cname + ">"}}

RESERVED_LINE "RESERVED_LINE"
	= code: CHAR TAB name: "<reserved>" LF {return {code, name}}

COMMENT_LINE "COMMENT_LINE"
	= TAB "*" SP text: EXPAND_LINE {return "• " + text}
	/ TAB text: EXPAND_LINE {return text}

ALIAS_LINE "ALIAS_LINE"
	= TAB "=" SP text: LINE {return text.split(/, /g)}

FORMALALIAS_LINE "FORMALALIAS_LINE"
	= TAB "%" SP text: NAME LF {return text}

CROSS_REF "CROSS_REF"
	= TAB "x" SP code: (
    	code: CHAR (SP "<" LCNAME ">" / LCNAME)? {return code}
		/ "(" ("<" LCNAME ">" / LCNAME) SP "-" SP code: CHAR ")" {return code}
	) LF {return code}

VARIATION_LINE "VARIATION_LINE"
	= TAB "~" SP code: CHAR SP sel: VARSEL SP name: LABEL LF {return {code, sel, name}}
	/ TAB "~" SP code: CHAR SP sel: VARSEL SP name: (LABEL "(" LCTAG ")") LF {return {code, sel, name: name.join('')}}

FILE_COMMENT "FILE_COMMENT"
	= ";" text: LINE {return ";" + text}

EMPTY_LINE "EMPTY_LINE"
	= LF

IGNORED_LINE "IGNORED_LINE"
	= TAB ";" LINE

SIDEBAR_LINE "SIDEBAR_LINE"
	= ";;" LINE

DECOMPOSITION "DECOMPOSITION"
	= TAB ":" SP "<" tag: TAG ">" SP seq: EXPAND_LINE {return {tag, seq}}
	/ TAB ":" SP seq: EXPAND_LINE {return {seq}}

COMPAT_MAPPING "COMPAT_MAPPING"
	= TAB "#" SP "<" tag: TAG ">" SP seq: EXPAND_LINE {return {tag, seq}}
	/ TAB "#" SP seq: EXPAND_LINE {return {seq}}

NOTICE_LINE "NOTICE_LINE"
	= "@+" TAB text: LINE {return text}
	/ "@+" TAB * SP text: LINE {return "• " + text}

TITLE "TITLE"
	= "@@@" TAB text: LINE {return text}

SUBTITLE "SUBTITLE"
	= "@@@+" TAB text: LINE {return text}

SUBHEADER "SUBHEADER"
	= "@" TAB text: LINE {return text}

VARIATION_SUBHEADER "VARIATION_SUBHEADER"
	= "@~" TAB LINE
	/ "@~"
	/ "@~" TAB "!"
	/ "@~" TAB "!" VARSEL_LIST
	/ "@~" TAB "!" VARSEL_LIST LINE

ALTGLYPH_SUBHEADER "ALTGLYPH_SUBHEADER"
	= "@@~" TAB LINE
	/ "@@~"
	/ "@@~" TAB "!"

MIXED_SUBHEADER "MIXED_SUBHEADER"
	= "@@@~" TAB LINE
	/ "@@@~"
	/ "@@@~" TAB "!"
	/ "@@@~" TAB "!" VARSEL_LIST
	/ "@@@~" TAB "!" VARSEL_LIST LINE

BLOCKHEADER "BLOCKHEADER"
	= "@@" TAB start: BLOCKSTART TAB name: BLOCKNAME TAB end: BLOCKEND LF {return {start, end, name}}

BLOCKNAME "BLOCKNAME"
	= text: (LABEL (SP "(" LABEL ")")?) {return flatJoin(text)}

BLOCKSTART "BLOCKSTART"
	= CHAR
BLOCKEND "BLOCKEND"
	= CHAR
PAGEBREAK "PAGEBREAK"
	= "@@" LF
INDEX_TAB "INDEX_TAB"
	= "@@+" LF

EXPAND_LINE "EXPAND_LINE"
	= text: (ESC_CHAR / CHAR / STRING)+ LF {return text.join('')}

LINE "LINE"
	= text: STRING LF {return text}
COMMENT "COMMENT"
	= "(" LABEL ")"
	/ "(" LABEL ")" SP "*"
	/ "*"

NAME "NAME"
	= text: ([A-Z]+([ -]+[A-Z0-9 -]+)*) {return flatJoin(text)} // <sequence of uppercase ASCII letters, digits, space and hyphen>
LCNAME "LCNAME"
	= text: ([a-z][a-z0-9]* ([ ][a-z][a-z0-9]* / [-] CHAR / [-][a-z0-9]+)*) {return flatJoin(text)}

TAG "TAG"
	= text: [a-zA-Z]+ {return text.join('')}
LCTAG "LCTAG"
	= text: [a-z]+ {return text.join('')}
STRING "STRING"
	= text: [\u0020-\u02FF]+ {return text.join('')} // except controls
LABEL "LABEL"
	= text: ([\u0021-\u0027\u002A-\u02FF]+([ -]+[\u0021-\u0027\u002A-\u002C\u002E-\u02FF]+)*) {
    	return flatJoin(text)}  // except controls, "(" or ")"
VARSEL "VARSEL"
	= CHAR
	/ code: ("ALT" [1-9]) {return code.join('')}
VARSEL_LIST "VARSEL_LIST"
	= "{" CHAR_LIST "}"
CHAR_LIST "CHAR_LIST"
	= CHAR (SP CHAR)*
CHAR "CHAR"
	= text:(X X X X X? X?) {return flatJoin(text)}
X "X"
	= [0-9A-F]
ESC_CHAR "ESC_CHAR"
	= ESC CHAR
ESC "ESC"
	= "\\"
TAB "TAB"
	= [\t]+
SP "SP"
	= [ ]
LF "LF"
	= [\r\n]+
