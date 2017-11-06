// ==UserScript==
// @name        GitHub Latest
// @namespace   https://github.com/Ede123/userscripts
// @version     1.0.5
// @description Always keep an eye on the latest activity of your favorite projects
// @icon        https://raw.githubusercontent.com/Ede123/userscripts/master/icons/GitHub.png
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL-3.0+; http://www.gnu.org/copyleft/gpl.html
// @include     https://github.com/*
// @grant       none
// ==/UserScript==


// redirect link to automatically sort "your stars" by "recently active"
document.body.addEventListener('mousedown', function(e){
	var targ = e.target || e.srcElement;
	if ( targ && targ.href && targ.href.match(/tab=stars$/) ) {
		targ.href = targ.href.replace(/tab=stars$/, "tab=stars&sort=updated");
	}
});

// add a button to "latest issues"
function addLatestButton() {
    // do not add button again if already present
	if (document.getElementById("latest-button")) {
		return;
	}

	var reponav = document.getElementsByClassName("reponav");
	if (reponav && (reponav = reponav[0])) {
		var button = reponav.children[1].firstElementChild.cloneNode(true);
		button.id = "latest-button"
		button.href += "?sort=updated";
		button.style.float = "right";

		// unselect
		button.classList.remove("selected");
		button.removeAttribute("data-selected-links");

		// adjust icon
		button.firstElementChild.setAttribute("class","octicon octicon-flame");
		button.firstElementChild.firstChild.setAttribute("d","M5.05 0.31c0.81 2.17 0.41 3.38-0.52 4.31-0.98 1.05-2.55 1.83-3.63 3.36-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-0.3-6.61-0.61 2.03 0.53 3.33 1.94 2.86 1.39-0.47 2.3 0.53 2.27 1.67-0.02 0.78-0.31 1.44-1.13 1.81 3.42-0.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52 0.13-2.03 1.13-1.89 2.75 0.09 1.08-1.02 1.8-1.86 1.33-0.67-0.41-0.66-1.19-0.06-1.78 1.25-1.23 1.75-4.09-1.88-6.22l-0.02-0.02z");

		// remove counter
		var counter = button.getElementsByClassName('counter')[0] || button.getElementsByClassName('Counter')[0];
        if (counter) {
            button.removeChild(counter);
        }

		var items = button.querySelectorAll('[itemprop]');
		for (var i = 0; i < items.length; i++) {
			// adjust name
			if (items[i].getAttribute("itemprop") == "name") {
				items[i].textContent = "Latest issues"
			}
		}

		reponav.appendChild(button);
	}
}

addLatestButton();

// GitHub uses pjax to navigate between documents
document.addEventListener('pjax:success', addLatestButton);
