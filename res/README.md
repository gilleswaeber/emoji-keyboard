Here are located the scripts for a partially automated update of the emoji database.

We use 3 different sources to get all the data we need:
- The [Unicode® CLDR](http://cldr.unicode.org/index) (Common Locale Data Repository) which contains the keyboard layouts, and the short names and keywords for the emojis
- The [Unicode® Emoji Resources](http://unicode.org/emoji/) which contain informations about emoji attributes and emoji ordering
- The [UnicodeData](http://unicode.org/Public/3.0-Update/UnicodeData-3.0.0.html) file which contain character names

How to use
==========
To build the unicode database used by Emoji Keyboard, you need a PHP interpreter. Lauch it with `php build.php` in this folder. It generates a *data.js* file that you can drop in the *wwwassets/scripts* folder. PHP is used because it doesn't require any additional dependency for these small scripts.

The `config.json` file describes how the file is generated (Additional Emojis, fallback conditions, icon groups, ...). See `config.schema.json` for the exact layout. You cannot put comments in this file.

The image files (svg) are stored in `/wwwassets/img`. They are copied manually from the twemoji repo. They are used in function of the defined fallback rules.

You can delete the *data* folder at any time and its content will be downloaded again on the next run.

Some examples:
- To update to a newer emoji version, update the numbers in forceVersion or remove the section to use the latest version (iirc, launching the build script will show you the latest versions)
- To add an arbitrary character, add it in the addon section.
	
	The group+subgroup pair must be present somewhere in the keyboards list otherwise you won't see it.

	Look at the Greek, the arrows, and the Ninja Cat examples.
- To hide a subgroup, remove it from the keyboards section
- Eventually, you will have to update the fallback rules and add newer Twemoji images

After that, you have to rebuild the data file.

## Command line arguments
| Argument               | Description                    |
| ---------------------- | ------------------------------ |
| -h, --help             | Show help instructions         |
| -v, --verbose          | More detailed output           |
| -l, --local, --offline | Do not connect to the internet |