var tabID = null;
var audio = null;
var waitingIconPath = "images/waiting.gif";
var appIconPath = "images/icon.png";

chrome.browserAction.onClicked.addListener(function(tab) {
	if(audio != null)
	{
		audio.pause();
		audio = null;
	}	
	//alert("Listening click." + tab.id);
	tabID = tab.id;
  chrome.tabs.sendMessage(tab.id, {method: "getSelection"}, sendServiceRequest);
});

function sendServiceRequest(responseData)
{
	if(responseData != null && responseData != undefined)
	{
		data = responseData.data;
		if(data.trim().length > 0)
		{
			var jax = new XMLHttpRequest();
			//alert("POSTing:"+data);
			alert("Will be playing:\n" + data);
			chrome.browserAction.setIcon({path: waitingIconPath});
			var params = "Languages=bengali&ex=execute&ip=&op=" + data;
			jax.open("POST","http://www.iitm.ac.in/donlab/hts/festival_cs.php");
			jax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			//jax.setRequestHeader("Content-Length",params.length);
			//jax.setRequestHeader("Connection","close");
			//jax.setRequestHeader("Accept-Encoding","gzip, deflate");
			//jax.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
			//jax.setRequestHeader("Referer","http://www.iitm.ac.in/donlab/hts/");
			//jax.setRequestHeader("Origin","http://www.iitm.ac.in");
			//jax.setRequestHeader("Host","www.iitm.ac.in");
			//jax.setRequestHeader("User-Agent","Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36");
			//jax.setRequestHeader("Cache-Control","no-cache, no-store");

			jax.onreadystatechange = function() 
			{ 
				if(jax.readyState==4) 
				{
					parseAudio(jax.responseText);
				}
			};
			jax.send(params);
		}
	}
}

function parseAudio(htmlText)
{
	//Parsing the response HTML page sent from the server.
	var divElement = document.getElementById("main");
	//alert(divElement);
	if(divElement == null || divElement == undefined)
	{
		//alert("HereNUll");
		divElement = document.createElement("DIV");
		document.body.appendChild(divElement);
		divElement.setAttribute("id", "main");
	}
	divElement.innerHTML = htmlText;
	var path = document.getElementById("jsn-page");
	path = path.getElementsByTagName("a");
	//alert(path[0].getAttribute("href"));
	//chrome.tabs.sendMessage(tabID, {method: "setAudio"}, function(response){});
	
	var URL = "http://www.iitm.ac.in/donlab/hts/" + path[0].getAttribute("href");

	chrome.browserAction.setIcon({path: appIconPath});

	audio = new Audio(URL);
	audio.play();
	
	divElement.innerHTML = "";
	
	//alert(document.URL);
	//alert(document.title);
}
