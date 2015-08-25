// ==UserScript==
// @name        OpenSubtitles Direct Downloads
// @namespace   https://github.com/Ede123/userscripts
// @version     1.0.2
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
	// check for download button on page
	var downloadButton = document.getElementById('bt-dwl') || document.getElementById('bt-dwl-bt');
	if(!downloadButton) return;

	// create direct link avoiding advert page for "Open Subtitles MKV Player"
	var location = document.location.href;
	var re = /subtitles\/(\d*)/i;
	var subtitleID = location.match(re)[1];
	downloadButton.href = "http://dl.opensubtitles.org/download/sub/" + subtitleID;
	downloadButton.removeAttribute("onclick");
	
	// remove event listeners from the download button (by cloning and replacing it)
	// to prevent any unwanted behavior
	downloadButton.parentNode.replaceChild(downloadButton.cloneNode(true), downloadButton);
}, false);