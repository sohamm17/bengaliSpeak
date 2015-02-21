chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.method == "getSelection")
		{
			var selText = window.getSelection().toString();
			window.getSelection().removeAllRanges();
      sendResponse({data: selText});
		}    
		else
		{
			alert("Got a DOM content.");
      sendResponse({});
		}
});
