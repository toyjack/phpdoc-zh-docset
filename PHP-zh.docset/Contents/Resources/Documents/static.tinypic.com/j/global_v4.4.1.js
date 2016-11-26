/*	--------------------------------------------------
	Global jQuery Functions
	--------------------------------------------------	*/
	$(document).ready(function () {
        // tool tip
        $("a,input").tooltip();

        // login form validation
        $("#signinForm").submit(function() {
            var message = '';
            if ($("#signinForm #email").val() == '' || !emailCheck($("#signinForm #email").val())) {
                message += "* Please enter a valid email address\n";
            }
            if ($("#signinForm #password").val() == '') {
                message += "* Please enter your password\n";
            }
            if (message) {
                alert(message);
                return false;
            }
            return true;
        });

        // join form validation
        $("#joinForm").submit(function() {
            var message = '';
            if ($("#joinForm #email").val() == '' || !emailCheck($("#joinForm #email").val())) {
                message += "* Please enter a valid email address\n";
            }
            if ($("#joinForm #password").val() == '') {
                message += "* Please enter your password\n";
            } else if ($("#joinForm #password").val().length < 6) {
                    message += "* Your password is too short (minimum 6 characters)\n";
            }
            if ($("#joinForm select[name='dob_Month']").val() == '' || $("#joinForm select[name='dob_Day']").val() == '' || $("#joinForm select[name='dob_Year']").val() == '') {
                message += "* Please enter your date of birth\n";
            }
            if ($("#joinForm #captcha").val() == '') {
                message += "* Please enter the code\n";
            }
            if ($("#joinForm #termsVerification:checked").val() == undefined) {
                message += "* Please agree to the terms\n";
            }
            if (message !== '') {
                alert(message);
                return false;
            }
            return true;

        });

        // contact form validation
        $("#contact-form").submit(function() {

            var message = '';
            if ($("#contact-form #name").val() == '') {
                message += "* Please enter a valid name\n";
            }
            if ($("#contact-form #email").val() == '' || !emailCheck($("#contact-form #email").val())) {
                message += "* Please enter a valid email address\n";
            }
            if ($("#contact-form #comments").val() == '') {
                message += "* Please enter your comments\n";
            }
            if ($("#contact-form #code").val() == '') {
                message += "* Please enter the code\n";
            }
            if (message !== '') {
                alert(message);
                return false;
            }
            $("#contact-form .button").html('Sending...');
            $("#contact-form .button").attr('disabled', true);
            return true;
        });

        // lost password form validation
        $("#passwordForm1").submit(function() {
            var message = '';
            if ($("#passwordForm1 #email").val() == '' || !emailCheck($("#passwordForm1 #email").val())) {
                message += "* Please enter a valid email address\n";
            }
            if (message !== '') {
                alert(message);
                return false;
            }
            return true;
        });

        // lost password form validation
        $("#passwordForm2").submit(function() {
            var message = '';
            if ($("#passwordForm2 #new_password").val() == '' || $("#passwordForm2 #confirm_password").val() == '') {
                message += "* Please enter a password\n";
            } else if ($("#passwordForm2 #new_password").val().length < 6) {
                message += "* Your password is too short (minimum 6 characters)\n";
            }
            if ($("#passwordForm2 #new_password").val() != $("#passwordForm2 #confirm_password").val()) {
                message += "* Passwords do not match\n";
            }
            if (message !== '') {
                alert(message);
                return false;
            }
            return true;
        });
/*	--------------------------------------------------
	Plugin Stuff
	--------------------------------------------------	*/
    
        $("#create-plugin").change(function() {
            getPluginCode();

        });


        $("#update-preview").click(function() {
            var layout = ($("#plugin-size").val());
            var autoload = ($("input[name='plugin-display']:checked").val());
            var search = ($("input[name='show-search']:checked").val());
            var links = ($("input[name='link-type']:checked").val());
            var types = ($("input[name='media-type']:checked").val());
            var language = ($("#plugin-language").val());
            var callback_url = ($("#callback-url").val());
            var callback_text = ($("#button-text").val());
            var plugin_url = "http://plugin.tinypic.com/plugin/index.php?popts=l,"+layout+"|t,"+types+"|c,"+links+"|i,"+language+"|s,"+search;
            if (typeof(callback_url) != 'undefined')
                plugin_url += "|cu,"+escape(callback_url).replace(/\+/g,'%2b');
            if (typeof(callback_text) != 'undefined')
                plugin_url += "|ct,"+escape(callback_text).replace(/\+/g,'%2b');

            $("#plugin-preview").attr("src", plugin_url);

        });

		// Toggle advanced options
		$("input#show-advanced-options").click(function() {
			if ($(this).attr("checked") == true) {
				$("div.advanced-option").show();
			} else {
				$("div.advanced-option").hide();
			}
		});
		
		// Show or hide the button elements depending on radio button
		$("div.plugin-display input").click(function() {
			if (this.id == 'iframe') {
				$("div.button-preview").show();
				$("div.customize-buttons").show();
                $("iframe#plugin-preview").hide();
			} else {
				$("div.button-preview").hide();
				$("div.customize-buttons").hide();
                $("iframe#plugin-preview").show();
			}
		});

        $("#plugin-preview-button").click(function() {
                $("iframe#plugin-preview").show();
        });
		
		// Plugin Button Color
		$("#button-color").change(function() {
			if ($(this).val() == "green") {
				$("div.button-preview .button").removeClass("blue").removeClass("orange").addClass("green");
			} else if ($(this).val() == "blue") {
				$("div.button-preview .button").removeClass("green").removeClass("orange").addClass("blue");
			} else if ($(this).val() == "orange") {
				$("div.button-preview .button").removeClass("green").removeClass("blue").addClass("orange");
			}
		});

		// Plugin Button Size
		$("#button-size").change(function() {
			if ($(this).val() == "large") {
				$("div.button-preview .button").removeClass("small").removeClass("medium").addClass("large");
			} else if ($(this).val() == "medium") {
				$("div.button-preview .button").removeClass("small").removeClass("large").addClass("medium");
			} else if ($(this).val() == "small") {
				$("div.button-preview .button").removeClass("medium").removeClass("large").addClass("small");
			}
		});

        // search type
        $('#searchType a').click(function() {
            if (!$(this).hasClass('selectedType')) {
                $('#inline-search input[name="type"]').val($(this).attr('name'));
                $('#searchType a').toggleClass('selectedType');
            }
        });
	});

/*	--------------------------------------------------
	Tooltip Functions
	--------------------------------------------------	*/
$.fn.tooltip = function() {
    this.mouseover(
            function(e) {
                if((!this.title && !this.alt) && !this.tooltipset) { 
                    return; 
                }
                var mX = e.pageX || (e.clientX ? e.clientX + document.body.scrollLeft : 0);
                var mY = e.pageY || (e.clientY ? e.clientY + document.body.scrollTop : 0);
                mX += 10;
                mY += 10;
                var bgcolor = "#FFFFFF";
                var fgcolor = "#6699CC";
                if (!this.tooltipdiv) {
                    var div = document.createElement("div");
                    this.tooltipdiv = div;
                    $(div).addClass("title").html((this.title || this.alt));
                    this.title = "";
                    this.alt = "";
                    $("body").append(div);
                    this.tooltipset = true;
                }
                $(this.tooltipdiv).show().css({left: mX + "px", top: mY + 3 + "px"});
            }
        ).mouseout(
            function() {
                if (this.tooltipdiv) {
                    $(this.tooltipdiv).hide();
                }
            }
        );
        return this;
};

/*	--------------------------------------------------
	Email checker Function
	--------------------------------------------------	*/
function emailCheck(str) {
    var at="@";
    var dot=".";
    var lat=str.indexOf(at);
    var lstr=str.length;
    var ldot=str.indexOf(dot);
    if (str.indexOf(at)==-1) {
       return false;
    }

    if (str.indexOf(at)==-1 || str.indexOf(at)===0 || str.indexOf(at)==lstr) {
       return false;
    }

    if (str.indexOf(dot)==-1 || str.indexOf(dot)===0 || str.indexOf(dot)==lstr) {
        return false;
    }

     if (str.indexOf(at,(lat+1))!=-1) {
        return false;
     }

     if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot) {
        return false;
     }

     if (str.indexOf(dot,(lat+2))==-1) {
        return false;
     }

     if (str.indexOf(" ")!=-1) {
        return false;
     }
     return true;
}

/*	--------------------------------------------------
	Global Misc Functions
	--------------------------------------------------	*/
function resizeImg() {
    if ($("#imgElement").width() > $("div.media").width()) {
        $("#imgElement").addClass("imgsize");
    }
    $("#imgFrame").removeClass("imgtmp");
}

function highlight(field) {
    field.focus();
    field.select();
    var urlSwf = "http://static.tinypic.com/j/_clipboard.swf";

    window.status = 'Copied text to clipboard';

    // Copy the text inside the text box to the user's clipboard
    var flashcopier = 'flashcopier';
    var divholder = document.createElement('div');
    divholder.id = flashcopier;
    document.body.appendChild(divholder);

    divholder.innerHTML = '';
    var divinfo = '<em'+'bed src="' + urlSwf + '" FlashVars="clipboard='+escape(field.value)+'" width="0" height="0" type="application/x-shockwave-flash"></em'+'bed>';
    divholder.innerHTML = divinfo;

    return false;
}

function showTagsForm(id) {
    if (id) {
        var tagsel = document.getElementById('tag-holder-'+id);
        var formel = document.getElementById('tag-form-'+id);
    } else {
        var tagsel = document.getElementById('tag-holder');
        var formel = document.getElementById('tag-form');
    }
    tagsel.style.display = 'none';
    formel.style.display = '';
    formel.add_tag.focus();
    //document.update_tag.add_tag.focus();
}

function hideTagsForm(id) {
    if (id) {
        var tagsel = document.getElementById('tag-holder-'+id);
        var formel = document.getElementById('tag-form-'+id);
    } else {
        var tagsel = document.getElementById('tag-holder');
        var formel = document.getElementById('tag-form');
    }
    tagsel.style.display = '';
    formel.style.display = 'none';
}

function submitTags(form, id)
{
    var message='';
    if (form.add_tag.value === 'Click to add tags') {
        message = "* Please enter tags";
    }
    if (message !== '') {
        alert(message);
        return false;
    } else {
        if (id) {
            var tagsel = document.getElementById('tag-text-'+id);
        } else {
            var tagsel = document.getElementById('tag-text');
        }
        tagsel.innerHTML = '';
        var word = '';


        var i = 0;
        for (i=0; i < form.add_tag.value.length; i++)
        {
            var chr = form.add_tag.value.charAt(i);
            if (chr === ' ') {
                if (word.length >= 3 && word !== "and" && word !== "not") {
                    tagsel.innerHTML += '<a href="/search.php?tag=' + word + '&type=' + form.type.value + 's">'+word+'</a> ';
                } else {
                    tagsel.innerHTML += word + ' ';
                }
                word = '';
            } else {
                word = word + chr.toLowerCase();
            }
        }
        tagsel.innerHTML += '<a href="/search.php?tag=' + word + '&type=' + form.type.value + '">'+word+'</a> ';
		
		if (form.edit_tag && form.edit_tag.value) 
		{
			tagsel.innerHTML +=  '<a href="javascript:void(0);" onclick="javascript:showTagsForm();">(' + form.edit_tag.value +')</a> ';
		}
    }
    form.submit();

    hideTagsForm(id);

    return true;
}

function addBookmark(form, id)
{
    if (id) {
        var addel = document.getElementById('addFavs_'+id);
        var delel = document.getElementById('removeFavs_'+id);
    } else {
        var addel = document.getElementById('addFavs');
        var delel = document.getElementById('removeFavs');
    }
    form.submit();
    addel.style.display = 'none';
    delel.style.display = '';
    
}

function delBookmark(form, id)
{
    if (id) {
        var addel = document.getElementById('addFavs_'+id);
        var delel = document.getElementById('removeFavs_'+id);
    } else {
        var addel = document.getElementById('addFavs');
        var delel = document.getElementById('removeFavs');
    }
    form.submit();
    delel.style.display = 'none';
    addel.style.display = '';

}

function openOffensiveWindow(type, hex, silo)
{
    var leftVal = (screen.width / 2) - 225;
    var topVal = (screen.height / 2) - 80;
    window.open('/abuse.php?type='+type+'&hex='+hex+'&s='+silo,'Email','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizable=yes,directories=no,location=no,width=450,height=160,left='+leftVal+',top='+topVal);
    return false;
}


function submitEmailForm(form)
{
    var message='';
    if (form.addresses.value === '') {
        message = "* Please enter an email address\n";
        alert(message);
        return false;
    }
    var addy = form.addresses.value;
    if (addy.indexOf(",") > 0) {
        var spos = 0;
        var epos = addy.indexOf(",");
        var rest = addy;
        while (spos < rest.length && epos != -1) {
            var em = rest.substring(spos, epos);
            rest = rest.substring(epos+1);
            if (!emailCheck(em)) {
                message = "* Please enter a valid email address\n";
                message += "\t'"+em+"' is not valid\n";
                alert(message);
                return false;
            }
            spos = 0;
            epos = rest.indexOf(",");
        }
    } else {
        if (!emailCheck(addy)) {
            message = "* Please enter a valid email address\n";
        }
    }
    if (message !== '') {
        alert(message);
        return false;
    } else {
        form.submit();
    }

}

function APITrack(type) {
        var tpid = '2cacc812f6662e5f';
        var apiPath = '/api.php';
        var responseFormat = 'json';
        var method = 'track';
        var sig = '243e64a77c25c88fd4f56e8cf9d6907a';

        var params =
            'sig=' + sig +
            '&responsetype=' + responseFormat +
            '&action=' + method +
            '&tpid=' + tpid +
            '&type=' + type +
            '&cb=' + new Date();

        $.getJSON( apiPath + "?" + params );
}

function APIAjaxTrack(type){
        var tpid = '2cacc812f6662e5f';
        var apiPath = '/api.php';
        var responseFormat = 'json';
        var method = 'track';
        var sig = '243e64a77c25c88fd4f56e8cf9d6907a';

        var params =
            'sig=' + sig +
            '&responsetype=' + responseFormat +
            '&action=' + method +
            '&tpid=' + tpid +
            '&type=' + type +
            '&cb=' + new Date();

        $.ajax({
            url: apiPath + "?" + params,
            type: 'GET',
            async: false,
            cache: false,
            timeout: 30000,
            error: function(){
                return true;
            },
            success: function(msg){ 
                return true;
            }
        });
        
}


function openHelp(section)
{
    var dwidth = 800;
    var dheight = 600;
    var leftVal = (screen.width / 2) - (dwidth/2);
    var topVal = (screen.height / 2) - (dheight/2);
    if (section) {
        window.open("/help/TinyPicHelp_CSH.htm#"+section, "HelpWindow", "fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=yes,resizeable=yes,directories=no,location=no,width="+dwidth+",height="+dheight+",left="+leftVal+",top="+topVal, true);
    } else {
        window.open("/help/TinyPicHelp.htm", "HelpWindow", "fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=yes,resizeable=yes,directories=no,location=no,width="+dwidth+",height="+dheight+",left="+leftVal+",top="+topVal, true);
    }
}

function openTerms()
{
    var dwidth = 850;
    var dheight = 600;
    var leftVal = (screen.width / 2) - (dwidth/2);
    var topVal = (screen.height / 2) - (dheight/2);
    window.open('/terms.php','TermsWindow','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizable=yes,directories=no,location=no,width='+dwidth+',height='+dheight+',left='+leftVal+',top='+topVal, true);
}

function openPrivacy()
{
    var dwidth = 850;
    var dheight = 600;
    var leftVal = (screen.width / 2) - (dwidth/2);
    var topVal = (screen.height / 2) - (dheight/2);
    window.open('/privacy.php','PrivacyWindow','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizable=yes,directories=no,location=no,width='+dwidth+',height='+dheight+',left='+leftVal+',top='+topVal, true);
}

function openPopup(url) {
    var dwidth = 850;
    var dheight = 600;
    var leftVal = (screen.width / 2) - (dwidth/2);
    var topVal = (screen.height / 2) - (dheight/2);
    window.open(url,'TinypicWindow','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,directories=no,location=no,width='+dwidth+',height='+dheight+',left='+leftVal+',top='+topVal, true);

}
function loginBookmarkNotice()
{
    alert('You must be logged into to Add or Remove Favorites.');
}

function openVote()
{
    var dwidth = 205;
    var dheight = 390;
    var leftVal = (screen.width / 2) - (dwidth/2);
    var topVal = (screen.height / 2) - (dheight/2);
    window.open('/vote.php','TinypicWindow','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,directories=no,location=no,width='+dwidth+',height='+dheight+',left='+leftVal+',top='+topVal, true);


}
function limitChars(textid, limit, infodiv)
{
    var text = $('#' + textid).val();
    if (text.length > limit)
    {
        $('#' + infodiv).html('<font color="red">You cannot write more than '+limit+' characters!</font>');
        $('#' + textid).val(text.substr(0,limit));
        return false;
    }
    else
    {
        $('#' + infodiv).html((limit - text.length) + ' characters left.');
        return true;
    }
}
function openTwitgoo(furl,surl,mkey) {
    var dwidth = 605;
    var dheight = 605;
    var leftVal = (screen.width / 2) - (dwidth/2);
    var topVal = (screen.height / 2) - (dheight/2);
    window.open('http://twitgoo.com/-share/?upload_url='+furl+'&source_url='+surl+'&mediakey='+mkey, 'TwitgooWindow','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=no,directories=no,location=no,width='+dwidth+',height='+dheight+',left='+leftVal+',top='+topVal, true);
}
