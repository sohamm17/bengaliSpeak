var tabID = null;

chrome.browserAction.onClicked.addListener(function(tab) {
	alert("Listening click." + tab.id);
	tabID = tab.id;
  chrome.tabs.sendMessage(tab.id, {method: "getSelection"}, sendServiceRequest);
});
/*
function sendServiceRequest(selectedText) {
  var serviceCall = 'http://www.google.com/search?q=' + selectedText;
  chrome.tabs.create({url: serviceCall});
}*/

function sendServiceRequest(responseData)
{
	data = responseData.data;
	var jax = new XMLHttpRequest();
	alert("POSTing:"+data);
	var params = "Languages=bengali&ex=execute&ip=&op=" + data;
	jax.open("POST","http://www.iitm.ac.in/donlab/hts/festival_cs.php");
	jax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	jax.setRequestHeader("Content-Length",params.length);
	jax.setRequestHeader("Connection","close");
	jax.setRequestHeader("Accept-Encoding","gzip, deflate");
	jax.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
	jax.setRequestHeader("Referer","http://www.iitm.ac.in/donlab/hts/");
	jax.setRequestHeader("Origin","http://www.iitm.ac.in");
	jax.setRequestHeader("Host","www.iitm.ac.in");
	jax.setRequestHeader("User-Agent","Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36");
	jax.setRequestHeader("Cache-Control","no-cache, no-store");

	jax.onreadystatechange = function() 
	{ 
		if(jax.readyState==4) 
		{
			parseAudio(jax.responseText);
		}
	};
	jax.send(params);
}

function parseAudio(htmlText)
{
	alert("Playing");
	var divElement = document.getElementById("main");
	//alert(divElement);
	if(divElement == null || divElement == undefined)
	{
		//alert("HereNUll");
		divElement = document.createElement("DIV");
		document.body.appendChild(divElement);
		divElement.setAttribute("id", "main");
	}
	//alert(divElement.outerHTML);
	divElement.innerHTML = htmlText;
	//alert(divElement.outerHTML);
	var path = document.getElementById("jsn-page");
	path = path.getElementsByTagName("a");
	alert(path[0].getAttribute("href"));
	//chrome.tabs.sendMessage(tabID, {method: "setAudio"}, function(response){});
	var URL = "http://www.iitm.ac.in/donlab/hts/" + path[0].getAttribute("href");
	//chrome.tabs.create({url: URL});
	var audio = new Audio(URL);
	audio.play();
	divElement.innerHTML = "";
	
	//alert(document.URL);
	//alert(document.title);
}

/*
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++)
{
	var context = contexts[i];
	chrome.contextMenus.create({"title": "Send to Server", "contexts":[context], "onclick": savetext});  
}*/
