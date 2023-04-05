import {EmojiKeyboard} from "./boards";

export const ArrowsKeyboard: EmojiKeyboard = {
	name: "Arrows",
	symbol: "↔",
	byRow: [
		[
			null,
			null,
			[
				"↕", // \updownarrow(p)	up and down arrow
				"⇕", // \Updownarrow(p)	up and down double arrow
			],
			null,
			null,
			{
				name: "NS Arrows",
				symbol: "⇅",
				content: [
					"↨", // \updownarrowbar	up down arrow with base (perpendicular)
					"⇅", // \updownarrows	up arrow, down arrow
					"⇵", // \downuparrows	downwards arrow leftwards of upwards arrow
					"⥌", // \updownharpoonrightleft	up barb right down barb left harpoon
					"⥍", // \updownharpoonleftright	up barb left down barb right harpoon
					"⥏", // \updownharpoonrightright	up barb right down barb right harpoon
					"⥑", // \updownharpoonleftleft	up barb left down barb left harpoon
					"⥮", // \updownharpoonsleftright	upwards harpoon with barb left beside downwards harpoon with barb right
					"⥯", // \downupharpoonsleftright	downwards harpoon with barb left beside upwards harpoon with barb right
				]
			}
		],
		[
			[
				"↖", // \nwarrow(p)	nw pointing arrow
				"⇖", // \Nwarrow	nw pointing double arrow
			],
			[
				"↑", // \uparrow(p)	upward arrow
				"⇑", // \Uparrow(p)	up double arrow
			],
			[
				"↗", // \nearrow(p)	ne pointing arrow
				"⇗", // \Nearrow	ne pointing double arrow
			],

			{
				name: "NW Arrows",
				symbol: "⤣",
				content: [
					"↸", // \barovernorthwestarrow	north west arrow to long bar
					"↰", // \Lsh(a)	/lsh a:
					"⤣", // \hknwarrow	north west arrow with hook
				]
			},
			{
				name: "North Arrows",
				symbol: "↥",
				content: [
					"⇈", // \upuparrows(a)	two up arrows
					"⤉", // \uparrowbarred	upwards arrow with horizontal stroke
					"⇞", // \nHuparrow	upwards arrow with double stroke
					"↟", // \twoheaduparrow	up two-headed arrow
					"↥", // \mapsup	maps to, upward
					"⤒", // \baruparrow	upwards arrow to bar
					"⥉", // \twoheaduparrowcircle	upwards two-headed arrow from small circle
					"⇡", // \updasharrow	upwards dashed arrow

					"⤊", // \Uuparrow	upwards triple arrow
					"⟰", // \UUparrow	upwards quadruple arrow
					"⇧", // \upwhitearrow	upwards white arrow
					"⇪", // \whitearrowupfrombar	upwards white arrow from bar

					"↿", // \upharpoonleft(a)	up harpoon-left
					"⥘", // \barupharpoonleft	upwards harpoon with barb left to bar
					"⥠", // \upharpoonleftbar	upwards harpoon with barb left from bar

					"↾", // \upharpoonright(a)	/upharpoonright /restriction a: up harpoon-right
					"⥔", // \barupharpoonright	upwards harpoon with barb right to bar
					"⥜", // \upharpoonrightbar	upwards harpoon with barb right from bar

					"⥣", // \upharpoonsleftright	upwards harpoon with barb left beside upwards harpoon with barb right
				]
			},
			{
				name: "NE Arrows",
				symbol: "⤤",
				content: [
					"↱", // \Rsh(a)	/rsh a:
					"⤤", // \hknearrow	north east arrow with hook
				]
			}
		],
		[
			[
				"←", // \leftarrow(p)	/leftarrow /gets a: leftward arrow
				"⇐", // \Leftarrow(p)	is implied by
			],
			[
				"↔", // \leftrightarrow(p)	left and right arrow
				"⇔", // \Leftrightarrow(p)	left and right double arrow
			],
			[
				"→", // \rightarrow(p)	/rightarrow /to a: rightward arrow
				"⇒", // \Rightarrow(p)	implies
			],

			{
				name: "West Arrows",
				symbol: "↫",
				content: [
					// one head
					"↚", // \nleftarrow(a)	not left arrow
					"⇇", // \leftleftarrows(a)	two left arrows
					"⬱", // \leftthreearrows	three leftwards arrows
					"⟵", // \longleftarrow(p)	long leftwards arrow
					"↢", // \leftarrowtail(a)	left arrow-tailed
					"⬹", // \nvleftarrowtail	leftwards arrow with tail with vertical stroke
					"⬺", // \nVleftarrowtail	leftwards arrow with tail with double vertical stroke
					"↤", // \mapsfrom	maps to, leftward
					"⟻", // \longmapsfrom	long leftwards arrow from bar
					"↜", // \leftwavearrow	left arrow-wavy
					"⇜", // \leftsquigarrow	leftwards squiggle arrow
					"⬿", // \leftcurvedarrow	wave arrow pointing directly left
					"⬳", // \longleftsquigarrow	long leftwards squiggle arrow
					"↫", // \looparrowleft(a)	left arrow-looped
					"⇤", // \barleftarrow	leftwards arrow to bar
					"⇷", // \nvleftarrow	leftwards arrow with vertical stroke
					"⇺", // \nVleftarrow	leftwards arrow with double vertical stroke
					"⤌", // \leftbkarrow	leftwards double dash arrow
					"⤎", // \leftdbkarrow	leftwards triple dash arrow
					"⇠", // \leftdasharrow	leftwards dashed arrow
					"⬸", // \leftdotarrow	leftwards arrow with dotted stem

					"⇍", // \nLeftarrow(a)	not implied by
					"⤂", // \nvLeftarrow	leftwards double arrow with vertical stroke
					"⤆", // \Mapsfrom	leftwards double arrow from bar
					"⟸", // \Longleftarrow(p)	long leftwards double arrow
					"⟽", // \Longmapsfrom	long leftwards double arrow from bar
					"⇚", // \Lleftarrow(a)	left triple arrow
					"⭅", // \LLeftarrow	leftwards quadruple arrow
					"⇦", // \leftwhitearrow	leftwards white arrow

					// multiple heads
					"↞", // \twoheadleftarrow(a)	left two-headed arrow
					"⬴", // \nvtwoheadleftarrow	leftwards two-headed arrow with vertical stroke
					"⬵", // \nVtwoheadleftarrow	leftwards two-headed arrow with double vertical stroke
					"⬶", // \twoheadmapsfrom	leftwards two-headed arrow from bar
					"⬷", // \twoheadleftdbkarrow	leftwards two-headed triple-dash arrow
					"⬻", // \twoheadleftarrowtail	leftwards two-headed arrow with tail
					"⬼", // \nvtwoheadleftarrowtail	leftwards two-headed arrow with tail with vertical stroke
					"⬽", // \nVtwoheadleftarrowtail	leftwards two-headed arrow with tail with double vertical stroke

					// harpoons
					"↼", // \leftharpoonup(p)	left harpoon-up
					"⥒", // \barleftharpoonup	leftwards harpoon with barb up to bar
					"⥚", // \leftharpoonupbar	leftwards harpoon with barb up from bar
					"⥪", // \leftharpoonupdash	leftwards harpoon with barb up above long dash
					"⥢", // \leftharpoonsupdown	leftwards harpoon with barb up above leftwards harpoon with barb down
					"↽", // \leftharpoondown(p)	left harpoon-down
					"⥖", // \barleftharpoondown	leftwards harpoon with barb down to bar
					"⥞", // \leftharpoondownbar	leftwards harpoon with barb down from bar
					"⥫", // \dashleftharpoondown	leftwards harpoon with barb down below long dash

					// weird
					"⇽", // \leftarrowtriangle	leftwards open-headed arrow
					"⤙", // \lefttail	leftwards arrow-tail
					"⤛", // \leftdbltail	leftwards double arrow-tail
					"⤝", // \diamondleftarrow	leftwards arrow to black diamond
					"⤟", // \diamondleftarrowbar	leftwards arrow from bar to black diamond
				]
			},
			{
				name: "EW Arrows",
				symbol: "⇆",
				content: [
					"↮", // \nleftrightarrow(a)	not left and right arrow
					"⟷", // \longleftrightarrow(p)	long left right arrow
					"↭", // \leftrightsquigarrow(a)	left and right arr-wavy

					"⇎", // \nLeftrightarrow(a)	not left and right double arrows
					"⤄", // \nvLeftrightarrow	left right double arrow with vertical stroke
					"⟺", // \Longleftrightarrow(p)	long left right double arrow

					"⇄", // \rightleftarrows(a)	right arrow over left arrow
					"⇆", // \leftrightarrows(a)	left arrow over right arrow
					"↹", // \barleftarrowrightarrowbar	leftwards arrow to bar over rightwards arrow to bar

					"⇋", // \leftrightharpoons(a)	left harpoon over right
					"⇌", // \rightleftharpoons(l)	right harpoon over left
					"⇹", // \nvleftrightarrow	left right arrow with vertical stroke
					"⇼", // \nVleftrightarrow	left right arrow with double vertical stroke
					"⇿", // \leftrightarrowtriangle	left right open-headed arrow
					"⥂", // \rightarrowshortleftarrow	rightwards arrow above short leftwards arrow
					"⥃", // \leftarrowshortrightarrow	leftwards arrow above short rightwards arrow
					"⥄", // \shortrightarrowleftarrow	short rightwards arrow above leftwards arrow
					"⥈", // \leftrightarrowcircle	left right arrow through small circle
					"⥊", // \leftrightharpoonupdown	left barb up right barb down harpoon
					"⥋", // \leftrightharpoondownup	left barb down right barb up harpoon
					"⥎", // \leftrightharpoonupup	left barb up right barb up harpoon
					"⥐", // \leftrightharpoondowndown	left barb down right barb down harpoon
					"⥦", // \leftrightharpoonsup	leftwards harpoon with barb up above rightwards harpoon with barb up
					"⥧", // \leftrightharpoonsdown	leftwards harpoon with barb down above rightwards harpoon with barb down
					"⥨", // \rightleftharpoonsup	rightwards harpoon with barb up above leftwards harpoon with barb up
					"⥩", // \rightleftharpoonsdown	rightwards harpoon with barb down above leftwards harpoon with barb down
				]
			},
			{
				name: "East Arrows",
				symbol: "↬",
				content: [
					"↛", // \nrightarrow(a)	not right arrow
					"⇉", // \rightrightarrows(a)	two right arrows
					"⇶", // \rightthreearrows	three rightwards arrows
					"⟶", // \longrightarrow(p)	long rightwards arrow
					"↠", // \twoheadrightarrow(a)	right two-headed arrow
					"↣", // \rightarrowtail(a)	right arrow-tailed
					"↦", // \mapsto(p)	maps to, rightward
					"⤅", // \twoheadmapsto	rightwards two-headed arrow from bar
					"⟼", // \longmapsto(p)	long rightwards arrow from bar
					"↝", // \rightwavearrow	right arrow-wavy
					"⇝", // \rightsquigarrow(a)	rightwards squiggle arrow
					"⤳", // \rightcurvedarrow	wave arrow pointing directly right
					"⟿", // \longrightsquigarrow	long rightwards squiggle arrow
					"↬", // \looparrowright(a)	right arrow-looped
					"⇥", // \rightarrowbar	rightwards arrow to bar
					"⇸", // \nvrightarrow	rightwards arrow with vertical stroke
					"⤀", // \nvtwoheadrightarrow	rightwards two-headed arrow with vertical stroke
					"⇻", // \nVrightarrow	rightwards arrow with double vertical stroke
					"⤁", // \nVtwoheadrightarrow	rightwards two-headed arrow with double vertical stroke
					"⤍", // \rightbkarrow	rightwards double dash arrow
					"⤏", // \dbkarrow	rightwards triple dash arrow
					"⇢", // \rightdasharrow	rightwards dashed arrow
					"⤑", // \rightdotarrow	rightwards arrow with dotted stem

					"⇏", // \nRightarrow(a)	not implies
					"⤃", // \nvRightarrow	rightwards double arrow with vertical stroke
					"⤇", // \Mapsto	rightwards double arrow from bar
					"⟹", // \Longrightarrow(p)	long rightwards double arrow
					"⟾", // \Longmapsto	long rightwards double arrow from bar
					"⇛", // \Rrightarrow(a)	right triple arrow
					"⭆", // \RRightarrow	rightwards quadruple arrow
					"⥰", // \rightimply	right double arrow with rounded head
					"⇨", // \rightwhitearrow	rightwards white arrow

					"⤐", // \drbkarrow	rightwards two-headed triple dash arrow
					"⤔", // \nvrightarrowtail	rightwards arrow with tail with vertical stroke
					"⤕", // \nVrightarrowtail	rightwards arrow with tail with double vertical stroke
					"⤖", // \twoheadrightarrowtail	rightwards two-headed arrow with tail
					"⤗", // \nvtwoheadrightarrowtail	rightwards two-headed arrow with tail with vertical stroke
					"⤘", // \nVtwoheadrightarrowtail	rightwards two-headed arrow with tail with double vertical stroke

					// harpoons
					"⇀", // \rightharpoonup(p)	right harpoon-up
					"⥓", // \rightharpoonupbar	rightwards harpoon with barb up to bar
					"⥛", // \barrightharpoonup	rightwards harpoon with barb up from bar
					"⥬", // \rightharpoonupdash	rightwards harpoon with barb up above long dash
					"⥤", // \rightharpoonsupdown	rightwards harpoon with barb up above rightwards harpoon with barb down
					"⇁", // \rightharpoondown(p)	right harpoon-down
					"⥗", // \rightharpoondownbar	rightwards harpoon with barb down to bar
					"⥟", // \barrightharpoondown	rightwards harpoon with barb down from bar
					"⥭", // \dashrightharpoondown	rightwards harpoon with barb down below long dash

					"⇾", // \rightarrowtriangle	rightwards open-headed arrow
					"⤚", // \righttail	rightwards arrow-tail
					"⤜", // \rightdbltail	rightwards double arrow-tail
					"⤞", // \rightarrowdiamond	rightwards arrow to black diamond
					"⤠", // \barrightarrowdiamond	rightwards arrow from bar to black diamond
				]
			},
		],
		[
			[
				"↙", // \swarrow(p)	sw pointing arrow
				"⇙", // \Swarrow	sw pointing double arrow
			],
			[
				"↓", // \downarrow(p)	downward arrow
				"⇓", // \Downarrow(p)	down double arrow
			],
			[
				"↘", // \searrow(p)	se pointing arrow
				"⇘", // \Searrow	se pointing double arrow
			],

			{
				name: "SW Arrows",
				symbol: "⤦",
				content: [
					"↲", // \Ldsh	left down angled arrow
					"⏎", // \varcarriagereturn	return symbol
					"⤦", // \hkswarrow	south west arrow with hook
					"⤶", // \leftdowncurvedarrow	arrow pointing downwards then curving leftwards
					"⤸", // \cwrightarcarrow	right-side arc clockwise arrow
					"↵", // \carriagereturn	downwards arrow with corner leftward = carriage return
				]
			},
			{
				name: "South Arrows",
				symbol: "↧",
				content: [
					"⇊", // \downdownarrows(a)	two down arrows
					"⤈", // \downarrowbarred	downwards arrow with horizontal stroke
					"⇟", // \nHdownarrow	downwards arrow with double stroke
					"↡", // \twoheaddownarrow	down two-headed arrow
					"↧", // \mapsdown	maps to, downward
					"⤓", // \downarrowbar	downwards arrow to bar
					"⇣", // \downdasharrow	downwards dashed arrow

					"⤋", // \Ddownarrow	downwards triple arrow
					"⟱", // \DDownarrow	downwards quadruple arrow
					"⇩", // \downwhitearrow	downwards white arrow

					"↯", // \downzigzagarrow	downwards zigzag arrow
					"⇃", // \downharpoonleft(a)	down harpoon-left
					"⥙", // \downharpoonleftbar	downwards harpoon with barb left to bar
					"⥡", // \bardownharpoonleft	downwards harpoon with barb left from bar
					"⇂", // \downharpoonright(a)	down harpoon-right
					"⥕", // \downharpoonrightbar	downwards harpoon with barb right to bar
					"⥝", // \bardownharpoonright	downwards harpoon with barb right from bar
					"⥥", // \downharpoonsleftright	downwards harpoon with barb left beside downwards harpoon with barb right
				]
			},
			{
				name: "SE Arrows",
				symbol: "⤥",
				content: [
					"↳", // \Rdsh	right down angled arrow
					"⤥", // \hksearrow	south east arrow with hook
					"⤷", // \rightdowncurvedarrow	arrow pointing downwards then curving rightwards
					"⤹", // \acwleftarcarrow	left-side arc anticlockwise arrow
					"↴", // \linefeed	rightwards arrow with corner downwards
				]
			}
		],
	],
	content: [
		{
			name: "Symbol Arrows",
			symbol: "⥵",
			content: [
				"⥆", // \leftarrowplus	leftwards arrow with plus below
				"⥅", // \rightarrowplus	rightwards arrow with plus below
				"⥳", // \leftarrowsimilar	leftwards arrow above tilde operator
				"⥴", // \rightarrowsimilar	rightwards arrow above tilde operator
				"⭋", // \leftarrowbsimilar	leftwards arrow above reverse tilde operator
				"⭌", // \rightarrowbsimilar	righttwards arrow above reverse tilde operator
				"⭊", // \leftarrowapprox	leftwards arrow above almost equal to
				"⥵", // \rightarrowapprox	rightwards arrow above almost equal to
				"⭂", // \leftarrowbackapprox	leftwards arrow above reverse almost equal to
				"⭈", // \rightarrowbackapprox	rightwards arrow above reverse almost equal to

				"⤽", // \curvearrowleftplus	top arc anticlockwise arrow with plus
				"⤼", // \curvearrowrightminus	top arc clockwise arrow with minus

				"⭀", // \equalleftarrow	equals sign above leftwards arrow
				"⥱", // \equalrightarrow	equals sign above rightwards arrow
				"⭉", // \similarleftarrow	tilde operator above leftwards arrow
				"⥲", // \similarrightarrow	tilde operator above rightwards arrow
				"⭁", // \bsimilarleftarrow	reverse tilde operator above leftwards arrow
				"⭇", // \bsimilarrightarrow	reverse tilde operator above rightwards arrow
				"⥶", // \ltlarr	less-than above leftwards arrow
				"⥸", // \gtrarr	greater-than above rightwards arrow
				"⥻", // \suplarr	superset above leftwards arrow
				"⥹", // \subrarr	subset above rightwards arrow

				"⥷", // \leftarrowless	leftwards arrow through less-than
				"⭃", // \rightarrowgtr	rightwards arrow through greaterthan
				"⥺", // \leftarrowsubset	leftwards arrow through subset
				"⭄", // \rightarrowsupset	rightwards arrow through subset
				"⬰", // \circleonleftarrow	left arrow with small circle
				"⇴", // \circleonrightarrow	right arrow with small circle
				"⬲", // \leftarrowonoplus	left arrow with circled plus
				"⟴", // \rightarrowonoplus	right arrow with circled plus
				"⬾", // \leftarrowx	leftwards arrow through x
				"⥇", // \rightarrowx	rightwards arrow through x
			]
		},
		{
			name: "Circular Arrows",
			symbol: "↻",
			content: [
				"↻", // \cwopencirclearrow	clockwise open circle arrow
				"↺", // \acwopencirclearrow	anticlockwise open circle arrow
				"⟳", // \cwgapcirclearrow	clockwise gapped circle arrow
				"⟲", // \acwgapcirclearrow	anticlockwise gapped circle arrow
				"⥀", // \acwcirclearrow	anticlockwise closed circle arrow
				"⥁", // \cwcirclearrow	clockwise closed circle arrow
				"↶", // \curvearrowleft(a)	left curved arrow
				"↷", // \curvearrowright(a)	right curved arrow
				"↩", // \hookleftarrow(p)	left arrow-hooked
				"↪", // \hookrightarrow(p)	right arrow-hooked
				"⤺", // \acwoverarcarrow	top arc anticlockwise arrow
				"⤻", // \acwunderarcarrow	bottom arc anticlockwise arrow
				"⤾", // \cwundercurvearrow	lower right semicircular clockwise arrow
				"⤿", // \ccwundercurvearrow	lower left semicircular anticlockwise arrow
			]
		},
		"⤡", // \nwsearrow	north west and south east arrow
		"⤢", // \neswarrow	north east and south west arrow
		[
			"⤧", // \tona	north west arrow and north east arrow
			"⤱", // \neovnwarrow	north east arrow crossing north west arrow
			"⤲", // \nwovnearrow	north west arrow crossing north east arrow
		],
		[
			"⤨", // \toea	north east arrow and south east arrow
			"⤭", // \seovnearrow	south east arrow crossing north east arrow
			"⤮", // \neovsearrow	north east arrow crossing south east arrow
		],
		"⤩", // \tosa	south east arrow and south west arrow
		"⤪", // \towa	south west arrow and north west arrow

		"⤯", // \fdiagovnearrow	falling diagonal crossing north east arrow
		"⤰", // \rdiagovsearrow	rising diagonal crossing south east arrow
		"⤴", // \uprightcurvearrow	arrow pointing rightwards then curving upwards
		"⤵", // \downrightcurvedarrow	arrow pointing rightwards then curving downwards
		[
			"◅", // \whitepointerleft	white left-pointing pointer
			"◄", // \blackpointerleft	black left-pointing pointer
		],
		[
			"▻", // \whitepointerright	white right-pointing pointer
			"►", // \blackpointerright	black right-pointing pointer
		], [
			"◃", // \smalltriangleleft	left triangle, open
			"◂", // \smallblacktriangleleft	left triangle, filled
		], [
			"▹", // \smalltriangleright	right triangle, open
			"▸", // \smallblacktriangleright	right triangle, filled
		]
	]
};
