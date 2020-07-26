var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define("ahk", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ahkSetSearch = exports.ahkSend = exports.ahkReady = exports.ahkTitle = void 0;
    function isAHK() {
        return typeof AHK !== 'undefined';
    }
    function ahkTitle(title) {
        if (isAHK())
            AHK("SetTitle", title);
        else
            document.title = title;
    }
    exports.ahkTitle = ahkTitle;
    function ahkReady() {
        if (isAHK())
            AHK("Ready");
        else
            console.log("Ready");
    }
    exports.ahkReady = ahkReady;
    function ahkSend(symbol) {
        if (isAHK())
            AHK("Send", symbol);
        else
            console.log("Send", symbol);
    }
    exports.ahkSend = ahkSend;
    function ahkSetSearch(state) {
        if (isAHK()) {
            AHK("SetSearch", state);
        }
        else {
            console.log("SetSearch", state);
            window.document.ahk.setSearch(state);
        }
    }
    exports.ahkSetSearch = ahkSetSearch;
});
define("layout", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchKeyCodes = exports.KeyCodes = exports.SearchKeyCodesTable = exports.KeyCodesTable = exports.DefaultLayout = void 0;
    exports.DefaultLayout = {
        name: 'default',
        keys: {
            0: '',
            1: 'ESC', 59: 'F1', 60: 'F2', 61: 'F3', 62: 'F4', 63: 'F5', 64: 'F6', 65: 'F7', 66: 'F8', 67: 'F9', 68: 'F10', 87: 'F11', 88: 'F12',
            14: 'BKSP', 15: 'Tab', 58: 'Caps Lk', 28: 'Enter', 42: 'Shift', 29: 'CTRL', 91: 'WIN', 56: 'ALT',
            41: '`', 2: '1', 3: '2', 4: '3', 5: '4', 6: '5', 7: '6', 8: '7', 9: '8', 10: '9', 11: '0', 12: '-', 13: '=',
            16: 'q', 17: 'w', 18: 'e', 19: 'r', 20: 't', 21: 'y', 22: 'u', 23: 'i', 24: 'o', 25: 'p', 26: '[', 27: ']', 43: '\\',
            30: 'a', 31: 's', 32: 'd', 33: 'f', 34: 'g', 35: 'h', 36: 'j', 37: 'k', 38: 'l', 39: ';', 40: '\'',
            86: '<', 44: 'z', 45: 'x', 46: 'c', 47: 'v', 48: 'b', 49: 'n', 50: 'm', 51: ',', 52: '.', 53: '/'
        }
    };
    exports.KeyCodesTable = [
        [41, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        [58, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43],
        [42, 86, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 0]
    ];
    exports.SearchKeyCodesTable = [
        [41, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013],
        [1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026],
    ];
    exports.KeyCodes = [41, 15, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
    exports.SearchKeyCodes = [41, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026];
});
define("osversion", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Version = void 0;
    var Version = (function () {
        function Version(version) {
            this.known = new Set();
            this.knownLesser = new Set();
            this.knownGreater = new Set();
            this.knownSame = new Set();
            this.version = Version.parse(version);
        }
        Version.parse = function (v) {
            if (!/^[.0-9]+$/.test(v.trim())) {
                console.error("Invalid version", v);
                return [0];
            }
            return v.split(/\./).map(function (part) { return parseInt(part, 10); });
        };
        Version.compare = function (a, b) {
            for (var i = 0; i < a.length; i++) {
                if (i >= b.length)
                    return a.slice(i).some(function (p) { return p > 0; }) ? 1 : 0;
                if (a[i] > b[i])
                    return 1;
                if (a[i] < b[i])
                    return -1;
            }
            if (a.length == b.length)
                return 0;
            return b.slice(a.length).some(function (p) { return p > 0; }) ? -1 : 0;
        };
        Version.prototype.add = function (other) {
            var cmp = Version.compare(this.version, Version.parse(other));
            this.known.add(other);
            if (cmp > 0)
                this.knownLesser.add(other);
            else if (cmp < 0)
                this.knownGreater.add(other);
            else
                this.knownSame.add(other);
        };
        Version.prototype.ge = function (other) {
            if (!this.known.has(other))
                this.add(other);
            return !this.knownLesser.has(other);
        };
        Version.prototype.le = function (other) {
            if (!this.known.has(other))
                this.add(other);
            return !this.knownGreater.has(other);
        };
        Version.prototype.eq = function (other) {
            if (!this.known.has(other))
                this.add(other);
            return this.knownSame.has(other);
        };
        return Version;
    }());
    exports.Version = Version;
});
define("key", ["require", "exports", "preact", "board", "ahk"], function (require, exports, preact_1, board_1, ahk_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CharKey = exports.ExitSearchKey = exports.SearchKey = exports.PageKey = exports.KeyboardKey = exports.BackKey = exports.BlankKey = exports.Key = void 0;
    function toTwemojiFilename(symbol) {
        var name = [];
        for (var i = 0; i < symbol.length; i++) {
            var c = symbol.codePointAt(i).toString(16);
            name.push(c);
            if (symbol.charCodeAt(i) != symbol.codePointAt(i))
                i++;
        }
        var filename = name.join('-') + '.svg';
        if (filename.indexOf('200d') === -1)
            filename = filename.replace(/-fe0f/g, '');
        return 'img/' + filename;
    }
    var Key = (function () {
        function Key(props) {
            var _a, _b, _c, _d;
            this.name = props.name;
            this.upperName = (_a = props.upperName) !== null && _a !== void 0 ? _a : '';
            this.symbol = props.symbol;
            this.style = (_b = props.style) !== null && _b !== void 0 ? _b : '';
            this.requiredOS = (_c = props.requiredOS) !== null && _c !== void 0 ? _c : '0';
            this.active = (_d = props.active) !== null && _d !== void 0 ? _d : false;
        }
        Key.prototype.render = function (app, b, code, layout, os) {
            var _this = this;
            var useFallback = os.ge(this.requiredOS);
            var keyType = "action";
            if (!this.name.length) {
                keyType = "empty";
            }
            else if (this instanceof CharKey) {
                keyType = "char";
            }
            else if (this instanceof BackKey) {
                keyType = "back";
            }
            return preact_1.h("div", { class: "key " + keyType + " " + (this.hasAlternate() && 'alt') + " " + (this.isLULetter() && 'lu') + " " + (this.active && 'active'), onClick: function (e) { e.preventDefault(); e.shiftKey ? _this.actAlternate(app, b) : _this.act(app, b); }, onContextMenu: function (e) { e.preventDefault(); _this.actAlternate(app, b); }, onMouseOver: function () { return b.showStatus(_this.name); } },
                preact_1.h("div", { class: "keyname" }, layout.keys[code]),
                preact_1.h("div", { class: "name" }, this.name),
                preact_1.h("div", { class: "uname" }, this.upperName),
                preact_1.h("div", { class: "symbol " + (this.style && 's-' + this.style) }, useFallback ? preact_1.h("img", { src: toTwemojiFilename(this.symbol), alt: this.symbol }) : this.symbol));
        };
        Key.prototype.act = function (app, parent) {
        };
        Key.prototype.actAlternate = function (app, parent) {
            this.act(app, parent);
        };
        Key.prototype.hasAlternate = function () {
            return false;
        };
        Key.prototype.isLULetter = function () {
            return false;
        };
        return Key;
    }());
    exports.Key = Key;
    exports.BlankKey = new Key({ name: '', symbol: '' });
    var BackKey = (function (_super) {
        __extends(BackKey, _super);
        function BackKey(parent) {
            var _this = _super.call(this, { name: 'back', symbol: '←' }) || this;
            _this.parent = parent;
            return _this;
        }
        BackKey.prototype.act = function (app) {
            app.showBoard(this.parent);
        };
        return BackKey;
    }(Key));
    exports.BackKey = BackKey;
    var KeyboardKey = (function (_super) {
        __extends(KeyboardKey, _super);
        function KeyboardKey(target) {
            var _this = _super.call(this, { name: target.name, symbol: target.symbol, requiredOS: target.requiredOS }) || this;
            _this.target = target;
            return _this;
        }
        KeyboardKey.prototype.act = function (app) {
            app.showBoard(this.target);
        };
        return KeyboardKey;
    }(Key));
    exports.KeyboardKey = KeyboardKey;
    var PageKey = (function (_super) {
        __extends(PageKey, _super);
        function PageKey(page, active) {
            var _this = _super.call(this, { name: "page " + (page + 1), symbol: '' + (page + 1), active: active }) || this;
            _this.page = page;
            return _this;
        }
        PageKey.prototype.act = function (app) {
            if (!this.active)
                app.setPage(this.page);
        };
        return PageKey;
    }(Key));
    exports.PageKey = PageKey;
    var SearchKey = (function (_super) {
        __extends(SearchKey, _super);
        function SearchKey() {
            return _super.call(this, { name: 'search', symbol: '🔎' }) || this;
        }
        SearchKey.prototype.act = function (app) {
            ahk_1.ahkSetSearch(true);
        };
        return SearchKey;
    }(Key));
    exports.SearchKey = SearchKey;
    var ExitSearchKey = (function (_super) {
        __extends(ExitSearchKey, _super);
        function ExitSearchKey() {
            return _super.call(this, { name: 'back', symbol: '←' }) || this;
        }
        ExitSearchKey.prototype.act = function (app) {
            ahk_1.ahkSetSearch(false);
        };
        return ExitSearchKey;
    }(Key));
    exports.ExitSearchKey = ExitSearchKey;
    var CharKey = (function (_super) {
        __extends(CharKey, _super);
        function CharKey(char) {
            var _a, _b;
            var _this = _super.call(this, {
                name: (char.name || char.fullName).toLowerCase(),
                upperName: ((_a = char.alternates) === null || _a === void 0 ? void 0 : _a.length) == 2 ? char.alternates[1].show : "",
                style: char.style,
                symbol: (_b = char.show) !== null && _b !== void 0 ? _b : char.symbol,
                requiredOS: char.requiredVersion,
            }) || this;
            _this.char = char;
            return _this;
        }
        CharKey.prototype.act = function (app) {
            ahk_1.ahkSend(this.char.symbol);
        };
        CharKey.prototype.actAlternate = function (app, parent) {
            if (this.hasAlternate()) {
                app.showBoard(board_1.Board.fromAlternates(parent, this.char));
            }
            else if (this.isLULetter()) {
                ahk_1.ahkSend(this.char.alternates[1].symbol);
            }
            else
                return this.act(app);
        };
        CharKey.prototype.getUName = function () {
            if (this.isLULetter())
                return this.char.alternates[1].show;
            else
                return "";
        };
        CharKey.prototype.hasAlternate = function () {
            return !!this.char.alternates && this.char.alternates.length > 2;
        };
        CharKey.prototype.isLULetter = function () {
            var _a;
            return ((_a = this.char.alternates) === null || _a === void 0 ? void 0 : _a.length) == 2;
        };
        return CharKey;
    }(Key));
    exports.CharKey = CharKey;
});
define("emojis", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.search = exports.getSubGroup = void 0;
    var indexedEmojis = {};
    var flatEmojis = [];
    var searchHaystack = "";
    var ESCAPE_REGEX = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-'].join('|\\') + ')', 'g');
    var SEPARATOR = '%';
    var SEPARATOR_REGEX_G = /%/g;
    var SEARCH_ID = SEPARATOR + '(\\d+)' + SEPARATOR + '[^' + SEPARATOR + ']+';
    data.emojis.forEach(function (emoji) {
        if (!indexedEmojis[emoji.group])
            indexedEmojis[emoji.group] = {};
        if (!indexedEmojis[emoji.group][emoji.subGroup])
            indexedEmojis[emoji.group][emoji.subGroup] = [];
        indexedEmojis[emoji.group][emoji.subGroup].push(emoji);
        (!emoji.alternates || !emoji.alternates.length ? [emoji] : emoji.alternates)
            .forEach(function (e) {
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
        var result = [];
        needle.split(/\s+/g).forEach(function (n, k) {
            var filter = [];
            if (!n.length)
                return;
            var re = new RegExp(SEARCH_ID + escapeRegex(n.replace(SEPARATOR_REGEX_G, '')), 'ig');
            for (var m = void 0; (m = re.exec(searchHaystack));) {
                filter.push(parseInt(m[1]));
            }
            if (k == 0)
                result = filter;
            else
                result = result.filter(function (v) { return filter.indexOf(v) !== -1; });
        });
        return result.map(function (v) { return flatEmojis[v]; });
    }
    exports.search = search;
});
define("board", ["require", "exports", "key", "preact", "layout", "ahk", "emojis"], function (require, exports, key_1, preact_2, layout_1, ahk_2, emojis_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Board = exports.createPage = exports.KeyboardView = exports.getMainBoard = exports.DefaultBoardState = void 0;
    exports.DefaultBoardState = { page: 0 };
    function getMainBoard() {
        return Board.fromKeys('Main keyboard', '⌨', function (b) { return data.keyboards.map(function (k) { return new key_1.KeyboardKey(Board.fromEmoji(k, b)); }); });
    }
    exports.getMainBoard = getMainBoard;
    var MAX_PAGES = 12;
    function KeyboardView(_a) {
        var layout = _a.layout, board = _a.board, boardState = _a.boardState, os = _a.os, app = _a.app;
        var keys = board.getPage(boardState);
        return preact_2.h("div", { class: "keyboard" }, layout_1.KeyCodesTable.map(function (codes, row) {
            return preact_2.h("div", { class: "row", key: row, style: { height: 100 / layout_1.KeyCodesTable.length + 'vh' } }, codes.map(function (code) { var _a; return ((_a = keys[code]) !== null && _a !== void 0 ? _a : key_1.BlankKey).render(app, board, code, layout, os); }));
        }));
    }
    exports.KeyboardView = KeyboardView;
    function createPage(codes, keys) {
        var mapped = {};
        for (var _i = 0, _a = Array.from(codes.entries()); _i < _a.length; _i++) {
            var _b = _a[_i], index = _b[0], code = _b[1];
            if (keys[index])
                mapped[code] = keys[index];
        }
        return mapped;
    }
    exports.createPage = createPage;
    function toTitleCase(str) {
        return str.replace(/\\?\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    function range(stop) {
        return Array.from((new Array(stop)).keys());
    }
    var Board = (function () {
        function Board(name, symbol, pagesFn, requiredOS) {
            if (requiredOS === void 0) { requiredOS = undefined; }
            this.name = name;
            this.symbol = symbol;
            this.pagesFn = pagesFn;
            this.requiredOS = requiredOS;
            this.lastState = exports.DefaultBoardState;
            this.pages = pagesFn(this);
        }
        Board.fromKeys = function (name, symbol, keysFn, parent, requiredVersion) {
            return new Board(name, symbol, function (b) {
                var keys = keysFn(b);
                var fixedKeys = [
                    parent ? new key_1.BackKey(parent) : key_1.BlankKey,
                    new key_1.SearchKey()
                ];
                if (fixedKeys.length + keys.length > layout_1.KeyCodes.length) {
                    var pages_1 = 1;
                    while (keys.length > pages_1 * (layout_1.KeyCodes.length - fixedKeys.length - Math.min(pages_1, MAX_PAGES))) {
                        pages_1++;
                    }
                    pages_1 = Math.min(pages_1, MAX_PAGES);
                    var perPage_1 = layout_1.KeyCodes.length - fixedKeys.length - Math.min(pages_1, MAX_PAGES);
                    return range(pages_1).map(function (i) {
                        var page = []
                            .concat(fixedKeys)
                            .concat(range(pages_1).map(function (j) { return new key_1.PageKey(j, i == j); }))
                            .concat(keys.slice(i * perPage_1, i * perPage_1 + perPage_1));
                        return createPage(layout_1.KeyCodes, page);
                    });
                }
                else {
                    return [createPage(layout_1.KeyCodes, fixedKeys.concat(keys))];
                }
            }, requiredVersion);
        };
        Board.fromEmoji = function (k, parent) {
            var keys = [];
            for (var _i = 0, _a = k.content; _i < _a.length; _i++) {
                var content = _a[_i];
                for (var _b = 0, _c = emojis_1.getSubGroup(content.group, content.subGroup); _b < _c.length; _b++) {
                    var chr = _c[_b];
                    keys.push(chr.symbol.length ? new key_1.CharKey(chr) : key_1.BlankKey);
                }
            }
            return this.fromKeys(k.name, k.symbol, function () { return keys; }, parent, k.requiredVersion);
        };
        Board.fromAlternates = function (parent, base) {
            var _a, _b;
            var keys = (_b = (_a = base.alternates) === null || _a === void 0 ? void 0 : _a.map(function (chr) { return new key_1.CharKey(chr); })) !== null && _b !== void 0 ? _b : [];
            return this.fromKeys(base.name, base.symbol, function () { return keys; }, parent, base.requiredVersion);
        };
        Board.prototype.getPage = function (state) {
            var _a;
            this.lastState = state;
            return (_a = this.pages[state.page]) !== null && _a !== void 0 ? _a : this.pages[0];
        };
        Board.prototype.showStatus = function (str) {
            if (!str.length)
                return this.hideStatus();
            ahk_2.ahkTitle(this.name + ": " + toTitleCase(str));
        };
        Board.prototype.hideStatus = function () {
            ahk_2.ahkTitle(this.name);
        };
        Board.prototype.input = function (app, state, key, shift) {
            var page = this.getPage(state);
            var k = page[key];
            if (k) {
                if (shift)
                    k.actAlternate(app, this);
                else
                    k.act(app, this);
            }
        };
        return Board;
    }());
    exports.Board = Board;
});
define("search", ["require", "exports", "preact", "layout", "key", "board", "emojis"], function (require, exports, preact_3, layout_2, key_2, board_2, emojis_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSearchBoard = exports.SearchView = void 0;
    function SearchView(_a) {
        var layout = _a.layout, os = _a.os, board = _a.board, app = _a.app;
        var keys = board.getPage({ page: 0 });
        var table = layout_2.SearchKeyCodesTable;
        return preact_3.h("div", { class: "keyboard" }, table.map(function (codes, row) {
            return preact_3.h("div", { class: "row", key: row, style: { height: 100 / table.length + 'vh' } }, codes.map(function (code) { var _a; return ((_a = keys[code]) !== null && _a !== void 0 ? _a : key_2.BlankKey).render(app, board, code, layout, os); }));
        }));
    }
    exports.SearchView = SearchView;
    function getSearchBoard(needle) {
        return new board_2.Board('Search', '🔎', function () {
            var fixedKeys = [new key_2.ExitSearchKey()];
            var result = emojis_2.search(needle);
            var keys = result
                .slice(0, layout_2.SearchKeyCodes.length)
                .map(function (c) { return new key_2.CharKey(c); });
            return [board_2.createPage(layout_2.SearchKeyCodes, fixedKeys.concat(keys))];
        });
    }
    exports.getSearchBoard = getSearchBoard;
});
define("app", ["require", "exports", "preact", "layout", "board", "osversion", "ahk", "search", "emojis"], function (require, exports, preact_4, layout_3, board_3, osversion_1, ahk_3, search_1, emojis_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                search: false,
                searchText: '',
                searchBoard: search_1.getSearchBoard(''),
                layout: layout_3.DefaultLayout,
                board: board_3.getMainBoard(),
                boardState: board_3.DefaultBoardState,
                os: new osversion_1.Version('99')
            };
            window.document.ahk = _this;
            window.s = emojis_3.search;
            return _this;
        }
        App.prototype.render = function () {
            var s = this.state;
            if (this.state.search) {
                return preact_4.h(search_1.SearchView, { layout: s.layout, os: s.os, board: s.searchBoard, app: this });
            }
            else {
                return preact_4.h(board_3.KeyboardView, { layout: s.layout, board: s.board, boardState: s.boardState, os: s.os, app: this });
            }
        };
        App.prototype.setSearch = function (search) {
            this.setState({ search: search });
            if (search)
                ahk_3.ahkTitle('Emoji Keyboard - Search');
            else
                ahk_3.ahkTitle(this.state.board.name);
        };
        App.prototype.input = function (key, shift) {
            if (shift === void 0) { shift = false; }
            var s = this.state;
            if (s.search) {
                s.searchBoard.input(this, { page: 0 }, key, shift);
            }
            else {
                s.board.input(this, s.boardState, key, shift);
            }
        };
        App.prototype.setKeymap = function (keymap) {
            if (data.keymaps[keymap]) {
                var k = data.keymaps[keymap];
                var layout = { name: k.name, keys: __assign(__assign({}, layout_3.DefaultLayout.keys), k.keys) };
                this.setState({ layout: layout });
            }
            else {
                var keymaps = Array.from(Object.keys(data.keymaps)).slice(1).join(", ");
                alert(keymap + " is not a valid keymap!\nValid keymaps are " + keymaps);
            }
        };
        App.prototype.setOS = function (os) {
            os = os.replace(/^WIN_/, '');
            this.setState({ os: new osversion_1.Version(os) });
        };
        App.prototype.setSearchText = function (searchText) {
            this.setState({ searchText: searchText, searchBoard: search_1.getSearchBoard(searchText) });
            ahk_3.ahkTitle('Text: ' + searchText);
        };
        App.prototype.showBoard = function (board) {
            this.setState({ board: board, boardState: board.lastState });
            ahk_3.ahkTitle(board.name);
        };
        App.prototype.setPage = function (page) {
            this.setState({ boardState: { page: page } });
        };
        return App;
    }(preact_4.Component));
    var main = document.querySelector('main');
    preact_4.options.debounceRendering = function (f) { return setTimeout(f, 0); };
    preact_4.render(preact_4.h(App, null), main);
    setTimeout(function () { return ahk_3.ahkReady(); }, 0);
});
//# sourceMappingURL=script.js.map