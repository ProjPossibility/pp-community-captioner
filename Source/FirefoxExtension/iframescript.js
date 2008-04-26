// ==UserScript==
// @name           youtube
// @namespace      youtube
// ==/UserScript==

var cell=document.getElementById("thisVidCell")
var counter=0

while(document.getElementsByTagName("embed")[counter]!=null)
{
	if(document.getElementsByTagName("embed")[counter].width>0 )
	{
		break;
	}
	counter++;
}

if(document.getElementById("ccGetCaptionScript")!=null)
{
	
	var objParent=document.getElementById("ccGetCaptionScript").parentNode;
	objParent.removeChild(document.getElementById("ccGetCaptionScript"));
}

var objTarget=document.documentElement.firstChild;

var remoteScript=document.createElement("div");
var initIframeScript=document.createElement("script")
initIframeScript.type="text/javascript";

remoteScript.innerHTML = "<script id='ccGetCaptionScript' src='http://www.projectpossibility.org/projects/webcaption/URL_test.php?mode=getCaption&domain=" + window.location.href.split('?')[0] +"&url_id=" + window.location.href.split('?')[1].split('=')[1].split('&')[0] + "'></script>Calling...";



initIframeScript.innerHTML='function SubmitCaption()\n';
initIframeScript.innerHTML+='{\n';
initIframeScript.innerHTML+='debugger\n';
initIframeScript.innerHTML+='	document.getElementById("ifr").contentDocument.getElementById("frm").submit();\n';
initIframeScript.innerHTML+='}\n';


objTarget.appendChild(initIframeScript);
objTarget.appendChild(remoteScript);





var objDIV=document.createElement("div")
objDIV.id="divIFR"
//var objPlayerDIV=document.getElementById("playerDiv")
//var objPlayerDIV=document.getElementById("watch-player-div")
var objPlayerDIV=document.getElementsByTagName("embed")[counter].parentNode

var objContentDiv=document.createElement("div")
var strHead=document.documentElement.firstChild.innerHTML

objPlayerDIV.innerHTML=""
var objTable =document.createElement("table")
var objTR=document.createElement("tr")
var objTBody=document.createElement("tbody")
var objTD=document.createElement("td")

objTD.innerHTML="<a href='javascript:ShowHide(0)' style='color:Black'>Video</a>"
objTR.appendChild(objTD)

objTD=document.createElement("td")
objTD.innerHTML="<a href='javascript:ShowHide(1)' style='color:Black'>Captions</a>"
objTR.appendChild(objTD)

objTBody.appendChild(objTR)
objTable.appendChild(objTBody)
objTable.style.width="100%"
objTable.style.border="1px solid black"

objPlayerDIV.appendChild(objTable)

objTable=document.createElement("table")
objTBody=document.createElement("tbody")
objTR=document.createElement("tr")
objTD=document.createElement("td")





objDIV.id="0" //video
//objDIV.innerHTML+='<iframe onload="InitIframe(this);" src="http://www.projectpossibility.org/projects/webcaption/caption.html"></iframe>\n';
//objDIV.innerHTML+='<iframe id="ifr" style="border:0px"></iframe>\n';
objDIV.innerHTML+='<!--Video URL: <form method="POST" action="http://www.projectpossibility.org/projects/webcaption/URL_test.php?mode=setCaption"><input type="text" id="txtVideoInput" style="order:1px solid black;width:80%"  /><input type="submit" id="btnVideo" value="Video" onclick="FillCaption();" /></form>--> <br /><br /><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="480" height="395" id="flash" align="middle">\n'
objDIV.innerHTML+='<input type="button" value="Submit" onclick="javascript:SubmitCaption()" />'
objDIV.innerHTML+='<param name="allowFullScreen" value="true" />\n'
objDIV.innerHTML+='<param name="allowScriptAccess" value="always" />\n'
objDIV.innerHTML+='<!--<param name="movie" value="ccPlayer.swf?ccVideoName=http://proxy-33.dailymotion.com/14/320x240/flv/3404263.flv?d71d137b58b5bff62c344e0b3762057d132a704&ccVideoBufferTime=5&ccCaptSourceType=external&ccCaptionSource=http://www-scf.usc.edu/~ramavajj/flash/car.dfxp.xml&ccCaptionLanguage=en&ccCaptionAutoHide=false&ccOverrideFileStyle=false&ccDisplayRollup=false"/>-->\n'
objDIV.innerHTML+='<param name="movie" value="player.swf"/>\n'
objDIV.innerHTML+='<param name="quality" value="high" />\n'
objDIV.innerHTML+='<param name="bgcolor" value="#cccccc" />\n'
objDIV.innerHTML+='<embed src="http://www.projectpossibility.org/projects/webcaption/player.swf" allowfullscreen="true" quality="high" bgcolor="#cccccc"  name="flash" align="middle" id="flash1" allowScriptAccess="always" height="395" width="480" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'
objDIV.innerHTML+='</object>'

objTD.appendChild(objDIV)






objDIV=document.createElement("div")
objDIV.id="1" //caption
objDIV.style.display="none"
objDIV.style.height="240px"
objDIV.innerHTML="Captioned File: <input type='file' value='Upload Captions' style='border:1px solid black;' /><input type='button' value='Upload Caption' style='border:1px solid black;' />"
objTD.appendChild(objDIV)
objTR.appendChild(objTD)
objTBody.appendChild(objTR)
objTable.appendChild(objTBody)
objTable.style.border="1px solid black"
objTable.style.width="100%"
objPlayerDIV.appendChild(objTable)

var script =document.createElement("script")

script.type="text/javascript"
script.innerHTML+=''
script.innerHTML+='	function ShowHide(value)\n'
script.innerHTML+='{\n'
script.innerHTML+='var id=(value==0)?1:0;\n'
script.innerHTML+='document.getElementById(id).style.display=(document.getElementById(id).style.display=="none")? "" : "none";\n'
script.innerHTML+='		document.getElementById(value).style.display=(document.getElementById(value).style.display=="none")? "" : "none";\n'
script.innerHTML+='}\n'
script.innerHTML+='\n'

script.innerHTML+='function Ping(value)\n'
script.innerHTML+='{\n'
script.innerHTML+='alert(value);\n'
script.innerHTML+='}\n'

script.innerHTML+='function CallFunction(){\n'
script.innerHTML+='try{\n'
script.innerHTML+='debugger\n'
script.innerHTML+='var strURL="document.flash.Ping(\'"+window.location.toString()+"\')";\n'
script.innerHTML+='eval(strURL);\n'
script.innerHTML+='}\n'
script.innerHTML+='catch(err){\n'
script.innerHTML+='var test=0;\n'
script.innerHTML+='}\n'
script.innerHTML+='}\n'

script.innerHTML+='\n'
script.innerHTML+='function cc_setCaptions()\n'
script.innerHTML+='{\n'
script.innerHTML+='debugger\n'

script.innerHTML+='var url="http://www.projectpossibility.org/projects/webcaption/URL_test.php?url_id="+window.location.href.split("=")[1]+"&mode=setCaption&caption=PHJvb3Q+PG1zZz5oZWxsbyB3b3JsZDwvbXNnPjwvcm9vdD4=";\n'
script.innerHTML+='var scriptElement=document.createElement("script");\n'
script.innerHTML+='scriptElement.type="text/javascript";\n'
script.innerHTML+='scriptElement.src=url;\n'
script.innerHTML+='document.documentElement.firstChild.appendChild(scriptElement);\n'
script.innerHTML+='}\n'



//script.innerHTML+='function cc_setCaptions()\n';
//script.innerHTML+='{\n'
//script.innerHTML+='debugger\n'
//script.innerHTML+='var xmlHTTP=new XMLHttpRequest();\n'
//script.innerHTML+='var url="http://www.projectpossibility.org/projects/webcaption/URL_test.php?url_id="+window.location.href.split("=")[1]+"&mode=setCaption";\n'
//script.innerHTML+='var xmlString="<root><msg>hello world</msg></root>";\n'
//script.innerHTML+='xmlHTTP.open("POST",url,false);\n'
//script.innerHTML+='xmlHTTP.send(xmlString);\n'
//script.innerHTML+='while(xmlHTTP.readyState!=4)\n'
//script.innerHTML+='{\n'
//script.innerHTML+='}\n'
//script.innerHTML+='var returnValue=xmlHTTP.responseText;\n'
//script.innerHTML+='}\n'

objPlayerDIV.appendChild(script)



/*creates iframe*/

//var objIFrame=document.getElementById("ifr")
var objIFrame=document.createElement("iframe")
objDIV=document.getElementById("0")
objIFrame.id="ifr"
objDIV.appendChild(objIFrame)
var ifr=document.getElementById("ifr")
//var content = '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head><title>Iframe</title><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><script>function alertLoad(){alert("ok");}</script><body> &nbsp;</body></html>'

var doc=ifr.contentDocument
ifr.contentDocument.open()
//objIFrame.contentDocument.write(content)
ifr.contentDocument.close()

var objForm=objIFrame.contentDocument.createElement("form")
objForm.innerHTML=parent.window.location
objForm.id="frm";
objForm.action="http://www.projectpossibility.org/projects/webcaption/URL_test.php?mode=setCaption&urlID="+window.location.href.split("=")[1];
objForm.method="POST";
objForm.innerHTML="<input type='hidden' name='captionXML' id='captionXML' value='PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48dHQgeG1sOmxhbmc9ImVuIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwNi8wNC90dGFmMSIgIHhtbG5zOnR0cz0iaHR0cDovL3d3dy53My5vcmcvMjAwNi8wNC90dGFmMSNzdHlsaW5nIj4gIDxoZWFkPiAgICAgICAgPHN0eWxpbmc+ICAgICAgICAgICAgPHN0eWxlIGlkPSJiMSIgdHRzOmNvbG9yPSIjY2NjYzAwIi8+ICAgICAgIDwvc3R5bGluZz4gIDwvaGVhZD4gICA8Ym9keT4gICAgPGRpdiB4bWw6bGFuZz0iZW4iIHN0eWxlPSJiMSI+ICAgICAgICAgICAgPHAgYmVnaW49IjAwOjEzLjkiIGVuZD0iMDA6MTQuOSI+VGhlIGhlYXJ0IGlzIGEgYmxvb208L3A+ICAgICAgICAgICAgPHAgYmVnaW49IjAwOjE3LjciIGVuZD0iMDA6MjAuOSI+U2hvb3RzIHVwIHRocm91Z2ggdGhlIHN0b255IGdyb3VuZDwvcD4gICAgICAgICAgICA8cCBiZWdpbj0iMDA6MjAuOSIgZW5kPSIwMDoyMS41Ij5UaGVyZSdzIG5vIHJvb208L3A+ICAgICAgICAgICAgPHAgYmVnaW49IjAwOjI0LjUiIGVuZD0iMDA6MjcuMCI+Tm8gc3BhY2UgdG8gcmVudCBpbiB0aGlzIHRvd248L3A+ICAgICAgICAgICAgPHAgYmVnaW49IjAwOjI3LjAiIGVuZD0iMDA6MjkuMCI+WW91J3JlIG91dCBvZiBsdWNrPC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMDozMS44IiBlbmQ9IjAwOjMzLjkiPkFuZCB0aGUgcmVhc29uIHRoYXQgeW91IGhhZCB0byBjYXJlPC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMDozMy45IiBlbmQ9IjAwOjM2LjUiPlRoZSB0cmFmZmljIGlzIHN0dWNrPC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMDozOS4wIiBlbmQ9IjAwOjQxLjAiPkFuZCB5b3UncmUgbm90IG1vdmluZyBhbnl3aGVyZTwvcD4gICAgICAgICAgICA8cCBiZWdpbj0iMDA6NDEuNSIgZW5kPSIwMDo0NC4yIj5Zb3UgdGhvdWdodCB5b3UnZCBmb3VuZCBhIGZyaWVuZDwvcD4gICAgICAgICAgICA8cCBiZWdpbj0iMDA6NDYuMCIgZW5kPSIwMDo0OC4zIj5UbyB0YWtlIHlvdSBvdXQgb2YgdGhpcyBwbGFjZTwvcD4gICAgICAgICAgICA8cCBiZWdpbj0iMDA6NDguMyIgZW5kPSIwMDo1My4wIj5Tb21lb25lIHlvdSBjb3VsZCBsZW5kIGEgaGFuZDwvcD4gICAgICAgICAgICA8cCBiZWdpbj0iMDA6NTMuMCIgZW5kPSIwMDo1NS4wIj5JbiByZXR1cm4gZm9yIGdyYWNlPC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMDo1NS4wIiBlbmQ9IjAwOjU4LjQiPkl0J3MgYSBiZWF1dGlmdWwgZGF5PC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMTowMS4wIiBlbmQ9IjAxOjAzLjMiPlNreSBmYWxscywgeW91IGZlZWwgbGlrZTwvcD4gICAgICAgICAgICA8cCBiZWdpbj0iMDE6MDMuMyIgZW5kPSIwMTowNC4zIj5JdCdzIGEgYmVhdXRpZnVsIGRheTwvcD4gICAgICAgICAgICA8cCBiZWdpbj0iMDE6MDcuOCIgZW5kPSIwMTowOS4wIj5Eb24ndCBsZXQgaXQgZ2V0IGF3YXk8L3A+ICAgICAgICAgICAgPHAgYmVnaW49IjAxOjAzLjMiIGVuZD0iMDE6MDcuOCI+WW91J3JlIG9uIHRoZSByb2FkPC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMToxMC4zIiBlbmQ9IjAxOjEyLjAiPkJ1dCB5b3UndmUgZ290IG5vIGRlc3RpbmF0aW9uPC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMToxNC4wIiBlbmQ9IjAxOjE2LjAiPllvdSdyZSBpbiB0aGUgbXVkPC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMToyMS4wIiBlbmQ9IjAxOjIzLjgiPkluIHRoZSBtYXplIG9mIGhlciBpbWFnaW5hdGlvbjwvcD4gICAgICAgICAgICA8cCBiZWdpbj0iMDE6MjMuOCIgZW5kPSIwMToyNi4wIj5Zb3UgbG92ZSB0aGlzIHRvd248L3A+ICAgICAgICAgICAgPHAgYmVnaW49IjAxOjI5LjAiIGVuZD0iMDE6MzEuMCI+RXZlbiBpZiB0aGF0IGRvZXNuJ3QgcmluZyB0cnVlPC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMTozMS43IiBlbmQ9IjAxOjM0LjAiPllvdSd2ZSBiZWVuIGFsbCBvdmVyPC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMTozNS4wIiBlbmQ9IjAxOjM3LjAiPkFuZCBpdCdzIGJlZW4gYWxsIG92ZXIgeW91PC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMTozOC4wIiBlbmQ9IjAxOjM5LjAiPkl0J3MgYSBiZWF1dGlmdWwgZGF5PC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMTowMy4zIiBlbmQ9IjAxOjA3LjgiPkl0J3MgYSBiZWF1dGlmdWwgZGF5PC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMTowMy4zIiBlbmQ9IjAxOjA3LjgiPkl0J3MgYSBiZWF1dGlmdWwgZGF5PC9wPiAgICAgICAgICAgIDxwIGJlZ2luPSIwMTowMy4zIiBlbmQ9IjAxOjA3LjgiPkl0J3MgYSBiZWF1dGlmdWwgZGF5PC9wPiAgIDwvZGl2PiA8L2JvZHk+PC90dD4='/> <input type='submit' value='submit' />"
ifr.contentDocument.body.appendChild(objForm);
//alert(objIFrame.contentDocument.innerText)

/******/


