import {EmojiKeyboard} from "./boards";
import {
	GreekBold,
	GreekBoldItalic,
	GreekItalic,
	GreekSansBold,
	GreekSansBoldItalic,
	LatinBold,
	LatinBoldItalic,
	LatinDoubleStruck,
	LatinFraktur,
	LatinFrakturBold,
	LatinItalic,
	LatinMono,
	LatinSans,
	LatinSansBold,
	LatinSansBoldItalic,
	LatinSansItalic,
	LatinScript,
	LatinScriptBold
} from "./mathLetters";

// Math symbols based on the unicode-math symbols list by Will Robertson, 2020/01/31 0.8q
// https://ctan.org/pkg/unicode-math
// UTN-28 is a Unicode Technical Note describing UnicodeMath as implemented in MS Office software
// https://www.unicode.org/notes/tn28/

const MathGroups = {
	name: "Math Groups",
	symbol: "⟨⟩",
	content: [
		// Opening and closing symbols
		"√", // \sqrt(p)	radical
		"∛", // \cuberoot	cube root
		"∜", // \fourthroot	fourth root
		[
			"‖", // \Vert(p)	double vertical bar
			"⦀", // \Vvert	triple vertical bar delimiter
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
		"⎰", // \lmoustache(p)	upper left or lower right curly bracket section
		"⎱", // \rmoustache(p)	upper right or lower left curly bracket section
		"⟅", // \lbag	left s-shaped bag delimiter
		"⟆", // \rbag	right s-shaped bag delimiter
		[
			"⟨", // \langle(p)	mathematical left angle bracket
			"⦑", // \langledot	left angle bracket with dot
		],
		[
			"⟩", // \rangle(p)	mathematical right angle bracket
			"⦒", // \rangledot	right angle bracket with dot
		],
		"⧼", // \lcurvyangle	left pointing curved angle bracket
		"⧽", // \rcurvyangle	right pointing curved angle bracket
		"⟪", // \lAngle	mathematical left double angle bracket
		"⟫", // \rAngle	mathematical right double angle bracket
		"⟮", // \lgroup(p)	mathematical left flattened parenthesis
		"⟯", // \rgroup(p)	mathematical right flattened parenthesis
		"❲", // \lbrbrak	light left tortoise shell bracket ornament
		"❳", // \rbrbrak	light right tortoise shell bracket ornament
		"⦗", // \lblkbrbrak	left black tortoise shell bracket
		"⦘", // \rblkbrbrak	right black tortoise shell bracket
		"⦋", // \lbrackubar	left square bracket with underbar
		"⦌", // \rbrackubar	right square bracket with underbar
		"⦍", // \lbrackultick	left square bracket with tick in top corner
		"⦎", // \rbracklrtick	right square bracket with tick in bottom corner
		"⦏", // \lbracklltick	left square bracket with tick in bottom corner
		"⦐", // \rbrackurtick	right square bracket with tick in top corner
		[
			"⦓", // \lparenless	left arc less-than bracket
			"⦕", // \Lparengtr	double left arc greater-than bracket
		],
		[
			"⦔", // \rparengtr	right arc greater-than bracket
			"⦖", // \Rparenless	double right arc less-than bracket
		],
		[
			"⦅", // \lParen	left white parenthesis
			"⦇", // \llparenthesis	z notation left image bracket
		],
		[
			"⦆", // \rParen	right white parenthesis
			"⦈", // \rrparenthesis	z notation right image bracket
		],
		[
			"⟦", // \lBrack	mathematical left white square bracket
			"⟬", // \Lbrbrak	mathematical left white tortoise shell bracket
		],
		[
			"⟧", // \rBrack	mathematical right white square bracket
			"⟭", // \Rbrbrak	mathematical right white tortoise shell bracket
		],
		"⦃", // \lBrace	left white curly bracket
		"⦄", // \rBrace	right white curly bracket
		"⦉", // \llangle	z notation left binding bracket
		"⦊", // \rrangle	z notation right binding bracket
		[
			"⧘", // \lvzigzag	left wiggly fence
			"⧚", // \Lvzigzag	left double wiggly fence
		], [
			"⧙", // \rvzigzag	right wiggly fence
			"⧛", // \Rvzigzag	right double wiggly fence
		],
		"⟌", // \longdivision	long division
	]
}
const MathAccents = {
	name: "Math Accents",
	symbol: "⃗",
	content: [
		"̀", // "◌̀", \grave
		"́", // "◌́", \acute
		"̂", // "◌̂", \hat
		"̃", // "◌̃", \tilde
		"\u0305", // \overbar
		"\u0304", // \bar
		"̿", // \Bar
		"̌", // "◌̌", \check
		"̆", // "◌̆", \breve
		"\u0310", // \candra	candrabindu (non-spacing)
		"\u0312", // \oturnedcomma	combining turned comma above
		"\u0315", // \ocommatopright	combining comma above right
		"\u031A", // \droang	left angle above (non-spacing)
		"̇", // "◌̇", \dot
		"̈", // "◌̈", \ddot
		"⃛", // "◌⃛", \dddot
		"\u20E8", // \threeunderdot combining triple underdot
		"⃜", // "◌⃜", \ddddot
		"\u0309", // \ovhook	combining hook above
		"\u030A", // \ocirc	ring
		"⃗", // "◌⃗", \vec
		"\u20D0", // \leftharpoonaccent	combining left harpoon above
		"⃑", // "◌⃑", \hvec
		"⃡", // "◌⃡", \tvec
		"\u20D2", // \vertoverlay combing long vertical line overlay
		"\u20E7", // \annuity, combining annuity symbol
		"\u20E9", // \widebridgeabove	combining wide bridge above
		"\u20F0", // \asteraccent	combining asterisk above
		"′", // \prime(p)	prime or minute, not superscripted
		"″", // \dprime	double prime or second, not superscripted
		"‴", // \trprime	triple prime (not superscripted)
		"⁗", // \qprime	quadruple prime, not superscripted
		"‵", // \backprime(a)	reverse prime, not superscripted
		"‶", // \backdprime	double reverse prime, not superscripted
		"‷", // \backtrprime	triple reverse prime, not superscripted
	]
};
const MathOverUnder = {
	name: "Math Over Under",
	symbol: "⏞",
	content: [
		"⏞", // \overbrace
		"⏟", // \underbrace
		"⎴", // \overbracket
		"⎵", // \underbracket
		"⏜", // \overparen
		"⏝", // \underparen
		"⏠", // \overshell
		"⏡", // \undershell
	]
};
const MathNAry = {
	name: "Math N-Ary",
	symbol: "∑",
	content: [
		"∑", // \sum
		{
			name: "More Sums",
			symbol: "⅀",
			content: [
				"⅀", // \Bbbsum	double-struck n-ary summation
				"⨊", // \modtwosum	modulo two sum
			]
		},
		"∫", // \int
		{
			name: "More Integrals",
			symbol: "∬",
			content: [
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
			]
		},
		"⨋", // \sumint	summation with integral
		"∏", // \prod
		"∐", // \amalg, \coprod
		[
			"⋀", // \bigwedge
			"⨇", // \conjquant	two logical and operator
		],
		[
			"⋁", // \bigvee
			"⨈", // \disjquant	two logical or operator
		],
		"⋂", // \bigcap
		"⋃", // \bigcup
		"⨃", // \bigcupdot	n-ary union operator with dot
		"⨄", // \biguplus
		"⨅", // \bigsqcap(p)	n-ary square intersection operator
		"⨆", // \bigsqcup
		"⨝", // \Join join⊍
		"⟗", // \fullouterjoin	full outer join
		"⟕", // \leftouterjoin	left outer join
		"⟖", // \rightouterjoin	right outer join
		"⨞", // \bigtriangleleft large left triangle operator
		"⟘", //\bigbot	large up tack
		"⟙", //\bigtop	large down tack
		"⧸", // \xsol	big solidus
		"⧹", // \xbsol	big reverse solidus
		"⨀", // \bigodot
		"⨁", // \bigoplus
		"⨂", // \bigotimes
		"⨉", // \bigtimes	n-ary times operator
		"⨟", // \zcmp z notation schema composition
		"⨠", // \zpipe z notation schema piping
		"⨡", // \zproject z notation schema projection
		"⫼", // \biginterleave large triple vertical bar operator
		"⫿", // \bigtalloblong n-ary white vertical bar
		"𞻰", // \arabicmaj arabic mathematical operator meem with hah with tatweel
		"𞻱", // \arabichad arabic mathematical operator hah with dal
	]
};
const MathBinary: EmojiKeyboard = {
	name: "Math Operators",
	symbol: "±",
	content: [
		{
			name: "Circled Operators",
			symbol: "⊕",
			content: [
				"⊕", // \oplus(p)	plus sign in circle
				"⨭", // \opluslhrim	plus sign in left half circle
				"⨮", // \oplusrhrim	plus sign in right half circle

				"⊖", // \ominus(p)	minus sign in circle

				"⊙", // \odot(p)	middle dot in circle

				"⊗", // \otimes(p)	multiply sign in circle
				"⨶", // \otimeshat	circled multiplication sign with circumflex accent
				"⨴", // \otimeslhrim	multiplication sign in left half circle
				"⨵", // \otimesrhrim	multiplication sign in right half circle
				"⨷", // \Otimes	multiplication sign in double circle

				"⨸", // \odiv	circled division sign

				"⊘", // \oslash(p)	solidus in circle
				"⊛", // \circledast(a)	asterisk in circle
				"⊚", // \circledcirc(a)	small circle in circle

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
			]
		},
		{
			name: "Boxed Operators",
			symbol: "⊟",
			content: [
				"⊞", // \boxplus(a)	plus sign in box
				"⊟", // \boxminus(a)	minus sign in box
				"⊡", // \boxdot(a)	/dotsquare /boxdot b: small dot in box
				"⊠", // \boxtimes(a)	multiply sign in box
				"⧄", // \boxdiag	squared rising diagonal slash
				"⧆", // \boxast	squared asterisk
				"⧇", // \boxcircle	squared small circle
			]
		},
		{
			name: "Operators in Triangle",
			symbol: "⨻",
			content: [
				"⨹", // \triangleplus	plus sign in triangle
				"⨺", // \triangleminus	minus sign in triangle
				"◬", // \trianglecdot	triangle with centered dot
				"⨻", // \triangletimes	multiplication sign in triangle
			]
		},
		{
			name: "Misc Arithmetic Operators",
			symbol: "⋇",
			content: [
				[
					"⩲", // \pluseqq	plus sign above equals sign
					"⩱", // \eqqplus	equals sign above plus sign
				],

				"∔", // \dotplus(a)	plus sign, dot above
				"⨢", // \ringplus	plus sign with small circle above
				"⨣", // \plushat	plus sign with circumflex accent above
				"⨤", // \simplus	plus sign with tilde above
				"⨥", // \plusdot	plus sign with dot below
				"⨦", // \plussim	plus sign with tilde below
				"⨧", // \plussubtwo	plus sign with subscript two
				"⨨", // \plustrif	plus sign with black triangle
				"⧺", // \doubleplus	double plus
				"⧻", // \tripleplus	triple plus
				"∸", // \dotminus	minus sign, dot above
				"⨩", // \commaminus	minus sign with comma above
				"⨪", // \minusdot	minus sign with dot below
				"⨫", // \minusfdots	minus sign with falling dots
				"⨬", // \minusrdots	minus sign with rising dots

				"⧾", // \tplus	tiny
				"⧿", // \tminus	miny

				"⋉", // \ltimes(a)	times sign, left closed
				"⋊", // \rtimes(a)	times sign, right closed
				"⋋", // \leftthreetimes(a)	left semidirect product
				"⋌", // \rightthreetimes(a)	right semidirect product
				"⨰", // \dottimes	multiplication sign with dot above
				"⨱", // \timesbar	multiplication sign with underbar
				"⨲", // \btimes	semidirect product with bottom closed
				"⨳", // \smashtimes	smash product
				"⋇", // \divideontimes(a)	division on times

				"⫽", // \sslash	double solidus operator
				"⫻", // \trslash	triple solidus binary relation
				"⧶", // \dsol	solidus with overbar
			]
		},
		{
			name: "Misc Logic Operators",
			symbol: "⩚",
			content: [
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

				"⊻", // \veebar(a)	logical or, bar below (large vee); exclusive disjunction
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
			]
		},
		{
			name: "Misc Set Operators",
			symbol: "⩆",
			content: [
				"⩀", // \capdot	intersection with dot
				"⩃", // \barcap	intersection with overbar
				"⩄", // \capwedge	intersection with logical and
				"⩋", // \twocaps	intersection beside and joined with intersection
				"⩍", // \closedvarcap	closed intersection with serifs

				"⋒", // \Cap(a)	/cap /doublecap b: double intersection

				"⊌", // \cupleftarrow	multiset
				"⩁", // \uminus	union with minus sign
				"⩂", // \barcup	union with overbar
				"⩅", // \cupvee	union with logical or
				"⩊", // \twocups	union beside and joined with union
				"⩌", // \closedvarcup	closed union with serifs
				"⩐", // \closedvarcupsmashprod	closed union with serifs and smash product

				"⋓", // \Cup(a)	/cup /doublecup b: double union

				"⩆", // \cupovercap	union above intersection
				"⩈", // \cupbarcap	union above bar above intersection

				"⩇", // \capovercup	intersection above union
				"⩉", // \capbarcup	intersection above bar above union
			]
		},
		// Binary relations
		[
			"±", // \pm(p)	plus-or-minus sign
			"∓", // \mp(p)	minus-or-plus sign
		],
		"+", // \mathplus	plus sign b:
		"−", // \minus	minus sign
		"⋅", // \cdot(p)	small middle dot
		"⋆", // \star(p)	small star, filled, low
		"∙", // \vysmblkcircle	bullet operator
		[
			"×", // \times(p)	multiply sign
			"⨯", // \vectimes	vector or cross product
		],
		[
			"÷", // \div(p)	divide sign
		],
		"∕", // \divslash	division slash
		"⁄", // \fracslash	fraction slash
		[
			"⧵", // \setminus(p)	reverse solidus operator
			"⧷", // \rsolbar	reverse solidus with horizontal stroke
		],
		"∖", // \smallsetminus(a)	small set minus (cf. reverse solidus)
		"∗", // \ast(p)	centered asterisk
		"∘", // \vysmwhtcircle	composite function (small circle)
		[
			"∧", // \wedge(p)	/wedge /land b: logical and
			"⊼", // \barwedge(a)	bar, wedge (large wedge)
		],
		[
			"∨", // \vee(p)	/vee /lor b: logical or
			"⊽", // \barvee	bar, vee (large vee)
		],
		"∩", // \cap(p)	intersection
		"∪", // \cup(p)	union or logical sum
		"⊍", // \cupdot	union, with dot
		"⊎", // \uplus(p)	plus sign in union
		[
			"⊓", // \sqcap(p)	square intersection
			"⩎", // \Sqcap	double square intersection
		],
		[
			"⊔", // \sqcup(p)	square union
			"⩏", // \Sqcup	double square union
		],

		[
			"†", // \dagger(p)	dagger relation
			"‡", // \ddagger(p)	double dagger relation
		],
		"⁀", // \tieconcat	character tie, z notation sequence concatenation

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
		"⨼", // \intprod	interior product
		"⨽", // \intprodr	righthand interior product
	]
}
const MathSymbols: EmojiKeyboard = {
	name: "Math Symbols",
	symbol: "∞",
	content: [
// Ordinary symbols, \mathord
		"§", // \mathsection	section symbol
		[
			"¬", // \neg(p)	/neg /lnot not sign
			"⌐", // \invnot	reverse not
		],
		"¶", // \mathparagraph	paragraph symbol
		"Ƶ", // \Zbar	impedance (latin capital letter z with stroke)
		"϶", // \upbackepsilon	greek reversed lunate epsilon symbol
		"―", // \horizbar	horizontal bar
		"‗", // \twolowline	double low line (spacing)
		"‥", // \enleadertwodots	double baseline dot (en leader)
		"…", // \unicodeellipsis	ellipsis (horizontal)
		"‸", // \caretinsert	caret (insertion mark)
		"‼", // \Exclam	double exclamation mark
		"⁃", // \hyphenbullet	rectangle, filled (hyphen bullet)
		"⁇", // \Question	double question mark

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
		"∀", // \forall(p)	for all
		"∁", // \complement(a)	complement sign
		[
			"∃", // \exists(p)	at least one exists
			"∄", // \nexists(a)	negated exists
		],
		"ℵ",
		"ℶ",
		"∅",
		{
			name: "Var Empty Set",
			symbol: "⦳",
			content: [
				"⌀",
				"⦰",
				"⦱",
				"⦲",
				"⦳",
				"⦴",
			],
		},
		"∆", // \increment	laplacian (delta; nabla^2)
		"∎", // \QED	end of proof
		"∞",
		{
			name: "Var Infinity",
			symbol: "⧞",
			content: [
				"⧜",
				"⧝",
				"⧞",
				"♾",
			],
		},
		{
			name: "Angle Symbols",
			symbol: "∡",
			content: [
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
			]
		},
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
		"⏤", // \strns	straightness
		"⏧", // \elinters	electrical intersection
		"␢", // \blanksymbol	blank symbol
		"␣", // \mathvisiblespace	open box
		"┆", // \bdtriplevdash	doubly broken vert
		"▀",
		"▄",
		"█",
		"▌",
		"▐",
		"░",
		"▒",
		"▓",
	]
};
const MathShapes: EmojiKeyboard = {
	name: "Math Shapes",
	symbol: "⏢",
	content: [
		"○", // \mdlgwhtcircle	medium large circle

		"⚆", // \circledrightdot	white circle with dot right
		"⚈", // \blackcircledrightdot	black circle with white dot right
		"⚇", // \circledtwodots	white circle with two dots
		"⚉", // \blackcircledtwodots	black circle with two white dots
		"⧂", // \cirscir	circle with small circle to the right
		"⧃", // \cirE	circle with two horizontal strokes to the right
		[
			"⧬", // \circledownarrow	white circle with down arrow
			"⧭", // \blackcircledownarrow	black circle with down arrow
		], [
			"⧲", // \errbarcircle	error-barred white circle
			"⧳", // \errbarblackcircle	error-barred black circle
		],

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
		[
			"⚪", // \mdwhtcircle	medium white circle
			"⚫", // \mdblkcircle	medium black circle
		], [
			"◯", // \lgwhtcircle	large circle
			"⬤", // \lgblkcircle	black large circle
		],

		"◠", // \topsemicircle	upper half circle
		"◡", // \botsemicircle	lower half circle

		"◙", // \inversewhitecircle	inverse white circle
		"◚", // \invwhiteupperhalfcircle	upper half inverse white circle
		"◛", // \invwhitelowerhalfcircle	lower half inverse white circle

		[
			"⬭", // \whthorzoval	white horizontal ellipse
			"⬬", // \blkhorzoval	black horizontal ellipse
		], [
			"⬯", // \whtvertoval	white vertical ellipse
			"⬮", // \blkvertoval	black vertical ellipse
		], [
			"△", // \bigtriangleup(p)	big up triangle, open
			"▲", // \bigblacktriangleup	black up-pointing triangle
		],

		"⟁", // \whiteinwhitetriangle	white triangle containing small white triangle
		"⧊", // \triangleodot	triangle with dot above
		"⧋", // \triangleubar	triangle with underbar
		"⧌", // \triangles	s in triangle

		"◭", // \triangleleftblack	up-pointing triangle with left half black
		"◮", // \trianglerightblack	up-pointing triangle with right half black
		"▴", // \blacktriangle(a)	up triangle, filled

		"⧍", // \triangleserifs	triangle with serifs at bottom

		"⃤", // \enclosetriangle	combining enclosing upward pointing triangle

		[
			"▽", // \bigtriangledown(p)	big down triangle, open
			"▼", // \bigblacktriangledown	big down triangle, filled
		],

		"⧨", // \downtriangleleftblack	down-pointing triangle with left half black
		"⧩", // \downtrianglerightblack	down-pointing triangle with right half

		[
			"▿", // \triangledown(a)	down triangle, open
			"▾", // \blacktriangledown(a)	down triangle, filled
		],
		[
			"◁", // \triangleleft(p)	(large) left triangle, open; z notation domain restriction
			"◀", // \blacktriangleleft(a)	(large) left triangle, filled
		],
		"⩤", // \dsub	z notation domain antirestriction
		[
			"▷", // \triangleright(p)	(large) right triangle, open; z notation range restriction
			"▶", // \blacktriangleright(a)	(large) right triangle, filled
		],
		"⩥", // \rsub	z notation range antirestriction

		"⊿", // \varlrtriangle	right triangle
		[
			"◿", // \lrtriangle	lower right triangle
			"◢", // \lrblacktriangle	lower right triangle, filled
		], [
			"◺", // \lltriangle	lower left triangle
			"◣", // \llblacktriangle	lower left triangle, filled
		], [
			"◸", // \ultriangle	upper left triangle
			"◤", // \ulblacktriangle	upper left triangle, filled
		], [
			"◹", // \urtriangle	upper right triangle
			"◥", // \urblacktriangle	upper right triangle, filled
		],

		[
			"◻", // \mdwhtsquare	white medium square
			"◼", // \mdblksquare	black medium square
		], [
			"□", // \mdlgwhtsquare	square, open
			"■", // \mdlgblksquare	square, filled
		],
		"⟤", // \whitesquaretickleft	white square with leftwards tick
		"⟥", // \whitesquaretickright	white square with rightwards tick
		"⧅", // \boxbslash	squared falling diagonal slash
		"⧈", // \boxbox	squared square
		"◫", // \boxbar	vertical bar in box

		"⃞", // \enclosesquare	combining enclosing square

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

		[
			"⬞", // \vysmwhtsquare	white very small square
			"⬝", // \vysmblksquare	black very small square
		], [
			"▫", // \smwhtsquare	white small square
			"▪", // \smblksquare	/blacksquare - sq bullet, filled
		], [
			"◽", // \mdsmwhtsquare	white medium small square
			"◾", // \mdsmblksquare	black medium small square
		], [
			"⬜", // \lgwhtsquare	white large square
			"⬛", // \lgblksquare	black large square
		], [
			"▯", // \vrectangle	rectangle, white (vertical)
			"▮", // \vrectangleblack	black vertical rectangle
		], [
			"▭", // \hrectangle	horizontal rectangle, open
			"▬", // \hrectangleblack	black rectangle
		], [
			"▱", // \parallelogram	parallelogram, open
			"▰", // \parallelogramblack	black parallelogram
		],
		"⏢", // \trapezium	white trapezium
		"⏥", // \fltns	flatness

		"⍓", // \APLboxupcaret	boxed up caret
		"⍰", // \APLboxquestion	boxed question mark

		"⟐", // \diamondcdot	white diamond with centred dot
		"⟠", // \lozengeminus	lozenge divided by horizontal rule

		"⟡", // \concavediamond	white concave-sided diamond
		"⟢", // \concavediamondtickleft	white concave-sided diamond with leftwards tick
		"⟣", // \concavediamondtickright	white concave-sided diamond with rightwards tick
		"⧪", // \blackdiamonddownarrow	black diamond with down arrow
		[
			"⧰", // \errbardiamond	error-barred white diamond
			"⧱", // \errbarblackdiamond	error-barred black diamond
		],


		"⌑", // \sqlozenge	square lozenge
		"⋄", // \smwhtdiamond	white diamond
		"⬩", // \smblkdiamond	black small diamond
		[
			"⬫", // \smwhtlozenge	white small lozenge
			"⬪", // \smblklozenge	black small lozenge
		], [
			"⬦", // \mdwhtdiamond	white medium diamond
			"⬥", // \mdblkdiamond	black medium
		], [
			"◇", // \mdlgwhtdiamond	white diamond; diamond, open
			"◆", // \mdlgblkdiamond	black diamond
		], [
			"⬨", // \mdwhtlozenge	white medium lozenge
			"⬧", // \mdblklozenge	black medium lozenge
		],
		"◈", // \blackinwhitediamond	white diamond containing black small diamond
		"⬖", // \diamondleftblack	diamond with left half black
		"⬗", // \diamondrightblack	diamond with right half black
		"⬘", // \diamondtopblack	diamond with top half black
		"⬙", // \diamondbotblack	diamond with bottom half black

		"⃟", // \enclosediamond	combining enclosing diamond

		[
			"◊", // \mdlgwhtlozenge	lozenge or total mark
			"⧫", // \mdlgblklozenge	black lozenge
		], [
			"⬠", // \pentagon	white pentagon
			"⬟", // \pentagonblack	black pentagon
		], [
			"⭔", // \rightpentagon	white right-pointing pentagon
			"⭓", // \rightpentagonblack	black right-pointing pentagon
		], [
			"⎔", // \hexagon	horizontal benzene ring [hexagon flat open]
			"⬣", // \hexagonblack	horizontal black hexagon
		], [
			"⬡", // \varhexagon	white hexagon
			"⬢", // \varhexagonblack	black hexagon
		],
		"⌬", // \varhexagonlrbonds	six carbon ring, corner down, double bonds lower right etc
		"⏣", // \benzenr	benzene ring with circle
	]
}
const MathRelations: EmojiKeyboard = {
	name: "Math Relations",
	symbol: "≤",
	content: [
		{
			name: "Misc Compare",
			symbol: "⩻",
			content: [
				"⋖", // \lessdot(a)	less than, with dot
				"⋗", // \gtrdot(a)	greater than, with dot
				"⩹", // \ltcir	less-than with circle inside
				"⩺", // \gtcir	greater-than with circle inside
				"⩻", // \ltquest	less-than with question mark above
				"⩼", // \gtquest	greater-than with question mark above

				"⪇", // \lneq(a)	less-than and single-line not equal to
				"⪈", // \gneq(a)	greater-than and single-line not equal to
				[
					"≦", // \leqq(a)	less, double equals
					"≨", // \lneqq(a)	less, not double equals
				], [
					"≧", // \geqq(a)	greater, double equals
					"≩", // \gneqq(a)	greater, not double equals
				],

				"⋜", // \eqless	equal-or-less
				"⋝", // \eqgtr	equal-or-greater
				"⪙", // \eqqless	double-line equal to or less-than
				"⪚", // \eqqgtr	double-line equal to or greater-than

				"⩽", // \leqslant(a)	less-than or slanted equal to
				"⩾", // \geqslant(a)	greater-than or slanted equal to
				"⩿", // \lesdot	less-than or slanted equal to with dot inside
				"⪀", // \gesdot	greater-than or slanted equal to with dot inside
				"⪁", // \lesdoto	less-than or slanted equal to with dot above
				"⪂", // \gesdoto	greater-than or slanted equal to with dot above
				"⪃", // \lesdotor	less-than or slanted equal to with dot above right
				"⪄", // \gesdotol	greater-than or slanted equal to with dot above left

				"⪕", // \eqslantless(a)	slanted equal to or less-than
				"⪖", // \eqslantgtr(a)	slanted equal to or greater-than
				"⪗", // \elsdot	slanted equal to or less-than with dot inside
				"⪘", // \egsdot	slanted equal to or greater-than with dot inside

				"⫹", // \leqqslant	double-line slanted less-than or equal to
				"⫺", // \geqqslant	double-line slanted greater-than or equal to
				"⪛", // \eqqslantless	double-line slanted equal to or lessthan
				"⪜", // \eqqslantgtr	double-line slanted equal to or greater-than

				[
					"≲", // \lesssim(a)	less, similar
					"≴", // \nlesssim	not less, similar
				], [
					"≳", // \gtrsim(a)	greater, similar
					"≵", // \ngtrsim	not greater, similar
				],
				"⋦", // \lnsim(a)	less, not similar
				"⋧", // \gnsim(a)	greater, not similar
				[
					"⪅", // \lessapprox(a)	less-than or approximate
					"⪉", // \lnapprox(a)	less-than and not approximate
				], [
					"⪆", // \gtrapprox(a)	greater-than or approximate
					"⪊", // \gnapprox(a)	greater-than and not approximate
				],
				"⪍", // \lsime	less-than above similar or equal
				"⪎", // \gsime	greater-than above similar or equal

				"⪝", // \simless	similar or less-than
				"⪞", // \simgtr	similar or greater-than
				"⪟", // \simlE	similar above less-than above equals sign
				"⪠", // \simgE	similar above greater-than above equals sign

				"⪣", // \partialmeetcontraction	double less-than with underbar

				[
					"⋘", // \lll(a)	/ll /lll /llless r: triple less-than
					"⫷", // \lllnest	stacked very much less-than
				], [
					"⋙", // \ggg(a)	/ggg /gg /gggtr r: triple greaterthan
					"⫸", // \gggnest	stacked very much greater-than
				],

				[
					"≷", // \gtrless(a)	greater, less
					"≹", // \ngtrless	not greater, less
				],
				"⋚", // \lesseqgtr(a)	less, equals, greater
				"⋛", // \gtreqless(a)	greater, equals, less
				"⪋", // \lesseqqgtr(a)	less-than above double-line equal above greater-than
				"⪌", // \gtreqqless(a)	greater-than above double-line equal above less-than
				"⪏", // \lsimg	less-than above similar above greater-than
				"⪐", // \gsiml	greater-than above similar above less-than
				"⪑", // \lgE	less-than above greater-than above double-line equal
				"⪒", // \glE	greater-than above less-than above double-line equal
				"⪓", // \lesges	less-than above slanted equal above greater-than above slanted equal
				"⪔", // \gesles	greater-than above slanted equal above less-than above slanted equal

				"⪤", // \glj	greater-than overlapping less-than
				"⪥", // \gla	greater-than beside less-than

				"⪪", // \smt	smaller than
				"⪫", // \lat	larger than
				"⪬", // \smte	smaller than or equal to
				"⪭", // \late	larger than or equal to
			]
		},
		{
			name: "Misc Order",
			symbol: "≾",
			content: [
				"⋞", // \curlyeqprec(a)	curly equals, precedes
				"⋟", // \curlyeqsucc(a)	curly equals, succeeds

				[
					"⪯", // \preceq(p)	precedes above single-line equals sign
					"⪱", // \precneq	precedes above single-line not equal to
				], [
					"⪰", // \succeq(p)	succeeds above single-line equals sign
					"⪲", // \succneq	succeeds above single-line not equal to
				],

				[
					"⪳", // \preceqq	precedes above equals sign
					"⪵", // \precneqq(a)	precedes above not equal to
				], [
					"⪴", // \succeqq	succeeds above equals sign
					"⪶", // \succneqq(a)	succeeds above not equal to
				],
				[
					"≾", // \precsim(a)	precedes, similar
					"⋨", // \precnsim(a)	precedes, not similar
				], [
					"≿", // \succsim(a)	succeeds, similar
					"⋩", // \succnsim(a)	succeeds, not similar
				],
				[
					"⪷", // \precapprox(a)	precedes above almost equal to
					"⪹", // \precnapprox(a)	precedes above not almost equal to
				], [
					"⪸", // \succapprox(a)	succeeds above almost equal to
					"⪺", // \succnapprox(a)	succeeds above not almost equal to
				],

				"⪻", // \Prec	double precedes
				"⪼", // \Succ	double succeeds
				"⊰", // \prurel	element precedes under relation
				"⊱", // \scurel	succeeds under relation
				"⥽", // \rightfishtail	right fish tail
				"⥼", // \leftfishtail	left fish tail
			]
		},
		{
			name: "Misc Member",
			symbol: "⋻",
			content: [
				"∊", // \smallin	set membership (small set membership)
				"∍", // \smallni	/ni /owns r: contains (small contains as member)

				"⋲", // \disin	element of with long horizontal stroke
				"⋺", // \nisd	contains with long horizontal stroke

				"⋳", // \varisins	element of with vertical bar at end of horizontal stroke
				"⋻", // \varnis	contains with vertical bar at end of horizontal stroke

				"⋴", // \isins	small element of with vertical bar at end of horizontal stroke
				"⋼", // \nis	small contains with vertical bar at end of horizontal stroke

				"⋵", // \isindot	element of with dot above

				"⋶", // \varisinobar	element of with overbar
				"⋽", // \varniobar	contains with overbar

				"⋷", // \isinobar	small element of with overbar
				"⋾", // \niobar	small contains with overbar

				"⋸", // \isinvb	element of with underbar
				"⋹", // \isinE	element of with two horizontal strokes

				"⟒", // \upin	element of opening upwards

				"⫙", // \forkv	element of opening downwards
				"⋔", // \pitchfork(a)	pitchfork
				"⫚", // \topfork	pitchfork with tee top
				"⫛", // \mlcp	transversal intersection
				[
					"⫝̸", // \forks	forking
					"⫝", // \forksnot	nonforking
				],

				"⋿", // \bagmember	z notation bag membership
			]
		},
		{
			name: "Misc Subset",
			symbol: "⫃",
			content: [
				"⪽", // \subsetdot	subset with dot
				"⪾", // \supsetdot	superset with dot

				"⪿", // \subsetplus	subset with plus sign below
				"⫀", // \supsetplus	superset with plus sign below

				"⫁", // \submult	subset with multiplication sign below
				"⫂", // \supmult	superset with multiplication sign below

				"⟈", // \bsolhsub	reverse solidus preceding subset
				"⟉", // \suphsol	superset preceding solidus

				"⟃", // \subsetcirc	open subset
				"⟄", // \supsetcirc	open superset

				"⋐", // \Subset(a)	double subset
				"⋑", // \Supset(a)	double superset

				"⫏", // \csub	closed subset
				"⫐", // \csup	closed superset

				// SUBSET EQUAL

				"⊊", // \subsetneq(a)	subset, not equals
				"⊋", // \supsetneq(a)	superset, not equals

				"⫃", // \subedot	subset of or equal to with dot above
				"⫄", // \supedot	superset of or equal to with dot above

				"⫑", // \csube	closed subset or equal to
				"⫒", // \csupe	closed superset or equal to

				"⫅", // \subseteqq(a)	subset of above equals sign
				"⫆", // \supseteqq(a)	superset of above equals sign

				"⫇", // \subsim	subset of above tilde operator
				"⫈", // \supsim	superset of above tilde operator

				"⫉", // \subsetapprox	subset of above almost equal to
				"⫊", // \supsetapprox	superset of above almost equal to

				"⫋", // \subsetneqq(a)	subset of above not equal to
				"⫌", // \supsetneqq(a)	superset of above not equal to

				// TWO SYMBOLS

				"⫓", // \subsup	subset above superset
				"⫔", // \supsub	superset above subset
				"⫕", // \subsub	subset above subset
				"⫖", // \supsup	superset above superset
				"⫗", // \suphsub	superset beside subset
				"⫘", // \supdsub	superset beside and joined by dash with subset

				// SQUARE SUBSET

				"⊏", // \sqsubset	square subset
				"⊐", // \sqsupset	square superset
				"⫍", // \lsqhook	square left open box operator
				"⫎", // \rsqhook	square right open box operator

				[
					"⊑", // \sqsubseteq(p)	square subset, equals
					"⋢", // \nsqsubseteq	not, square subset, equals
				], [
					"⊒", // \sqsupseteq(p)	square superset, equals
					"⋣", // \nsqsupseteq	not, square superset, equals
				],
				"⋤", // \sqsubsetneq	square subset, not equals
				"⋥", // \sqsupsetneq	square superset, not equals

			],
		},
		{
			name: "Misc Equals",
			symbol: "≛",
			content: [
				"⩵", // \eqeq	two consecutive equals signs
				"⩶", // \eqeqeq	three consecutive equals signs
				"⧦", // \gleichstark	gleich stark

				"≖", // \eqcirc(a)	circle on equals sign
				"≝", // \eqdef	equals by definition
				"≟", // \questeq	equal with questionmark
				"≗", // \circeq(a)	circle, equals
				"≘", // \arceq	arc, equals; corresponds to
				"≙", // \wedgeq	corresponds to (wedge, equals)
				"≚", // \veeeq	logical or, equals
				"≛", // \stareq	star equals
				"⩮", // \asteq	equals with asterisk
				"≜", // \triangleq(a)	triangle, equals
				"≞", // \measeq	measured by (m over equals)
				"⪮", // \bumpeqq	equals sign with bumpy above
				"⩦", // \eqdot	equals sign with dot below
				"⩧", // \dotequiv	identical with dot above

				"⋕", // \equalparallel	parallel, equal; equal or parallel
				"⩨", // \equivVert	triple horizontal bar with double vertical stroke
				"⩩", // \equivVvert	triple horizontal bar with triple vertical stroke

				"⧣", // \eparsl	equals sign and slanted parallel
				"⧤", // \smeparsl	equals sign and slanted parallel with tilde above
				"⧥", // \eqvparsl	identical to and slanted parallel

				"≍", // \asymp(p)	asymptotically equal to
				"≭", // \nasymp	not asymptotically equal to
				"≎", // \Bumpeq(a)	bumpy equals
				"≏", // \bumpeq(a)	bumpy equals, equals
				"≐", // \doteq(l)	equals, single dot above
				"≑", // \Doteq(a)	/doteqdot /doteq r: equals, even dots
				"≒", // \fallingdotseq(a)	equals, falling dots
				"≓", // \risingdotseq(a)	equals, rising dots
				"≔", // \coloneq	colon, equals
				"⩴", // \Coloneq	double colon equal
				"≕", // \eqcolon	equals, colon
				"⩷", // \ddotseq	equals sign with two dots above and two dots below

				"≣", // \Equiv	strict equivalence (4 lines)
				"⩸", // \equivDD	equivalent with four dots above
			]
		},
		{
			name: "Misc Approx",
			symbol: "⩭",
			content: [
				"⋍", // \backsimeq(a)	reverse similar, equals
				"≅", // \cong(l)	congruent with
				"≆", // \simneqq	similar, not equals [vert only for 9573 entity]
				"≇", // \ncong(a)	not congruent with
				"≌", // \backcong	all equal to
				"≂", // \eqsim(a)	equals, similar
				"≊", // \approxeq(a)	approximate, equals
				"≋", // \approxident	approximately identical to
				"⩬", // \simminussim	similar minus similar
				"⩭", // \congdot	congruent with dot above
				"⩯", // \hatapprox	almost equal to with circumflex accent
				"⩰", // \approxeqq	approximately equal or equal to
				"⩳", // \eqqsim	equals sign above tilde operator
			]
		},
		{
			name: "Misc Similar",
			symbol: "⩪",
			content: [
				"∻", // \kernelcontraction	homothetic
				"⩪", // \dotsim	tilde operator with dot above
				"⩫", // \simrdots	tilde operator with rising dots
				"∽", // \backsim(a)	reverse similar
			]
		},
		{
			name: "Rel Triangles",
			symbol: "⪩",
			content: [
				[
					"⊲", // \vartriangleleft(a)	left triangle, open, variant
					"⋪", // \nvartriangleleft	not left triangle
				], [
					"⊳", // \vartriangleright(a)	right triangle, open, variant
					"⋫", // \nvartriangleright	not right triangle
				],
				[
					"⊴", // \trianglelefteq(a)	left triangle, equals
					"⋬", // \ntrianglelefteq(a)	not left triangle, equals
				], [
					"⊵", // \trianglerighteq(a)	right triangle, equals
					"⋭", // \ntrianglerighteq(a)	not right triangle, equals
				],

				"⧡", // \lrtriangleeq	increases as
				"⧏", // \ltrivb	left triangle beside vertical bar
				"⧐", // \vbrtri	vertical bar beside right triangle
				"⪦", // \ltcc	less-than closed by curve
				"⪧", // \gtcc	greater-than closed by curve
				"⪨", // \lescc	less-than closed by curve above slanted equal
				"⪩", // \gescc	greater-than closed by curve above slanted equal

				"⧎", // \rtriltri	right triangle above left triangle
			]
		},
		{
			name: "Tacks",
			symbol: "⊨",
			content: [
				[
					"⊢", // \vdash(p)	vertical, dash
					"⊬", // \nvdash(a)	not vertical, dash
				],
				"⊣", // \dashv(p)	dash, vertical

				"⊦", // \assert	assertion (vertical, short dash)
				"⫞", // \shortlefttack	short left tack
				"⫟", // \shortdowntack	short down tack
				"⫠", // \shortuptack	short up tack

				"⟝", // \vlongdash	long left tack
				"⟞", // \longdashv	long right tack

				"⊧", // \models(p)	models (vertical, short double dash)
				[
					"⊨", // \vDash(a)	vertical, double dash
					"⊭", // \nvDash(a)	not vertical, double dash
				],
				[
					"⊩", // \Vdash(a)	double vertical, dash
					"⊮", // \nVdash(a)	not double vertical, dash
				],
				"⊪", // \Vvdash(a)	triple vertical, dash
				[
					"⊫", // \VDash	double vert, double dash
					"⊯", // \nVDash(a)	not double vert, double dash
				],
				"⟚", // \DashVDash	left and right double turnstile
				"⟛", // \dashVdash	left and right tack
				"⫢", // \vDdash	vertical bar triple right turnstile
				"⫣", // \dashV	double vertical bar left turnstile
				"⫤", // \Dashv	vertical bar double left turnstile
				"⫥", // \DashV	double vertical bar double left turnstile
				"⫦", // \varVdash	long dash from left member of double vertical
				"⫧", // \Barv	short down tack with overbar
				"⫨", // \vBar	short up tack with underbar
				"⫩", // \vBarv	short up tack above short down tack
				"⫪", // \barV	double down tack
				"⫫", // \Vbar	double up tack
				"⫬", // \Not	double stroke not sign
				"⫭", // \bNot	reversed double stroke not sign
			]
		},
		// Relation Symbols
		[
			"≶", // \lessgtr(a)	less, greater
			"≸", // \nlessgtr	not less, greater
		],
		[
			"<", // \less	less-than sign r:
			"≮", // \nless(a)	not less-than
		], [
			">", // \greater	greater-than sign r:
			"≯", // \ngtr(a)	not greater-than
		],
		[
			"≪", // \ll(p)	much less than, type 2
			"⪡", // \Lt	double nested less-than
		], [
			"≫", // \gg(p)	much greater than, type 2
			"⪢", // \Gt	double nested greater-than
		],
		[
			"≤", // \leq(p)	/leq /le r: less-than-or-equal
			"≰", // \nleq(a)	not less-than-or-equal
		],
		[
			"≥", // \geq(p)	/geq /ge r: greater-than-or-equal
			"≱", // \ngeq(a)	not greater-than-or-equal
		],


		[
			"≺", // \prec(p)	precedes
			"⊀", // \nprec(a)	not precedes
		], [
			"≻", // \succ(p)	succeeds
			"⊁", // \nsucc(a)	not succeeds
		],
		[
			"≼", // \preccurlyeq(a)	precedes, curly equals
			"⋠", // \npreccurlyeq	not precedes, curly equals
		], [
			"≽", // \succcurlyeq(a)	succeeds, curly equals
			"⋡", // \nsucccurlyeq	not succeeds, curly equals
		],
		[
			"∈", // \in(p)	set membership, variant
			"∉", // \notin(l)	negated set membership
		],
		[
			"∋", // \ni(p)	contains, variant
			"∌", // \nni	negated contains, variant
		],
		"∝", // \propto(p)	is proportional to
		[
			"=", // \equal	equals sign r:
			"≠", // \ne(p)	/ne /neq r: not equal
		],
		[
			"≡", // \equiv(p)	identical with
			"≢", // \nequiv	not identical with
		],
		[
			"∼", // \sim(p)	similar
			"≁", // \nsim(a)	not similar
		],
		[
			"≃", // \simeq(p) \sime	similar, equals
			"≄", // \nsime \nsimeq	not similar, equals
		],
		[
			"≈", // \approx(p)	approximate
			"≉", // \napprox	not approximate
		],
		[
			"⊂", // \subset(p)	subset or is implied by
			"⊄", // \nsubset	not subset, variant [slash negation]
		], [
			"⊃", // \supset(p)	superset or implies
			"⊅", // \nsupset	not superset, variant [slash negation]
		],
		[
			"⊆", // \subseteq(p)	subset, equals
			"⊈", // \nsubseteq(a)	not subset, equals
		],
		[
			"⊇", // \supseteq(p)	superset, equals
			"⊉", // \nsupseteq(a)	not superset, equals
		],
		[
			"⋈", // \bowtie(p)	bowtie
			"⧓", // \fbowtie	black bowtie
		], [
			"⧔", // \lftimes	left black times
			"⧑", // \lfbowtie	left black bowtie
		], [
			"⧒", // \rfbowtie	right black bowtie
			"⧕", // \rftimes	right black times
		],
		"⋮", // \vdots(p)	vertical ellipsis
		"⋰", // \adots	three dots, ascending
		"⋱", // \ddots(p)	three dots, descending

		"≬", // \between(a)	between
		"⁐", // \closure	close up
		"⌢", // \frown(p)	down curve
		"⌣", // \smile(p)	up curve

		"⌿", // \APLnotslash	solidus, bar through (apl functional symbol slash bar)
		"▵", // \vartriangle(a)	/triangle - up triangle, open
		"⟂", // \perp(p)	perpendicular
		"⫡", // \perps	perpendicular with s
		"⟓", // \pullback	lower right corner with dot
		"⟔", // \pushout	upper left corner with dot

		"⧟", // \dualmap	double-ended multimap
		"⊶", // \origof	original of
		"⊷", // \imageof	image of
		"⊸", // \multimap(a)	/multimap a:
		"⫯", // \cirmid	vertical line with circle above
		"⫰", // \midcir	vertical line with circle below
		"⟜", // \multimapinv	left multimap
		"⟟", // \cirbot	up tack with circle above

		"⥾", // \upfishtail	up fish tail
		"⥿", // \downfishtail	down fish tail
		"⦂", // \typecolon	z notation type colon

		"∶", // \mathratio	ratio
		"∷", // \Colon	two colons
		"∹", // \dashcolon	excess (-:)
		"∺", // \dotsminusdots	minus with four dots, geometric properties
		"⧴", // \ruledelayed	rule-delayed

		"⩙", // \veeonwedge	logical or overlapping logical and

		[
			"∣", // \mid(p)	/mid r:
			"∤", // \nmid(a)	negated mid
		], [
			"∥", // \parallel(p)	parallel
			"∦", // \nparallel(a)	not parallel
		],
		"⫮", // \revnmid	does not divide with reversed negation slash
		"⫲", // \nhpar	parallel with horizontal stroke
		"⫳", // \parsim	parallel with tilde operator
	]
}

const MathUTN28 = {
	name: "UTN 28",
	symbol: "█",
	content: [
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
	]
};
export const MathKeyboard: EmojiKeyboard = {
	name: "Math",
	symbol: "∛",
	content: [
		MathGroups,
		MathOverUnder,
		MathAccents,
		MathNAry,
		MathBinary,
		MathSymbols,
		MathShapes,
		MathRelations,
		MathUTN28,
		LatinBold,
		LatinItalic,
		LatinBoldItalic,
		LatinSans,
		LatinSansBold,
		LatinSansItalic,
		LatinSansBoldItalic,
		LatinScript,
		LatinScriptBold,
		LatinFraktur,
		LatinFrakturBold,
		LatinMono,
		LatinDoubleStruck,
		GreekBold,
		GreekItalic,
		GreekBoldItalic,
		GreekSansBold,
		GreekSansBoldItalic,
	],
};

const Suits = [
	[
		"♠", // \spadesuit(p)	spades suit symbol
		"♤", // \varspadesuit	spade, white (card suit)
	],
	[
		"♡", // \heartsuit(p)	heart suit symbol
		"♥", // \varheartsuit	filled heart (card suit)
	],
	[
		"♢", // \diamondsuit(p)	diamond suit symbol
		"♦", // \vardiamondsuit	filled diamond (card suit)
	],
	[
		"♣", // \clubsuit(p)	club suit symbol
		"♧", // \varclubsuit	club, white (card suit)
	],
];
const Dices = [
	"⚀", // \dicei	die face-1
	"⚁", // \diceii	die face-2
	"⚂", // \diceiii	die face-3
	"⚃", // \diceiv	die face-4
	"⚄", // \dicev	die face-5
	"⚅", // \dicevi	die face-6
];
const MusicSymbols = [
	"♩", // \quarternote	music note (sung text sign)
	"♪", // \eighthnote	eighth note
	"♫", // \twonotes	beamed eighth notes
	"♭", // \flat(p)	musical flat
	"♮", // \natural(p)	music natural
	"♯", // \sharp(p)	musical sharp
]
const GenderSymbols = [
	"♀", // \female	venus, female
	"♂", // \male	mars, male
	"⚥", // \Hermaphrodite	male and female sign
	"⚲", // \neuter	neuter
];
const MiscSymbols = [
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
	"✓", // \checkmark	tick, check mark
	"✠", // \maltese	maltese cross
	"✪", // \circledstar	circled white star
	"✶", // \varstar	six pointed black star
	"✽", // \dingasterisk	heavy teardrop-spoked asterisk
	"➛", // \draftingarrow	right arrow with bold head (drafting)
	"⤫", // \rdiagovfdiag	rising diagonal crossing falling diagonal
	"⤬", // \fdiagovrdiag	falling diagonal crossing rising diagonal
	"⦙", // \fourvdots	dotted fence
	"⦚", // \vzigzag	vertical zigzag line
	"⦺", // \obot	circle divided by horizontal bar and top half divided by vertical bar
	"⧉", // \boxonbox	two joined squares
	"⧠", // \laplac	square with contoured outline
	"⧧", // \thermod	thermodynamicblack
	"⧮", // \errbarsquare	error-barred white square
	"⧯", // \errbarblacksquare	error-barred black square
	"⫱", // \topcir	down tack with circle below
	"⭐", // \medwhitestar	white medium star
	"⭑", // \medblackstar	black medium star
	"⭒", // \smwhitestar	white small star
	"〒", // \postalmark	postal mark
	"〰", // \hzigzag	zigzag
];

const Parts = [
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

	"⎲", // \sumtop	summation top
	"⎳", // \sumbottom	summation bottom

	"⌠", // \inttop	top half integral
	"⎮", // \intextender	integral extension
	"⌡", // \intbottom	bottom half integral

	"⎷", // \sqrtbottom	radical symbol bottom
];
