// ==UserScript==
// @name        OpenSubtitles Direct Downloads
// @namespace   https://github.com/Ede123/userscripts
// @version     1.0
// @description Creates direct download links for subtitles on opensubtitles.org
// @icon        https://raw.githubusercontent.com/Ede123/userscripts/master/icons/OpenSubtitles.png
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     http://www.opensubtitles.org/*
// @grant       GM_addStyle
// @run-at      document-start
// ==/UserScript==


// remove checkboxes for "OS Download Manager"
GM_addStyle('#checkbox1,#checkbox2{display:none}');

// modify button only after DOM is ready
addEventListener('DOMContentLoaded', function() {
	// create direct link avoiding advert page for "Open Subtitles MKV Player"
	downloadButton = document.getElementById('bt-dwl');
	downloadButton.href = downloadButton.rel.replace('subtitleserve','download');
	
	// remove event listeners from the download button (by cloning and replacing it)
	// to prevent any unwanted behavior
	downloadButton.parentNode.replaceChild(downloadButton.cloneNode(true), downloadButton);
}, false);