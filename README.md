Emoji Keyboard (Emoji 12)
==============
<img alt="Screenshot" src="https://i.imgur.com/rJFlKDm.png" width="766" />

Packed with thousands of Emojis!
Requires Windows 7
and [WebView2](https://go.microsoft.com/fwlink/p/?LinkId=2124703) (comes with Windows 10+)

Alternatives
------------
Since the Windows 10 April 2018 Update update, you can open the built-in emoji picker with `Win+.`. It is missing support for flags and emojis newer than the OS.

How to use
----------
Install [Autohotkey](https://autohotkey.com/), download the whole project, and then launch App.ahk. It will then stay in system tray until you call it.

Open it with the <kbd>⇧ Shift</kbd>+<kbd>Caps Lock</kbd> combination.
You can also use a double click on the tray icon. (Look for `+Capslock` in the *App.ahk* file to change the shortcut).

Use the shown keyboard keys to navigate between the categories and type the Emojis. You can also use the mouse. You can move the window and resize it as you wish.
Keymap should match the one of your system.

To exit completely, do a right click on the tray icon and choose Exit.

There are different available themes: the default "material" theme and a "legacy" theme. Both come in light and dark variants.

Skinnable emojis are signaled by a yellow indicator, right click or use the <kbd>⇧ Shift</kbd> key to see the different skins.

The [Twemoji Pack](https://github.com/twitter/twemoji) is used as a fallback for Emojis not supported by your Windows version.

The flags and the newest Emojis are currently not supported by Windows. You can still use them in 3rd-party applications or sites like Whatsapp or Twitter.
Flags are sorted by ISO code, meaning you'll find Switzerland (CH) on page 2, between Congo and Côte d'Ivoire.

Customize
---------
Some settings are available in the app.
For information on how to customize the keyboard, see [the README in the res folder](res/README.md).
The keyboard view is realized using an embedded WebView2 control, as native AHK controls do not support Emojis at the moment.
Some characters may use a fallback image because they are not rendered properly, but they are supported by the OS.

The current version is lacking behind for Emoji support. New stuff coming soon-ish.
