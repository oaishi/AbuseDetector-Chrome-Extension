// JavaScript source code
$(function(){

	chrome.storage.sync.get('tag',function(budget){
				
			var mails = budget.tag;
			if (typeof(mails) != "undefined"){
				var myChunkSplits = mails.split(' '); 
				var finalstr = '';

				var arrayLength = myChunkSplits.length;
				for (var i = 0; i < arrayLength-1; i++) {
					//console.log(myChunkSplits[i]);
					finalstr += myChunkSplits[i] + "\n";
				}

				$('#limit').text(finalstr);
			}
	});


	$('#resetLimit').click(function(){
		chrome.storage.local.clear(function() {
			var error = chrome.runtime.lastError;
			if (error) {
				console.error(error);
			}
		});

		$('#limit').text('');
	});

	$('#spendAmount').click(function(){

		var amount = $('#amount').val();

		if(amount){
				var tag ;
				chrome.storage.sync.get('tag', function(budget){
						var mails = budget.tag;
							/*if (typeof(mails) != "undefined"){
								tag = amount;
							}
							else{
								tag = amount + " "+ budget.tag;
							}*/
						//$('#total').text(tag);
						tag = amount + " "+ budget.tag;
						chrome.storage.sync.set({ 'tag' : tag }, function(){

						});
				});	

				$('#amount').val('');
				chrome.storage.sync.get('tag',function(budget){
				
					var mails = budget.tag;

					if (typeof(mails) != "undefined") {
						var myChunkSplits = mails.split(' ');
						var finalstr = '';

						var arrayLength = myChunkSplits.length;
						for (var i = 0; i < arrayLength-1; i++) {
							//console.log(myChunkSplits[i]);
							finalstr += myChunkSplits[i] + "\n";
						}

						$('#limit').text(finalstr);
					}
					document.location.reload() 

				});
		} //if(amount) ends here

	});

});
