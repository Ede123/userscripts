// ==UserScript==
// @name        AMO Editors
// @namespace   https://github.com/Ede123/userscripts
// @version     0.94
// @description Automates and improves some things for AMO editors
// @icon        https://raw.githubusercontent.com/Ede123/userscripts/master/icons/AMO.png
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     https://addons.mozilla.org/*/addon/*
// @include     https://addons.mozilla.org/*/editors/review/*
// @include     https://addons.mozilla.org/*/files/browse/*
// @include     https://addons.mozilla.org/*/files/compare/*
// @grant       GM_addStyle
// @require     https://raw.githubusercontent.com/darcyclarke/Detect.js/master/detect.min.js
// @run-at      document-start
// ==/UserScript==


var href = window.location.href;


/** add styles at "document-start" **/
// avoid line breaks in file viewer whenever possible by using full width of window
if (href.indexOf("/files/") != -1) {
	GM_addStyle(".file-viewer .section { width: unset; max-width: 95%;}" +
				".file-viewer .syntaxhighlighter .line {max-width: unset;}");
}

/** modify DOM on DOMContentLoaded **/
addEventListener('DOMContentLoaded', function() {
	// add a "Review" button to add-on listings
	if (href.indexOf("/addon/") != -1) {
		var widgets = document.getElementsByClassName("widgets")[0];

		var p = document.createElement("p");
		var button = document.createElement("a");
		button.classList.add("button", "developer", "prominent");
		button.href = href.replace(/\/addon\//, "/editors/review/");
		var button_span =  document.createElement("span");
		button_span.textContent = "Review";

		button.appendChild(button_span);
		p.appendChild(button);
		widgets.parentNode.insertBefore(p, widgets.nextSibling);
	}
	// pre-fill "Tested on:" fields with current user agent data
	else if (href.indexOf("/editors/review/") != -1) {
		var inputOS = document.getElementById("id_operating_systems");
		var inputApp = document.getElementById("id_applications");

		var ua = detect.parse(navigator.userAgent);
		inputOS.value = ua.os.name;
		inputApp.value = ua.browser.family + " " + ua.browser.major + "." + ua.browser.minor;

		// add a button to clear the fields again (e.g. on trivial updates which where not tested)
		var button = document.createElement("a");
		button.href = "javascript:void(0);";
		button.textContent = "⌫";
		button.classList.add("button");
		button.style = "float: right; padding: 2px 5px; border-radius: 5px;";
		button.addEventListener("click", function() {inputOS.value = ""; inputApp.value = "";});
		inputApp.parentNode.appendChild(button);
	}
}, false);