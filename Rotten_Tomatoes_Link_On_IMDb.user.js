// ==UserScript==
// @name        Rotten Tomatoes Link On IMDb
// @namespace   https://github.com/Ede123/userscripts
// @version     0.96
// @description Adds a direct link to the corresponding Rotten Tomatoes movie description page for every IMDb movie
// @icon        https://raw.githubusercontent.com/Ede123/userscripts/master/icons/Rotten_Tomatoes.png
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     http://www.imdb.com/title/tt*
// @noframes
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// get IMDb movie ID
var IMDbID_RegEx = /\/title\/tt(\d{7})\//;
var IMDbID = IMDbID_RegEx.exec(window.location.href)[1];


// function to add the Rotten Tomatoes button
var addButton = function(link) {
	// create link element to Rotten Tomatoes
	var RT_link = link;
	var RT_icon = "http://www.rottentomatoes.com/favicon.ico";

	var RT = document.createElement('span');
	RT.style.cssFloat = "right";
	RT.innerHTML = "<a target='_blank' href='" + RT_link + "'>" +
	                   "<img src='" + RT_icon + "' width='16' height='16' style='vertical-align:bottom'/>" +
	               "</a>";

	//add link to IMDb movie page
	var overview = document.getElementById("overview-top");
	if (overview) {
		var star_box = overview.getElementsByClassName("star-box")[0];
		var star_box_rating_widget = star_box.getElementsByClassName("star-box-rating-widget")[0];
		star_box_rating_widget.appendChild(RT);
	}
};


// get Rotten Tomatoes movie alias from Rotten Tomatoes API
GM_xmlhttpRequest({
	method: "GET",
	url: "http://api.rottentomatoes.com/api/public/v1.0/movie_alias.json?" +
	     "type=imdb" + "&id=" + IMDbID + atob("JmFwaWtleT1kYWdxZGdod2FxM2UzbXh5cnA3a21tajU="),
	onload: function(response) {
		var json = JSON.parse(response.responseText);
		if (json && json.id) {
			var link = "http://www.rottentomatoes.com/m/" + json.id;
			addButton(link);
		}
		else if (json && json.error) {
			console.log("Error: " + json.error);
		}
	}
});