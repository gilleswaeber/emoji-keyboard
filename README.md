Emoji Keyboard (Emoji 12)
==============
<img alt="Screenshot" src="https://i.imgur.com/p8LAlF9.png" width="767" />

Packed with thousands of Emojis!
Requires Windows 7

Alternatives
------------
Since the Windows 10 April 2018 Update update, you can open the built-in emoji picker with `Win+.`. It is missing support for flags and emojis newer than the OS.

How to use
----------
Install [Autohotkey](https://autohotkey.com/) and then launch App.ahk. It will then stay in system tray until you call it.

Open it with the `Caps Lock` key. You can still enable Caps Lock with Shift+Caps Lock.
You can also use a double click on the tray icon. (Look for `Capslock` in the *App.ahk* file to change the shortcut).

Use the shown keyboard keys to navigate between the categories and type the Emojis. You can also use the mouse. You can move the window and resize it as you wish. If you use another keymap, pay only attention to the position of the different keys.

To exit completely, do a right click on the tray icon and choose Exit.

You can save your preferred size in the webapp.json file. Just change the values next to width and height.
You can also choose on which monitor the keyboard should show with monitor.

There are different available themes. Currently there is the default "light" theme and a "dark" theme similar to the Windows 10 touch keyboard.

Skinnable emojis are signaled by a yellow indicator, right click or use the shift key to see the different skins.

The [Twemoji Pack](https://github.com/twitter/twemoji) is used as a fallback for Emojis not supported by your Windows version.

The flags and the newest Emojis are currently not supported by Windows. You can still use them in 3rd-party applications or sites like Whatsapp or Twitter.
Flags are sorted by ISO code, meaning you'll find Switzerland (CH) on page 2, between Congo and Côte d'Ivoire.

Keymaps
-------
This application supports 209 different keymaps. You can define it in the webapp.json file under keymap. Changing the keymap requires a restart.
Some keymaps are: en, blank, fr-CH, en-dvorak, uk, etc. See all keymaps in the [keymap file](keymaps.md).

Customize
---------
For information on how to customize the keyboard, see [the README in the res folder](res/README.md).
The keyboard view is realized using an embedded Internet Explorer control, as native AHK controls do not support Emojis at the moment.
Some characters may use a fallback image because they are not rendered properly, but they are supported by the OS.

Screenshots
-----------
<img alt="Screenshot 2" src="http://i.imgur.com/cvbcUEr.png" width="767" />

Other animals, dark theme, keyboard en-dvorakl

<img alt="Screenshot 3" src="http://i.imgur.com/zfKADdY.png" width="767" />

Skinned emojis, dark theme, keyboard el (greek)
