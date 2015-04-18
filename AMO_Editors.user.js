// ==UserScript==
// @name        AMO Editors
// @namespace   https://github.com/Ede123/userscripts
// @version     0.91
// @description Automates some things for AMO editors
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     https://addons.mozilla.org/*/editors/review/*
// @include     https://addons.mozilla.org/*/firefox/files/browse/*
// @include     https://addons.mozilla.org/*/firefox/files/compare/*
// @grant       GM_addStyle
// @require     https://raw.githubusercontent.com/darcyclarke/Detect.js/master/detect.min.js
// @run-at      document-start
// ==/UserScript==

GM_addStyle(".file-viewer .section { width: unset; max-width: 95%;}" +
            ".file-viewer .syntaxhighlighter .line {max-width: unset;}");

addEventListener('DOMContentLoaded', function() {
	var inputOS = document.getElementById("id_operating_systems");
	var inputApp = document.getElementById("id_applications");

	var ua = detect.parse(navigator.userAgent);
	inputOS.value = ua.os.name;
	inputApp.value = ua.browser.family + " " + ua.browser.major + "." + ua.browser.minor;
}, false);