
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

	title = tab.title.replace(/"/, "&quot;");

	text = text.replace(/\{TITLE\}/, title);
	text = text.replace(/\{URL\}/, tab.url);
	text = text.replace(/\{INDEX\}/, tab.index);
	return text;
	
}

function getSortedTabsByIndex(tabs) {

	var sortedTabs = new Array();
	
	for (let i in tabs)
		sortedTabs.push({
			index:i, pos:tabs[i].index,
			title:tabs[i].title,
			url:tabs[i].url});
			
	sortedTabs.sort(function(a,b) { return a.pos - b.pos});
	return sortedTabs;
}

function generateOutputText(tabs) {

	var tab_format = "{URL}\r\n";

	var gettingItem = browser.storage.sync.get('tab_format');
	gettingItem.then((res) => {
		tab_format = res.tab_format || tab_format;
	});

	// syncpoint : wait here

	var outputText = "";
	
	for(let tab of tabs)
		outputText += replace_formatting_variables(tab_format, tab);
	
	return outputText;
}

function generateOutputText_1(tabs) {

	browser.storage.sync.get([
		"tab_format", "header_format", "footer_format"
	]).then((res) => {
		var outputText = "";
		for(let tab of tabs)
			outputText += replace_formatting_variables(res.tab_format, tab);

		// TODO: Write output to clipboard, not console.
		console.log(res.header_format + outputText + res.footer_format);

		// >> you can write to the clipboard like this in all execution
		//  contexts except background pages. In Firefox you can't 
		// select text or focus an input field in background pages, 
		// so you can't write to the clipboard from a background page <<

		// <https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Interact_with_the_clipboard>

		// FIXME: We'll need to make a popup.

	}).catch(console.log.bind(console));

}

function listTabs(tabs) {

	var sortedTabs = getSortedTabsByIndex(tabs);
	// var outputText = generateOutputText(sortedTabs);
	generateOutputText_1(sortedTabs);
	// console.log(outputText);

}

function handleClick(state) {

	browser.tabs.query({currentWindow: true}, listTabs);

}

browser.browserAction.onClicked.addListener(handleClick);
