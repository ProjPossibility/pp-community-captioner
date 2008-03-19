// ==UserScript==
// @name           youtube
// @namespace      youtube
// ==/UserScript==

var cell=document.getElementById("thisVidCell")

var objDIV=document.createElement("div")
var objPlayerDIV=document.getElementById("playerDiv")

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
objDIV.innerHTML='Video URL: <input type="text" id="txtVideoInput" style="order:1px solid black;width:80%" /> <br /><br /><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="480" height="395" id="ccPlayer" align="middle">\n'
objDIV.innerHTML+='<param name="allowFullScreen" value="true" />\n'
objDIV.innerHTML+='<param name="allow-access-from domain" value="*" />\n'
objDIV.innerHTML+='<!--<param name="movie" value="ccPlayer.swf?ccVideoName=http://proxy-33.dailymotion.com/14/320x240/flv/3404263.flv?d71d137b58b5bff62c344e0b3762057d132a704&ccVideoBufferTime=5&ccCaptSourceType=external&ccCaptionSource=http://www-scf.usc.edu/~ramavajj/flash/car.dfxp.xml&ccCaptionLanguage=en&ccCaptionAutoHide=false&ccOverrideFileStyle=false&ccDisplayRollup=false"/>-->\n'
objDIV.innerHTML+='<param name="movie" value="player.swf"/>\n'
objDIV.innerHTML+='<param name="quality" value="high" />\n'
objDIV.innerHTML+='<param name="bgcolor" value="#cccccc" />\n'
objDIV.innerHTML+='<embed src="http://www-scf.usc.edu/~ramavajj/flash/player.swf" allowfullscreen="true" quality="high" bgcolor="#cccccc"  name="ccPlayer" align="middle" allowScriptAccess="sameDomain" height="395" width="480" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'
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

objPlayerDIV.appendChild(script)
