var obj;

//var serverhost = 'http://127.0.0.1:8000';
//var serverhost = 'https://492a2c2a.ngrok.io' ;
var serverhost = 'https://1d025ddc1c49.ngrok.io' ;

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
		  if (request.contentScriptQuery == 'querylogin') {
			  
			var url = serverhost + '/ajax/validate_username/?username='+
				encodeURIComponent(request.itemId) + '&password=' + encodeURIComponent(request.itemPass);
				
			fetch(url)
			.then(response => response.json())
			.then(response => sendResponse({farewell: response}))
			.catch(error => console.log(error))
				
			return true;  // Will respond asynchronously.
		  }
		  
		  else if (request.contentScriptQuery == 'queryregistration') {
			  
			var url = serverhost + '/ajax/validate_registration/?firstname='+
				encodeURIComponent(request.firstname) + '&lastname=' + encodeURIComponent(request.lastname) +
				'&email='+ encodeURIComponent(request.email) + '&phone=' + encodeURIComponent(request.phone) +
				'&gender='+ encodeURIComponent(request.gender) + '&country=' + encodeURIComponent(request.country) +
				'&date='+ encodeURIComponent(request.date)+ '&username=' + encodeURIComponent(request.username) +
				'&password='+ encodeURIComponent(request.password);
				
			console.log(url);
				
			fetch(url)
			.then(response => response.json())
			.then(response => sendResponse({farewell: response}))
			.catch(error =>  console.log(error))
				
			return true;  // Will respond asynchronously.
		  }
		  
		  else if(request.contentScriptQuery == 'querytrust') {
			  
			  var url = serverhost + '/ajax/add_trusted_contact/?contact_name='+
				encodeURIComponent(request.name) + '&contact_email=' + encodeURIComponent(request.mail) +
				
				'&priority=high'+ '&username=abc'+ '&contact_number=' + encodeURIComponent(request.number); // + encodeURIComponent(request.username);
				
				console.log(url);
				
				fetch(url)
				.then(response => response.json())
				.then(response => sendResponse({farewell: response}))
				.catch(error =>  console.log(error))
					
				return true;  // Will respond asynchronously.
		  }
		  
		  else if(request.contentScriptQuery == 'discard') {
			  
			  var url = serverhost + '/ajax/discarding/?sender='+
				encodeURIComponent(request.sender) + '&username=abc'+ '&x=0'; // + encodeURIComponent(request.username);
				
				console.log(url);
				
				fetch(url)
				.then(response => response.json())
				.then(response => sendResponse({farewell: response}))
				.catch(error =>  console.log(error))
					
				return true;  // Will respond asynchronously.
		  }
		  
		  else if(request.contentScriptQuery == 'mark') {
			  
			   var url = serverhost + '/ajax/discarding/?sender='+
				encodeURIComponent(request.sender) + '&username=abc'+ '&x=1'; // + encodeURIComponent(request.username);
				
				console.log(url);
				
				fetch(url)
				.then(response => response.json())
				.then(response => sendResponse({farewell: response}))
				.catch(error =>  console.log(error))
					
				return true;  // Will respond asynchronously.
		  }
		  
		  else if(request.contentScriptQuery == 'editname') {
			  
			  var url = serverhost + '/ajax/change_username/?newusername='+
				encodeURIComponent(request.name) + '&oldusername=abcd'; // + encodeURIComponent(request.username);
				
				console.log(url);
				
				fetch(url)
				.then(response => response.json())
				.then(response => sendResponse({farewell: response}))
				.catch(error =>  console.log(error))
					
				return true;  // Will respond asynchronously.
		  }
		  
		  else if(request.contentScriptQuery == 'editmail') {
			  
			  var url = serverhost + '/ajax/change_email/?newemail='+
				encodeURIComponent(request.mail) + '&oldusername=abc'; // + encodeURIComponent(request.username);
				
				console.log(url);
				
				fetch(url)
				.then(response => response.json())
				.then(response => sendResponse({farewell: response}))
				.catch(error =>  console.log(error))
					
				return true;  // Will respond asynchronously.
		  }
		  
		  else if(request.contentScriptQuery == 'editpass') {
			  
			  var url = serverhost + '/ajax/change_password/?newpassword='+
				encodeURIComponent(request.new_pass)+ '&oldpassword='+ encodeURIComponent(request.old_pass) + '&oldusername=abc'; // + encodeURIComponent(request.username);
				
				console.log(url);
				
				fetch(url)
				.then(response => response.json())
				.then(response => sendResponse({farewell: response}))
				.catch(error =>  console.log(error))
					
				return true;  // Will respond asynchronously.
		  }
		  else if(request.contentScriptQuery == 'editnum') {
			  
			  var url = serverhost + '/ajax/change_number/?newnumber='+
				encodeURIComponent(request.newnum)+ '&oldusername=abc'; // + encodeURIComponent(request.username);
				
				console.log(url);
				
				fetch(url)
				.then(response => response.json())
				.then(response => sendResponse({farewell: response}))
				.catch(error =>  console.log(error))
					
				return true;  // Will respond asynchronously.
		  }
		  
		  else if(request.contentScriptQuery == 'revertlogin') {
			
			revokeToken();
			sendResponse({farewell: "response"});
			return true;
		  }
		  
		  else if(request.contentScriptQuery == 'tokenization') {
			  browserActionClicked();
			  //getAuthTokenSilent();
			  
			  sendResponse({farewell: "response"});
			  return true;
			  
		  }
		  
		  else if(request.contentScriptQuery == 'fetchmails') {
			  //browserActionClicked();
			  getAuthTokenSilent();
			  
			  sendResponse({farewell: "response"});
			  return true;
			  
		  }
		  
		  else if(request.contentScriptQuery == 'sendmails') {
			  sendMessage('me', request.to, 'Urgent Help', request.mailbody );
			  sendResponse({farewell: 'done'});
			  return true; 
		  }
		  
		  
		});
		
		
		
		
function createBasicNotification(options) {
    var notificationOptions = {
        'type': 'basic',
        'iconUrl': options.iconUrl, // Relative to Chrome dir or remote URL must be whitelisted in manifest.
        'title': options.title,
        'message': options.message,
        'isClickable': true,
    };
    chrome.notifications.create(options.id, notificationOptions, function(notificationId) {});
}

function showAuthNotification() {
    var options = {
        'id': 'start-auth',
        'iconUrl': 'img/developers-logo.png',
        'title': 'GDE Sample: Chrome extension Google APIs',
        'message': 'Click here to authorize access to Gmail',
    };
    createBasicNotification(options);
}

/**
 * Clear a desktop notification.
 *
 * @param {string} notificationId - Id of notification to clear.
 */
function clearNotification(notificationId) {
    chrome.notifications.clear(notificationId, function(wasCleared) {});
}

/**
 * Get users access_token.
 *
 * @param {object} options
 *   @value {boolean} interactive - If user is not authorized ext, should auth UI be displayed.
 *   @value {function} callback - Async function to receive getAuthToken result.
 */
function getAuthToken(options) {
    chrome.identity.getAuthToken({ 'interactive': options.interactive }, options.callback);
}

/**
 * Get users access_token in background with now UI prompts.
 */
function getAuthTokenSilent() {
    getAuthToken({
        'interactive': false,
        'callback': getAuthTokenSilentCallback,
    });
}

function revokeToken() {
		getAuthToken({
			'interactive': false,
			'callback': revokeAuthTokenCallback,
		});
	}
	
	/**
	 * Revoking the access token callback
	 */
function revokeAuthTokenCallback(current_token) {
		if (!chrome.runtime.lastError) {

			// Remove the local cached token
			chrome.identity.removeCachedAuthToken({ token: current_token }, function() {});
			
			// Make a request to revoke token in the server
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' +
				   current_token);
			xhr.send();
		}
	
	}
	
	

/**
 * Get users access_token or show authorize UI if access has not been granted.
 */
function getAuthTokenInteractive() {
    getAuthToken({
        'interactive': true,
        'callback': getAuthTokenInteractiveCallback,
    });
}

/**
 * If user is authorized, start getting Gmail count.
 *
 * @param {string} token - Users access_token.
 */
function getAuthTokenSilentCallback(token) {
    // Catch chrome error if user is not authorized.
    if (chrome.runtime.lastError) {
        //showAuthNotification();
		//getAuthTokenInteractive();
    } else {
        updateLabelCount(token);
    }
}

/**
 * User finished authorizing, start getting Gmail count.
 *
 * @param {string} token - Current users access_token.
 */
function getAuthTokenInteractiveCallback(token) {
    // Catch chrome error if user is not authorized.
    if (chrome.runtime.lastError) {
        //showAuthNotification();
		//getAuthTokenInteractive();
    } else {
        updateLabelCount(token);
        //getProfile(token);
    }
}


/**
 * Get details about the users Gmail inbox.
 *
 * https://developers.google.com/gmail/api/v1/reference/users/labels/get
 *
 * @param {string} token - Current users access_token.
 */
function updateLabelCount(token) {
    get({
        'url': 'https://www.googleapis.com/gmail/v1/users/me/threads?labelIds=INBOX&maxResults=10',
        'callback': updateLabelCountCallback,
        'token': token,
    });
}

chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({url: "../Slider/slider1.html"}, function (tab) {
        console.log("New tab launched");
    });
});

/**
 * Got users Gmail inbox details.
 *
 * https://developers.google.com/gmail/api/v1/reference/users/labels/get
 *
 * @param {object} label - Gmail users.labels resource.
 */
function updateLabelCountCallback(label, token) {
    console.log(label);
	for(var ii=label.threads.length-1; ii>=0; ii--){
		var x = label.threads[ii].id;
		var u = "https://www.googleapis.com/gmail/v1/users/me/messages/" + x;
		
		get({
        'url': u,
        'callback': appendMessageRow,
        'token': token,
		});
		
	}
}

function appendMessageRow(message, token) {
	
		//console.log(message.snippet);
		//console.log(message.payload);
		//console.log(getBody(message.payload));
		
		console.log(message.payload.headers);
				var m = String(getBody(message.payload));
		console.log(m);
		
				if(m.includes("<div dir="))
				{
		
						var url = serverhost + '/ajax/mail_receive/?htmlmail='+
						encodeURIComponent(m.replace(/(<([^>]+)>)/ig,""))+'&sender='+ encodeURIComponent(String(getHeader(message.payload.headers, 'From')))
						+'&date='+ encodeURIComponent(String(getHeader(message.payload.headers, 'Date')))
						+'&subject='+ encodeURIComponent(String(getHeader(message.payload.headers, 'Subject')));
						
					fetch(url)
					.then(response => response.json())
					.then(response => parseResponse(response))
					.catch(error => console.log(error))
				}
				else
				{
					console.log(m);
				}
		
}

function parseResponse(response)
{
	//alert(response.raw + '\n' + '\n' + 'From: ' + response.sender + '\n' + 'Date: ' + String(response.date) + '\n' + 'Subject: ' + response.subject + '\n' +'\nMail Message: \n' + String(response.sentence)+ '\n' +'Toxic: ' + String(response.toxic) + ' %' +'\n' + 'Severe Toxic: ' + String(response.severe_toxic)
		//	+ ' %' + '\n' + 'Threat: ' + String(response.threat) + ' %' + '\n'+ 'Obscene: ' + String(response.obscene) + '\n'+ 'Insult: ' + String(response.insult)+ ' %' + '\n'+ 'Identity Hate: ' + String(response.identity_hate)+ ' %');
	
	/////////////////////
	
	if(response === undefined)
	{
		
	}
	else
	{
		chrome.runtime.sendMessage(
				{contentScriptQuery: 'tokenizationreply' , reply: response },
				function(response) {
					
					if(response === undefined)
					{
						
					}
					else
					{
						console.log(response.raw);
					}
					
					
				}	);
		
	}
				
	///////////////////
	
}

function getBody(message) {
        var encodedBody = '';
        if(typeof message.parts === 'undefined')
        {
          encodedBody = message.body.data;
        }
        else
        {
          encodedBody = getHTMLPart(message.parts);
        }
        encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
        return decodeURIComponent(escape(window.atob(encodedBody)));
      }
      function getHTMLPart(arr) {
        for(var x = 0; x <= arr.length; x++)
        {
          if(typeof arr[x].parts === 'undefined')
          {
            if(arr[x].mimeType === 'text/html')
            {
              return arr[x].body.data;
            }
          }
          else
          {
            return getHTMLPart(arr[x].parts);
          }
        }
        return '';
      }

		function getHeader(headers, index) {
        var header = '';
        for(var x = 0; x < headers.length; x++){
          if(headers[x].name === index){
            header = headers[x].value;
          }
        }
        return header;
      }


/**
 * Make an authenticated HTTP GET request.
 *
 * @param {object} options
 *   @value {string} url - URL to make the request to. Must be whitelisted in manifest.json
 *   @value {string} token - Google access_token to authenticate request with.
 *   @value {function} callback - Function to receive response.
 */
function get(options) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // JSON response assumed. Other APIs may have different responses.
            options.callback(JSON.parse(xhr.responseText), options.token);
        } else {
            //console.log('get', xhr.readyState, xhr.status, xhr.responseText);
        }
    };
    xhr.open("GET", options.url, true);
    // Set standard Google APIs authentication header.
    xhr.setRequestHeader('Authorization', 'Bearer ' + options.token);
    xhr.send();
}

function sendMessage(userId, to, subject, email) {
    chrome.identity.getAuthToken({'interactive': true}, function(token) {
        // load Google's javascript client libraries
        var url = "https://www.googleapis.com/upload/gmail/v1/users/me/messages/send?access_token=" + token;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState !== 4 || request.status !== 200) {
				if(request.readyState === 3 && request.status !== 200){
					console.log("successfully sent message");
				}
                return;
            }
        }
        ;
        request.open('POST', url, true);
		request.setRequestHeader('Content-Type', 'message/rfc822');
		request.setRequestHeader('Content-Transfer-Encoding', 'BASE64');
		var parametros = 'From: B-Messenger \r\nTo: <'+to+'>\r\nSubject: =?utf-8?B?'+subject+'?=\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: BASE64\r\n\r\n'+email+'\r\n'
        request.send(parametros);
    });
}

/**
 * Set browserAction status.
 *
 * @param {object} options
 *   @value {string} text - Up to four letters to be visible on browserAction.
 *   @value {string} color - Text background color. E.g. #FF0000
 *   @value {string} title - The hover tooltip.
 */
/**
 * Set the browserAction status for unauthenticated user.
 */
/**
 * User clicked on browserAction button. Check if user is authenticated.
 *
 * @param {object} tab - Chrome tab resource.
 */
 
function checkfortoken() {
    getAuthToken({
        'interactive': false,
        'callback': checkfortokenCallback,
    });
}

function checkfortokenCallback(token) {
    if (chrome.runtime.lastError) {
        chrome.browserAction.setPopup({popup: "popup.html"});
    } else {
        chrome.browserAction.setPopup({popup: "notif.html"});
    }


} 
 
 
function browserActionClicked() {
    getAuthToken({
        'interactive': false,
        'callback': getBrowserActionAuthTokenCallback,
    });
}

/**
 * If user is authenticated open Gmail in new tab or start auth flow.
 *
 * @param {string} token - Current users access_token.
 */
function getBrowserActionAuthTokenCallback(token) {
    if (chrome.runtime.lastError) {
        getAuthTokenInteractive();
    }/* else {
        chrome.tabs.create({ 'url': 'https://mail.google.com' });
    }*/

}

/**
 * Chrome alarm has triggered.
 *
 * @param {object} alarm - Chrome alarm resource.
 */
function onAlarm(alarm) {
    // Check Gmail for current unread count.
    if (alarm.name === 'update-count') {
        getAuthTokenSilent();
    }
}

//revokeToken();
checkfortoken();
//chrome.browserAction.onClicked.addListener(browserActionClicked1);
chrome.alarms.onAlarm.addListener(onAlarm);


//getAuthTokenSilent();
chrome.alarms.create('update-count', { 'delayInMinutes': 1, 'periodInMinutes': 60 });
		