# Tab Lister - Yet another!

This is a very simple [Firefox addon](https://addons.mozilla.org/en-us/firefox/addon/tab-lister) and is meant as a replacement for [Binny V A]'s (apparently abandoned) [Url Lister] which doesn't seem to be compatible with the latest Firefox version.

# What it does

It should copy (into your clipboard) the list of tabs in the currently active window (the one in which the button was clicked). The list will be in the order in which the tabs appear in the window. If you want them in load-order, you'll need to go to options and modify the row format (see section below) to print out the load order index, then use some external means of sorting the list by it. Sorry.

# Custom output format

If you go to `Tools -> Add-ons -> Tab Lister -> Options` you will be able to alter the output format. Each tab will be written out like this.

The placeholders are `{TITLE}`, `{URL}`, and `{INDEX}` and will be replaced by a tab's __title__, __url__, and __load-order index__, respectively. (Note: The placeholder literals must be in upper-case. Also it isn't possible to escape the literals, sorry.)

Special escapes are `\t` (tab), `\r` (carriage return) and `\n` (line feed).

# Special thanks...

...go to [Binny V A] for his trusty little addon which served me well for years. (I'm using your icon without permission. Hopefully that's ok!)

...go to `alphapapa` for raising the important [issue #1] and inspiring the __1.1__ update!

# Version history

- __1.1__

	- __fix__: A simple `\n` didn't work; only `\r\n` did. ([issue #1])

	- __enhancement__: The 'Url format' has now become the 'Output format'. The output used to be a `\n`-separated list, where each row was formatted according to the template in this box. In other words, the template had an implicit `\n` appended to it, which should of course have been up to the user to decide. ([issue #1])


[Binny V A]: https://addons.mozilla.org/en-US/firefox/user/binny-v-a/
[Url Lister]: https://addons.mozilla.org/en-US/firefox/addon/url-lister
[Tab Lister]: https://addons.mozilla.org/en-us/firefox/addon/tab-lister

[issue #1]: https://github.com/dejbug/ff-tab-lister/issues/1
