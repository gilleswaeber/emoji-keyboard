Emoji Keyboard (Emoji 15)
==============
<img alt="Screenshot" src="https://i.imgur.com/rJFlKDm.png" width="766" />

Packed with thousands of Emojis!
Requires Windows 7
and [WebView2](https://go.microsoft.com/fwlink/p/?LinkId=2124703) (comes with Windows 10+)

Alternatives
------------
Since the Windows 10 April 2018 Update update, you can open the built-in emoji picker with <kbd>Win</kbd>+<kbd>.</kbd>. It is missing support for flags and emojis newer than the OS.

How to use
----------
Install [Autohotkey](https://autohotkey.com/), download the whole project, and then launch App.ahk. It will then stay in
system tray until you call it.

Open it with the <kbd>⇧ Shift</kbd>+<kbd>Caps Lock</kbd> combination.
You can also use a double click on the tray icon. (Look for `+Capslock` in the *App.ahk* file to change the shortcut).

Use the shown keyboard keys to navigate between the categories and type the Emojis. You can also use the mouse. You can move the window and resize it as you wish.
Keymap matches the one of your system automatically.

The recent list opens with <kbd>Caps Lock</kbd> and shows a list of recent Emojis sorted on opening by their *score*. Inserting an Emoji increments its *score* and decrement other's.
A *score* ≥ 100 makes it a favorite that'll stay in the list.
Emojis can be removed and marked as favorites with a right click or <kbd>⇧ Shift</kbd> when in the recent tab.

To exit completely, do a right click on the tray icon and choose Exit.

There are different available themes: the default "material" theme and a "legacy" theme. Both come in light and dark variants.

Skinnable emojis are signaled by a yellow indicator, right click or use the <kbd>⇧ Shift</kbd> key to see the different skins.

The [Noto Emoji](https://github.com/googlefonts/noto-emoji) font is used as a fallback for Emojis not supported by your Windows version.

The flags and the newest Emojis are currently not supported by Windows. You can still use them in 3rd-party applications or sites like Whatsapp or Twitter.
Flags are sorted by ISO code, meaning you'll find Switzerland (CH) on page 2, between Congo and Côte d'Ivoire.

Customize
---------
Some settings are available in the app.
The keyboard view is realized using an embedded WebView2 control, as native AHK controls do not support Emojis at the
moment.
Some characters may use a fallback image because they are not rendered properly, but they are supported by the OS.

The web-app part is written in Typescript.
In the *wwwassets*, run `yarn install; yarn watch` to get started.
The boards configuration is done in *wwwassets/script/config*.

Unicode data is generated from several sources:

- The [Unicode® Emoji Resources](http://unicode.org/emoji/) which contain information about emoji attributes and emoji
  ordering
- The [UnicodeData](http://unicode.org/Public/3.0-Update/UnicodeData-3.0.0.html) file which contain character names
- The [Unicode NamesList](https://unicode.org/Public/UNIDATA/NamesList.txt)
  and [NamedSequences](https://unicode.org/Public/UNIDATA/NamedSequences.txt) files which are used to generate the code
  charts
  and contains aliases used in search, and additional information not yet used
- The [Unicode CLDR](https://cldr.unicode.org/) annotations for aliases used in search

A rebuild of the Unicode database can be triggered in the app settings. It will download parts of the Unicode spec when
necessary.
Data for CJK ideographs is not present in the app since Unicode provides it separately and the main dev is not able to
provide a proper integration, PR welcome.
Boards for scripts other than Latin and monotonic Greek are not provided either but can be added manually, PR welcome.

Additionally, math symbols and aliases were manually imported from the [unicode-math](https://wspr.io/unicode-math/)
XeLaTeX/LuaLaTeX package and the [UTN #28: UnicodeMath](https://www.unicode.org/notes/tn28/) specification.

Dependencies
------------
AutoHotkey libs:

- [ahk2_lib/WebView2](https://github.com/thqby/ahk2_lib), thqby

JavaScript libs:

- [memoize-one](https://github.com/alexreardon/memoize-one.git), Alex Reardon, MIT License
- [Peggy](https://peggyjs.org/), David Majda, MIT License
- [Preact](https://preactjs.com/), Jason Miller, MIT License
- [RequireJS](https://github.com/requirejs/requirejs), jQuery Foundation and other contributors, MIT License

Fonts:

- [Noto Emoji](https://github.com/googlefonts/noto-emoji), Google Fonts, SIL Open Font License 1.1
