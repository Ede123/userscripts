// ==UserScript==
// @name        Twitter Show Hidden Content
// @namespace   https://github.com/Ede123/userscripts
// @version     1.0.3
// @description Removes the "sensitive material" warning on Twitter and unhides the content
// @icon        https://raw.githubusercontent.com/Ede123/userscripts/master/icons/Twitter.png
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// @include     https://twitter.com/*
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle('.u-hidden{display:inherit !important} .Tombstone{display:none}');
