import {UnicodeEmojiGroup} from "../unidata";
import {SoftHyphen, ZeroWidthJoiner} from "../chars";
import {VK} from "../layout/vk";
import {SC} from "../layout/sc";

export type KeyboardItem = string | null | string[];
export type KeyboardContent =
	KeyboardItem
	| (UnicodeEmojiGroup & { from?: undefined })
	| { group?: undefined, from: string | number, to: string | number };
export type EmojiKeyboard = {
	name: string;
	symbol: string;
	content?: KeyboardContent[];
	byVK?: { [vk in VK]?: KeyboardItem }
	bySC?: { [sc in SC]?: KeyboardItem }
}
export const DEFAULT_KEYBOARDS: EmojiKeyboard[] = [
	{
		name: "Happy",
		symbol: "😀",
		content: [
			{group: "Smileys & Emotion", subGroup: "face-smiling"},
			{group: "Smileys & Emotion", subGroup: "face-affection"},
			{group: "Smileys & Emotion", subGroup: "face-tongue"},
			{group: "Smileys & Emotion", subGroup: "face-hand"},
			{group: "Smileys & Emotion", subGroup: "face-neutral-skeptical"},
			{group: "Smileys & Emotion", subGroup: "face-hat"},
			{group: "Smileys & Emotion", subGroup: "face-glasses"},
		]
	},
	{
		name: "Unwell",
		symbol: "😱",
		content: [
			{group: "Smileys & Emotion", subGroup: "face-sleepy"},
			{group: "Smileys & Emotion", subGroup: "face-unwell"},
			{group: "Smileys & Emotion", subGroup: "face-concerned"},
			{group: "Smileys & Emotion", subGroup: "face-negative"},
		]
	},
	{
		name: "Roles",
		symbol: "👻",
		content: [
			{group: "Smileys & Emotion", subGroup: "face-costume"},
			{group: "People & Body", subGroup: "person-fantasy"}
		]
	},
	{
		name: "Body",
		symbol: "👍",
		content: [
			{group: "People & Body", subGroup: "hand-fingers-open"},
			{group: "People & Body", subGroup: "hand-fingers-partial"},
			{group: "People & Body", subGroup: "hand-single-finger"},
			{group: "People & Body", subGroup: "hand-fingers-closed"},
			{group: "People & Body", subGroup: "hands"},
			{group: "People & Body", subGroup: "hand-prop"},
			{group: "People & Body", subGroup: "body-parts"},
		]
	},
	{
		name: "Gestures & activities",
		symbol: "💃",
		content: [
			{group: "People & Body", subGroup: "person-gesture"},
			{group: "People & Body", subGroup: "person-activity"},
			{group: "People & Body", subGroup: "person-resting"}
		]
	},
	{
		name: "Persons",
		symbol: "👤",
		content: [
			{group: "People & Body", subGroup: "person"},
			{group: "People & Body", subGroup: "person-role"},
			{group: "People & Body", subGroup: "person-symbol"}
		]
	},
	{
		name: "Emotions",
		symbol: "😺",
		content: [
			{group: "Smileys & Emotion", subGroup: "cat-face"},
			{group: "Smileys & Emotion", subGroup: "monkey-face"},
			{group: "Smileys & Emotion", subGroup: "heart"},
			{group: "Smileys & Emotion", subGroup: "emotion"}
		]
	},
	{
		name: "Families",
		symbol: "👪",
		content: [
			{group: "People & Body", subGroup: "family"}
		]
	},
	{
		name: "Clothing",
		symbol: "👖",
		content: [
			{group: "Objects", subGroup: "clothing"}
		]
	},
	{
		name: "Animals",
		symbol: "🐦",
		content: [
			{group: "Animals & Nature", subGroup: "animal-mammal"},
			{group: "Animals & Nature", subGroup: "animal-bird"},
			{group: "Animals & Nature", subGroup: "animal-amphibian"},
			{group: "Animals & Nature", subGroup: "animal-reptile"},
			{group: "Animals & Nature", subGroup: "animal-marine"},
			{group: "Animals & Nature", subGroup: "animal-bug"}
		]
	},
	{
		name: "Plants",
		symbol: "🌹",
		content: [
			{group: "Animals & Nature", subGroup: "plant-flower"},
			{group: "Animals & Nature", subGroup: "plant-other"}
		]
	},
	{
		name: "Raw food",
		symbol: "🥝",
		content: [
			{group: "Food & Drink", subGroup: "food-fruit"},
			{group: "Food & Drink", subGroup: "food-vegetable"},
			{group: "Food & Drink", subGroup: "food-marine"},
			{group: "Food & Drink", subGroup: "drink"},
			{group: "Food & Drink", subGroup: "dishware"}
		]
	},
	{
		name: "Cooked",
		symbol: "🌭",
		content: [
			{group: "Food & Drink", subGroup: "food-prepared"},
			{group: "Food & Drink", subGroup: "food-asian"},
			{group: "Food & Drink", subGroup: "food-sweet"}
		]
	},
	{
		name: "Places",
		symbol: "🏡",
		content: [
			{group: "Travel & Places", subGroup: "place-map"},
			{group: "Travel & Places", subGroup: "place-geographic"},
			{group: "Travel & Places", subGroup: "place-building"},
			{group: "Travel & Places", subGroup: "place-religious"},
			{group: "Travel & Places", subGroup: "place-other"},
			{group: "Travel & Places", subGroup: "hotel"}
		]
	},
	{
		name: "Vehicles",
		symbol: "🚗",
		content: [
			{group: "Travel & Places", subGroup: "transport-ground"}
		]
	},
	{
		name: "Ships",
		symbol: "✈",
		content: [
			{group: "Travel & Places", subGroup: "transport-air"},
			{group: "Travel & Places", subGroup: "transport-water"}
		]
	},
	{
		name: "Time",
		symbol: "⌛",
		content: [
			{group: "Travel & Places", subGroup: "time"}
		]
	},
	{
		name: "Weather",
		symbol: "⛅",
		content: [
			{group: "Travel & Places", subGroup: "sky & weather"}
		]
	},
	{
		name: "Sports",
		symbol: "🎽",
		content: [
			{group: "Activities", subGroup: "sport"},
			{group: "People & Body", subGroup: "person-sport"}
		]
	},
	{
		name: "Activities",
		symbol: "🎮",
		content: [
			{group: "Activities", subGroup: "event"},
			{group: "Activities", subGroup: "award-medal"},
			{group: "Activities", subGroup: "game"},
			{group: "Activities", subGroup: "arts & crafts"}
		]
	},
	{
		name: "Sound & light",
		symbol: "🎥",
		content: [
			{group: "Objects", subGroup: "sound"},
			{group: "Objects", subGroup: "music"},
			{group: "Objects", subGroup: "musical-instrument"},
			{group: "Objects", subGroup: "light & video"}
		]
	},
	{
		name: "Tech",
		symbol: "💻",
		content: [
			{group: "Objects", subGroup: "phone"},
			{group: "Objects", subGroup: "computer"},
			{group: "Objects", subGroup: "mail"},
		]
	},
	{
		name: "Paper & things",
		symbol: "📜",
		content: [
			{group: "Objects", subGroup: "book-paper"},
			{group: "Objects", subGroup: "money"},
			{group: "Objects", subGroup: "writing"},
			{group: "Objects", subGroup: "science"},
			{group: "Objects", subGroup: "medical"},
			{group: "Objects", subGroup: "household"},
			{group: "Objects", subGroup: "other-object"},
		]
	},
	{
		name: "Work",
		symbol: "💼",
		content: [
			{group: "Objects", subGroup: "office"},
			{group: "Objects", subGroup: "lock"},
			{group: "Objects", subGroup: "tool"}
		]
	},
	{
		name: "Signs",
		symbol: "⛔",
		content: [
			{group: "Symbols", subGroup: "transport-sign"},
			{group: "Symbols", subGroup: "warning"},
			{group: "Symbols", subGroup: "zodiac"}
		]
	},
	{
		name: "Symbols",
		symbol: "⚜",
		content: [
			{group: "Symbols", subGroup: "religion"},
			{group: "Symbols", subGroup: "gender"},
			{group: "Symbols", subGroup: "punctuation"},
			{group: "Symbols", subGroup: "currency"},
			{group: "Symbols", subGroup: "other-symbol"}
		]
	},
	{
		name: "Arrows",
		symbol: "↕",
		content: [
			{group: "Symbols", subGroup: "arrow"},
			{"from": "←", "to": "⇿"}
		]
	},
	{
		name: "Alphanum",
		symbol: "🔤",
		content: [
			{group: "Symbols", subGroup: "alphanum"}
		]
	},
	{
		name: "Geometric & keys",
		symbol: "🔷",
		content: [
			{group: "Symbols", subGroup: "keycap"},
			{group: "Symbols", subGroup: "geometric"},
			{group: "Symbols", subGroup: "av-symbol"}
		]
	},
	{
		name: "Country Flags",
		symbol: "🌐",
		content: [
			{group: "Flags", subGroup: "country-flag"}
		]
	},
	{
		name: "Flags",
		symbol: "🏁",
		content: [
			{group: "Flags", subGroup: "subdivision-flag"},
			{group: "Flags", subGroup: "flag"}
		]
	},
	{
		name: "Greek",
		symbol: "π",
		content: [
			"ϕ",
			"ϑ",
			"ϵ",
		],
		byVK: {
			[VK.A]: ["α", "Α"],
			[VK.B]: ["β", "Β"],
			[VK.C]: ["ψ", "Ψ"],
			[VK.D]: ["δ", "Δ"],
			[VK.E]: ["ε", "Ε"],
			[VK.F]: ["φ", "Φ"],
			[VK.G]: ["γ", "Γ"],
			[VK.H]: ["η", "Η"],
			[VK.I]: ["ι", "Ι"],
			[VK.J]: ["ξ", "Ξ"],
			[VK.K]: ["κ", "Κ"],
			[VK.L]: ["λ", "Λ"],
			[VK.M]: ["μ", "Μ"],
			[VK.N]: ["ν", "Ν"],
			[VK.O]: ["ο", "Ο"],
			[VK.P]: ["π", "Π"],
			[VK.Q]: ";",
			[VK.R]: ["ρ", "Ρ"],
			[VK.S]: ["σ", "Σ"],
			[VK.T]: ["τ", "Τ"],
			[VK.U]: ["θ", "Θ"],
			[VK.V]: ["ω", "Ω"],
			[VK.W]: ["ς", "ϐ"],
			[VK.X]: ["χ", "Χ"],
			[VK.Y]: ["υ", "Υ"],
			[VK.Z]: ["ζ", "Ζ"],
			[VK.Period]: "·",
		}
	},
	{
		name: "Boxes",
		symbol: "╚",
		bySC: {
			[SC.Digit1]: ["┌", "╔"],
			[SC.Digit2]: ["┬", "╦"],
			[SC.Digit3]: ["┐", "╗"],
			[SC.Q]: ["├", "╠"],
			[SC.W]: ["┼", "╬"],
			[SC.E]: ["┤", "╣"],
			[SC.A]: ["└", "╚"],
			[SC.S]: ["┴", "╩"],
			[SC.D]: ["┘", "╝"],
			[SC.Z]: ["│", "║"],
			[SC.X]: ["─", "═"],
			[SC.C]: "╳",

			[SC.Digit4]: ["┏", "┍", "┎"],
			[SC.Digit5]: ["┳", "┭", "┮", "┯", "┰", "┱", "┲"],
			[SC.Digit6]: ["┓", "┑", "┒"],
			[SC.R]: ["┣", "┝", "┞", "┟", "┠", "┡", "┢"],
			[SC.T]: ["╋", "┽", "┾", "┿", "╀", "╁", "╂", "╃", "╄", "╅", "╆", "╇", "╈", "╉", "╊"],
			[SC.Y]: ["┫", "┥", "┦", "┧", "┨", "┩", "┪"],
			[SC.F]: ["┗", "┕", "┖"],
			[SC.G]: ["┻", "┵", "┶", "┷", "┸", "┹", "┺"],
			[SC.H]: ["┛", "┙", "┚"],
			[SC.V]: ["┃", "┆", "┇", "┊", "┋", "╎", "╏", "╽", "╿"],
			[SC.B]: ["━", "┄", "┅", "┈", "┉", "╌", "╍", "╼", "╾"],
			[SC.N]: ["╴", "╸"],

			[SC.Digit7]: ["╒", "╓"],
			[SC.Digit8]: ["╤", "╥"],
			[SC.Digit9]: ["╕", "╖"],
			[SC.U]: ["╞", "╟"],
			[SC.I]: ["╪", "╫"],
			[SC.O]: ["╡", "╢"],
			[SC.J]: ["╘", "╙"],
			[SC.K]: ["╧", "╨"],
			[SC.L]: ["╛", "╜"],
			[SC.M]: ["╵", "╹"],
			[SC.Comma]: ["╷", "╻"],
			[SC.Period]: ["╶", "╺"],

			[SC.Digit0]: "╭",
			[SC.Minus]: "╮",
			[SC.P]: "╰",
			[SC.LeftBrace]: "╯",
			[SC.Semicolon]: "╱",
			[SC.Apostrophe]: "╲",
		}
	},
	{
		name: "Math",
		symbol: "∛",
		content: [
			// Opening and closing symbols
			[
				"√", // \sqrt(p)	radical
				"∛", // \cuberoot	cube root
				"∜", // \fourthroot	fourth root
				"⟌", // \longdivision	long division

				"⎷", // \sqrtbottom	radical symbol bottom
			],
			[
				"⌈", // \lceil(p)	left ceiling
				"⌜", // \ulcorner	upper left corner
			],
			[
				"⌉", // \rceil(p)	right ceiling
				"⌝", // \urcorner	upper right corner
			],
			[
				"⌊", // \lfloor(p)	left floor
				"⌞", // \llcorner	lower left corner
			],
			[
				"⌋", // \rfloor(p)	right floor
				"⌟", // \lrcorner	lower right corner
			],
			[
				"⎰", // \lmoustache(p)	upper left or lower right curly bracket section
				"⟅", // \lbag	left s-shaped bag delimiter
			],
			[
				"⎱", // \rmoustache(p)	upper right or lower left curly bracket section
				"⟆", // \rbag	right s-shaped bag delimiter
			],
			[
				"⟦", // \lBrack	mathematical left white square bracket
				"⟬", // \Lbrbrak	mathematical left white tortoise shell bracket
				"❲", // \lbrbrak	light left tortoise shell bracket ornament
				"⟮", // \lgroup(p)	mathematical left flattened parenthesis
				"⦗", // \lblkbrbrak	left black tortoise shell bracket
				"⦋", // \lbrackubar	left square bracket with underbar
				"⦍", // \lbrackultick	left square bracket with tick in top corner
				"⦏", // \lbracklltick	left square bracket with tick in bottom corner
			], [
				"⟧", // \rBrack	mathematical right white square bracket
				"⟭", // \Rbrbrak	mathematical right white tortoise shell bracket
				"⟯", // \rgroup(p)	mathematical right flattened parenthesis
				"⦘", // \rblkbrbrak	right black tortoise shell bracket
				"❳", // \rbrbrak	light right tortoise shell bracket ornament
				"⦌", // \rbrackubar	right square bracket with underbar
				"⦎", // \rbracklrtick	right square bracket with tick in bottom corner
				"⦐", // \rbrackurtick	right square bracket with tick in top corner
			],
			[
				"⟨", // \langle(p)	mathematical left angle bracket
				"⟪", // \lAngle	mathematical left double angle bracket
				"⦉", // \llangle	z notation left binding bracket
				"⦑", // \langledot	left angle bracket with dot
				"⦓", // \lparenless	left arc less-than bracket
				"⦕", // \Lparengtr	double left arc greater-than bracket
				"⧼", // \lcurvyangle	left pointing curved angle bracket
			],
			[
				"⟩", // \rangle(p)	mathematical right angle bracket
				"⟫", // \rAngle	mathematical right double angle bracket
				"⦊", // \rrangle	z notation right binding bracket
				"⦒", // \rangledot	right angle bracket with dot
				"⦔", // \rparengtr	right arc greater-than bracket
				"⦖", // \Rparenless	double right arc less-than bracket
				"⧽", // \rcurvyangle	right pointing curved angle bracket
			],
			[
				"⦃", // \lBrace	left white curly bracket
				"⦅", // \lParen	left white parenthesis
				"⦇", // \llparenthesis	z notation left image bracket

				"⎛", // \lparenuend	left parenthesis upper hook
				"⎜", // \lparenextender	left parenthesis extension
				"⎝", // \lparenlend	left parenthesis lower hook
				"⎡", // \lbrackuend	left square bracket upper corner
				"⎢", // \lbrackextender	left square bracket extension
				"⎣", // \lbracklend	left square bracket lower corner
				"⎧", // \lbraceuend	left curly bracket upper hook
				"⎨", // \lbracemid	left curly bracket middle piece
				"⎪", // \vbraceextender	curly bracket extension
				"⎩", // \lbracelend	left curly bracket lower hook
			],
			[
				"⦄", // \rBrace	right white curly bracket
				"⦆", // \rParen	right white parenthesis
				"⦈", // \rrparenthesis	z notation right image bracket

				"⎞", // \rparenuend	right parenthesis upper hook
				"⎟", // \rparenextender	right parenthesis extension
				"⎠", // \rparenlend	right parenthesis lower hook
				"⎤", // \rbrackuend	right square bracket upper corner
				"⎥", // \rbrackextender	right square bracket extension
				"⎦", // \rbracklend	right square bracket lower corner
				"⎫", // \rbraceuend	right curly bracket upper hook
				"⎬", // \rbracemid	right curly bracket middle piece
				"⎪", // \vbraceextender	curly bracket extension
				"⎭", // \rbracelend	right curly bracket lower hook
			],
			[
				"⧘", // \lvzigzag	left wiggly fence
				"⧚", // \Lvzigzag	left double wiggly fence
			], [
				"⧙", // \rvzigzag	right wiggly fence
				"⧛", // \Rvzigzag	right double wiggly fence
			],

			// Fences
			[
				"‖", // \Vert(p)	double vertical bar
				"⦀", // \Vvert	triple vertical bar delimiter
			],

			// Over and under symbols
			[
				"⏞", // \overbrace
				"⏜", // \overparen
				"⏠", // \overshell
				"⎴", // \overbracket
			],
			[
				"⏟", // \underbrace
				"⏝", // \underparen
				"⏡", // \undershell
				"⎵", // \underbracket
			],

			// Accents
			"̀", // "◌̀", \grave
			"́", // "◌́", \acute
			"̂", // "◌̂", \hat
			"̃", // "◌̃", \tilde
			[
				"\u0305", // \overbar
				"\u0304", // \bar
				"̿", // \Bar
			],
			"̌", // "◌̌", \check
			"̆", // "◌̆", \breve
			"\u0310", // \candra	candrabindu (non-spacing)
			"\u0312", // \oturnedcomma	combining turned comma above
			"\u0315", // \ocommatopright	combining comma above right
			"\u031A", // \droang	left angle above (non-spacing)
			[
				"̇", // "◌̇", \dot
				"̈", // "◌̈", \ddot
				"⃛", // "◌⃛", \dddot
				"\u20E8", // \threeunderdot combining triple underdot
				"⃜", // "◌⃜", \ddddot
			],
			"\u0309", // \ovhook	combining hook above
			"\u030A", // \ocirc	ring
			[
				"⃗", // "◌⃗", \vec
				"\u20D0", // \leftharpoonaccent	combining left harpoon above
				"⃑", // "◌⃑", \hvec
				"⃡", // "◌⃡", \tvec
			],
			"\u20D2", // \vertoverlay combing long vertical line overlay
			"\u20E7", // \annuity, combining annuity symbol
			"\u20E9", // \widebridgeabove	combining wide bridge above
			"\u20F0", // \asteraccent	combining asterisk above

			// Big operators
			[
				"∑", // \sum
				"⅀", // \Bbbsum	double-struck n-ary summation
				"⨊", // \modtwosum	modulo two sum

				"⨋", // \sumint	summation with integral

				"⎲", // \sumtop	summation top
				"⎳", // \sumbottom	summation bottom
			],
			[
				"∏", // \prod
				"∐", // \amalg, \coprod
			],
			[
				"∫", // \int
				"∬", // \iint
				"∭", // \iiint
				"⨌", // \iiiint	quadruple integral operator
				"∮", // \oint
				"∯", // \oiint
				"∰", // \oiiint
				"∱", // \intclockwise	clockwise integral
				"∲", // \coint, \varointclockwise	contour integral, clockwise
				"∳", // \aoint, \ointctrclockwise	contour integral, anticlockwise
				"⨍", // \intbar	finite part integral
				"⨎", // \intBar	integral with double stroke
				"⨏", // \fint	integral average with slash
				"⨐", // \cirfnint	circulation function
				"⨑", // \awint	anticlockwise integration
				"⨒", // \rppolint	line integration with rectangular path around pole
				"⨓", // \scpolint	line integration with semicircular path around pole
				"⨔", // \npolint	line integration not including the pole
				"⨕", // \pointint	integral around a point operator
				"⨖", // \sqint	quaternion integral operator
				"⨗", // \intlarhk integral with leftwards arrow with hook
				"⨘", // \intx integral with times sign
				"⨙", // \intcap integral with intersection
				"⨚", // \intcup integral with union
				"⨛", // \upint integral with overbar
				"⨜", // \lowint integral with underbar

				"⨋", // \sumint	summation with integral

				"⌠", // \inttop	top half integral
				"⎮", // \intextender	integral extension
				"⌡", // \intbottom	bottom half integral
			],
			[
				"⋀", // \bigwedge
				"⨇", // \conjquant	two logical and operator
			],
			[
				"⋁", // \bigvee
				"⨈", // \disjquant	two logical or operator
			],
			[
				"⋂", // \bigcap
				"⨅", // \bigsqcap(p)	n-ary square intersection operator
			],
			[
				"⋃", // \bigcup
				"⨃", // \bigcupdot	n-ary union operator with dot
				"⨄", // \biguplus
				"⨆", // \bigsqcup
			],
			[
				"⨝", // \Join join
				"⟗", // \fullouterjoin	full outer join
				"⟕", // \leftouterjoin	left outer join
				"⟖", // \rightouterjoin	right outer join
				"⨞", // \bigtriangleleft large left triangle operator
			],
			"⟘", //\bigbot	large up tack
			"⟙", //\bigtop	large down tack
			"⧸", // \xsol	big solidus
			"⧹", // \xbsol	big reverse solidus
			[
				"⨀", // \bigodot
				"⨁", // \bigoplus
				"⨂", // \bigotimes
			],
			"⨉", // \bigtimes	n-ary times operator
			"⨟", // \zcmp z notation schema composition
			"⨠", // \zpipe z notation schema piping
			"⨡", // \zproject z notation schema projection
			"⫼", // \biginterleave large triple vertical bar operator
			"⫿", // \bigtalloblong n-ary white vertical bar
			"𞻰", // \arabicmaj arabic mathematical operator meem with hah with tatweel
			"𞻱", // \arabichad arabic mathematical operator hah with dal

			// Binary relations
			[
				"±", // \pm(p)	plus-or-minus sign
				"∓", // \mp(p)	minus-or-plus sign
				"⩲", // \pluseqq	plus sign above equals sign
				"⩱", // \eqqplus	equals sign above plus sign
			],
			[
				"+", // \mathplus	plus sign b:
				"∔", // \dotplus(a)	plus sign, dot above
				"⨢", // \ringplus	plus sign with small circle above
				"⨣", // \plushat	plus sign with circumflex accent above
				"⨤", // \simplus	plus sign with tilde above
				"⨥", // \plusdot	plus sign with dot below
				"⨦", // \plussim	plus sign with tilde below
				"⨧", // \plussubtwo	plus sign with subscript two
				"⨨", // \plustrif	plus sign with black triangle
				"⧾", // \tplus	tiny
				"⧺", // \doubleplus	double plus
				"⧻", // \tripleplus	triple plus

				"⩲", // \pluseqq	plus sign above equals sign
				"⩱", // \eqqplus	equals sign above plus sign

				"⊕", // \oplus(p)	plus sign in circle
				"⨭", // \opluslhrim	plus sign in left half circle
				"⨮", // \oplusrhrim	plus sign in right half circle
				"⊞", // \boxplus(a)	plus sign in box
				"⨹", // \triangleplus	plus sign in triangle
			],
			[
				"−", // \minus	minus sign
				"∸", // \dotminus	minus sign, dot above
				"⨩", // \commaminus	minus sign with comma above
				"⨪", // \minusdot	minus sign with dot below
				"⨫", // \minusfdots	minus sign with falling dots
				"⨬", // \minusrdots	minus sign with rising dots
				"⧿", // \tminus	miny

				"⊖", // \ominus(p)	minus sign in circle
				"⊟", // \boxminus(a)	minus sign in box
				"⨺", // \triangleminus	minus sign in triangle
				"⟠", // \lozengeminus	lozenge divided by horizontal rule
			],
			[
				"⋅", // \cdot(p)	small middle dot
				"·", // \cdotp(p)	/centerdot b: middle dot
				"⋆", // \star(p)	small star, filled, low
				"•", // \smblkcircle	/bullet b: round bullet, filled
				"∙", // \vysmblkcircle	bullet operator

				"⊙", // \odot(p)	middle dot in circle
				"⊡", // \boxdot(a)	/dotsquare /boxdot b: small dot in box
				"◬", // \trianglecdot	triangle with centered dot
			],
			[
				"×", // \times(p)	multiply sign
				"⋉", // \ltimes(a)	times sign, left closed
				"⋊", // \rtimes(a)	times sign, right closed
				"⋋", // \leftthreetimes(a)	left semidirect product
				"⋌", // \rightthreetimes(a)	right semidirect product
				"⨯", // \vectimes	vector or cross product
				"⨰", // \dottimes	multiplication sign with dot above
				"⨱", // \timesbar	multiplication sign with underbar
				"⨲", // \btimes	semidirect product with bottom closed
				"⨳", // \smashtimes	smash product

				"⋇", // \divideontimes(a)	division on times

				"⊗", // \otimes(p)	multiply sign in circle
				"⨶", // \otimeshat	circled multiplication sign with circumflex accent
				"⨴", // \otimeslhrim	multiplication sign in left half circle
				"⨵", // \otimesrhrim	multiplication sign in right half circle
				"⨷", // \Otimes	multiplication sign in double circle
				"⊠", // \boxtimes(a)	multiply sign in box
				"⨻", // \triangletimes	multiplication sign in triangle
			],
			[
				"÷", // \div(p)	divide sign

				"⋇", // \divideontimes(a)	division on times

				"⨸", // \odiv	circled division sign
			],
			[
				"†", // \dagger(p)	dagger relation
				"‡", // \ddagger(p)	double dagger relation
			],
			"⁀", // \tieconcat	character tie, z notation sequence concatenation
			[
				"∕", // \divslash	division slash
				"⁄", // \fracslash	fraction slash
				"⫽", // \sslash	double solidus operator
				"⫻", // \trslash	triple solidus binary relation
				"⧶", // \dsol	solidus with overbar

				"⊘", // \oslash(p)	solidus in circle
				"⧄", // \boxdiag	squared rising diagonal slash
			],
			[
				"⧵", // \setminus(p)	reverse solidus operator
				"∖", // \smallsetminus(a)	small set minus (cf. reverse solidus)
				"⧷", // \rsolbar	reverse solidus with horizontal stroke
			],
			[
				"∗", // \ast(p)	centered asterisk

				"⊛", // \circledast(a)	asterisk in circle
				"⧆", // \boxast	squared asterisk
			],
			[
				"∘", // \vysmwhtcircle	composite function (small circle)

				"⊚", // \circledcirc(a)	small circle in circle
				"⧇", // \boxcircle	squared small circle
			],

			[
				"∧", // \wedge(p)	/wedge /land b: logical and
				"⊼", // \barwedge(a)	bar, wedge (large wedge)
				"⟑", // \wedgedot	and with dot
				"⋏", // \curlywedge(a)	curly logical and
				"⌅", // \varbarwedge	/barwedge b: logical and, bar above [projective (bar over small wedge)]
				"⌆", // \vardoublebarwedge	/doublebarwedge b: logical and, double bar above [perspective (double bar over small wedge)]
				"⩑", // \wedgeodot	logical and with dot above
				"⩚", // \wedgemidvert	logical and with middle stem
				"⩜", // \midbarwedge	ogical and with horizontal dash
				"⩞", // \doublebarwedge(a)	logical and with double overbar
				"⩟", // \wedgebar	logical and with underbar
				"⩠", // \wedgedoublebar	logical and with double underbar

				"⩘", // \bigslopedwedge	sloping large and
				"⩓", // \Wedge	double logical and
				"⩕", // \wedgeonwedge	two intersecting logical and
			],
			[
				"∨", // \vee(p)	/vee /lor b: logical or
				"⊻", // \veebar(a)	logical or, bar below (large vee); exclusive disjunction
				"⊽", // \barvee	bar, vee (large vee)
				"⟇", // \veedot	or with dot inside
				"⋎", // \curlyvee(a)	curly logical or
				"⩒", // \veeodot	logical or with dot above
				"⩛", // \veemidvert	logical or with middle stem
				"⩝", // \midbarvee	logical or with horizontal dash
				"⩡", // \varveebar	small vee with underbar
				"⩢", // \doublebarvee	logical or with double overbar
				"⩣", // \veedoublebar	logical or with double underbar

				"⩗", // \bigslopedvee	sloping large or
				"⩔", // \Vee	double logical or
				"⩖", // \veeonvee	two intersecting logical or
			],

			[
				"∩", // \cap(p)	intersection
				"⩀", // \capdot	intersection with dot
				"⩃", // \barcap	intersection with overbar
				"⩄", // \capwedge	intersection with logical and
				"⩋", // \twocaps	intersection beside and joined with intersection
				"⩍", // \closedvarcap	closed intersection with serifs

				"⩆", // \cupovercap	union above intersection
				"⩇", // \capovercup	intersection above union
				"⩈", // \cupbarcap	union above bar above intersection
				"⩉", // \capbarcup	intersection above bar above union

				"⋒", // \Cap(a)	/cap /doublecap b: double intersection
				"⊓", // \sqcap(p)	square intersection
				"⩎", // \Sqcap	double square intersection
			],
			[
				"∪", // \cup(p)	union or logical sum
				"⊌", // \cupleftarrow	multiset
				"⊍", // \cupdot	union, with dot
				"⊎", // \uplus(p)	plus sign in union
				"⩁", // \uminus	union with minus sign
				"⩂", // \barcup	union with overbar
				"⩅", // \cupvee	union with logical or
				"⩊", // \twocups	union beside and joined with union
				"⩌", // \closedvarcup	closed union with serifs
				"⩐", // \closedvarcupsmashprod	closed union with serifs and smash product

				"⩆", // \cupovercap	union above intersection
				"⩇", // \capovercup	intersection above union
				"⩈", // \cupbarcap	union above bar above intersection
				"⩉", // \capbarcup	intersection above bar above union

				"⋓", // \Cup(a)	/cup /doublecup b: double union
				"⊔", // \sqcup(p)	square union
				"⩏", // \Sqcup	double square union
			],

			"∾", // \invlazys	most positive [inverted lazy s]
			"≀", // \wr(p)	wreath product
			"⅋", // \upand	turned ampersand
			"⊺", // \intercal(a)	intercal
			[
				"⧖", // \hourglass	white hourglass
				"⧗", // \blackhourglass	black hourglass
			],
			"⧢", // \shuffle	shuffle product
			"⨾", // \fcmp	z notation relational composition
			"⨿", // \amalg(p)	amalgamation or coproduct
			[
				"⫴", // \interleave	triple vertical bar binary relation
				"⫵", // \nhVvert	triple vertical bar with horizontal stroke
			],
			"⫶", // \threedotcolon	triple colon operator
			"⫾", // \talloblong	white vertical bar

			// Ordinary symbols, \mathord
			"§", // \mathsection	section symbol
			[
				"¬", // \neg(p)	/neg /lnot not sign
				"⌐", // \invnot	reverse not
				"⨼", // \intprod	interior product
				"⨽", // \intprodr	righthand interior product
			],
			"¶", // \mathparagraph	paragraph symbol
			"Ƶ", // \Zbar	impedance (latin capital letter z with stroke)
			"϶", // \upbackepsilon	greek reversed lunate epsilon symbol
			"―", // \horizbar	horizontal bar
			"‗", // \twolowline	double low line (spacing)
			"‥", // \enleadertwodots	double baseline dot (en leader)
			"…", // \unicodeellipsis	ellipsis (horizontal)
			[
				"′", // \prime(p)	prime or minute, not superscripted
				"″", // \dprime	double prime or second, not superscripted
				"‴", // \trprime	triple prime (not superscripted)
				"⁗", // \qprime	quadruple prime, not superscripted
				"‵", // \backprime(a)	reverse prime, not superscripted
				"‶", // \backdprime	double reverse prime, not superscripted
				"‷", // \backtrprime	triple reverse prime, not superscripted
			],
			"‸", // \caretinsert	caret (insertion mark)
			"‼", // \Exclam	double exclamation mark
			"⁃", // \hyphenbullet	rectangle, filled (hyphen bullet)
			"⁇", // \Question	double question mark
			"€", // \euro	euro sign

			[
				"○", // \mdlgwhtcircle	medium large circle
				"⊕", // \oplus(p)	plus sign in circle
				"⊖", // \ominus(p)	minus sign in circle
				"⊙", // \odot(p)	middle dot in circle
				"⊗", // \otimes(p)	multiply sign in circle
				"⨶", // \otimeshat	circled multiplication sign with circumflex accent
				"⨸", // \odiv	circled division sign
				"⊘", // \oslash(p)	solidus in circle
				"⊛", // \circledast(a)	asterisk in circle
				"⊚", // \circledcirc(a)	small circle in circle

				"⚆", // \circledrightdot	white circle with dot right
				"⚈", // \blackcircledrightdot	black circle with white dot right
				"⚇", // \circledtwodots	white circle with two dots
				"⚉", // \blackcircledtwodots	black circle with two white dots
				"⊜", // \circledequal	equal in circle
				"⊝", // \circleddash(a)	hyphen in circle
				"⦵", // \circlehbar	circle with horizontal bar
				"⌽", // \obar	circle with vertical bar
				"⦶", // \circledvert	circled vertical bar
				"⦷", // \circledparallel	circled parallel
				"⦸", // \obslash	circled reverse solidus
				"⦹", // \operp	circled perpendicular
				"⧀", // \olessthan	circled less-than
				"⧁", // \ogreaterthan	circled greater-than
				"⦻", // \olcross	circle with superimposed x
				"⦼", // \odotslashdot	circled anticlockwise-rotated division sign
				"⦽", // \uparrowoncircle	up arrow through circle
				"⦾", // \circledwhitebullet	circled white bullet
				"⦿", // \circledbullet	circled bullet
				"⧂", // \cirscir	circle with small circle to the right
				"⧃", // \cirE	circle with two horizontal strokes to the right
				"⧬", // \circledownarrow	white circle with down arrow
				"⧭", // \blackcircledownarrow	black circle with down arrow
				"⧲", // \errbarcircle	error-barred white circle
				"⧳", // \errbarblackcircle	error-barred black circle

				"⃝", // \enclosecircle	combining enclosing circle

				"◍", // \circlevertfill	circle with vertical fill
				"◎", // \bullseye	bullseye
				"●", // \mdlgblkcircle	circle, filled
				"◐", // \circlelefthalfblack	circle, filled left half [harvey ball]
				"◑", // \circlerighthalfblack	circle, filled right half
				"◒", // \circlebottomhalfblack	circle, filled bottom half
				"◓", // \circletophalfblack	circle, filled top half
				"◔", // \circleurquadblack	circle with upper right quadrant black
				"◕", // \blackcircleulquadwhite	circle with all but upper left quadrant black
				"◖", // \blacklefthalfcircle	left half black circle
				"◗", // \blackrighthalfcircle	right half black circle
				"◴", // \circleulquad	white circle with upper left quadrant
				"◵", // \circlellquad	white circle with lower left quadrant
				"◶", // \circlelrquad	white circle with lower right quadrant
				"◷", // \circleurquad	white circle with upper right quadrant
				"◌", // \dottedcircle	dotted circle

				"◦", // \smwhtcircle	white bullet
				"⚬", // \mdsmwhtcircle	medium small white circle
				"⦁", // \mdsmblkcircle	z notation spot
				"⚪", // \mdwhtcircle	medium white circle
				"⚫", // \mdblkcircle	medium black circle
				"◯", // \lgwhtcircle	large circle
				"⬤", // \lgblkcircle	black large circle

				"◠", // \topsemicircle	upper half circle
				"◡", // \botsemicircle	lower half circle

				"◙", // \inversewhitecircle	inverse white circle
				"◚", // \invwhiteupperhalfcircle	upper half inverse white circle
				"◛", // \invwhitelowerhalfcircle	lower half inverse white circle

				"⬭", // \whthorzoval	white horizontal ellipse
				"⬬", // \blkhorzoval	black horizontal ellipse
				"⬯", // \whtvertoval	white vertical ellipse
				"⬮", // \blkvertoval	black vertical ellipse
			],
			[
				"△", // \bigtriangleup(p)	big up triangle, open
				"▲", // \bigblacktriangleup	black up-pointing triangle
				"⨹", // \triangleplus	plus sign in triangle
				"⨺", // \triangleminus	minus sign in triangle
				"◬", // \trianglecdot	triangle with centered dot
				"⨻", // \triangletimes	multiplication sign in triangle

				"⟁", // \whiteinwhitetriangle	white triangle containing small white triangle
				"⧊", // \triangleodot	triangle with dot above
				"⧋", // \triangleubar	triangle with underbar
				"⧌", // \triangles	s in triangle

				"◭", // \triangleleftblack	up-pointing triangle with left half black
				"◮", // \trianglerightblack	up-pointing triangle with right half black
				"▴", // \blacktriangle(a)	up triangle, filled

				"⧍", // \triangleserifs	triangle with serifs at bottom

				"⃤", // \enclosetriangle	combining enclosing upward pointing triangle

				"▽", // \bigtriangledown(p)	big down triangle, open
				"▼", // \bigblacktriangledown	big down triangle, filled

				"⧨", // \downtriangleleftblack	down-pointing triangle with left half black
				"⧩", // \downtrianglerightblack	down-pointing triangle with right half

				"▿", // \triangledown(a)	down triangle, open
				"▾", // \blacktriangledown(a)	down triangle, filled

				"◁", // \triangleleft(p)	(large) left triangle, open; z notation domain restriction
				"◀", // \blacktriangleleft(a)	(large) left triangle, filled
				"⩤", // \dsub	z notation domain antirestriction

				"◃", // \smalltriangleleft	left triangle, open
				"◂", // \smallblacktriangleleft	left triangle, filled

				"▷", // \triangleright(p)	(large) right triangle, open; z notation range restriction
				"▶", // \blacktriangleright(a)	(large) right triangle, filled
				"⩥", // \rsub	z notation range antirestriction

				"▹", // \smalltriangleright	right triangle, open
				"▸", // \smallblacktriangleright	right triangle, filled

				"▻", // \whitepointerright	white right-pointing pointer
				"►", // \blackpointerright	black right-pointing pointer

				"◿", // \lrtriangle	lower right triangle
				"⊿", // \varlrtriangle	right triangle
				"◢", // \lrblacktriangle	lower right triangle, filled
				"◺", // \lltriangle	lower left triangle
				"◣", // \llblacktriangle	lower left triangle, filled
				"◸", // \ultriangle	upper left triangle
				"◤", // \ulblacktriangle	upper left triangle, filled
				"◹", // \urtriangle	upper right triangle
				"◥", // \urblacktriangle	upper right triangle, filled
			],
			[
				"◻", // \mdwhtsquare	white medium square
				"◼", // \mdblksquare	black medium square

				"⊞", // \boxplus(a)	plus sign in box
				"⊟", // \boxminus(a)	minus sign in box
				"⊠", // \boxtimes(a)	multiply sign in box
				"⧄", // \boxdiag	squared rising diagonal slash
				"⧆", // \boxast	squared asterisk
				"⧇", // \boxcircle	squared small circle

				"⟤", // \whitesquaretickleft	white square with leftwards tick
				"⟥", // \whitesquaretickright	white square with rightwards tick
				"⧅", // \boxbslash	squared falling diagonal slash
				"⧈", // \boxbox	squared square
				"◫", // \boxbar	vertical bar in box

				"⃞", // \enclosesquare	combining enclosing square

				"■", // \mdlgblksquare	square, filled
				"□", // \mdlgwhtsquare	square, open
				"▢", // \squoval	white square with rounded corners
				"▣", // \blackinwhitesquare	white square containing black small square
				"▤", // \squarehfill	square, horizontal rule filled
				"▥", // \squarevfill	square, vertical rule filled
				"▦", // \squarehvfill	square with orthogonal crosshatch fill
				"▧", // \squarenwsefill	square, nw-to-se rule filled
				"▨", // \squareneswfill	square, ne-to-sw rule filled
				"▩", // \squarecrossfill	square with diagonal crosshatch fill
				"◧", // \squareleftblack	square, filled left half
				"◨", // \squarerightblack	square, filled right half
				"◩", // \squareulblack	square, filled top left corner
				"◪", // \squarelrblack	square, filled bottom right corner
				"⬒", // \squaretopblack	square with top half black
				"⬓", // \squarebotblack	square with bottom half black
				"⬔", // \squareurblack	square with upper right diagonal half black
				"⬕", // \squarellblack	square with lower left diagonal half black
				"◰", // \squareulquad	white square with upper left quadrant
				"◱", // \squarellquad	white square with lower left quadrant
				"◲", // \squarelrquad	white square with lower right quadrant
				"◳", // \squareurquad	white square with upper right quadrant
				"⬚", // \dottedsquare	dotted square

				"⬞", // \vysmwhtsquare	white very small square
				"⬝", // \vysmblksquare	black very small square
				"▫", // \smwhtsquare	white small square
				"▪", // \smblksquare	/blacksquare - sq bullet, filled
				"◽", // \mdsmwhtsquare	white medium small square
				"◾", // \mdsmblksquare	black medium small square
				"⬜", // \lgwhtsquare	white large square
				"⬛", // \lgblksquare	black large square
			],
			[
				"▯", // \vrectangle	rectangle, white (vertical)
				"▮", // \vrectangleblack	black vertical rectangle
				"▭", // \hrectangle	horizontal rectangle, open
				"▬", // \hrectangleblack	black rectangle
				"▱", // \parallelogram	parallelogram, open
				"▰", // \parallelogramblack	black parallelogram
				"⏢", // \trapezium	white trapezium
				"⏥", // \fltns	flatness

				"⍓", // \APLboxupcaret	boxed up caret
				"⍰", // \APLboxquestion	boxed question mark
			],
			[
				"◇", // \mdlgwhtdiamond	white diamond; diamond, open
				"◆", // \mdlgblkdiamond	black diamond
				"⟐", // \diamondcdot	white diamond with centred dot
				"⟠", // \lozengeminus	lozenge divided by horizontal rule

				"⟡", // \concavediamond	white concave-sided diamond
				"⟢", // \concavediamondtickleft	white concave-sided diamond with leftwards tick
				"⟣", // \concavediamondtickright	white concave-sided diamond with rightwards tick
				"⧪", // \blackdiamonddownarrow	black diamond with down arrow
				"⧰", // \errbardiamond	error-barred white diamond
				"⧱", // \errbarblackdiamond	error-barred black diamond

				"◈", // \blackinwhitediamond	white diamond containing black small diamond
				"⬖", // \diamondleftblack	diamond with left half black
				"⬗", // \diamondrightblack	diamond with right half black
				"⬘", // \diamondtopblack	diamond with top half black
				"⬙", // \diamondbotblack	diamond with bottom half black

				"⃟", // \enclosediamond	combining enclosing diamond

				"⌑", // \sqlozenge	square lozenge
				"⋄", // \smwhtdiamond	white diamond
				"⬩", // \smblkdiamond	black small diamond
				"⬫", // \smwhtlozenge	white small lozenge
				"⬪", // \smblklozenge	black small lozenge
				"⬦", // \mdwhtdiamond	white medium diamond
				"⬥", // \mdblkdiamond	black medium diamond
				"⬨", // \mdwhtlozenge	white medium lozenge
				"⬧", // \mdblklozenge	black medium lozenge
				"◊", // \mdlgwhtlozenge	lozenge or total mark
				"⧫", // \mdlgblklozenge	black lozenge
			],
			[
				"⬠", // \pentagon	white pentagon
				"⬟", // \pentagonblack	black pentagon
				"⭔", // \rightpentagon	white right-pointing pentagon
				"⭓", // \rightpentagonblack	black right-pointing pentagon
			],
			[
				"⎔", // \hexagon	horizontal benzene ring [hexagon flat open]
				"⬣", // \hexagonblack	horizontal black hexagon
				"⬡", // \varhexagon	white hexagon
				"⬢", // \varhexagonblack	black hexagon
				"⌬", // \varhexagonlrbonds	six carbon ring, corner down, double bonds lower right etc
			],

			"ℇ", // \Eulerconst	euler constant
			"ℎ", // \Planckconst	planck constant
			"℧", // \mho	conductance
			"Ⅎ", // \Finv(a)	turned capital f
			"ℼ", // \Bbbpi	double-struck small pi
			"⅁", // \Game(a)	turned sans-serif capital g
			"⅂", // \sansLturned	turned sans-serif capital l
			"⅃", // \sansLmirrored	reversed sans-serif capital l
			"⅄", // \Yup	turned sans-serif capital y

			"⅊", // \PropertyLine	property line
			"↨", // \updownarrowbar	up down arrow with base (perpendicular)
			"↴", // \linefeed	rightwards arrow with corner downwards
			"↵", // \carriagereturn	downwards arrow with corner leftward = carriage return
			"↸", // \barovernorthwestarrow	north west arrow to long bar
			"↹", // \barleftarrowrightarrowbar	leftwards arrow to bar over rightwards arrow to bar
			"↺", // \acwopencirclearrow	anticlockwise open circle arrow
			"↻", // \cwopencirclearrow	clockwise open circle arrow
			"⇞", // \nHuparrow	upwards arrow with double stroke
			"⇟", // \nHdownarrow	downwards arrow with double stroke
			"⇠", // \leftdasharrow	leftwards dashed arrow
			"⇡", // \updasharrow	upwards dashed arrow
			"⇢", // \rightdasharrow	rightwards dashed arrow
			"⇣", // \downdasharrow	downwards dashed arrow
			"⇦", // \leftwhitearrow	leftwards white arrow
			"⇧", // \upwhitearrow	upwards white arrow
			"⇨", // \rightwhitearrow	rightwards white arrow
			"⇩", // \downwhitearrow	downwards white arrow
			"⇪", // \whitearrowupfrombar	upwards white arrow from bar
			"∀", // \forall(p)	for all
			"∁", // \complement(a)	complement sign
			"∃", // \exists(p)	at least one exists
			"∄", // \nexists(a)	negated exists
			"∅", // \varnothing(a)	circle, slash
			"∆", // \increment	laplacian (delta; nabla^2)
			"∎", // \QED	end of proof
			"√", // \surd(p)	radical
			[
				"∞", // \infty(p)	infinity
				"⧜", // \iinfin	incomplete infinity
				"⧝", // \tieinfty	tie over infinity
				"⧞", // \nvinfty	infinity negated with vertical bar
			],
			[
				"∠", // \angle(p)	angle
				"∟", // \rightangle	right (90 degree) angle
				"∡", // \measuredangle(a)	angle-measured
				"∢", // \sphericalangle(a)	angle-spherical
				"⊾", // \measuredrightangle	right angle-measured [with arc]
				"⟀", // \threedangle	three dimensional angle
				"⦛", // \measuredangleleft	measured angle opening left
				"⦜", // \rightanglesqr	right angle variant with square
				"⦝", // \rightanglemdot	measured right angle with dot
				"⦞", // \angles	angle with s inside
				"⦟", // \angdnr	acute angle
				"⦠", // \gtlpar	spherical angle opening left
				"⦡", // \sphericalangleup	spherical angle opening up
				"⦢", // \turnangle	turned angle
				"⦣", // \revangle	reversed angle
				"⦤", // \angleubar	angle with underbar
				"⦥", // \revangleubar	reversed angle with underbar
				"⦦", // \wideangledown	oblique angle opening up
				"⦧", // \wideangleup	oblique angle opening down
				"⦨", // \measanglerutone	measured angle with open arm ending in arrow pointing up and right
				"⦩", // \measanglelutonw	measured angle with open arm ending in arrow pointing up and left
				"⦪", // \measanglerdtose	measured angle with open arm ending in arrow pointing down and right
				"⦫", // \measangleldtosw	measured angle with open arm ending in arrow pointing down and left
				"⦬", // \measangleurtone	measured angle with open arm ending in arrow pointing right and up
				"⦭", // \measangleultonw	measured angle with open arm ending in arrow pointing left and up
				"⦮", // \measangledrtose	measured angle with open arm ending in arrow pointing right and down
				"⦯", // \measangledltosw	measured angle with open arm ending in arrow pointing left and down
			],
			"∴", // \therefore(a)	therefore
			"∵", // \because(a)	because
			[
				"∿", // \sinewave	sine wave
				"⏦", // \accurrent	ac current
			],
			"⊤", // \top(p)	top
			"⊥", // \bot(p)	bottom
			"⊹", // \hermitmatrix	hermitian conjugate matrix
			"⋯", // \unicodecdots	three dots, centered
			"⌀", // \diameter	diameter sign
			"⌂", // \house	house
			"⌒", // \profline	profile of a line
			"⌓", // \profsurf	profile of a surface
			"⌗", // \viewdata	viewdata square
			"⌙", // \turnednot	turned not sign
			"⌲", // \conictaper	conical taper
			"⌶", // \topbot	top and bottom
			"⍀", // \APLnotbackslash	apl functional symbol backslash bar
			"⍼", // \rangledownzigzagarrow	right angle with downwards zigzag arrow
			"⎯", // \harrowextender	horizontal line extension (used to extend arrows)
			"⎶", // \bbrktbrk	bottom square bracket over top square bracket
			"⎸", // \lvboxline	left vertical box line
			"⎹", // \rvboxline	right vertical box line
			"⏎", // \varcarriagereturn	return symbol
			"⏠", // \obrbrak	top tortoise shell bracket (mathematical use)
			"⏡", // \ubrbrak	bottom tortoise shell bracket (mathematical use)
			"⏣", // \benzenr	benzene ring with circle
			"⏤", // \strns	straightness
			"⏧", // \elinters	electrical intersection
			"␢", // \blanksymbol	blank symbol
			"␣", // \mathvisiblespace	open box
			"┆", // \bdtriplevdash	doubly broken vert
			[
				"▀", // \blockuphalf	upper half block
				"▄", // \blocklowhalf	lower half block
				"█", // \blockfull	full block
				"▌", // \blocklefthalf	left half block
				"▐", // \blockrighthalf	right half block
				"░", // \blockqtrshaded	25% shaded block
				"▒", // \blockhalfshaded	50% shaded block
				"▓", // \blockthreeqtrshaded	75% shaded block
			],
			"◄", // \blackpointerleft	black left-pointing pointer
			"◅", // \whitepointerleft	white left-pointing pointer
			"◉", // \fisheye	fisheye
			"◘", // \inversebullet	inverse bullet
			"◜", // \ularc	upper left quadrant circular arc
			"◝", // \urarc	upper right quadrant circular arc
			"◞", // \lrarc	lower right quadrant circular arc
			"◟", // \llarc	lower left quadrant circular arc
			"★", // \bigstar(a)	star, filled
			"☆", // \bigwhitestar	star, open
			"☉", // \astrosun	sun
			"☡", // \danger	dangerous bend (caution sign)
			"☻", // \blacksmiley	black smiling face
			"☼", // \sun	white sun with rays
			"☽", // \rightmoon	first quarter moon
			"☾", // \leftmoon	last quarter moon
			"♀", // \female	venus, female
			"♂", // \male	mars, male
			"♠", // \spadesuit(p)	spades suit symbol
			"♡", // \heartsuit(p)	heart suit symbol
			"♢", // \diamondsuit(p)	diamond suit symbol
			"♣", // \clubsuit(p)	club suit symbol
			"♤", // \varspadesuit	spade, white (card suit)
			"♥", // \varheartsuit	filled heart (card suit)
			"♦", // \vardiamondsuit	filled diamond (card suit)
			"♧", // \varclubsuit	club, white (card suit)
			"♩", // \quarternote	music note (sung text sign)
			"♪", // \eighthnote	eighth note
			"♫", // \twonotes	beamed eighth notes
			"♭", // \flat(p)	musical flat
			"♮", // \natural(p)	music natural
			"♯", // \sharp(p)	musical sharp
			"♾", // \acidfree	permanent paper sign
			"⚀", // \dicei	die face-1
			"⚁", // \diceii	die face-2
			"⚂", // \diceiii	die face-3
			"⚃", // \diceiv	die face-4
			"⚄", // \dicev	die face-5
			"⚅", // \dicevi	die face-6
			"⚥", // \Hermaphrodite	male and female sign
			"⚲", // \neuter	neuter
			"✓", // \checkmark	tick, check mark
			"✠", // \maltese	maltese cross
			"✪", // \circledstar	circled white star
			"✶", // \varstar	six pointed black star
			"✽", // \dingasterisk	heavy teardrop-spoked asterisk
			"➛", // \draftingarrow	right arrow with bold head (drafting)
			"⟃", // \subsetcirc	open subset
			"⟄", // \supsetcirc	open superset
			"⤫", // \rdiagovfdiag	rising diagonal crossing falling diagonal
			"⤬", // \fdiagovrdiag	falling diagonal crossing rising diagonal
			"⤭", // \seovnearrow	south east arrow crossing north east arrow
			"⤮", // \neovsearrow	north east arrow crossing south east arrow
			"⤯", // \fdiagovnearrow	falling diagonal crossing north east arrow
			"⤰", // \rdiagovsearrow	rising diagonal crossing south east arrow
			"⤱", // \neovnwarrow	north east arrow crossing north west arrow
			"⤲", // \nwovnearrow	north west arrow crossing north east arrow
			"⤴", // \uprightcurvearrow	arrow pointing rightwards then curving upwards
			"⤵", // \downrightcurvedarrow	arrow pointing rightwards then curving downwards
			"⦙", // \fourvdots	dotted fence
			"⦚", // \vzigzag	vertical zigzag line
			"⦰", // \revemptyset	reversed empty set
			"⦱", // \emptysetobar	empty set with overbar
			"⦲", // \emptysetocirc	empty set with small circle above
			"⦳", // \emptysetoarr	empty set with right arrow above
			"⦴", // \emptysetoarrl	empty set with left arrow above
			"⦺", // \obot	circle divided by horizontal bar and top half divided by vertical bar
			"⧉", // \boxonbox	two joined squares
			"⧠", // \laplac	square with contoured outline
			"⧧", // \thermod	thermodynamicblack
			"⧮", // \errbarsquare	error-barred white square
			"⧯", // \errbarblacksquare	error-barred black square
			"⫡", // \perps	perpendicular with s
			"⫱", // \topcir	down tack with circle below
			"⭐", // \medwhitestar	white medium star
			"⭑", // \medblackstar	black medium star
			"⭒", // \smwhitestar	white small star
			"〒", // \postalmark	postal mark
			"〰", // \hzigzag	zigzag


			/*
			// enclosing
						"■", // \matrix
						"█", // \eqarray
						"□", // \box
						"▭", // \rect
						"¯", // \overbar
						"▁", // \underbar

						// special
						"Ⅎ", // Size Override

						// accents-operators

						// phantom-smashes
						"⟡", // \phantom
						"⬄", // \hphantom
						"⇳", // \vphantom
						"⬍", // \smash
						"⬆", // \asmash
						"⬇", // \dsmash
						"⬌", // \hsmash

						// operators
						"‼", "∷", "≔", ["≪", "⋘"], ["≫", "⋙"], "→", "≮", "≠", "≯",

						// paired operators
						["∃", "∄"], // \exists, \exists
						["∈", "∉"], // \in, \in
						["∋", "∌"], // \ni, \ni
						["∼", "≁"], // \sim, \sim
						["≃", "≄"], // \simeq, \simeq
						["≅", "≇"], // \cong, \cong
						["≈", "≉"], // \approx, \approx
						["≍", "≭"], // \asymp, \asymp
						["≡", "≢"], // \equiv, \equiv
						["≤", "≰"], // \le, \le
						["≥", "≱"], // \ge, \ge
						["≶", "≸"], // \lessgtr, \lessgtr
						["≷", "≹"], // \gtrless, \gtrless
						["≽", "⋡"], // \succeq, \succeq
						["≺", "⊀"], // \prec, \prec
						["≻", "⊁"], // \succ, \succ
						["≼", "⋠"], // \preceq, \preceq
						["⊂", "⊄"], // \subset, \subset
						["⊃", "⊅"], // \superset, \superset
						["⊆", "⊈"], // \subseteq, \subseteq
						["⊇", "⊉"], // \superseteq, \superseteq
						["⊑", "⋢"], // \sqsubseteq, \sqsubseteq
						["⊒", "⋣"], // \sqsupseteq, \sqsupseteq
			*/
			// operators-nary
		],
	},

	/*
	{
		name: "TextMath",
		symbol: "\u221a2",
		content: [
			{group: "UTN28", subGroup: "special"},
			{group: "UTN28", subGroup: "stretchy-characters"},
			{group: "UTN28", subGroup: "accents-operators"},
			{group: "UTN28", subGroup: "operators"},
			{group: "UTN28", subGroup: "operators-nary"},
			{group: "UTN28", subGroup: "enclosing"},
			{group: "UTN28", subGroup: "spaces"},
			{group: "UTN28", subGroup: "phantom-smashes"}
		]
	},*/
	{
		name: `Typo${SoftHyphen}graphy`,
		symbol: "‽",
		content: [
			"\u00a0", // No-Break\nSpace
			"\u202f", // Narrow\nNo-Break\nSpace
			"\u2001", // EM\nQuad
			"\u2000", // EN\nQuad
			"\u2003", // EM\nSpace
			"\u2002", // EN\nSpace
			"\u2004", // ⅓ EM\nSpace
			"\u2005", // ¼ EM\nSpace
			"\u2006", // ⅙ EM\nSpace
			"\u2009", // Thin\nSpace
			"\u200a", // Hair\nSpace
			"\u2007", // Figure\nSpace
			"\u2008", // Punctuation\nSpace
			"\u200b", // Zero\nWidth\nSpace
			"\u200c", // Zero\nWidth\nNon-Joiner
			ZeroWidthJoiner,
			"\u205f", // Medium\nMath\nSpace
			"\u3000", // Ideographic\nSpace
			SoftHyphen, // Soft\nHyphen
			"–", "—", "―", // Hyphens
			"“", "”", "‟", "„", "«", "»", "‹", "›", "‘", "’", "‛", "‚", // Quotes
			"¿", "¡", "‽", "‼", "°", "¦", // Punctuation
		]
	},
	{
		name: "Currency",
		symbol: "¤",
		content: [
			"¤",
			"₳", "؋", "฿", "₵", "¢", "₡", "₢", "$", "₫", "₯", "₠", "€", "ƒ", "₣", "₲", "₴", "₭", "₤", "ℳ", "₥", "₦", "₪", "₧", "₱", "₰", "£", "﷼", "៛", "૱", "௹", "₨", "৳", "৲", "₮", "₩", "円", "¥", "元", "圓"
		]
	},
	{
		name: "Bold",
		symbol: "𝐁",
		byVK: {
			[VK.Digit0]: "𝟎", // \mbfzero	mathematical bold digit 0
			[VK.Digit1]: "𝟏", // \mbfone	mathematical bold digit 1
			[VK.Digit2]: "𝟐", // \mbftwo	mathematical bold digit 2
			[VK.Digit3]: "𝟑", // \mbfthree	mathematical bold digit 3
			[VK.Digit4]: "𝟒", // \mbffour	mathematical bold digit 4
			[VK.Digit5]: "𝟓", // \mbffive	mathematical bold digit 5
			[VK.Digit6]: "𝟔", // \mbfsix	mathematical bold digit 6
			[VK.Digit7]: "𝟕", // \mbfseven	mathematical bold digit 7
			[VK.Digit8]: "𝟖", // \mbfeight	mathematical bold digit 8
			[VK.Digit9]: "𝟗", // \mbfnine	mathematical bold digit 9
		},
	},
	{
		name: "Double-Struck",
		symbol: "𝔻",
		byVK: {
			[VK.Digit0]: "𝟘", // \Bbbzero	mathematical double-struck digit 0
			[VK.Digit1]: "𝟙", // \Bbbone	mathematical double-struck digit 1
			[VK.Digit2]: "𝟚", // \Bbbtwo	mathematical double-struck digit 2
			[VK.Digit3]: "𝟛", // \Bbbthree	mathematical double-struck digit 3
			[VK.Digit4]: "𝟜", // \Bbbfour	mathematical double-struck digit 4
			[VK.Digit5]: "𝟝", // \Bbbfive	mathematical double-struck digit 5
			[VK.Digit6]: "𝟞", // \Bbbsix	mathematical double-struck digit 6
			[VK.Digit7]: "𝟟", // \Bbbseven	mathematical double-struck digit 7
			[VK.Digit8]: "𝟠", // \Bbbeight	mathematical double-struck digit 8
			[VK.Digit9]: "𝟡", // \Bbbnine	mathematical double-struck digit 9
		},
	},
	{
		name: "Sans-Serif",
		symbol: "𝗦",
		byVK: {
			[VK.Digit0]: "𝟢", // \msanszero	mathematical sans-serif digit 0
			[VK.Digit1]: "𝟣", // \msansone	mathematical sans-serif digit 1
			[VK.Digit2]: "𝟤", // \msanstwo	mathematical sans-serif digit 2
			[VK.Digit3]: "𝟥", // \msansthree	mathematical sans-serif digit 3
			[VK.Digit4]: "𝟦", // \msansfour	mathematical sans-serif digit 4
			[VK.Digit5]: "𝟧", // \msansfive	mathematical sans-serif digit 5
			[VK.Digit6]: "𝟨", // \msanssix	mathematical sans-serif digit 6
			[VK.Digit7]: "𝟩", // \msansseven	mathematical sans-serif digit 7
			[VK.Digit8]: "𝟪", // \msanseight	mathematical sans-serif digit 8
			[VK.Digit9]: "𝟫", // \msansnine	mathematical sans-serif digit 9
		},
	},
	{
		name: "Sans-Serif Bold",
		symbol: "𝗕",
		byVK: {
			[VK.Digit0]: "𝟬", // \mbfsanszero	mathematical sans-serif bold digit 0
			[VK.Digit1]: "𝟭", // \mbfsansone	mathematical sans-serif bold digit 1
			[VK.Digit2]: "𝟮", // \mbfsanstwo	mathematical sans-serif bold digit 2
			[VK.Digit3]: "𝟯", // \mbfsansthree	mathematical sans-serif bold digit 3
			[VK.Digit4]: "𝟰", // \mbfsansfour	mathematical sans-serif bold digit 4
			[VK.Digit5]: "𝟱", // \mbfsansfive	mathematical sans-serif bold digit 5
			[VK.Digit6]: "𝟲", // \mbfsanssix	mathematical sans-serif bold digit 6
			[VK.Digit7]: "𝟳", // \mbfsansseven	mathematical sans-serif bold digit 7
			[VK.Digit8]: "𝟴", // \mbfsanseight	mathematical sans-serif bold digit 8
			[VK.Digit9]: "𝟵", // \mbfsansnine	mathematical sans-serif bold digit 9
		},
	},
	{
		name: "Monospace",
		symbol: "𝗠",
		byVK: {
			[VK.Digit0]: "𝟶", // \mttzero	mathematical monospace digit 0
			[VK.Digit1]: "𝟷", // \mttone	mathematical monospace digit 1
			[VK.Digit2]: "𝟸", // \mtttwo	mathematical monospace digit 2
			[VK.Digit3]: "𝟹", // \mttthree	mathematical monospace digit 3
			[VK.Digit4]: "𝟺", // \mttfour	mathematical monospace digit 4
			[VK.Digit5]: "𝟻", // \mttfive	mathematical monospace digit 5
			[VK.Digit6]: "𝟼", // \mttsix	mathematical monospace digit 6
			[VK.Digit7]: "𝟽", // \mttseven	mathematical monospace digit 7
			[VK.Digit8]: "𝟾", // \mtteight	mathematical monospace digit 8
			[VK.Digit9]: "𝟿", // \mttnine	mathematical monospace digit 9
		}
	}
];
