// ==UserScript==
// @name        Google Cleaner
// @namespace   https://github.com/Ede123/userscripts
// @version     0.9
// @description Makes Google search page more compact and removes some unnecessary information.
// @icon        https://raw.githubusercontent.com/Ede123/userscripts/master/icons/Google.png
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     http://www.google.tld/search*
// @include     https://www.google.tld/search*
// @grant       GM_addStyle
// @run-at      document-start
// ==/UserScript==

GM_addStyle(
	// hide some unnecessary stuff
	  '.pdp-psy,' // cookie warning
	+ '#taw,'  // privacy notifications
	+ '#appbar' // number of results
	+ '  {display:none !important;}'

	// reduce height of menu header
	+ '#hdtbSum { height:35px !important; line-height:31px !important;}' // header
	+ '.hdtb-msel { height:31px !important;}' // selected header item
	+ '#hdtbMenus { top:unset !important;}' // search options menu
	+ '#hdtb-more-mn { top:unset !important;}' // more menu
);