var pageOptions = {
	'pubId' : 'dp-teaminternet01',
	'resultsPageBaseUrl' : 'http://parkingcrew.net/?ts=',
	'fontFamily' : 'arial',
	'optimizeTerms' : true,
	'maxTermLength' : 40,
	'adtest' : true,
	'clicktrackUrl' : 'http://parkingcrew.net/track.php?',
	'attributionText' : 'Ads',
	'colorAttribution' : '#b7b7b7',
	'fontSizeAttribution' : 16,
	'attributionBold': false,
	'rolloverLinkBold' : false,
	'fontFamilyAttribution' : 'arial',
	'adLoadedCallback' : function(container, adsLoaded) {
		if(!adsLoaded) {
			var ele = document.getElementById(container).getElementsByTagName('iframe')[0];
			var vars = JSON.parse( ele.name.substr( ele.id.length + 1 ) );
			if( typeof vars[ele.id].type == "string" && vars[ele.id].type == "relatedsearch" ) {
				relatedFallback( (function(){relatedCallback(vars[ele.id]);}) );
			}
		}
	},
	'pageLoadedCallback' : function(requestAccepted, status) {
		document.body.style.visibility = 'visible';

		if(status.faillisted === true || status.faillisted == "true" || status.blocked === true || status.blocked == "true") {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=block&reason=other&uid=" + encodeURIComponent(uniqueTrackingID));
		}

		if(status.errorcode && !status.error_code) {
			status.error_code = status.errorcode;
		}

		if(status.error_code) {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=errorcode&code="+encodeURIComponent(status.error_code)+"&uid=" + encodeURIComponent(uniqueTrackingID));
			if(status.error_code == 225) {
				window.location.replace("http://dp.g.doubleclick.net/apps/domainpark/domainpark.cgi?client=" + encodeURIComponent((pageOptions.pubid.match(/^ca-/i) ? "" : "ca-") + pageOptions.pubid) + "&domain_name=" + encodeURIComponent(domain) + "&output=html&drid=" + encodeURIComponent(pageOptions.domainRegistrant));
			}
		}

		if(status.needsreview === true || status.needsreview == "true") {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=needsreview&uid=" + encodeURIComponent(uniqueTrackingID));
		}

		if( (status.adult === true || status.adult == "true") && !isAdult) {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=adult&uid=" + encodeURIComponent(uniqueTrackingID));
		} else if( (status.adult === false || status.adult == "false") && isAdult) {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=nonadult&uid=" + encodeURIComponent(uniqueTrackingID));
		}

		// -- google parking
		if( requestAccepted ) {
			if(status.feed) {
				ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=feed&feed=" + encodeURIComponent(status.feed) + "&uid=" + encodeURIComponent(uniqueTrackingID));
			}
		}
	}
};

var x = function(obj1, obj2) {
	if(typeof obj1 != "object")
		obj1 = {};

	for(var key in obj2)
		obj1[key] = obj2[key];

	return obj1;
};

function getXMLhttp() { var xmlHttp=null;try {xmlHttp=new XMLHttpRequest();} catch (e) {try {xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");} catch (ex) {xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");}}return xmlHttp; }

function ajaxQuery(url) {
	if(adtest == 'on') return false;
	xmlHttp = getXMLhttp(); xmlHttp.open("GET", url, false); return xmlHttp.send(null);
}

ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&toggle=browserjs&uid=" + encodeURIComponent(uniqueTrackingID));