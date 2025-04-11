Emoji Keyboard (Emoji 16)
==============
[💾 Download](https://github.com/gilleswaeber/emoji-keyboard/releases/latest/download/emoji-keyboard.zip) *or see instructions below for cloning*

<img alt="Screenshot" src="https://i.imgur.com/qpVBhXt.png" width="786" />

Packed with thousands of Emojis!
Requires Windows 7+
, [WebView2](https://go.microsoft.com/fwlink/p/?LinkId=2124703) (comes with Windows 10+)
, and [Autohotkey](https://autohotkey.com/).

Alternatives
------------
Since Windows 10 April 2018 Update, you can open the built-in emoji picker with <kbd>Win</kbd>+<kbd>.</kbd>.
It is missing support for flags and emojis newer than the OS.

How to use
----------
Install [Autohotkey](https://autohotkey.com/), download using the link at the top, and then launch App.ahk. It will then stay in
system tray until you call it.

Open it with the <kbd>⇧ Shift</kbd>+<kbd>Caps Lock</kbd> combination.
You can also use a double click on the tray icon.
To change the shortcut, edit *hotkey.ahk* which is created the first time you start the program.

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
Many settings are accessible in the app:
- Enable the *ISO layout* setting if you have a narrow left shift key
- The *Reset variants* setting will clear the preferred skin/gender variants for all emojis
- Two themes are available, both available in light and dark variants
- Change the opacity of the window
- The position where the keyboard opens, note that *Caret* is still experimental
- Whether to hide the keyboard and/or return to the main page after inserting an emoji
- Show the aliases or the code points in the title bar when hovering a key

To change the keyboard shortcut, open the *hotkey.ahk* file in a text editor and change the expression before
`::KB.Toggle()`. See the [Hotkeys Expressions](https://www.autohotkey.com/docs/v2/Hotkeys.htm) and
[Key List](https://www.autohotkey.com/docs/v2/KeyList.htm) documentation for AutoHotkey for more information.
After changing, reload script using a right click on the tray icon or the command in Settings > Tools

See also:

- [🔣 Fallback Fonts](https://github.com/gilleswaeber/emoji-keyboard/wiki/Fallback-Fonts)
- [🪇 Plugins](https://github.com/gilleswaeber/emoji-keyboard/wiki/Plugins)

Develop
-------
The keyboard view is realized using an embedded WebView2 control, as native AHK controls do not support Emojis at the
moment.
Some characters may use a fallback image because they are not rendered properly, but they are supported by the OS.

Requirements:
- a [Node.js](https://nodejs.org/en/download/) installation to build the web-app part
- Git with the [Git LFS](https://git-lfs.com/) plugin to clone the repository (otherwise the dll will be missing)


When cloning the repository, you will additionally need to:
- Build the JS bundles: `cd wwwassets; npm install; npm run build`
- Build the Unicode data: `cd wwwassets; npm run build-unidata`, or with Settings > Tools > Build in the app
- Download Noto Color Emoji: you'll be prompted to do so when running the app for the first time


The web-app part is written in Typescript.
In the *wwwassets*, run `npm install; npm run dev` to get started.
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

A rebuild of the Unicode database can be triggered in the app settings or by running `npm run build-unidata`. It will download parts of the Unicode spec when
necessary.
Data for CJK ideographs is not present in the app since Unicode provides it separately and I don't know enough about it
to provide a proper integration, PR welcome.
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

Emoji Fonts:

- [Noto Emoji](https://github.com/googlefonts/noto-emoji), Google Fonts, SIL Open Font License 1.1
- <del>[Twemoji](https://github.com/twitter/twemoji), Twitter, CC-BY 4.0</del>
  , removed, [Unicode 15 support not released](https://github.com/twitter/twemoji/issues/570)

