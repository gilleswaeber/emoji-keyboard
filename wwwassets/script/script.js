define("ahk", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ahkOpenDevTools = exports.ahkSetOpacity = exports.ahkSetSize = exports.ahkSaveConfig = exports.ahkSetSearch = exports.ahkSend = exports.ahkReady = exports.ahkTitle = void 0;
    let AHK = null;
    window.chrome?.webview?.hostObjects?.ahk.then((ahk) => AHK = ahk);
    function isAHK() {
        return AHK !== null;
    }
    function ahkTitle(title) {
        if (isAHK())
            AHK.setTitle(title);
        else
            document.title = title;
    }
    exports.ahkTitle = ahkTitle;
    function ahkReady() {
        if (isAHK())
            AHK.ready();
        else
            console.log("Ready");
    }
    exports.ahkReady = ahkReady;
    function ahkSend(symbol) {
        if (isAHK())
            AHK.send(symbol);
        else
            console.log("Send", symbol);
    }
    exports.ahkSend = ahkSend;
    function ahkSetSearch(state) {
        if (isAHK())
            AHK.setSearch(state);
        else
            console.log("SetSearch", state);
    }
    exports.ahkSetSearch = ahkSetSearch;
    function ahkSaveConfig(config) {
        if (isAHK())
            AHK.saveConfig(config);
        else
            console.log("SaveConfig", config);
    }
    exports.ahkSaveConfig = ahkSaveConfig;
    function ahkSetSize(width, height) {
        if (isAHK())
            AHK.setSize(width, height);
        else
            console.log("SetSize", width, height);
    }
    exports.ahkSetSize = ahkSetSize;
    function ahkSetOpacity(opacity) {
        if (isAHK())
            AHK.setOpacity(opacity);
        else
            console.log("SetOpacity", opacity);
    }
    exports.ahkSetOpacity = ahkSetOpacity;
    function ahkOpenDevTools() {
        if (isAHK())
            AHK.openDevTools();
        else
            console.log("OpenDevTools");
    }
    exports.ahkOpenDevTools = ahkOpenDevTools;
});
define("layout", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchKeyCodes = exports.IsoFreeKeys = exports.AnsiFreeKeys = exports.SearchKeyCodesTable = exports.AnsiCodesList = exports.IsoCodesList = exports.ThirdRow = exports.SecondRow = exports.FirstRow = exports.DigitsRow = exports.SystemLayoutUS = void 0;
    exports.SystemLayoutUS = {
        [0]: { vk: 0, name: "" },
        [1]: { vk: 27, name: "Esc" },
        [2]: { vk: 49, name: "1" },
        [3]: { vk: 50, name: "2" },
        [4]: { vk: 51, name: "3" },
        [5]: { vk: 52, name: "4" },
        [6]: { vk: 53, name: "5" },
        [7]: { vk: 54, name: "6" },
        [8]: { vk: 55, name: "7" },
        [9]: { vk: 56, name: "8" },
        [10]: { vk: 57, name: "9" },
        [11]: { vk: 48, name: "0" },
        [12]: { vk: 189, name: "-" },
        [13]: { vk: 187, name: "=" },
        [14]: { vk: 8, name: "Backspace" },
        [15]: { vk: 9, name: "Tab" },
        [16]: { vk: 81, name: "q" },
        [17]: { vk: 87, name: "w" },
        [18]: { vk: 69, name: "e" },
        [19]: { vk: 82, name: "r" },
        [20]: { vk: 84, name: "t" },
        [21]: { vk: 89, name: "y" },
        [22]: { vk: 85, name: "u" },
        [23]: { vk: 73, name: "i" },
        [24]: { vk: 79, name: "o" },
        [25]: { vk: 80, name: "p" },
        [26]: { vk: 219, name: "[" },
        [27]: { vk: 221, name: "]" },
        [28]: { vk: 13, name: "Enter" },
        [29]: { vk: 162, name: "Ctrl" },
        [30]: { vk: 65, name: "a" },
        [31]: { vk: 83, name: "s" },
        [32]: { vk: 68, name: "d" },
        [33]: { vk: 70, name: "f" },
        [34]: { vk: 71, name: "g" },
        [35]: { vk: 72, name: "h" },
        [36]: { vk: 74, name: "j" },
        [37]: { vk: 75, name: "k" },
        [38]: { vk: 76, name: "l" },
        [39]: { vk: 186, name: ";" },
        [40]: { vk: 222, name: "'" },
        [41]: { vk: 192, name: "`" },
        [42]: { vk: 160, name: "Shift" },
        [43]: { vk: 220, name: "\\" },
        [44]: { vk: 90, name: "z" },
        [45]: { vk: 88, name: "x" },
        [46]: { vk: 67, name: "c" },
        [47]: { vk: 86, name: "v" },
        [48]: { vk: 66, name: "b" },
        [49]: { vk: 78, name: "n" },
        [50]: { vk: 77, name: "m" },
        [51]: { vk: 188, name: "," },
        [52]: { vk: 190, name: "." },
        [53]: { vk: 191, name: "/" },
        [54]: { vk: 16, name: "Right Shift" },
        [55]: { vk: 106, name: "Num *" },
        [56]: { vk: 164, name: "Alt" },
        [57]: { vk: 32, name: "Space" },
        [58]: { vk: 20, name: "Caps Lock" },
        [59]: { vk: 112, name: "F1" },
        [60]: { vk: 113, name: "F2" },
        [61]: { vk: 114, name: "F3" },
        [62]: { vk: 115, name: "F4" },
        [63]: { vk: 116, name: "F5" },
        [64]: { vk: 117, name: "F6" },
        [65]: { vk: 118, name: "F7" },
        [66]: { vk: 119, name: "F8" },
        [67]: { vk: 120, name: "F9" },
        [68]: { vk: 121, name: "F10" },
        [69]: { vk: 19, name: "Pause" },
        [70]: { vk: 145, name: "Scroll Lock" },
        [71]: { vk: 103, name: "Num 7" },
        [72]: { vk: 104, name: "Num 8" },
        [73]: { vk: 105, name: "Num 9" },
        [74]: { vk: 109, name: "Num -" },
        [75]: { vk: 100, name: "Num 4" },
        [76]: { vk: 101, name: "Num 5" },
        [77]: { vk: 102, name: "Num 6" },
        [78]: { vk: 107, name: "Num +" },
        [79]: { vk: 97, name: "Num 1" },
        [80]: { vk: 98, name: "Num 2" },
        [81]: { vk: 99, name: "Num 3" },
        [82]: { vk: 96, name: "Num 0" },
        [83]: { vk: 110, name: "Num Del" },
        [84]: { vk: 44, name: "Sys Req" },
        [86]: { vk: 226, name: "\\" },
        [87]: { vk: 122, name: "F11" },
        [88]: { vk: 123, name: "F12" },
        [285]: { vk: 163, name: "Right Ctrl" },
        [309]: { vk: 111, name: "Num /" },
        [311]: { vk: 44, name: "Prnt Scrn" },
        [312]: { vk: 165, name: "Right Alt" },
        [325]: { vk: 144, name: "Num Lock" },
        [91]: { vk: 0x5B, name: "Win" }
    };
    exports.DigitsRow = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    exports.FirstRow = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
    exports.SecondRow = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43];
    exports.ThirdRow = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
    exports.IsoCodesList = [
        41, ...exports.DigitsRow,
        15, ...exports.FirstRow,
        58, ...exports.SecondRow,
        86, ...exports.ThirdRow, 1100, 1101
    ];
    exports.AnsiCodesList = [
        41, ...exports.DigitsRow,
        15, ...exports.FirstRow,
        58, ...exports.SecondRow,
        42, ...exports.ThirdRow, 1100, 1101
    ];
    exports.SearchKeyCodesTable = [
        41, ...exports.DigitsRow,
        1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013,
        1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026,
    ];
    exports.AnsiFreeKeys = [
        ...exports.DigitsRow, ...exports.FirstRow, ...exports.SecondRow, ...exports.ThirdRow
    ];
    exports.IsoFreeKeys = [
        ...exports.DigitsRow, ...exports.FirstRow, ...exports.SecondRow, 86, ...exports.ThirdRow
    ];
    exports.SearchKeyCodes = [
        ...exports.DigitsRow,
        1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013,
        1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026
    ];
});
define("config", ["require", "exports", "preact", "layout", "key", "board", "preact/hooks"], function (require, exports, preact_1, layout_1, key_1, board_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConfigView = exports.DefaultConfigPage = exports.DefaultThemeUrl = exports.ThemesMap = exports.DefaultConfig = exports.DefaultOpacity = exports.Themes = exports.DefaultTheme = void 0;
    const SHORTCUT_KEYS = [
        {
            name: "Function Row", keys: [
                1,
                59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 87, 88,
            ]
        }, {
            name: "Numbers Row", keys: [
                41,
                2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                12, 13,
                14,
            ]
        }, {
            name: "First Row", keys: [
                15,
                16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                26, 27, 43, 28,
            ]
        }, {
            name: "Second Row", keys: [
                58,
                30, 31, 32, 33, 34, 35, 36, 37, 38,
                39, 40, 43, 28,
            ]
        }, {
            name: "Third Row", keys: [
                86,
                44, 45, 46, 47, 48, 49, 50,
                51, 52, 53,
            ]
        }, {
            name: "Fourth Row", keys: [
                57
            ]
        }, {
            name: "Numpad", keys: [
                82, 79, 80, 81,
                75, 76, 77,
                71, 72, 73,
                83,
                309,
                55,
                74,
                78,
                325,
            ]
        }
    ];
    const SkinTones = [
        { name: "neutral", symbol: "👤" },
        { name: "light", symbol: "🏻" },
        { name: "medium-light", symbol: "🏼" },
        { name: "medium", symbol: "🏽" },
        { name: "medium-dark", symbol: "🏾" },
        { name: "dark", symbol: "🏿" },
    ];
    exports.DefaultTheme = "material";
    exports.Themes = [
        { name: exports.DefaultTheme, url: "style/material.css", symbol: "🔳" },
        { name: "legacy", url: "style/legacy.css", symbol: "⬜" },
    ];
    exports.DefaultOpacity = .90;
    exports.DefaultConfig = {
        isoKeyboard: false,
        theme: exports.DefaultTheme,
        themeMode: "system",
        width: 764,
        height: 240,
        devTools: false,
        opacity: exports.DefaultOpacity,
        skinTone: 0,
    };
    exports.ThemesMap = new Map(exports.Themes.map((t) => [t.name, t]));
    exports.DefaultThemeUrl = exports.ThemesMap.get(exports.DefaultTheme).url;
    const ConfigPages = [
        {
            name: "General",
            symbol: "🛠️",
            keys(p) {
                return {
                    [16]: new key_1.ConfigToggleKey({
                        active: p.config.isoKeyboard,
                        action() {
                            p.app.updateConfig({ isoKeyboard: !p.config.isoKeyboard });
                        }
                    }),
                    [17]: new key_1.ConfigLabelKey(`ISO layout (additional key between ${p.layout[42].name} and ${p.layout[44].name})`),
                };
            }
        },
        {
            name: "Theme",
            symbol: "🎨",
            keys(p) {
                return {
                    ...(0, board_1.mapKeysToSlots)(layout_1.FirstRow, exports.Themes.map((t) => new key_1.ConfigActionKey({
                        active: p.config.theme == t.name,
                        name: t.name,
                        symbol: t.symbol,
                        action() {
                            p.app.updateConfig({ theme: t.name });
                        }
                    }))),
                    ...(0, board_1.mapKeysToSlots)(layout_1.SecondRow, [
                        ...[
                            ["light", "🌞"],
                            ["dark", "🌚"],
                            ["system", "📟"]
                        ].map(([mode, symbol]) => new key_1.ConfigActionKey({
                            active: p.config.themeMode == mode,
                            name: mode, symbol: symbol,
                            action() {
                                p.app.updateConfig({ themeMode: mode });
                            }
                        }))
                    ])
                };
            }
        },
        {
            name: "Display",
            symbol: "🖥️",
            keys(p) {
                return {
                    ...(0, board_1.mapKeysToSlots)(layout_1.FirstRow, [
                        new key_1.ConfigActionKey({
                            symbol: "--", name: "-10", action() {
                                p.app.updateConfig({ opacity: Math.max(p.config.opacity - .1, .2) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "-", name: "-1", action() {
                                p.app.updateConfig({ opacity: Math.max(p.config.opacity - .01, .2) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "+", name: "+1", action() {
                                p.app.updateConfig({ opacity: Math.min(p.config.opacity + .01, 1) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "++", name: "+10", action() {
                                p.app.updateConfig({ opacity: Math.min(p.config.opacity + .1, 1) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: `${Math.round(p.config.opacity * 100)}`, name: "reset", action() {
                                p.app.updateConfig({ opacity: exports.DefaultOpacity });
                            }
                        }),
                        new key_1.ConfigLabelKey("Opacity")
                    ]),
                    ...(0, board_1.mapKeysToSlots)(layout_1.SecondRow, [
                        new key_1.ConfigToggleKey({
                            active: p.config.devTools,
                            action() {
                                p.app.updateConfig({ devTools: !p.config.devTools });
                            }
                        }),
                        new key_1.ConfigLabelKey("Open DevTools")
                    ]),
                };
            }
        },
    ];
    exports.DefaultConfigPage = ConfigPages[0];
    function ConfigView(p) {
        const keys = (0, hooks_1.useMemo)(() => ({
            [41]: new key_1.ExitSearchKey(),
            ...(0, board_1.mapKeysToSlots)(layout_1.DigitsRow, ConfigPages.map((c) => new key_1.ConfigPageKey(c, c == p.sharedState.configPage))),
            ...p.sharedState.configPage.keys(p)
        }), [p.sharedState.configPage, p.layout, p.config]);
        p.app.keyHandlers = keys;
        const codes = p.config.isoKeyboard ? layout_1.IsoCodesList : layout_1.AnsiCodesList;
        return (0, preact_1.h)("div", { className: "keyboard" }, codes.map((code) => (keys[code] ?? key_1.BlankKey).render(p, code)));
    }
    exports.ConfigView = ConfigView;
});
define("key", ["require", "exports", "preact", "board", "ahk"], function (require, exports, preact_2, board_2, ahk_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CharKey = exports.ExitSearchKey = exports.SearchKey = exports.ConfigPageKey = exports.PageKey = exports.KeyboardKey = exports.BackKey = exports.BlankKey = exports.ConfigLabelKey = exports.ConfigToggleKey = exports.ConfigActionKey = exports.ConfigKey = exports.Key = void 0;
    function toTwemojiFilename(symbol) {
        let name = [];
        for (var i = 0; i < symbol.length; i++) {
            let c = symbol.codePointAt(i).toString(16);
            name.push(c);
            if (symbol.charCodeAt(i) != symbol.codePointAt(i))
                i++;
        }
        let filename = name.join('-') + '.svg';
        if (filename.indexOf('200d') === -1)
            filename = filename.replace(/-fe0f/g, '');
        return 'img/' + filename;
    }
    class Key {
        name;
        upperName;
        symbol;
        style;
        requiredOS;
        active;
        constructor(props) {
            this.name = props.name;
            this.upperName = props.upperName ?? '';
            this.symbol = props.symbol;
            this.style = props.style ?? '';
            this.requiredOS = props.requiredOS ?? '0';
            this.active = props.active ?? false;
        }
        render({ os, app, layout }, code) {
            const useFallback = os.ge(this.requiredOS);
            let keyType = "action";
            if (!this.name.length) {
                keyType = "empty";
            }
            else if (this instanceof CharKey) {
                keyType = "char";
            }
            else if (this instanceof BackKey) {
                keyType = "back";
            }
            return (0, preact_2.h)("div", { class: `key ${keyType} ${this.hasAlternate() && 'alt'} ${this.isLULetter() && 'lu'} ${this.active && 'active'}`, onClick: (e) => {
                    e.preventDefault();
                    e.shiftKey ? this.actAlternate(app) : this.act(app);
                }, onContextMenu: (e) => {
                    e.preventDefault();
                    this.actAlternate(app);
                }, onMouseOver: () => app.updateStatus(this.name), key: code },
                (0, preact_2.h)("div", { class: "keyname" }, layout[code]?.name),
                (0, preact_2.h)("div", { class: "name" }, this.name),
                (0, preact_2.h)("div", { class: "uname" }, this.upperName),
                (0, preact_2.h)("div", { class: `symbol ${this.style && 's-' + this.style}` }, useFallback ? (0, preact_2.h)("img", { src: toTwemojiFilename(this.symbol), alt: this.symbol }) : this.symbol));
        }
        act(app) {
        }
        actAlternate(app) {
            this.act(app);
        }
        hasAlternate() {
            return false;
        }
        isLULetter() {
            return false;
        }
    }
    exports.Key = Key;
    class ConfigKey extends Key {
        constructor() {
            super({ name: "Settings", symbol: "🛠️" });
        }
        render({ os, app, layout }, code) {
            const useFallback = os.ge(this.requiredOS);
            return (0, preact_2.h)("div", { class: `key action`, onClick: (e) => {
                    e.preventDefault();
                    this.actAlternate(app);
                }, onContextMenu: (e) => {
                    e.preventDefault();
                    this.actAlternate(app);
                }, onMouseOver: () => app.updateStatus(this.name) },
                (0, preact_2.h)("div", { class: "keyname" }, `⇧${layout[code]?.name}`),
                (0, preact_2.h)("div", { class: "name" }, this.name),
                (0, preact_2.h)("div", { class: `symbol` }, useFallback ? (0, preact_2.h)("img", { src: toTwemojiFilename(this.symbol), alt: this.symbol }) : this.symbol));
        }
        act(app) {
        }
        actAlternate(app) {
            app.setMode(2);
        }
    }
    exports.ConfigKey = ConfigKey;
    class ConfigActionKey extends Key {
        action;
        constructor({ active, action, name, symbol }) {
            active = active ?? false;
            super({
                name: name ?? (active ? "On" : "Off"),
                symbol: symbol ?? (active ? "✔️" : "❌"),
                active
            });
            this.action = action;
        }
        act(app) {
            this.action();
        }
    }
    exports.ConfigActionKey = ConfigActionKey;
    class ConfigToggleKey extends ConfigActionKey {
        act(app) {
            this.action();
        }
    }
    exports.ConfigToggleKey = ConfigToggleKey;
    class ConfigLabelKey extends Key {
        constructor(text) {
            super({ name: "", symbol: text });
        }
        render({ os, app, layout }, code) {
            return (0, preact_2.h)("div", { class: `key label` },
                (0, preact_2.h)("div", { class: "keyname" }, layout[code]?.name),
                (0, preact_2.h)("div", { class: "name" }, this.name),
                (0, preact_2.h)("div", { class: "symbol" }, this.symbol));
        }
    }
    exports.ConfigLabelKey = ConfigLabelKey;
    exports.BlankKey = new Key({ name: '', symbol: '' });
    class BackKey extends Key {
        parent;
        constructor(parent) {
            super({ name: 'back/🛠️', symbol: '←' });
            this.parent = parent;
        }
        act(app) {
            app.setBoard(this.parent);
        }
        actAlternate(app) {
            app.setMode(2);
        }
    }
    exports.BackKey = BackKey;
    class KeyboardKey extends Key {
        target;
        constructor(target) {
            super({ name: target.name, symbol: target.symbol, requiredOS: target.requiredOS });
            this.target = target;
        }
        act(app) {
            app.setBoard(this.target);
        }
    }
    exports.KeyboardKey = KeyboardKey;
    class PageKey extends Key {
        board;
        page;
        constructor(board, page, active) {
            super({ name: `page ${page + 1}`, symbol: '' + (page + 1), active });
            this.board = board;
            this.page = page;
        }
        act(app) {
            if (!this.active)
                app.setPage(this.board.name, this.page);
        }
    }
    exports.PageKey = PageKey;
    class ConfigPageKey extends Key {
        page;
        constructor(page, active) {
            super({ name: page.name, symbol: page.symbol, active });
            this.page = page;
        }
        act(app) {
            if (!this.active)
                app.setConfigPage(this.page);
        }
    }
    exports.ConfigPageKey = ConfigPageKey;
    class SearchKey extends Key {
        constructor() {
            super({ name: 'search', symbol: '🔎' });
        }
        act(app) {
            app.setMode(1);
        }
    }
    exports.SearchKey = SearchKey;
    class ExitSearchKey extends Key {
        constructor() {
            super({ name: 'back', symbol: '←' });
        }
        act(app) {
            app.setMode(0);
        }
    }
    exports.ExitSearchKey = ExitSearchKey;
    class CharKey extends Key {
        char;
        board;
        constructor(char, board) {
            super({
                name: (char.name ?? char.fullName ?? "").toLowerCase(),
                upperName: char.alternates?.length == 2 ? char.alternates[1].show : "",
                style: char.style,
                symbol: char.show ?? char.symbol,
                requiredOS: char.requiredVersion,
            });
            this.char = char;
            this.board = board;
        }
        act(app) {
            (0, ahk_1.ahkSend)(this.char.symbol);
        }
        actAlternate(app) {
            if (this.hasAlternate()) {
                app.setBoard(board_2.Board.fromAlternates(this.board, this.char));
            }
            else if (this.isLULetter()) {
                (0, ahk_1.ahkSend)(this.char.alternates[1].symbol);
            }
            else
                return this.act(app);
        }
        getUName() {
            if (this.isLULetter())
                return this.char.alternates[1].show;
            else
                return "";
        }
        hasAlternate() {
            return !!this.char.alternates && this.char.alternates.length > 2;
        }
        isLULetter() {
            return this.char.alternates?.length == 2;
        }
    }
    exports.CharKey = CharKey;
});
define("emojis", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.search = exports.getSubGroup = void 0;
    const indexedEmojis = {};
    const flatEmojis = [];
    let searchHaystack = "";
    const ESCAPE_REGEX = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-'].join('|\\') + ')', 'g');
    const SEPARATOR = '%';
    const SEPARATOR_REGEX_G = /%/g;
    const SEARCH_ID = SEPARATOR + '(\\d+)' + SEPARATOR + '[^' + SEPARATOR + ']+';
    data.emojis.forEach((emoji) => {
        if (!indexedEmojis[emoji.group])
            indexedEmojis[emoji.group] = {};
        if (!indexedEmojis[emoji.group][emoji.subGroup])
            indexedEmojis[emoji.group][emoji.subGroup] = [];
        indexedEmojis[emoji.group][emoji.subGroup].push(emoji);
        (!emoji.alternates || !emoji.alternates.length ? [emoji] : emoji.alternates)
            .forEach(e => {
            searchHaystack +=
                '%' + flatEmojis.length + '%' +
                    (e.fullName + ' ' + e.name + (e.keywords ? ' ' + e.keywords.join(' ') : '')).replace(SEPARATOR_REGEX_G, '');
            flatEmojis.push(e);
        });
    });
    function escapeRegex(str) {
        return str.replace(ESCAPE_REGEX, '\\$1');
    }
    function getSubGroup(group, subGroup) {
        if (indexedEmojis[group] && indexedEmojis[group][subGroup]) {
            return indexedEmojis[group][subGroup];
        }
        else {
            return [];
        }
    }
    exports.getSubGroup = getSubGroup;
    function search(needle) {
        let result = [];
        needle.split(/\s+/g).forEach((n, k) => {
            let filter = [];
            if (!n.length)
                return;
            const re = new RegExp(SEARCH_ID + escapeRegex(n.replace(SEPARATOR_REGEX_G, '')), 'ig');
            for (let m; (m = re.exec(searchHaystack));) {
                filter.push(parseInt(m[1]));
            }
            if (k == 0)
                result = filter;
            else
                result = result.filter(v => filter.indexOf(v) !== -1);
        });
        return result.map(v => flatEmojis[v]);
    }
    exports.search = search;
});
define("board", ["require", "exports", "key", "preact", "layout", "ahk", "emojis", "preact/hooks"], function (require, exports, key_2, preact_3, layout_2, ahk_2, emojis_1, hooks_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Board = exports.KeysBoard = exports.View = exports.toTitleCase = exports.mapKeysToSlots = exports.KeyboardView = exports.getMainBoard = void 0;
    function getMainBoard() {
        return Board.fromKeys('Main keyboard', '⌨', (b) => data.keyboards.map((k) => new key_2.KeyboardKey(Board.fromEmoji(k, b))));
    }
    exports.getMainBoard = getMainBoard;
    const MAX_PAGES = 12;
    function KeyboardView(p) {
        const board = p.sharedState.board;
        const state = p.sharedState.state[board.name];
        const pages = (0, hooks_2.useMemo)(() => board.getPages(p.config), [board, p.config]);
        const keys = pages[state?.page ?? 0] ?? pages[0];
        p.app.keyHandlers = keys;
        const codes = p.config.isoKeyboard ? layout_2.IsoCodesList : layout_2.AnsiCodesList;
        return (0, preact_3.h)("div", { class: "keyboard" }, codes.map((code) => (keys[code] ?? key_2.BlankKey).render(p, code)));
    }
    exports.KeyboardView = KeyboardView;
    function mapKeysToSlots(codes, keys) {
        const mapped = {};
        for (const [index, code] of Array.from(codes.entries())) {
            if (keys[index])
                mapped[code] = keys[index];
        }
        return mapped;
    }
    exports.mapKeysToSlots = mapKeysToSlots;
    function toTitleCase(str) {
        return str.replace(/\\?\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    exports.toTitleCase = toTitleCase;
    function range(stop) {
        return Array.from((new Array(stop)).keys());
    }
    class View {
    }
    exports.View = View;
    class KeysBoard {
        name;
        symbol;
        keysFn;
        parent;
        requiredVersion;
        constructor(name, symbol, keysFn, parent, requiredVersion) {
            this.name = name;
            this.symbol = symbol;
            this.keysFn = keysFn;
            this.parent = parent;
            this.requiredVersion = requiredVersion;
        }
    }
    exports.KeysBoard = KeysBoard;
    class Board {
        name;
        symbol;
        pagesFn;
        requiredOS;
        constructor(name, symbol, pagesFn, requiredOS = undefined) {
            this.name = name;
            this.symbol = symbol;
            this.pagesFn = pagesFn;
            this.requiredOS = requiredOS;
        }
        getPages(settings) {
            return this.pagesFn(this, settings.isoKeyboard ? layout_2.IsoFreeKeys : layout_2.AnsiFreeKeys);
        }
        static fromKeys(name, symbol, keysFn, parent, requiredVersion) {
            return new Board(name, symbol, (b, freeKeys) => {
                const keys = keysFn(b);
                const fixedKeys = {
                    [41]: parent ? new key_2.BackKey(parent) : new key_2.ConfigKey(),
                    [15]: new key_2.SearchKey()
                };
                if (keys.length > freeKeys.length) {
                    let pages = 1;
                    while (keys.length > pages * (freeKeys.length - Math.min(pages, MAX_PAGES))) {
                        pages++;
                    }
                    pages = Math.min(pages, MAX_PAGES);
                    const perPage = freeKeys.length - Math.min(pages, MAX_PAGES);
                    return range(pages).map((i) => {
                        const page = []
                            .concat(range(pages).map((j) => new key_2.PageKey(b, j, i == j)))
                            .concat(keys.slice(i * perPage, i * perPage + perPage));
                        return { ...fixedKeys, ...mapKeysToSlots(freeKeys, page) };
                    });
                }
                else {
                    return [{ ...fixedKeys, ...mapKeysToSlots(freeKeys, keys) }];
                }
            }, requiredVersion);
        }
        static fromEmoji(k, parent) {
            return this.fromKeys(k.name, k.symbol, (b) => {
                const keys = [];
                for (const content of k.content) {
                    for (const chr of (0, emojis_1.getSubGroup)(content.group, content.subGroup)) {
                        keys.push(chr.symbol.length ? new key_2.CharKey(chr, b) : key_2.BlankKey);
                    }
                }
                return keys;
            }, parent, k.requiredVersion);
        }
        static fromAlternates(parent, base) {
            return this.fromKeys(base.name, base.symbol, (b) => base.alternates?.map((chr) => new key_2.CharKey(chr, b)) ?? [], parent, base.requiredVersion);
        }
        showStatus(str) {
            if (!str.length)
                return this.hideStatus();
            (0, ahk_2.ahkTitle)(this.name + ": " + toTitleCase(str));
        }
        hideStatus() {
            (0, ahk_2.ahkTitle)(this.name);
        }
    }
    exports.Board = Board;
});
define("osversion", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Version = void 0;
    class Version {
        version;
        known = new Set();
        knownLesser = new Set();
        knownGreater = new Set();
        knownSame = new Set();
        constructor(version) {
            this.version = Version.parse(version);
        }
        static parse(v) {
            if (!/^[.0-9]+$/.test(v.trim())) {
                console.error("Invalid version", v);
                return [0];
            }
            return v.split(/\./).map(part => parseInt(part, 10));
        }
        static compare(a, b) {
            for (let i = 0; i < a.length; i++) {
                if (i >= b.length)
                    return a.slice(i).some((p) => p > 0) ? 1 : 0;
                if (a[i] > b[i])
                    return 1;
                if (a[i] < b[i])
                    return -1;
            }
            if (a.length == b.length)
                return 0;
            return b.slice(a.length).some((p) => p > 0) ? -1 : 0;
        }
        add(other) {
            const cmp = Version.compare(this.version, Version.parse(other));
            this.known.add(other);
            if (cmp > 0)
                this.knownLesser.add(other);
            else if (cmp < 0)
                this.knownGreater.add(other);
            else
                this.knownSame.add(other);
        }
        ge(other) {
            if (!this.known.has(other))
                this.add(other);
            return !this.knownLesser.has(other);
        }
        le(other) {
            if (!this.known.has(other))
                this.add(other);
            return !this.knownGreater.has(other);
        }
        eq(other) {
            if (!this.known.has(other))
                this.add(other);
            return this.knownSame.has(other);
        }
    }
    exports.Version = Version;
});
define("search", ["require", "exports", "preact", "layout", "key", "board", "emojis", "preact/hooks", "preact"], function (require, exports, preact_4, layout_3, key_3, board_3, emojis_2, hooks_3, preact_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSearchBoard = exports.SearchView = void 0;
    function SearchView(p) {
        (0, hooks_3.useEffect)(() => p.app.setSearchBoard(getSearchBoard(p.searchText)), [p.searchText]);
        (0, hooks_3.useEffect)(() => document.querySelector('input[type="search"]')?.focus(), []);
        const pages = (0, hooks_3.useMemo)(() => p.sharedState.searchBoard.getPages(p.config), [p.sharedState.searchBoard, p.config]);
        const keys = pages[0];
        p.app.keyHandlers = keys;
        const table = layout_3.SearchKeyCodesTable;
        const onInput = (0, hooks_3.useCallback)((e) => p.app.setSearchText(e.target.value), [p.app]);
        return (0, preact_4.h)("div", { class: "keyboard" },
            (0, preact_4.h)("input", { type: "search", value: p.searchText, onInput: onInput }),
            table.map((code, row) => (0, preact_4.h)(preact_5.Fragment, { key: code }, (keys[code] ?? key_3.BlankKey).render(p, code))));
    }
    exports.SearchView = SearchView;
    function getSearchBoard(needle) {
        return new board_3.Board("Search", "🔎", (b) => [
            {
                [41]: new key_3.ExitSearchKey(),
                [15]: new key_3.ExitSearchKey(),
                ...(0, board_3.mapKeysToSlots)(layout_3.SearchKeyCodes, (0, emojis_2.search)(needle).map((c) => new key_3.CharKey(c, b)))
            }
        ]);
    }
    exports.getSearchBoard = getSearchBoard;
});
define("helpers", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unreachable = void 0;
    function unreachable(x) {
        console.error("Unexpected", x);
        throw new Error("Unexpected: " + x);
    }
    exports.unreachable = unreachable;
});
define("app", ["require", "exports", "preact", "layout", "board", "osversion", "ahk", "search", "emojis", "config", "helpers"], function (require, exports, preact_6, layout_4, board_4, osversion_1, ahk_3, search_1, emojis_3, config_1, helpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppMode = void 0;
    var AppMode;
    (function (AppMode) {
        AppMode[AppMode["MAIN"] = 0] = "MAIN";
        AppMode[AppMode["SEARCH"] = 1] = "SEARCH";
        AppMode[AppMode["SETTINGS"] = 2] = "SETTINGS";
    })(AppMode = exports.AppMode || (exports.AppMode = {}));
    class App extends preact_6.Component {
        keyHandlers = {};
        state = {
            mode: 0,
            searchText: '',
            layout: layout_4.SystemLayoutUS,
            config: { ...config_1.DefaultConfig, opacity: 1 },
            sharedState: {
                board: (0, board_4.getMainBoard)(),
                searchBoard: (0, search_1.getSearchBoard)(''),
                configPage: config_1.DefaultConfigPage,
                state: {}
            },
            os: new osversion_1.Version('99')
        };
        constructor(props) {
            super(props);
            window.document.ahk = this;
            window.s = emojis_3.search;
            window.chrome?.webview?.addEventListener('message', (e) => {
                if (Array.isArray(e.data)) {
                    switch (e.data[0]) {
                        case 'input':
                            this.input(e.data[1], e.data[2]);
                            break;
                        case 'layout':
                            this.setSystemLayout(e.data[1]);
                            break;
                        case 'size':
                            this.updateConfig({ width: e.data[1], height: e.data[2] });
                            break;
                        default:
                            console.log("message", e.data[0], e.data);
                    }
                }
                else if (typeof e.data === 'string') {
                    const command = e.data.split(',', 1)[0];
                    const rest = e.data.slice(command.length + 1);
                    switch (command) {
                        case 'config':
                            this.setConfig(rest);
                            break;
                        case 'defaultConfig':
                            this.defaultConfig();
                            break;
                        case 'os':
                            this.setOS(rest);
                            break;
                        default:
                            console.log("message", command, rest);
                    }
                }
                else {
                    console.log("message", e.data);
                }
            });
        }
        render() {
            const s = this.state;
            let c;
            switch (s.mode) {
                case 0:
                    c = (0, preact_6.h)(board_4.KeyboardView, { ...s, app: this });
                    break;
                case 1:
                    c = (0, preact_6.h)(search_1.SearchView, { ...s, app: this });
                    break;
                case 2:
                    c = (0, preact_6.h)(config_1.ConfigView, { ...s, app: this });
                    break;
                default:
                    return (0, helpers_1.unreachable)(s.mode);
            }
            const layout = s.config.isoKeyboard ? 'iso-layout' : 'ansi-layout';
            return (0, preact_6.h)("div", { class: `root ${s.config.themeMode}-color-scheme ${layout}` }, c);
        }
        setMode(mode) {
            this.setState((s) => {
                if (s.mode != mode) {
                    if (mode == 1)
                        (0, ahk_3.ahkSetSearch)(true);
                    if (s.mode == 1)
                        (0, ahk_3.ahkSetSearch)(false);
                }
                return { mode };
            }, () => {
                this.updateStatus();
            });
        }
        updateStatus(text) {
            const s = this.state;
            switch (s.mode) {
                case 0:
                    (0, ahk_3.ahkTitle)(s.sharedState.board.name + (text?.length ? `: ${(0, board_4.toTitleCase)(text)}` : ''));
                    break;
                case 1:
                    (0, ahk_3.ahkTitle)('Emoji Keyboard - Search' + (s.searchText.length ? `: ${(0, board_4.toTitleCase)(s.searchText)}` : ''));
                    break;
                case 2:
                    (0, ahk_3.ahkTitle)('Emoji Keyboard - Settings');
                    break;
                default:
                    return (0, helpers_1.unreachable)(s.mode);
            }
        }
        input(key, shift = false) {
            const s = this.state;
            switch (s.mode) {
                case 0:
                case 1:
                case 2:
                    const k = this.keyHandlers[key];
                    if (k) {
                        if (shift)
                            k.actAlternate(this);
                        else
                            k.act(this);
                    }
                    break;
                default:
                    return (0, helpers_1.unreachable)(s.mode);
            }
        }
        setConfig(config) {
            this.updateConfig(JSON.parse(config), false);
        }
        defaultConfig() {
            (0, ahk_3.ahkSaveConfig)(JSON.stringify(this.state.config));
            (0, ahk_3.ahkSetOpacity)(this.state.config.opacity);
        }
        updateConfig(config, save = true) {
            this.setState((s) => {
                if (config.theme && s.config.theme != config.theme) {
                    const link = document.getElementById('themeCSS');
                    link.href = config_1.ThemesMap.get(config.theme)?.url ?? config_1.DefaultThemeUrl;
                }
                if (config.opacity && s.config.opacity != config.opacity) {
                    (0, ahk_3.ahkSetOpacity)(config.opacity);
                }
                if (config.devTools && !s.config.devTools) {
                    (0, ahk_3.ahkOpenDevTools)();
                }
                return { config: { ...s.config, ...config } };
            }, () => {
                if (save)
                    (0, ahk_3.ahkSaveConfig)(JSON.stringify(this.state.config));
            });
        }
        setOS(os) {
            os = os.replace(/^WIN_/, '');
            this.setState({ os: new osversion_1.Version(os) });
        }
        setSystemLayout(layout) {
            this.setState({ layout: { ...layout_4.SystemLayoutUS, ...layout } });
        }
        setSearchText(searchText) {
            this.setState({ searchText }, () => this.updateStatus());
        }
        setBoard(board) {
            this.setState((s) => ({ sharedState: { ...s.sharedState, board } }), () => this.updateStatus());
        }
        setSearchBoard(searchBoard) {
            this.setState((s) => ({ sharedState: { ...s.sharedState, searchBoard } }), () => this.updateStatus());
        }
        setConfigPage(configPage) {
            this.setState((s) => ({ sharedState: { ...s.sharedState, configPage } }));
        }
        setPage(name, page) {
            this.setState((s) => ({ sharedState: { ...s.sharedState, state: { ...s.sharedState.state, [name]: { page } } } }));
        }
    }
    const main = document.querySelector('main');
    preact_6.options.debounceRendering = f => setTimeout(f, 0);
    (0, preact_6.render)((0, preact_6.h)(App, null), main);
    setTimeout(() => (0, ahk_3.ahkReady)(), 0);
});
//# sourceMappingURL=script.js.map