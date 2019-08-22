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

$(document).on("click","input[type='button']", function(){   


	var sender = $(this).closest('li').find('#sender').text();
	var subject = $(this).closest('li').find('#subject').text();	
	var message = $(this).closest('li').find('#message').text();	
	
    alert(sender);
	alert(subject);
	alert(message);
	
	chrome.runtime.sendMessage(
		{contentScriptQuery: 'sendmails' , from: sender , topic: subject , mailbody: message},
		function(response) {
			//alert("email fetched! see console..");
		}	);
});

function makemesvg(value, tag){
	
	var rem = 100 - value;
	var svg_tag = '</svg>'+
					'<svg width="20%" height="20%" viewBox="0 0 42 42" class="donut">' +
							  '<circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>'+
							  '<circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="3"></circle>' + 
							  '<circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ce4b99" stroke-width="3" stroke-dasharray=" '+ value.toString() + 
							  " " + rem.toString() + '" stroke-dashoffset="0"></circle>'+
						
						'<g class="chart-text">'+
							'<text x="50%" y="50%" class="chart-number">'+
							value.toString() +'%'+
							'</text>'+
							'<text x="50%" y="50%" class="chart-label">'+
							  tag +
							'</text>'+
						'</g>'+
						
					'</svg>';
	
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
					$('#Gmail').html(document.getElementById("Gmail").innerHTML+
					'<br>' +
					makemesvg(30.6, 'Toxic') + 
					makemesvg(45, 'Hate') + 
					makemesvg(56, 'Hatred') + 
					'<span>'+
					'<li>' +
					'<a class="widget-list-link" href="https://mail.google.com/mail/ca/u/0/#inbox" target="_blank" >'+
					'<span id=\'sender\' >'+sender + '</span>' + 
					'<br><span>'+ date+ '</span>'+
					'</a>'+
					'<span>'+
					'<br><b>Subject: </b>'+ '<span id=\'subject\' >'+Subject + '</span>' +
					'</span>'+ 
					'<span>'+'<br><br><b>Text: </b> <span id=\'message\'>'+Message+'</span><br>'+'</span>'+ 
					'<input type=\'button\' class=\'btn\' value=\'Ask for help!\' />'+
					'</li>'
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