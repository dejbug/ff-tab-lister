
var DEFAULT_TAB_FORMAT = "<a href=\"{URL}\">{TITLE}</a><br />\\r\\n";

function restoreOption(key, def="") {
	browser.storage.sync.get(key).then((res) => {
		document.querySelector("#" + key).value = res[key] || def;
	});
}

function saveOption(key) {
	var obj = {};
	obj[key] = document.querySelector("#" + key).value;
	browser.storage.sync.set(obj);
}

function restoreOptions() {
	restoreOption("tab_format", DEFAULT_TAB_FORMAT);
	restoreOption("header_format");
	restoreOption("footer_format");
}

function saveOptions(e) {
	saveOption("tab_format");
	saveOption("header_format");
	saveOption("footer_format");
	e.preventDefault();
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
