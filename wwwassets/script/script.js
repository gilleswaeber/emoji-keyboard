var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function () {
    function Main(base) {
        this.base = base;
        this.jBase = $(base);
        this.jBase.empty();
        this.view = new View.View(base);
        this.view.show(Workers.Keyboards.getMainKeyboard());
    }
    Main.prototype.input = function (key) {
        this.view.input(key);
    };
    return Main;
}());
var main;
$(document).ready(function () { return main = new Main(document.querySelector('main')); });
document.ahk = { input: function (key) { return main.input(key); } };
var Workers;
(function (Workers) {
    var Emojis;
    (function (Emojis) {
        var indexedEmojis = {};
        data.emojis.forEach(function (emoji) {
            if (!indexedEmojis[emoji.group])
                indexedEmojis[emoji.group] = {};
            if (!indexedEmojis[emoji.group][emoji.subGroup])
                indexedEmojis[emoji.group][emoji.subGroup] = [];
            indexedEmojis[emoji.group][emoji.subGroup].push(emoji);
        });
        function getSubGroup(group, subGroup) {
            if (indexedEmojis[group] && indexedEmojis[group][subGroup]) {
                return indexedEmojis[group][subGroup];
            }
            else {
                return [];
            }
        }
        Emojis.getSubGroup = getSubGroup;
    })(Emojis = Workers.Emojis || (Workers.Emojis = {}));
})(Workers || (Workers = {}));
var Workers;
(function (Workers) {
    var Keyboards;
    (function (Keyboards) {
        function getMainKeyboard() {
            return new Keyboard('Main keyboard', '⌨', data.keyboards.map(function (kdata) { return new KeyboardKey(new EmojiKeyboard(null, kdata)); }));
        }
        Keyboards.getMainKeyboard = getMainKeyboard;
    })(Keyboards = Workers.Keyboards || (Workers.Keyboards = {}));
    var Keyboard = (function () {
        function Keyboard(name, symbol, keys) {
            var _this = this;
            this.name = name;
            this.symbol = symbol;
            this.keys = keys;
            this.page = 0;
            this.fixedKeys = [];
            this.pagedKeys = [];
            this.fixedKeys.push(new BlankKey());
            console.log(this.keys.length);
            this.multipage = this.keys.length > 47;
            if (this.multipage) {
                this.pages = 1;
                while (this.keys.length > this.pages * (45 - Math.min(this.pages, 10))) {
                    this.pages++;
                }
                var perpage = 46 - Math.min(this.pages, 10);
                for (var i = 0; i < Math.min(this.pages, 10); i++) {
                    this.fixedKeys.push(new PageKey(i));
                }
                var keysStack = this.keys.slice(0);
                for (var i = 0; i < this.pages; i++) {
                    this.pagedKeys[i] = keysStack.splice(0, perpage + 1);
                }
            }
            else {
                this.fixedKeys = this.fixedKeys.concat(this.keys);
            }
            this.fixedKeys.forEach(function (k) { if (k instanceof ActionKey)
                k.setKeyboard(_this); });
            this.pagedKeys.forEach(function (p) { return p.forEach(function (k) { if (k instanceof ActionKey)
                k.setKeyboard(_this); }); });
        }
        Keyboard.prototype.getName = function () {
            return this.name;
        };
        Keyboard.prototype.getSymbol = function () {
            return this.symbol;
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
            var back = new BackKey();
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
        };
        return Keyboard;
    }());
    Workers.Keyboard = Keyboard;
    var EmojiKeyboard = (function (_super) {
        __extends(EmojiKeyboard, _super);
        function EmojiKeyboard(parent, kdata) {
            var keys = [];
            kdata.content.forEach(function (content) {
                Workers.Emojis.getSubGroup(content.group, content.subGroup).forEach(function (char) {
                    keys.push(new CharKey(char));
                });
            });
            _super.call(this, kdata.name, kdata.symbol, keys);
        }
        return EmojiKeyboard;
    }(Keyboard));
    Workers.EmojiKeyboard = EmojiKeyboard;
    var Key = (function () {
        function Key(name, symbol) {
            this.name = name;
            this.symbol = symbol;
        }
        Key.prototype.getName = function () {
            return this.name;
        };
        Key.prototype.getSymbol = function () {
            return this.symbol;
        };
        return Key;
    }());
    Workers.Key = Key;
    var CharKey = (function (_super) {
        __extends(CharKey, _super);
        function CharKey(char) {
            _super.call(this, (char.name || char.fullName).toLowerCase(), char.symbol);
            this.char = char;
        }
        return CharKey;
    }(Key));
    Workers.CharKey = CharKey;
    var ActionKey = (function (_super) {
        __extends(ActionKey, _super);
        function ActionKey(name, symbol) {
            _super.call(this, name, symbol);
        }
        ActionKey.prototype.setKeyboard = function (keyboard) {
            this.keyboard = keyboard;
        };
        return ActionKey;
    }(Key));
    Workers.ActionKey = ActionKey;
    var KeyboardKey = (function (_super) {
        __extends(KeyboardKey, _super);
        function KeyboardKey(target) {
            _super.call(this, target.getName(), target.getSymbol());
            this.target = target;
        }
        KeyboardKey.prototype.act = function (view) {
            view.show(this.target);
        };
        KeyboardKey.prototype.setKeyboard = function (keyboard) {
            _super.prototype.setKeyboard.call(this, keyboard);
            this.target.setParent(keyboard);
        };
        return KeyboardKey;
    }(ActionKey));
    Workers.KeyboardKey = KeyboardKey;
    var PageKey = (function (_super) {
        __extends(PageKey, _super);
        function PageKey(page) {
            _super.call(this, 'page ' + (page + 1), '' + (page + 1));
            this.page = page;
        }
        PageKey.prototype.act = function (view) {
            this.keyboard.setPage(this.page);
            view.refresh();
        };
        return PageKey;
    }(ActionKey));
    Workers.PageKey = PageKey;
    var BackKey = (function (_super) {
        __extends(BackKey, _super);
        function BackKey() {
            _super.call(this, 'back', 'ESC');
        }
        BackKey.prototype.act = function (view) {
            if (this.keyboard.getParent())
                view.show(this.keyboard.getParent());
        };
        return BackKey;
    }(ActionKey));
    Workers.BackKey = BackKey;
    var BlankKey = (function (_super) {
        __extends(BlankKey, _super);
        function BlankKey() {
            _super.call(this, '', '');
        }
        return BlankKey;
    }(Key));
    Workers.BlankKey = BlankKey;
})(Workers || (Workers = {}));
var View;
(function (View_1) {
    var LOCALES = {};
    LOCALES['default'] = {
        0: '', 1: 'ESC', 59: 'F1', 60: 'F2', 61: 'F3', 62: 'F4', 63: 'F5', 64: 'F6', 65: 'F7', 66: 'F8', 67: 'F9', 68: 'F10', 87: 'F11', 88: 'F12',
        14: 'BKSP', 15: 'Tab', 58: 'Caps Lk', 28: 'Enter', 42: 'Shift', 29: 'CTRL', 91: 'WIN', 56: 'ALT',
        41: '`', 2: '1', 3: '2', 4: '3', 5: '4', 6: '5', 7: '6', 8: '7', 9: '8', 10: '9', 11: '0', 12: '-', 13: '=',
        16: 'q', 17: 'w', 18: 'e', 19: 'r', 20: 't', 21: 'y', 22: 'u', 23: 'i', 24: 'o', 25: 'p', 26: '[', 27: ']',
        30: 'a', 31: 's', 32: 'd', 33: 'f', 34: 'g', 35: 'h', 36: 'j', 37: 'k', 38: 'l', 39: ';', 40: '\'', 43: '\\',
        86: '\\', 44: 'z', 45: 'x', 46: 'c', 47: 'v', 48: 'b', 49: 'n', 50: 'm', 51: ',', 52: '.', 53: '/'
    };
    LOCALES['en-US'] = LOCALES['default'];
    LOCALES['fr-CH'] = _.extend({}, LOCALES['default'], { 41: '§', 12: '\'', 13: '^', 21: 'z', 26: 'è', 27: '¨', 39: 'é', 40: 'à', 43: '$', 86: '<', 44: 'y', 51: ',', 52: '.', 53: '-' });
    LOCALES['de-CH'] = _.extend({}, LOCALES['fr-CH'], { 26: 'ü', 39: 'ö', 40: 'ä' });
    var keysLocale = LOCALES['default'];
    var KEYS = [41, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
    var KEYMAP = [
        [41, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        [58, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43],
        [42, 86, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 0]
    ];
    var BLANKKEY = new Workers.BlankKey();
    var View = (function () {
        function View(base) {
            this.base = base;
            this.jBase = $(base);
            this.jBase.empty();
            this.jKeyboard = $('<div class="keyboard">').appendTo(this.jBase);
        }
        View.prototype.show = function (keyboard) {
            this.keyboard = keyboard;
            keyboard.setKeys(KEYS);
            this.refresh();
        };
        View.prototype.input = function (key) {
            if (this.idxKeys[key]) {
                var k = this.idxKeys[key];
                if (k instanceof Workers.ActionKey)
                    k.act(this);
                else if (k instanceof Workers.CharKey)
                    AHK("Send", k.getSymbol());
            }
        };
        View.prototype.refresh = function () {
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
        View.prototype.showKey = function (key) {
            var _this = this;
            return $('<div class="key">')
                .append($('<div class="keyname">').text(keysLocale[key.key]))
                .append($('<div class="name">').text(key.getName()))
                .append($('<div class="symbol">').text(key.getSymbol()))
                .click(function () {
                if (key instanceof Workers.ActionKey) {
                    key.act(_this);
                }
                else if (key instanceof Workers.CharKey)
                    AHK("Send", key.getSymbol());
            });
        };
        return View;
    }());
    View_1.View = View;
})(View || (View = {}));
//# sourceMappingURL=script.js.map