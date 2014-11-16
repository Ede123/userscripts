// ==UserScript==
// @name        OpenSubtitles Direct Downloads
// @namespace   https://github.com/Ede123/userscripts
// @description Creates direct download links for subtitles on opensubtitles.org
// @include     http://www.opensubtitles.org/*
// @version     0.9
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @grant       GM_addStyle
// ==/UserScript==


// remove checkboxes for "OS Download Manager"
GM_addStyle('#checkbox1,#checkbox2{display:none}');

// create direct link avoiding advert page for "Open Subtitles MKV Player"
downloadButton = document.getElementById('bt-dwl');
downloadButton.href = downloadButton.rel.replace('subtitleserve','download');