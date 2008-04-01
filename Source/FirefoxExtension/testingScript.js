// ==UserScript==
// @name           youtube
// @namespace      youtube
// ==/UserScript==



//function to check if captions exist
function captionsExist()
{
 return true;
}
//new buttons
function insertCaptionButtons()
{

var subScribeDIV=document.getElementById("subscribeDiv");
var getCapDIV=document.createElement("div");
if(captionsExist()) //we should probably check for partial here...
{
//div for "Get Captions" if captions exist
 getCapDIV.innerHTML = "<br/><br/><div id='container'/><br/><br/><a class='action-button' onclick='getCaptions();' title='Get the captions for this video'><span class='action-button-leftcap'></span><span class='action-button-text' style='color:blue;'>Get Captions</span><span class='action-button-rightcap'></span></a>";
//div for "Caption it!"  if captions exist
var captionItDIV=document.createElement("div");
captionItDIV.innerHTML = "<a class='action-button' onclick='getCaptions();' title='Captions already exist for this video'><span class='action-button-leftcap'></span><span class='action-button-text' style='color:grey;'>Caption It!</span><span class='action-button-rightcap'></span></a>";
}
else
{
  //div for "Get Captions" if captions do not exist
 getCapDIV.innerHTML = "<br/><br/><a class='action-button' onclick=';' title='There are not any captions for this video yet'><span class='action-button-leftcap'></span><span class='action-button-text' style='color:grey;'>Get Captions</span><span class='action-button-rightcap'></span></a>";
 //div for "Caption it!"  if captions do not exist
var captionItDIV=document.createElement("div");
captionItDIV.innerHTML = "<a class='action-button' onclick='captionIt();' title='Start writing captions for this video!'><span class='action-button-leftcap'></span><span class='action-button-text' style='color:blue;'>Caption It!</span><span class='action-button-rightcap'></span></a>";
}



//build our soap envelope
/*
var call = new WS.Call('http://www.projectpossibility.org/projects/webcaption/soapTest.php');
  var nsuri = 'http://tempuri.org';
  var qn_op = new WS.QName('sayHello',nsuri);
  var qn_op_resp = new WS.QName('selectAllVideos',nsuri);
  call.invoke_rpc(
    qn_op,
    null,null,
    function(call,envelope) {
      var ret =
        envelope.get_body().get_all_children()[0].
          get_all_children()[0].get_value();
      container.innerHTML = ret;
      $('soap').innerHTML = arguments[2].escapeHTML();
    }
  );
*/


//insert our new divs
subScribeDIV.appendChild(getCapDIV);
getCapDIV.appendChild(captionItDIV);
}



//Start
var theURL = window.location.href;
alert(window.location.href);
if(theURL.indexOf('youtube.com')!= -1)
{
/*
  try {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
   } catch (e) {
    alert("Permission UniversalBrowserRead denied.");
   }
*/

   insertCaptionButtons();





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
  script.innerHTML+='\n';
  script.innerHTML+="function doAlert(){alert('from client: ' + urlIDfromDB);}";

  objPlayerDIV.appendChild(script);
  
  
  //cross site:
    var testing=document.getElementById("subscribeDiv");
  var remoteScript=document.createElement("div");
  remoteScript.innerHTML = "<script src='http://www.projectpossibility.org/projects/webcaption/URL_test.php?mode=getCaption?domain=" + window.location.href.split('?')[0] +"&url_id=" + window.location.href.split('?')[1].split('=')[1] + "'/>Calling...";

testing.appendChild(remoteScript);

}


