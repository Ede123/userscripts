// ==UserScript==
// @name        OpenSubtitles Direct Downloads
// @namespace   https://github.com/Ede123/userscripts
// @version     1.1.1
// @description Creates direct download links for subtitles on opensubtitles.org
// @icon        https://raw.githubusercontent.com/Ede123/userscripts/master/icons/OpenSubtitles.png
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     http://www.opensubtitles.org/*
// @include     https://www.opensubtitles.org/*
// @grant       GM_addStyle
// @run-at      document-start
// ==/UserScript==


// remove checkboxes for "OS Download Manager"
GM_addStyle('#checkbox1,#checkbox2{display:none}');

// remove advertising asking users to sign up ("In order to watch Movies and TV Series online, please sign up for free")
GM_addStyle('#loginBoxSubs{display:none}');


function modifyButton() {
	// check for download button on page
	var downloadButton = document.getElementById('bt-dwl') || document.getElementById('bt-dwl-bt');
	if(!downloadButton) return;

	// extract direct link from "dowSub()" function
	var re1 = /product_download_url=([^'"]+)'/;
	var downloadURL = document.body.innerHTML.match(re1)[1];
    downloadURL = decodeURIComponent(downloadURL);
    
    var re2 = /(.+)\/(vrf-[a-z0-9]+)$/;
    var match = downloadURL.match(re2);
    downloadURL = match[1].replace('download', 'download/' + match[2]);
    
    // create direct link avoiding advert page for "Open Subtitles MKV Player"
	downloadButton.href = downloadURL;
	downloadButton.removeAttribute("onclick");
	
	// remove event listeners from the download button (by cloning and replacing it)
	// to prevent any unwanted behavior
	downloadButton.parentNode.replaceChild(downloadButton.cloneNode(true), downloadButton);
}


// unfortunately site scripts seem to take some time to load, so a simple DOMContentLoaded is not enough
function checkLoaded(iteration) {
    if (iteration < 20) {
        if(document.body.innerHTML.indexOf('product_download_url') < 0) {
            setTimeout(checkLoaded, 500, iteration+1);
        } else {
            modifyButton();
        }
        
    }
}
document.addEventListener("DOMContentLoaded", function(){checkLoaded(0);}, false);