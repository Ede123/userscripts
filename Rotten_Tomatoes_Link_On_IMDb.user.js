﻿// ==UserScript==
// @name        Rotten Tomatoes Link On IMDb
// @namespace   https://github.com/Ede123/userscripts
// @version     1.5
// @description Adds a direct link to the corresponding Rotten Tomatoes movie description page for every IMDb movie
// @icon        https://raw.githubusercontent.com/Ede123/userscripts/master/icons/Rotten_Tomatoes.png
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// @include     http://www.imdb.com/title/tt*
// @include     https://www.imdb.com/title/tt*
// @noframes
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// get IMDb movie ID
var IMDbID_RegEx = /\/title\/(tt\d{7,8})\//;
var IMDbID = IMDbID_RegEx.exec(window.location.href)[1];


// function to add the Rotten Tomatoes button
var addButton = function(link) {
    // icon
    var RT_icon = document.createElement('img');
    // RT_icon.src = "http://www.rottentomatoes.com/favicon.ico";
    // RT_icon.src = "https://staticv2.rottentomatoes.com/static/images/icons/favicon.ico";
    // RT_icon.src = "https://rottentomatoes.com/static/images/icons/favicon.ico";
    // RT_icon.src = "https://staticv2-4.rottentomatoes.com/static/images/icons/favicon.ico";
    RT_icon.src = "https://www.rottentomatoes.com/assets/pizza-pie/images/favicon.ico";
    RT_icon.width = RT_icon.height = 16;

    // link
    var RT_link = document.createElement('a');
    RT_link.target = "_blank";
    RT_link.href = link;
    RT_link.appendChild(RT_icon);

    // add link to IMDb movie page
    var metadata = document.getElementsByClassName("ipc-inline-list")[1];
    if (metadata) {
        RT_icon.style.verticalAlign = "middle";

        list_item = document.createElement('li');
        list_item.classList.add("ipc-inline-list__item");
        list_item.appendChild(RT_link);

        metadata.appendChild(list_item);
    }
};


// --- polyfill
// this more optimal way does not work with GM: var GM = GM || {};
if (typeof GM == 'undefined') { this.GM = {}; }
if (GM.xmlHttpRequest === undefined) { GM.xmlHttpRequest = GM_xmlhttpRequest; }


// get Rotten Tomatoes movie alias from Rotten Tomatoes API
GM.xmlHttpRequest({
    method: "GET",
    url: "http://www.omdbapi.com/?apikey=6be019fc&tomatoes=true&i=" + IMDbID,
    onload: function(response) {
        var json = JSON.parse(response.responseText);
        if (json && json.tomatoURL && json.tomatoURL != "N/A") {
            addButton(json.tomatoURL);
        }
        else if (json && json.Error) {
            console.log("Error: " + json.Error);
        }
    }
});
