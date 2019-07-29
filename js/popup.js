// JavaScript source code

String.prototype.hashCode = function(){

    var hash = 0;

    if (this.length == 0) return hash;

    for (i = 0; i < this.length; i++) {

        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

$(function(){


	var username;
	var password;
	
	var result;

	$("#id_username").change(function () {
      username = $(this).val();
    });


	$("#id_password").change(function () {
	  password = $(this).val();
	  //alert(username+' '+password);
    });

	$('#login').click(function(){
		//hashPassword : password.hashCode();
		//alert(username+' '+password.hashCode());
		
		chrome.runtime.sendMessage(
		{contentScriptQuery: 'querylogin', itemId: username, itemPass: password.hashCode()},
		function(response) {
			result = response.farewell;
			alert(result.raw);
			
			if(result.is_taken ){
				chrome.browserAction.setPopup({popup: "notif.html"});
				window.close ();
			}
		}	);

	});
	
});

