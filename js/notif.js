function sendmessage()
{
	chrome.runtime.sendMessage(
		{contentScriptQuery: 'tokenization'},
		function(response) {
			//alert("email fetched! see console..");
		}	);
}

function getmessage()
{
	chrome.runtime.sendMessage(
		{contentScriptQuery: 'fetchmails'},
		function(response) {
			//alert("email fetched! see console..");
		}	);
}


getmessage();

$(document).ready(function() {
	$('#Gmail').html('');
	
	$('#closewindow').click(function(){
		window.close ();
	});
	
	$('#getauthtoken').click(function(){
		sendmessage();
		//alert("Logged in to Gmail!");
	});
	
	$('#revertauthtoken').click(function(e){
		
		console.log("revert token needed");
		chrome.runtime.sendMessage(
		{contentScriptQuery: 'revertlogin'},
		function(response) {
		  console.log("revert token done");
		}  );
		
		$('#Gmail').html('');
		alert("Logged out from Gmail!");
	});
	
	
});

chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
		  if (request.contentScriptQuery == 'tokenizationreply') {
			  
			  response = request.reply;
			  
			  var is_abusive = response.is_taken;
			  
			  ///
			  
		if(is_abusive){			

			  ///
			  
			  var raw = response.raw;
			  var sender = response.sender;
			  var date = String(response.date);
			  
			  var Subject = response.subject;
			  var Message = String(response.sentence);
			  var Toxic = String(response.toxic);
			  var Severe_Toxic = String(response.severe_toxic);
			  var Threat = String(response.threat) ;
			  var Insult = String(response.insult);
			  var Identity_Hate = String(response.identity_hate);
			  var Obscene = String(response.obscene);
		
			  if(sender === undefined)
				sender = "oaishi.faria@gmail.com";
			  if(Message === undefined)
				Message = "Hello World!";
			  if(Toxic === undefined)
				Toxic = "0.0";
			  if(Severe_Toxic === undefined)
				Severe_Toxic = "0.0";
			  if(Threat === undefined)
				Threat = "0.0";
			  if(Insult === undefined)
				Insult = "0.0";
			  if(Identity_Hate === undefined)
				Identity_Hate = "0.0";
			  if(Obscene === undefined)
				Obscene = "0.0";
			  
			  
				$(function(){
					 $('#Gmail').html(document.getElementById("Gmail").innerHTML+ '<br><br><img src="https://img.icons8.com/color/96/000000/gmail.png" width=50 height=50>' + '<span>'+'<li>' +'<a class="widget-list-link" href="https://mail.google.com/mail/ca/u/0/#inbox" target="_blank">'+sender + '<span>'+'<br>'+date+'</span>'+'</a>'+'<span>'+'</li>'+'<b>Subject: </b>'+Subject+'</span>'+ '<span>'+'<br><br><b>Text: </b>'+Message+'<br>'+'</span>'+ '<span>'+'<br><b>Toxic: </b>'+Toxic+' %'+'</span>'+ '<span>'+'<br><b>Severe Toxic: </b>'+Severe_Toxic+' %'+'</span>'+ '<span>'+'<br><b>Obscene: </b>'+Obscene+' %'+'</span>'+ '<span>'+'<br><b>Threat: </b>'+Threat+' %'+'</span>'+ '<span>'+'<br><b>Insult: </b>'+Insult+' %'+'</span>'+ '<span>'+'<br><b>Identity Hate: </b>'+Identity_Hate+' %'+'</span>');
	
					});
		}
				 
				sendResponse({raw: "yaay"});
				return true;
				
				};
		  }
);