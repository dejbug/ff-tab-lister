function listTabs() {

	/// Get the custom output format from the preferences.
	
	var form = require("sdk/simple-prefs").prefs.tab_format;
	
	/// Translate a couple of escapes.
	/// 	TODO: Make this a single 'replace()' using a callback function.
	/// 	TODO: Add '\x##' and '\u####' escapes.
	
	form = form.replace(/\\t/, "\t");
	form = form.replace(/\\r/, "\r");
	form = form.replace(/\\n/, "\n");
	
	/// Get the tabs of only the currently active window (in load order).
	
	var sortedTabs = new Array();
	
	let tabs = require("sdk/windows").browserWindows.activeWindow.tabs;
	for (let i in tabs) {
		sortedTabs.push({index:i, pos:tabs[i].index, title:tabs[i].title, url:tabs[i].url});
	}
	
	/// Sort by position within the window.
	
	sortedTabs.sort(function(a,b) { return a.pos - b.pos});
	
	/// Generate output.
	
	var tabsList = "";
	
	for(let tab of sortedTabs) {
		//tabsList += "<a href=\"" + tab.url + "\">" + tab.title + "</a><br />\n";
		
		var line = form.replace(/\{TITLE\}/, tab.title);
		line = line.replace(/\{URL\}/, tab.url);
		tabsList += line.replace(/\{INDEX\}/, tab.index);
	}
	
	/// Output to clipboard.
	
	require("sdk/clipboard").set(tabsList);
}

/// Button click handler.

function handleClick(state) {
	listTabs();
}

/// Create the button.

require('sdk/ui/button/action').ActionButton({
  id: "tab-lister-button",
  label: "list tabs",
  icon: {
			"16": "./icon-16.png",
			"32": "./icon-32.png"
		},
  onClick: handleClick
});
