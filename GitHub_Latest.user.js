// ==UserScript==
// @name        GitHub Latest
// @namespace   https://github.com/Ede123/userscripts
// @version     0.9
// @description Always keep an eye on the latest activity of your favorite projects
// @icon        https://raw.githubusercontent.com/Ede123/userscripts/master/icons/GitHub.png
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     https://github.com/*
// @grant       none
// ==/UserScript==


// redirect link to automatically sort "your stars" by "recently active"
document.body.addEventListener('mousedown', function(e){
	var targ = e.target || e.srcElement;
	if ( targ && targ.href && targ.href.match(/\/stars$/) ) {
		targ.href = targ.href.replace(/\/stars$/, "/stars?sort=updated");
	}
});

// add a button to "latest issues"
function addLatestButton() {
	var reponav = document.getElementsByClassName("reponav");
	if (reponav && (reponav = reponav[0])) {
		var button = reponav.children[1].cloneNode(true);
		button.href += "?sort=updated";
		button.style.float = "right";
		button.firstElementChild.className = "octicon octicon-flame";
		button.removeChild(button.lastElementChild);
		button.normalize();
		button.lastChild.textContent = " Latest issues"
		button.removeAttribute("data-selected-links");
		button.classList.remove("selected");
		reponav.appendChild(button);
	}
}

addLatestButton();

// GitHub uses pjax to navigate between documents
unsafeWindow.$(document).on("pjax:success", function() {
	addLatestButton();
});