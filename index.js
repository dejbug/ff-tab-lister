var self = require("sdk/self");

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

// The plugin starts here.

function replace_backspace_escapes(text) {

	/// Translate a couple of escapes.
	/// 	TODO: Make this a single 'replace()' using a callback function.
	/// 	TODO: Add '\x##' and '\u####' escapes.
	
	text = text.replace(/\\t/g, "\t");
	text = text.replace(/\\r/g, "\r");
	text = text.replace(/\\n/g, "\n");
	return text;
	
}

function replace_formatting_variables(text, tab) {

	text = text.replace(/\{TITLE\}/, tab.title.replace(/"/g, "&quot;"));
	text = text.replace(/\{URL\}/, tab.url);
	text = text.replace(/\{INDEX\}/, tab.index);
	return text;
	
}

function listTabs() {

	/// Get the custom output formats from the preferences.
	
	var prefs = require("sdk/simple-prefs").prefs;
	
	var tab_format = replace_backspace_escapes(prefs.tab_format);
	var header_format = replace_backspace_escapes(prefs.header_format);
	var footer_format = replace_backspace_escapes(prefs.footer_format);
	
	/// Get the tabs of only the currently active window (in load order).
	
	var sortedTabs = new Array();
	
	var tabs = require("sdk/windows").browserWindows.activeWindow.tabs;
	for (let i in tabs) {
		sortedTabs.push({index:i, pos:tabs[i].index, title:tabs[i].title, url:tabs[i].url});
	}
	
	/// Sort by position within the window.
	
	sortedTabs.sort(function(a,b) { return a.pos - b.pos});
	
	/// Generate output.
	
	var tabsList = "";
	
	for(let tab of sortedTabs) {
		tabsList += replace_formatting_variables(tab_format, tab);
	}
	
	/// Output to clipboard.
	
	require("sdk/clipboard").set(header_format + tabsList + footer_format);
	
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
