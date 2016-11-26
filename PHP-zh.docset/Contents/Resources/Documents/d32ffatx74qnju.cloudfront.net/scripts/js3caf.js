var pageLoadedCallbackTriggered = false;
var fallbackTriggered = false;
var formerCalledArguments = false;

var pageOptions = {
    'pubId': 'dp-teaminternet01',
    'resultsPageBaseUrl': 'http://parkingcrew.net/?ts=',
    'fontFamily': 'arial',
    'optimizeTerms': true,
    'maxTermLength': 40,
    'adtest': true,
    'clicktrackUrl': 'http://track.parkingcrew.net/track.php?',
    'attributionText': 'Ads',
    'colorAttribution': '#b7b7b7',
    'fontSizeAttribution': 16,
    'attributionBold': false,
    'rolloverLinkBold': false,
    'fontFamilyAttribution': 'arial',
    'adLoadedCallback': function (container, adsLoaded) {
        if (!adsLoaded) {
            try {
                var ele = document.getElementById(container).getElementsByTagName('iframe')[0];
                var vars = JSON.parse(ele.name.substr(ele.id.length + 1));
                if (typeof vars[ele.id].type == "string" && vars[ele.id].type == "relatedsearch") {
                    relatedFallback((function () {
                        relatedCallback(vars[ele.id]);
                    }));
                }
            } catch (err) {
                if (!(err instanceof SyntaxError)) {
                    throw err;
                }
            }
        }
    },
    'pageLoadedCallback': function (requestAccepted, status) {

        document.body.style.visibility = 'visible';
        pageLoadedCallbackTriggered = true;

        if ((status.faillisted === true || status.faillisted == "true" || status.blocked === true || status.blocked == "true" ) && status.error_code != 238) {
            ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=block&reason=other&uid=" + encodeURIComponent(uniqueTrackingID));
        }

        if (status.errorcode && !status.error_code) {
            status.error_code = status.errorcode;
        }

        if (status.error_code) {
            ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=errorcode&code=" + encodeURIComponent(status.error_code) + "&uid=" + encodeURIComponent(uniqueTrackingID));

            if ([240, 239, 207].indexOf(parseInt(status.error_code)) != -1 && fallbackTriggered == false) {
                fallbackTriggered = true;
                if (typeof loadFeed === "function") {
                    window.location.href = 'http://' + location.host;
                }
            }

            if (status.error_code == 225) {
                window.location.replace("http://dp.g.doubleclick.net/apps/domainpark/domainpark.cgi?client=" + encodeURIComponent((pageOptions.pubid.match(/^ca-/i) ? "" : "ca-") + pageOptions.pubid) + "&domain_name=" + encodeURIComponent(domain) + "&output=html&drid=" + encodeURIComponent(pageOptions.domainRegistrant));
            }
        }

        if (status.needsreview === true || status.needsreview == "true") {
            ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=needsreview&uid=" + encodeURIComponent(uniqueTrackingID));
        }

        if ((status.adult === true || status.adult == "true") && !isAdult) {
            ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=adult&uid=" + encodeURIComponent(uniqueTrackingID));
        } else if ((status.adult === false || status.adult == "false") && isAdult) {
            ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=nonadult&uid=" + encodeURIComponent(uniqueTrackingID));
        }

        // -- google parking
        if (requestAccepted) {
            if (status.feed) {
                ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=feed&feed=" + encodeURIComponent(status.feed) + "&uid=" + encodeURIComponent(uniqueTrackingID));
            }
            if (status.error_code) {
                ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=answercheck&answer=error_" + encodeURIComponent(status.error_code) + "&uid=" + encodeURIComponent(uniqueTrackingID));
            } else {
                ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=answercheck&answer=yes&uid=" + encodeURIComponent(uniqueTrackingID));
            }
        } else {
            ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=answercheck&answer=rejected&uid=" + encodeURIComponent(uniqueTrackingID));
        }
    }
}

var x = function (obj1, obj2) {
    if (typeof obj1 != "object")
        obj1 = {};

    for (var key in obj2)
        obj1[key] = obj2[key];

    return obj1;
};

function getXMLhttp() {
    var xmlHttp = null;
    try {
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (ex) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (exc) {
            }
        }
    }
    return xmlHttp;
}

function ajaxQuery(url) {
    if (adtest == 'on') return false;
    xmlHttp = getXMLhttp();
    if (!xmlHttp) return ajaxBackfill(url);
    xmlHttp.open("GET", url, false);
    return xmlHttp.send(null);
}

function ajaxBackfill(url) {
    if (adtest == 'on') return false;
    if (url.indexOf("&toggle=browserjs") > -1) return false;
    try {
        var img = document.createElement('img');
        img.style.visibility = 'hidden';
        img.style.width = '1px';
        img.style.height = '1px';
        img.src = url + "&_t=" + new Date().getTime();
        document.body.appendChild(img);
    } catch (e) {
    }
}

var waitTime = 0;
var timeout = 2000;
var waitStep = 1000;
function listenFor1TierResponse() {

    if (typeof pageLoadedCallbackTriggered == 'undefined') {
        return;
    }

    if (waitTime < timeout && pageLoadedCallbackTriggered == false) {
        waitTime = waitTime + waitStep;
        setTimeout(listenFor1TierResponse, waitStep);
        return;
    }

    if (pageLoadedCallbackTriggered == false) {
        document.body.style.visibility = 'visible';
    }
}
listenFor1TierResponse();


ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&toggle=browserjs&uid=" + encodeURIComponent(uniqueTrackingID));