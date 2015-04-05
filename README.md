# Tab Lister - Yet another!

This is a very simple Firefox addon and is meant as a replacement for [Binny V A]'s (apparently abandoned) [Url Lister] which doesn't seem to be compatible with the latest Firefox version.

# What it does

It should copy (into your clipboard) the list of tabs in the currently active window (the one in which the button was clicked). The list will be in the order in which the tabs appear in the window. If you want them in load-order, you'll need to go to options and modify the row format (see section below) to print out the load order index, then use some external means of sorting the list by it. Sorry.

# Custom row format

If you go to `Tools -> Add-ons -> Tab Lister -> Options` you will be able to alter the row output format.

The placeholders are `{TITLE}`, `{URL}`, and `{INDEX}` and will be replaced by a tab's __title__, __url__, and __load-order index__, respectively. (Note: The placeholder literals must be in upper-case. Also it isn't possible to escape the literals, sorry.)

# Special thanks...

...go to [Binny V A] for his trusty little addon which served me well for years. (I'm using your icon without permission. Hopefully that's ok!)


[Binny V A]: https://addons.mozilla.org/en-US/firefox/user/binny-v-a/
[Url Lister]: https://addons.mozilla.org/en-US/firefox/addon/url-lister
