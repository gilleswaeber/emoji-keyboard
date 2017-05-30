Emoji Keyboard (with Emoji 4.0 support)
==============
![Screenshot](http://i.imgur.com/LkvfZJI.png)

Copyright (c) 2017 [Gilles Waeber](http://www.gilleswaeber.ch), under MIT License

How to use
----------
Install [Autohotkey](https://autohotkey.com/) and then launch App.ahk. It will then stay in system tray until you call it.

You can open with the Caps Lock key. You can still enable Caps Lock with Shift+Caps Lock

You can also open it by a double click on the tray icon.

Use the shown keyboard keys to navigate between the categories and type the Emojis. You can also use the mouse. You can move the window and resize it as you wish. If you use another keymap, pay only attention to the position of the different keys.

To exit completely, do a right click on the tray icon and choose Exit.

You can save your preferred size in the webapp.json file. Just change the values next to width and height.
You can also choose on which monitor the keyboard should show with monitor.

There are different available themes. Currently there is the default "light" theme and a "dark" theme similar to the Windows 10 touch keyboard.

Skinnable emojis are signaled by a yellow indicator, right click or use the shift key to see the different skins.

Some glyphs can't be shown correctly because they are not part of the Segoe UI Emoji font (e.g. flags) or because they contain ligatures which aren't well handled (e.g. families). For these, we use [Twemoji](https://github.com/twitter/twemoji) as a fallback.

The flags are currently not supported by Windows. You can still use them in 3rd-party applications like Whatsapp. They are sorted by ISO code, meaning you'll find Switzerland (CH) on page 2, between Congo and Côte d'Ivoire.

Keymaps
-------
This application supports 209 different keymaps. You can define it in the webapp.json file under keymap. Changing the keymap requires a restart.
Some keymaps are: en, blank, fr-CH, en-dvorak, uk, etc. See all keymaps in the [keymap file](keymaps.md).