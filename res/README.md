Here are located the scripts for a partially automated update of the emoji database.

We use 3 different sources to get all the data we need:
- The [Unicode® CLDR](http://cldr.unicode.org/index) (Common Locale Data Repository) which contains short names and keywords for the emojis
- The [Unicode® Emoji Resources](http://unicode.org/emoji/) which contain informations about emoji attributes and emoji ordering
- The [UnicodeData](http://unicode.org/Public/3.0-Update/UnicodeData-3.0.0.html) file which contain character names

How to use
==========
To build the unicode database used by Emoji Keyboard, you need a PHP interpreter. Lauch it with `php build.php` in this folder and you can then copy emojis.json into the data.js file. (Add `var data =` before the file content)

Some settings can be customized in the config.json file (Additional Emojis, fallback conditions, icon groups).

You can delete the *data* folder at any time and its content will be downloaded again on the next run.