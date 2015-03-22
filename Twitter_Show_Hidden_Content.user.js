// ==UserScript==
// @name        Twitter Show Hidden Content
// @namespace   https://github.com/Ede123/userscripts
// @version     1.0
// @description Removes the "sensitive material" warning on Twitter and unhides the content
// @icon        https://raw.githubusercontent.com/Ede123/userscripts/master/icons/Twitter.png
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @updateURL   https://openuserjs.org/install/Ede_123/Twitter_Show_Hidden_Content.meta.js
// @downloadURL https://openuserjs.org/install/Ede_123/Twitter_Show_Hidden_Content.user.js
// @include     https://twitter.com/*
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle('.hidden{display:inherit} .media-not-displayed{display:none}');