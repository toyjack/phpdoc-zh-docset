
$(document).ready(function () {

		//Only show this on every 5th upload attempt.
		//define captcha_count on the page that calls this.
		if (window.captcha_count % window.captcha_each == 0) {
			$("#colorBoxButton").colorbox({href:'/storecaptcha.php?uid=' + $('#uploadForm #uid').val(), opacity: .65, innerWidth:450, innerHeight:350, overlayClose: false, iframe:true });
		};
		
        $('#file_type_image').click(function() {
            $('#resize').show();
            $('#video-options').hide();
            $('#uploadurl').val('').hide();
            $('#uploadfile').show();
        });
        $('#file_type_video').click(function() {
            $('#resize').hide();
            $('#video-options').show();
            $('#uploadurl').val('').hide();
            $('#uploadfile').show();
        });
        $('#file_type_url').click(function() {
            document.forms.uploadForm.reset();
            $('#file_type_url').attr('checked', 'checked');
            $('#resize').show();
            $('#video-options').hide();
            $('#uploadfile').hide();
            $('#uploadurl').show();
        });
        $('#emailsharebox').click(function() {
            $('#emaildiv').hide();
            $('#emailinput').show();
        });

        $('#uploadForm #colorBoxButton').click(function() {
            var message = '';
            if ($('#uploadForm input[type="radio"]:checked').val() != 'url' && $('#the_file').val() == '') {
                message += "* Please select a file to upload\n";
            }
            if ($('#uploadForm input[type="radio"]:checked').val() == 'url' && $('#the_url').val() == '') {
                message += "* Please enter a URL to upload\n";
            }
            if ($('#uploadForm input[type="radio"]:checked').val() == undefined) {
                message += "* Please select a file type\n";
            }
            if ($('#uploadForm #emailsharebox:checked').val() != undefined) {
                if ($('#uploadForm #email-img').val()) {
                    var addy = $('#uploadForm #email-img').val();
                    if (addy.indexOf(",") > 0) {
                        var spos = 0;
                        var epos = addy.indexOf(",");
                        var rest = addy;
                        while (spos < rest.length && epos != -1) {
                            var em = rest.substring(spos, epos);
                            rest = rest.substring(epos+1);
                            if (!emailCheck(em)) {
                                message += "* Please enter a valid email address\n";
                                message += "\t'"+em+"' is not valid\n";
                                alert(message);
                                return false;
                            }
                            spos = 0;
                            epos = rest.indexOf(",");
                        }
                    } else {
                        if (!emailCheck(addy)) {
                            message += "* Please enter a valid email address\n";
                        }
                    }


                }
            }
            if (message) {
                alert(message);
                return false;
            }
            
			//So, where is this actually DOING anything?
			if (window.captcha_count % window.captcha_each != 0) {
				//stole code from #uploadbutton.click, below.
				if ($('#uploadForm input[type="radio"]:checked').val() == 'video') {
					var uid = $('#uid').val();
					var leftVal = (screen.width / 2) - 200;
					var topVal = (screen.height / 2) - 200;
					window.open('/progresswindow.php?UPLOAD_IDENTIFIER='+uid,'UploadMeter','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizable=yes,directories=no,location=no,width=400,height=400,left='+leftVal+',top='+topVal, true);
				}			
				
				$('#home_iframe').show();
				$('#home_info').hide();
				
				$('#uploadForm').submit();
			}
			
            return true;
        });

		$('#uploadButton').click(function() {
			var code = $('#adcopy_response').val();
			if (code == '') {
				alert("* Please enter the code.");
                return false;
			}
			var rsp = $('#adcopy_challenge').val();
			parent.$('#uploadForm #rrf').val(code);
			parent.$('#uploadForm #rcf').val(rsp);
			parent.$.fn.colorbox.close()
			
            if (parent.$('#uploadForm input[type="radio"]:checked').val() == 'video') {
                var uid = parent.$('#uid').val();
                var leftVal = (screen.width / 2) - 200;
                var topVal = (screen.height / 2) - 200;
                window.open('/progresswindow.php?UPLOAD_IDENTIFIER='+uid,'UploadMeter','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizable=yes,directories=no,location=no,width=400,height=400,left='+leftVal+',top='+topVal, true);
            }			
			
			parent.$('#home_iframe').show();
            parent.$('#home_info').hide();
			
			parent.$('#uploadForm').submit();
			return true;
		});

        $('#captchaForm').submit(function() {
            $('#uploadButton').trigger('click');
        });
});

