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

$(document).on("click","input[value='Mark']", function(){   


	var sender = $(this).closest('li').find('#sender').text();
		
	chrome.runtime.sendMessage(
		{contentScriptQuery: 'mark' , sender: sender},
		function(response) {
			result = response.farewell;
			alert(result.raw);
		}	);
});

$(document).on("click","input[value='Discard']", function(){   


	var sender = $(this).closest('li').find('#sender').text();	
	
	chrome.runtime.sendMessage(
		{contentScriptQuery: 'discard' , sender: sender},
		function(response) {
			result = response.farewell;
			alert(result.raw);
		}	);
});

$(document).on("click","input[value='Ask for help!']", function(){   


	var sender = $(this).closest('li').find('#sender').text();
	var subject = $(this).closest('li').find('#subject').text();	
	var message = $(this).closest('li').find('#message').text();
	var date = $(this).closest('li').find('#date').text();	
	
    //alert(sender);
	//alert(subject);
	//alert(message);
	//alert(date);
	
	var contact = 'oaishi.faria@gmail.com';
	
	
	var mailmessage = 'Hi, <br>I need your help on an urgent matter. I got a mail from ' + sender + ' on ' + date + ' that potentially contains '+
	'some sort of abuse. The contents of the email is appended below. <br><br>' +'Subject: ' + subject +'<br><br>Text: '+ message;
		
		
		
	chrome.runtime.sendMessage(
		{contentScriptQuery: 'sendmails' , from: sender , to: contact, topic: subject , mailbody: mailmessage},
		function(response) {
			alert("Successfully Sent Help Message.");
		}	);
});

function makemesvg(value, tag){
	
	var rem = 100 - value;
	var svg_tag = '</svg>'+
					'<svg width="16%" height="16%" viewBox="0 0 42 42" class="donut">' +
							  '<circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>'+
							  '<circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="3"></circle>' + 
							  '<circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ce4b99" stroke-width="3" stroke-dasharray=" '+ value.toString() + 
							  " " + rem.toString() + '" stroke-dashoffset="0"></circle>'+
						
						'<g class="chart-text">'+
							'<text x="50%" y="50%" class="chart-number">'+
							value.toString() +'%'+
							'</text>'+
							'<text x="50%" y="50%" class="chart-label"><b>'+
							  tag +
							'</b></text>'+
						'</g>'+
						
					'</svg>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	
	return svg_tag;
}


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
				Toxic = 0.0;
			  if(Severe_Toxic === undefined)
				Severe_Toxic = 0.0;
			  if(Threat === undefined)
				Threat = 0.0;
			  if(Insult === undefined)
				Insult = 0.0;
			  if(Identity_Hate === undefined)
				Identity_Hate = 0.0;
			  if(Obscene === undefined)
				Obscene = 0.0;
			
			  var params = '';
	  
			if(Toxic>50.0) params += makemesvg(Toxic, 'Toxicity');
			if(Severe_Toxic>50.0) params += makemesvg(Severe_Toxic, 'Severe-Toxicity');
			if(Threat>50.0) params += makemesvg(Threat, 'Threat');
			if(Insult>50.0) params += makemesvg(Insult, 'Insult');					
			if(Identity_Hate>50.0) params += makemesvg(Identity_Hate, 'Hate'); 
			if(Obscene>50.0) params += makemesvg(Obscene, 'Obscene');
			
			//params += ''
			
			var help = '';
			
			if(params != '') help += '<br><br><input type=\'button\' class=\'btn\' value=\'Ask for help!\' /><input type=\'button\' class=\'btn\' value=\'Discard\' />' + 
			'<input type=\'button\' class=\'btn\' value=\'Mark\' /><br>';
			else return;
			  
				$(function(){
					$('#Gmail').html(document.getElementById("Gmail").innerHTML+
					'<span>'+
					'<li>' +
					'<a class="widget-list-link" href="https://mail.google.com/mail/ca/u/0/#inbox" target="_blank" >'+
					'<span id=\'sender\' >'+sender + '</span>' + 
					'<br><span id=\'date\' >'+ date+ '</span>'+
					'</a>'+
					'<span>'+
					'<br><b>Subject: </b>'+ '<span id=\'subject\' >'+Subject + '</span>' +
					'</span>'+ 
					'<span>'+'<br><br><b>Text: </b> <span id=\'message\'>'+Message+'</span><br>'+'</span>'+ 
					params +
					help +
					'</li><hr><br>'
					//'<span>'+'<br><b>Toxic: </b>'+Toxic+' %'+'</span>'+ 
					//'<span>'+'<br><b>Severe Toxic: </b>'+Severe_Toxic+' %'+'</span>'+ 
					//'<span>'+'<br><b>Obscene: </b>'+Obscene+' %'+'</span>'+ 
					//'<span>'+'<br><b>Threat: </b>'+Threat+' %'+'</span>'+ 
					//'<span>'+'<br><b>Insult: </b>'+Insult+' %'+'</span>'+ 
					//'<span>'+'<br><b>Identity Hate: </b>'+Identity_Hate+' %'+'</span>'
					);
					});
		}
				 
				sendResponse({raw: "yaay"});
				return true;
				
				};
		  }
);