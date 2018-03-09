"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Main = (function () {
    function Main(base) {
        this.base = base;
        this.view = new View.BaseView(this.base);
        document.ahk = this.view;
    }
    return Main;
}());
var main;
$(document).ready(function () {
    main = new Main(document.querySelector('main'));
    setTimeout(function () { return Workers.AHKWrk.ready(); }, 0);
});
if (!String.prototype.codePointAt) {
    (function () {
        'use strict';
        var codePointAt = function (position) {
            if (this == null) {
                throw TypeError();
            }
            var string = String(this);
            var size = string.length;
            var index = position ? Number(position) : 0;
            if (index != index) {
                index = 0;
            }
            if (index < 0 || index >= size) {
                return undefined;
            }
            var first = string.charCodeAt(index);
            var second;
            if (first >= 0xD800 && first <= 0xDBFF &&
                size > index + 1) {
                second = string.charCodeAt(index + 1);
                if (second >= 0xDC00 && second <= 0xDFFF) {
                    return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                }
            }
            return first;
        };
        if (Object.defineProperty) {
            Object.defineProperty(String.prototype, 'codePointAt', {
                'value': codePointAt,
                'configurable': true,
                'writable': true
            });
        }
        else {
            String.prototype.codePointAt = codePointAt;
        }
    }());
}
if (!String.prototype.getCodePointLength) {
    (function () {
        'use strict';
        var getCodePointLength = function () {
            return this.length - this.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g).length + 1;
        };
        if (Object.defineProperty) {
            Object.defineProperty(String.prototype, 'getCodePointLength', {
                'value': getCodePointLength,
                'configurable': true,
                'writable': true
            });
        }
        else {
            String.prototype.getCodePointLength = getCodePointLength;
        }
    }());
}
var Workers;
(function (Workers) {
    var AHKWrk = (function () {
        function AHKWrk() {
        }
        AHKWrk.isAHK = function () {
            return typeof AHK !== 'undefined';
        };
        AHKWrk.setTitle = function (title) {
            if (this.isAHK())
                AHK("SetTitle", title);
            else
                document.title = title;
        };
        AHKWrk.ready = function () {
            if (this.isAHK())
                AHK("Ready");
            else
                console.log("Ready");
        };
        AHKWrk.send = function (symbol) {
            if (this.isAHK())
                AHK("Send", symbol);
            else
                console.log("Send", symbol);
        };
        AHKWrk.setSearch = function (state) {
            if (this.isAHK())
                AHK("SetSearch", state);
            else {
                console.log("SetSearch", state);
            }
        };
        return AHKWrk;
    }());
    Workers.AHKWrk = AHKWrk;
})(Workers || (Workers = {}));
var View;
(function (View_1) {
    var AHKWrk = Workers.AHKWrk;
    var BaseView = (function () {
        function BaseView(base) {
            this.base = base;
            this.keyboardView = new View_1.KeyboardView(this);
            this.keyboardView.show(Workers.Keyboards.getMainKeyboard());
            this.searchView = new View_1.SearchView(this);
            this.loadKeyboard();
        }
        BaseView.prototype.loadKeyboard = function () {
            $(this.base).children().detach();
            this.view = this.keyboardView;
            this.base.appendChild(this.view.getElement());
            AHKWrk.setSearch(false);
        };
        BaseView.prototype.loadSearch = function () {
            $(this.base).children().detach();
            this.view = this.searchView;
            this.base.appendChild(this.view.getElement());
            AHKWrk.setSearch(true);
        };
        BaseView.prototype.input = function (key, shift) {
            if (shift === void 0) { shift = false; }
            this.view.input(key, shift);
        };
        BaseView.prototype.charInput = function (char) {
            this.view.charInput(char);
        };
        BaseView.prototype.setKeymap = function (keymap) {
            this.keyboardView.setKeymap(keymap);
        };
        BaseView.prototype.setOS = function (os) {
            this.keyboardView.setOS(os);
            this.searchView.refresh();
        };
        return BaseView;
    }());
    View_1.BaseView = BaseView;
    var View = (function () {
        function View() {
        }
        View.prototype.input = function (key, shift) {
            if (shift === void 0) { shift = false; }
        };
        View.prototype.charInput = function (char) { };
        return View;
    }());
    View_1.View = View;
})(View || (View = {}));
var Workers;
(function (Workers) {
    var Keyboards;
    (function (Keyboards) {
        function getMainKeyboard() {
            return new Keyboard('Main keyboard', '⌨', data.keyboards.map(function (kdata) { return new Workers.KeyboardKey(new EmojiKeyboard(null, kdata)); }));
        }
        Keyboards.getMainKeyboard = getMainKeyboard;
    })(Keyboards = Workers.Keyboards || (Workers.Keyboards = {}));
    var MAX_PAGES = 12;
    var Keyboard = (function () {
        function Keyboard(name, symbol, keys, requiredVersion) {
            if (requiredVersion === void 0) { requiredVersion = undefined; }
            var _this = this;
            this.name = name;
            this.symbol = symbol;
            this.keys = keys;
            this.requiredVersion = requiredVersion;
            this.page = 0;
            this.fixedKeys = [];
            this.pagedKeys = [];
            this.pageKeys = {};
            this.fixedKeys.push(new Workers.BlankKey());
            this.fixedKeys.push(new Workers.SearchKey());
            this.multipage = this.keys.length > View.KEYS_COUNT - this.fixedKeys.length;
            if (this.multipage) {
                this.pages = 1;
                while (this.keys.length > this.pages * (View.KEYS_COUNT - this.fixedKeys.length - Math.min(this.pages, MAX_PAGES))) {
                    this.pages++;
                }
                var perpage = View.KEYS_COUNT - this.fixedKeys.length - Math.min(this.pages, MAX_PAGES);
                for (var i = 0; i < Math.min(this.pages, MAX_PAGES); i++) {
                    this.fixedKeys.push(this.pageKeys[i] = new Workers.PageKey(i));
                }
                var keysStack = this.keys.slice(0);
                for (var i = 0; i < this.pages; i++) {
                    this.pagedKeys[i] = keysStack.splice(0, perpage);
                }
                this.pageKeys[0].active = true;
            }
            else {
                this.fixedKeys = this.fixedKeys.concat(this.keys);
            }
            this.fixedKeys.forEach(function (k) { if (k instanceof Workers.Key)
                k.setKeyboard(_this); });
            this.pagedKeys.forEach(function (p) { return p.forEach(function (k) { if (k instanceof Workers.Key)
                k.setKeyboard(_this); }); });
        }
        Keyboard.prototype.getName = function () {
            return this.name;
        };
        Keyboard.prototype.getSymbol = function () {
            return this.symbol;
        };
        Keyboard.prototype.getRequiredVersion = function () {
            return this.requiredVersion;
        };
        Keyboard.prototype.getVisible = function () {
            if (this.multipage)
                return [].concat(this.fixedKeys, this.pagedKeys[this.page]);
            else
                return [].concat(this.fixedKeys);
        };
        Keyboard.prototype.getParent = function () {
            return this.parent;
        };
        Keyboard.prototype.setParent = function (keyboard) {
            this.parent = keyboard;
            var back = new Workers.BackKey();
            back.setKeyboard(this);
            this.fixedKeys[0] = back;
        };
        Keyboard.prototype.setKeys = function (keyNames) {
            var _this = this;
            for (var i = 0; i < this.fixedKeys.length; i++) {
                this.fixedKeys[i].key = keyNames[i];
            }
            if (this.multipage)
                this.pagedKeys.forEach(function (page) { return page.forEach(function (key, i) { return key.key = keyNames[i + _this.fixedKeys.length]; }); });
        };
        Keyboard.prototype.setPage = function (page) {
            this.page = page;
            this.fixedKeys.forEach(function (k) { return k.active = false; });
            this.pageKeys[page].active = true;
        };
        return Keyboard;
    }());
    Workers.Keyboard = Keyboard;
    var EmojiKeyboard = (function (_super) {
        __extends(EmojiKeyboard, _super);
        function EmojiKeyboard(parent, kdata) {
            var _this = this;
            var keys = [];
            kdata.content.forEach(function (content) {
                Workers.Emojis.getSubGroup(content.group, content.subGroup).forEach(function (chr) {
                    if (chr.symbol.length)
                        keys.push(new Workers.CharKey(chr));
                    else
                        keys.push(new Workers.BlankKey());
                });
            });
            _this = _super.call(this, kdata.name, kdata.symbol, keys, kdata.requiredVersion) || this;
            return _this;
        }
        return EmojiKeyboard;
    }(Keyboard));
    Workers.EmojiKeyboard = EmojiKeyboard;
    var AlternatesKeyboard = (function (_super) {
        __extends(AlternatesKeyboard, _super);
        function AlternatesKeyboard(parent, base) {
            var _this = this;
            var keys = [];
            if (base.alternates)
                base.alternates.forEach(function (chr) {
                    keys.push(new Workers.CharKey(chr));
                });
            _this = _super.call(this, base.name, base.symbol, keys, base.requiredVersion) || this;
            return _this;
        }
        return AlternatesKeyboard;
    }(Keyboard));
    Workers.AlternatesKeyboard = AlternatesKeyboard;
})(Workers || (Workers = {}));
var Workers;
(function (Workers) {
    var Key = (function () {
        function Key(name, symbol) {
            this.name = name;
            this.symbol = symbol;
            this.active = false;
        }
        Key.prototype.getName = function () {
            return this.name;
        };
        Key.prototype.getUName = function () {
            return "";
        };
        Key.prototype.getSymbol = function () {
            return this.symbol;
        };
        Key.prototype.getSymbolDiv = function (requiredVersion) {
            var container = $('<div class="symbol">');
            var useFallback = View.KeyboardView.compareToOS(requiredVersion) > 0;
            if (!useFallback)
                container.text(this.symbol);
            else {
                container.append($('<img>').attr('src', 'img/' + Key.toTwemojiFilename(this.getSymbol())).attr('alt', this.symbol));
            }
            return container.get(0);
        };
        Key.toTwemojiFilename = function (symbol) {
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
            return filename;
        };
        Key.prototype.setKeyboard = function (keyboard) {
            this.keyboard = keyboard;
        };
        Key.prototype.act = function (view) {
        };
        Key.prototype.actAlternate = function (view) {
            this.act(view);
        };
        Key.prototype.hasAlternate = function () {
            return false;
        };
        Key.prototype.isLULetter = function () {
            return false;
        };
        return Key;
    }());
    Workers.Key = Key;
    var CharKey = (function (_super) {
        __extends(CharKey, _super);
        function CharKey(char) {
            var _this = _super.call(this, (char.name || char.fullName).toLowerCase(), char.symbol) || this;
            _this.char = char;
            return _this;
        }
        CharKey.prototype.getSymbolDiv = function () {
            return _super.prototype.getSymbolDiv.call(this, this.char.requiredVersion);
        };
        CharKey.prototype.act = function () {
            Workers.AHKWrk.send(this.getSymbol());
        };
        CharKey.prototype.actAlternate = function (view) {
            if (this.hasAlternate()) {
                var ak = new Workers.AlternatesKeyboard(this.keyboard, this.char);
                ak.setParent(this.keyboard);
                view.show(ak);
            }
            else if (this.isLULetter()) {
                Workers.AHKWrk.send(this.char.alternates[1].symbol);
            }
            else
                return this.act();
        };
        CharKey.prototype.getUName = function () {
            if (this.isLULetter())
                return this.char.alternates[1].symbol;
            else
                return "";
        };
        CharKey.prototype.hasAlternate = function () {
            return (!!this.char.alternates) && this.char.alternates.length > 2;
        };
        CharKey.prototype.isLULetter = function () {
            return (!!this.char.alternates) && this.char.alternates.length == 2;
        };
        return CharKey;
    }(Key));
    Workers.CharKey = CharKey;
    var KeyboardKey = (function (_super) {
        __extends(KeyboardKey, _super);
        function KeyboardKey(target) {
            var _this = _super.call(this, target.getName(), target.getSymbol()) || this;
            _this.target = target;
            return _this;
        }
        KeyboardKey.prototype.act = function (view) {
            view.show(this.target);
        };
        KeyboardKey.prototype.setKeyboard = function (keyboard) {
            _super.prototype.setKeyboard.call(this, keyboard);
            this.target.setParent(keyboard);
        };
        KeyboardKey.prototype.getSymbolDiv = function () {
            return _super.prototype.getSymbolDiv.call(this, this.target.getRequiredVersion());
        };
        return KeyboardKey;
    }(Key));
    Workers.KeyboardKey = KeyboardKey;
    var PageKey = (function (_super) {
        __extends(PageKey, _super);
        function PageKey(page) {
            var _this = _super.call(this, 'page ' + (page + 1), '' + (page + 1)) || this;
            _this.page = page;
            return _this;
        }
        PageKey.prototype.act = function (view) {
            this.keyboard.setPage(this.page);
            view.refresh();
        };
        return PageKey;
    }(Key));
    Workers.PageKey = PageKey;
    var BackKey = (function (_super) {
        __extends(BackKey, _super);
        function BackKey() {
            return _super.call(this, 'back', '←') || this;
        }
        BackKey.prototype.act = function (view) {
            if (this.keyboard.getParent())
                view.show(this.keyboard.getParent());
        };
        return BackKey;
    }(Key));
    Workers.BackKey = BackKey;
    var SearchKey = (function (_super) {
        __extends(SearchKey, _super);
        function SearchKey() {
            return _super.call(this, 'search', '🔎') || this;
        }
        SearchKey.prototype.act = function (view) {
            view.getBaseView().loadSearch();
        };
        return SearchKey;
    }(Key));
    Workers.SearchKey = SearchKey;
    var ExitSearchKey = (function (_super) {
        __extends(ExitSearchKey, _super);
        function ExitSearchKey() {
            return _super.call(this, 'back', '←') || this;
        }
        ExitSearchKey.prototype.act = function (view) {
            view.getBaseView().loadKeyboard();
        };
        return ExitSearchKey;
    }(Key));
    Workers.ExitSearchKey = ExitSearchKey;
    var BlankKey = (function (_super) {
        __extends(BlankKey, _super);
        function BlankKey() {
            return _super.call(this, '', '') || this;
        }
        return BlankKey;
    }(Key));
    Workers.BlankKey = BlankKey;
})(Workers || (Workers = {}));
var View;
(function (View) {
    var AHKWrk = Workers.AHKWrk;
    var defaultLocale = {
        0: '', 1: 'ESC', 59: 'F1', 60: 'F2', 61: 'F3', 62: 'F4', 63: 'F5', 64: 'F6', 65: 'F7', 66: 'F8', 67: 'F9', 68: 'F10', 87: 'F11', 88: 'F12',
        14: 'BKSP', 15: 'Tab', 58: 'Caps Lk', 28: 'Enter', 42: 'Shift', 29: 'CTRL', 91: 'WIN', 56: 'ALT',
        41: '`', 2: '1', 3: '2', 4: '3', 5: '4', 6: '5', 7: '6', 8: '7', 9: '8', 10: '9', 11: '0', 12: '-', 13: '=',
        16: 'q', 17: 'w', 18: 'e', 19: 'r', 20: 't', 21: 'y', 22: 'u', 23: 'i', 24: 'o', 25: 'p', 26: '[', 27: ']', 43: '\\',
        30: 'a', 31: 's', 32: 'd', 33: 'f', 34: 'g', 35: 'h', 36: 'j', 37: 'k', 38: 'l', 39: ';', 40: '\'',
        86: '\\', 44: 'z', 45: 'x', 46: 'c', 47: 'v', 48: 'b', 49: 'n', 50: 'm', 51: ',', 52: '.', 53: '/'
    };
    var os = [99];
    View.keysLocale = defaultLocale;
    View.KEYS = [41, 15, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
    View.KEYS_COUNT = View.KEYS.length;
    var KEYMAP = [
        [41, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        [58, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43],
        [42, 86, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 0]
    ];
    var BLANKKEY = new Workers.BlankKey();
    var KeyboardView = (function (_super) {
        __extends(KeyboardView, _super);
        function KeyboardView(baseView) {
            var _this = _super.call(this) || this;
            _this.baseView = baseView;
            _this.title = "Emoji Keyboard";
            _this.jBase = $(_this.element = document.createElement('div'));
            _this.jBase.empty();
            _this.jKeyboard = $('<div class="keyboard">').appendTo(_this.jBase);
            return _this;
        }
        KeyboardView.prototype.getElement = function () {
            return this.element;
        };
        KeyboardView.prototype.show = function (keyboard) {
            this.keyboard = keyboard;
            keyboard.setKeys(View.KEYS);
            this.refresh();
            this.title = "Emoji Keyboard - " + this.toTitleCase(keyboard.getName());
            document.title = this.title;
            AHKWrk.setTitle(this.title);
        };
        KeyboardView.prototype.input = function (key, shift) {
            if (this.idxKeys[key]) {
                if (!shift)
                    this.idxKeys[key].act(this);
                else
                    this.idxKeys[key].actAlternate(this);
            }
        };
        KeyboardView.prototype.setKeymap = function (keymap) {
            if (data.keymaps[keymap]) {
                View.keysLocale = _.extend({}, defaultLocale, data.keymaps[keymap].keys);
                this.refresh();
            }
            else
                alert(keymap + " is not a valid keymap!\nValid keymaps are " + _.keys(data.keymaps).slice(1).join(", "));
        };
        KeyboardView.prototype.setOS = function (_os) {
            _os = _os.replace(/^WIN_/, '');
            if (!/^[.0-9]+$/.test(_os)) {
                console.error("Invalid OS version " + _os);
                return;
            }
            os = _os.split(/\./).map(function (part) { return parseInt(part); });
            this.refresh();
        };
        KeyboardView.compareToOS = function (os2) {
            if (typeof os2 != 'string')
                return 0;
            if (!/^[.0-9]+$/.test(os2)) {
                if (os2)
                    console.error("Invalid version " + os2);
                return 0;
            }
            var vos2 = os2.split(/\./).map(function (part) { return parseInt(part); });
            for (var i = 0; i < os.length; i++) {
                if (i >= vos2.length)
                    return -1;
                if (vos2[i] > os[i])
                    return 1;
                if (vos2[i] < os[i])
                    return -1;
            }
            if (vos2.length == os.length)
                return 0;
            else
                return 1;
        };
        KeyboardView.prototype.refresh = function () {
            var _this = this;
            this.jKeyboard.empty();
            this.idxKeys = _.indexBy(this.keyboard.getVisible(), function (key) { return key.key; });
            KEYMAP.forEach(function (row) {
                var jRow = $('<div class="row">').appendTo(_this.jKeyboard);
                row.forEach(function (keyCode) {
                    BLANKKEY.key = keyCode;
                    if (!_this.idxKeys[keyCode])
                        jRow.append(_this.showKey(BLANKKEY));
                    else
                        jRow.append(_this.showKey(_this.idxKeys[keyCode]));
                });
            });
        };
        KeyboardView.prototype.showStatus = function (str) {
            if (!str.length)
                return this.hideStatus();
            AHKWrk.setTitle(this.title + ": " + this.toTitleCase(str));
        };
        KeyboardView.prototype.hideStatus = function () {
            AHKWrk.setTitle(this.title);
        };
        KeyboardView.prototype.showKey = function (key) {
            var _this = this;
            var keyType = " action";
            if (key instanceof Workers.CharKey) {
                var keyType = " char";
            }
            if (key instanceof Workers.BlankKey) {
                var keyType = " empty";
            }
            if (key.getName() == "back") {
                var keyType = " back";
            }
            return $('<div class="key' + keyType + (key.hasAlternate() ? ' alt' : '') + (key.isLULetter() ? ' lu' : '') + (key.active ? ' active' : '') + '">')
                .append($('<div class="keyname">').text(View.keysLocale[key.key]))
                .append($('<div class="name">').text(key.getName()))
                .append($('<div class="uname">').text(key.getUName()))
                .append(key.getSymbolDiv(undefined))
                .click(function (e) {
                e.preventDefault();
                key.act(_this);
            })
                .contextmenu(function (e) {
                e.preventDefault();
                key.actAlternate(_this);
            })
                .mouseover(function () { return _this.showStatus(key.getName()); });
        };
        KeyboardView.prototype.toTitleCase = function (str) {
            return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        };
        KeyboardView.prototype.getBaseView = function () {
            return this.baseView;
        };
        return KeyboardView;
    }(View.View));
    View.KeyboardView = KeyboardView;
})(View || (View = {}));
var Workers;
(function (Workers) {
    var Emojis;
    (function (Emojis) {
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
        document.s = searchHaystack;
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
        Emojis.getSubGroup = getSubGroup;
        function search(needle) {
            var result = [];
            needle.split(/\s+/g).forEach(function (n) {
                if (!n.length)
                    return;
                var re = new RegExp(SEARCH_ID + escapeRegex(n.replace(SEPARATOR_REGEX_G, '')), 'ig');
                for (var m = void 0; m = re.exec(searchHaystack);) {
                    result.push(parseInt(m[1]));
                }
            });
            return result.filter(function (v, k) { return result.indexOf(v) === k; }).map(function (v) { return flatEmojis[v]; });
        }
        Emojis.search = search;
    })(Emojis = Workers.Emojis || (Workers.Emojis = {}));
})(Workers || (Workers = {}));
var View;
(function (View) {
    var AHKWrk = Workers.AHKWrk;
    var Emojis = Workers.Emojis;
    var KEYMAP = [
        [41, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013],
        [1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026],
    ];
    var KEYS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026];
    var BLANKKEY = new Workers.BlankKey();
    var EXITKEY = new Workers.ExitSearchKey();
    var SearchView = (function (_super) {
        __extends(SearchView, _super);
        function SearchView(baseView) {
            var _this = _super.call(this) || this;
            _this.baseView = baseView;
            _this.jBase = $(_this.element = document.createElement('div'));
            _this.jBase.empty();
            _this.jBase.append($('<div class="searchpane">').append(_this.searchE = $('<input type="search">').attr('placeholder', 'Search…').on('input properychange', function () { return _this.refresh(); }).get(0)));
            _this.jKeyboard = $('<div class="keyboard">').appendTo(_this.jBase);
            _this.refresh();
            return _this;
        }
        SearchView.prototype.getElement = function () {
            return this.element;
        };
        SearchView.prototype.charInput = function (key) {
            var _this = this;
            if (key == '%')
                return;
            this.searchE.value += key;
            setTimeout(function () { return _this.refresh(); }, 0);
        };
        SearchView.prototype.input = function (key, shift) {
            var _this = this;
            if (key == 15)
                this.baseView.loadKeyboard();
            else if (key == 14) {
                if (shift)
                    this.searchE.value = '';
                else
                    this.searchE.value = this.searchE.value.replace(/.$/, '');
                setTimeout(function () { return _this.refresh(); }, 0);
            }
            else if (this.idxKeys[key]) {
                if (!shift)
                    this.idxKeys[key].act(this);
                else
                    this.idxKeys[key].actAlternate(this);
            }
        };
        SearchView.prototype.showStatus = function (str) {
            if (!str.length)
                return this.hideStatus();
            AHKWrk.setTitle("Emoji Keyboard - Search: " + this.toTitleCase(str));
        };
        SearchView.prototype.hideStatus = function () {
            AHKWrk.setTitle("Emoji Keyboard - Search");
        };
        SearchView.prototype.showKey = function (key) {
            var _this = this;
            var keyType = " action";
            if (key instanceof Workers.CharKey) {
                var keyType = " char";
            }
            if (key instanceof Workers.BlankKey) {
                var keyType = " empty";
            }
            if (key.getName() == "back") {
                var keyType = " back";
            }
            return $('<div class="key' + keyType + (key.hasAlternate() ? ' alt' : '') + (key.active ? ' active' : '') + '">')
                .append($('<div class="keyname">').text(View.keysLocale[key.key]))
                .append($('<div class="name">').text(key.getName()))
                .append(key.getSymbolDiv())
                .click(function (e) {
                e.preventDefault();
                key.act(_this);
            })
                .contextmenu(function (e) {
                e.preventDefault();
                key.actAlternate(_this);
            })
                .mouseover(function () { return _this.showStatus(key.getName()); });
        };
        SearchView.prototype.refresh = function () {
            var _this = this;
            this.showStatus("");
            var r = Emojis.search(this.searchE.value), i = 0;
            this.idxKeys = {};
            this.idxKeys[41] = EXITKEY;
            for (var i = 0; i < KEYS.length && i < r.length; i++) {
                this.idxKeys[KEYS[i]] = new Workers.CharKey(r[i]);
            }
            this.jKeyboard.empty();
            KEYMAP.forEach(function (row) {
                var jRow = $('<div class="row">').appendTo(_this.jKeyboard);
                row.forEach(function (keyCode) {
                    if (_this.idxKeys[keyCode]) {
                        var k = _this.idxKeys[keyCode];
                        k.key = keyCode;
                        jRow.append(_this.showKey(k));
                    }
                    else {
                        BLANKKEY.key = keyCode;
                        jRow.append(_this.showKey(BLANKKEY));
                    }
                });
            });
        };
        SearchView.prototype.toTitleCase = function (str) {
            return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        };
        SearchView.prototype.getBaseView = function () {
            return this.baseView;
        };
        SearchView.prototype.show = function (keyboard) {
            throw new Error("Method not implemented.");
        };
        return SearchView;
    }(View.View));
    View.SearchView = SearchView;
})(View || (View = {}));
//# sourceMappingURL=script.js.map