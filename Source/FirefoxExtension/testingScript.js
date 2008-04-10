// ==UserScript==
// @name           youtube
// @namespace      youtube
// ==/UserScript==


//Start
var theURL = window.location.href;
alert(window.location.href);
if(theURL.indexOf('youtube.com')!= -1)
{
//cross site:
  var objTarget=document.documentElement.firstChild;
  var remoteScript=document.createElement("div");
  remoteScript.innerHTML = "<script src='http://www.projectpossibility.org/projects/webcaption/URL_test.php?mode=captionExist&domain=" + window.location.href.split('?')[0] +"&url_id=" + window.location.href.split('?')[1].split('=')[1].split('&')[0] + "'/>Calling...";

objTarget.appendChild(remoteScript);


//js function to find and return the playerdiv
var cc_findPlayerDivJS = "function cc_findPlayerDiv(){";
cc_findPlayerDivJS += "var counter=0;";
cc_findPlayerDivJS += "while(document.getElementsByTagName(\"embed\")[counter]!=null)";
cc_findPlayerDivJS += "{";
cc_findPlayerDivJS += "	if(document.getElementsByTagName(\"embed\")[counter].width>0 ) ";
cc_findPlayerDivJS += "	{ ";
cc_findPlayerDivJS += "		break;";
cc_findPlayerDivJS += "	}  ";
cc_findPlayerDivJS += "	counter++;";
cc_findPlayerDivJS += "} ";
cc_findPlayerDivJS += "  return document.getElementsByTagName(\"embed\")[counter].parentNode;";
cc_findPlayerDivJS += "} "
var cc_findPlayerDivScript = document.createElement("script");
cc_findPlayerDivScript.type="text/javascript"
cc_findPlayerDivScript.innerHTML = cc_findPlayerDivJS;
objTarget=document.documentElement.firstChild;
objTarget.appendChild(cc_findPlayerDivScript);



var baseDiv=document.getElementById("subscribeDiv"); //base div for our buttons
//tab code
var cc_InsertTabJS = "function cc_InsertTab(){";
cc_InsertTabJS += "var objPlayerDiv=cc_findPlayerDiv();";
cc_InsertTabJS += "var strTabHTML = \"";
var cc_InsertTabJSInnerHTML = "<br/><div id=\\\"CC_tabDiv\\\" style=\\\"margin: 0px; padding: 0px; overflow: visible; display: block; width: 480px;\\\"><div align=\\\"right\\\" style=\\\"overflow: visible; height: 0px; width: 100%;\\\"><div align=\\\"center\\\" style=\\\"border-style: ridge ridge none; border-width: 2px 2px 0px; padding: 1px; overflow: visible; vertical-align: bottom; -moz-border-radius-topleft: 10px; -moz-border-radius-topright: 10px; opacity: 0.5; background-color: white; position: relative; top: -19px; left: -434px; z-index: 900; width: 40px; height: 15px; cursor: pointer;\\\"><span style=\\\"font-family: Arial,Helvetica,Sans-serif; font-size: 12px; font-style: normal; font-variant: normal; font-weight: bold; line-height: 140%; text-align: right; text-decoration: none; opacity: 1.5; color: black;\\\" onclick=\\\"cc_getCations();\\\">[CC]</span></div></div></div>";

cc_InsertTabJS += cc_InsertTabJSInnerHTML + "\";";

cc_InsertTabJS += "objPlayerDiv.innerHTML = strTabHTML + objPlayerDiv.innerHTML;}cc_InsertTab()";

var cc_InsertTabScript = document.createElement("script");
cc_InsertTabScript.type="text/javascript"
cc_InsertTabScript.innerHTML = cc_InsertTabJS;

//append our script to the first element
objTarget=document.documentElement.firstChild;
objTarget.appendChild(cc_InsertTabScript);




//function to re-write the player with ours
var cc_writePlayerDivJS = "function cc_writePlayerDiv(){";
cc_writePlayerDivJS += "var cell=document.getElementById(\"thisVidCell\");";

cc_writePlayerDivJS += "  var cc_objDIV=document.createElement(\"div\");";
cc_writePlayerDivJS += "  var cc_objPlayerDIV=cc_findPlayerDiv();";

cc_writePlayerDivJS += "  cc_objPlayerDIV.innerHTML=\"\";";
cc_writePlayerDivJS += "  var cc_objTable =document.createElement(\"table\");";
cc_writePlayerDivJS += "  var cc_objTR=document.createElement(\"tr\");";
cc_writePlayerDivJS += "  var cc_objTBody=document.createElement(\"tbody\");";
cc_writePlayerDivJS += "  var cc_objTD=document.createElement(\"td\");";

cc_writePlayerDivJS += "  cc_objTD.innerHTML=\"<a href='javascript:ShowHide(0)' style='color:Black'>Video</a>\";";
cc_writePlayerDivJS += "  cc_objTR.appendChild(cc_objTD);";

cc_writePlayerDivJS += "  cc_objTD=document.createElement(\"td\");";
cc_writePlayerDivJS += "  cc_objTD.innerHTML=\"<a href='javascript:ShowHide(1)' style='color:Black'>Captions</a>\";";
cc_writePlayerDivJS += "  cc_objTR.appendChild(cc_objTD);";

cc_writePlayerDivJS += "  cc_objTBody.appendChild(cc_objTR);";
cc_writePlayerDivJS += "  cc_objTable.appendChild(cc_objTBody);";
cc_writePlayerDivJS += "  cc_objTable.style.width=\"100%\";";
cc_writePlayerDivJS += "  cc_objTable.style.border=\"1px solid black\";";

cc_writePlayerDivJS += "  cc_objPlayerDIV.appendChild(cc_objTable);";

cc_writePlayerDivJS += "  cc_objTable=document.createElement(\"table\");";
cc_writePlayerDivJS += "  cc_objTBody=document.createElement(\"tbody\");";
cc_writePlayerDivJS += "  cc_objTR=document.createElement(\"tr\");";
cc_writePlayerDivJS += "  cc_objTD=document.createElement(\"td\");";


cc_writePlayerDivJS += "  cc_objDIV.id=\"0\"; /*video*/";
cc_writePlayerDivJS += "  cc_objDIV.innerHTML=\"<br /><object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http:\/\/fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='480' height='395' id='ccPlayer' align='middle'>\\n\";";
cc_writePlayerDivJS += "  cc_objDIV.innerHTML+='<param name=\"allowFullScreen\" value=\"true\" />\\n';";
cc_writePlayerDivJS += "  cc_objDIV.innerHTML+='<param name=\"allow-access-from domain\" value=\"*\" />\\n';";
cc_writePlayerDivJS += "  cc_objDIV.innerHTML+='<param name=\"movie\" value=\"player.swf\"/>\\n';";
cc_writePlayerDivJS += "  cc_objDIV.innerHTML+='<param name=\"quality\" value=\"high\" />\\n';";
cc_writePlayerDivJS += "  cc_objDIV.innerHTML+='<param name=\"bgcolor\" value=\"#cccccc\" />\\n';";
cc_writePlayerDivJS += "  cc_objDIV.innerHTML+='<embed src=\"http:\/\/www-scf.usc.edu/~ramavajj/flash/player.swf\" allowfullscreen=\"true\" quality=\"high\" bgcolor=\"#cccccc\"  name=\"ccPlayer\" align=\"middle\" allowScriptAccess=\"sameDomain\" height=\"395\" width=\"480\" type=\"application/x-shockwave-flash\" pluginspage=\"http:\/\/www.macromedia.com/go/getflashplayer\" />';";
cc_writePlayerDivJS += "  cc_objDIV.innerHTML+='</object>';";

cc_writePlayerDivJS += "  cc_objTD.appendChild(cc_objDIV);";

cc_writePlayerDivJS += "  cc_objDIV=document.createElement(\"div\");";
cc_writePlayerDivJS += "  cc_objDIV.id=\"1\" /*caption*/;";
cc_writePlayerDivJS += "  cc_objDIV.style.display=\"none\";";
cc_writePlayerDivJS += "  cc_objDIV.style.height=\"240px\";";
cc_writePlayerDivJS += "  cc_objDIV.innerHTML=\"Captioned File: <input type='file' value='Upload Captions' style='border:1px solid black;' /><input type='button' value='Upload Caption' style='border:1px solid black;' />\";";
cc_writePlayerDivJS += "  cc_objTD.appendChild(cc_objDIV);";
cc_writePlayerDivJS += "  cc_objTR.appendChild(cc_objTD);";
cc_writePlayerDivJS += "  cc_objTBody.appendChild(cc_objTR);";
cc_writePlayerDivJS += "  cc_objTable.appendChild(cc_objTBody);";
cc_writePlayerDivJS += "  cc_objTable.style.border=\"1px solid black\";";
cc_writePlayerDivJS += "  cc_objTable.style.width=\"100%\";";
cc_writePlayerDivJS += "  cc_objPlayerDIV.appendChild(cc_objTable);";
cc_writePlayerDivJS += "}";
var cc_writePlayerDivScript = document.createElement("script");
cc_writePlayerDivScript.type="text/javascript"
cc_writePlayerDivScript.innerHTML = cc_writePlayerDivJS;
//append our script to the first element
objTarget.appendChild(cc_writePlayerDivScript);






//function to get the captions and re-write the divs
var cc_getCaptionsJS = "function cc_getCations(){";
cc_getCaptionsJS += "/*hide the CC tab, only re-write the div if the cc tab is visible so we don't do it again*/";
cc_getCaptionsJS += "if(document.getElementById('CC_tabDiv')!=null){";
cc_getCaptionsJS += "document.getElementById('CC_tabDiv').style.visibility = 'hidden';";
cc_getCaptionsJS += "/*now re-write the playerDiv*/";
cc_getCaptionsJS += "cc_writePlayerDiv();";
cc_getCaptionsJS += "}}";
var cc_getCaptionsScript = document.createElement("script");
cc_getCaptionsScript.type="text/javascript"
cc_getCaptionsScript.innerHTML = cc_getCaptionsJS;
//append our script to the first element
objTarget.appendChild(cc_getCaptionsScript);



var insertCaptionButtonsScript = document.createElement("script");
insertCaptionButtonsScript.type="text/javascript";
//new buttons
insertCaptionButtonsScript.innerHTML = "function insertCaptionButtons(cc_doesVidExist)";
insertCaptionButtonsScript.innerHTML +="{";

//DEBUG
insertCaptionButtonsScript.innerHTML +="alert('videxists inside insert: ' . cc_doesVidExist);";

insertCaptionButtonsScript.innerHTML +="var subScribeDIV=document.getElementById(\"subscribeDiv\");";
insertCaptionButtonsScript.innerHTML +="var getCapDIV=document.createElement(\"div\");";
insertCaptionButtonsScript.innerHTML +="if(cc_doesVidExist)";//we should probably check for partial here...   (it is undefined right now!)
insertCaptionButtonsScript.innerHTML +="{";
//div for 'Get Captions' if captions exist
insertCaptionButtonsScript.innerHTML +=" getCapDIV.innerHTML = \"<br/><br/><div id='container'/><br/><br/><a class='action-button' onclick='cc_getCations();' title='Get the captions for this video'><span class='action-button-leftcap'></span><span class='action-button-text' style='color:blue;'>Get Captions</span><span class='action-button-rightcap'></span></a>\";";
//div for Caption it!  if captions exist
insertCaptionButtonsScript.innerHTML +="var captionItDIV=document.createElement(\"div\");";
insertCaptionButtonsScript.innerHTML +="captionItDIV.innerHTML = \"<a class='action-button' onclick='cc_getCations();' title='Captions already exist for this video'><span class='action-button-leftcap'></span><span class='action-button-text' style='color:grey;'>Caption It!</span><span class='action-button-rightcap'></span></a>\";";
insertCaptionButtonsScript.innerHTML +="}";
insertCaptionButtonsScript.innerHTML +="else";
insertCaptionButtonsScript.innerHTML +="{";
//div for Get Captions if captions do not exist
insertCaptionButtonsScript.innerHTML +=" getCapDIV.innerHTML = \"<br/><br/><a class='action-button' onclick=';' title='There are not any captions for this video yet'><span class='action-button-leftcap'></span><span class='action-button-text' style='color:grey;'>Get Captions</span><span class='action-button-rightcap'></span></a>\";";
//div for Caption it!  if captions do not exist
insertCaptionButtonsScript.innerHTML +="var captionItDIV=document.createElement(\"div\");";
insertCaptionButtonsScript.innerHTML +="captionItDIV.innerHTML = \"<a class='action-button' onclick='captionIt();' title='Start writing captions for this video!'><span class='action-button-leftcap'></span><span class='action-button-text' style='color:blue;'>Caption It!</span><span class='action-button-rightcap'></span></a>\";";
insertCaptionButtonsScript.innerHTML +="}";

//insert our new divs
insertCaptionButtonsScript.innerHTML +="subScribeDIV.appendChild(getCapDIV);";
insertCaptionButtonsScript.innerHTML +="getCapDIV.appendChild(captionItDIV);";
insertCaptionButtonsScript.innerHTML +="}";

baseDiv.appendChild(insertCaptionButtonsScript);







var addButtonsScript = document.createElement("script");
addButtonsScript.type="text/javascript";
addButtonsScript.innerHTML = "insertCaptionButtons(cc_doesVidExist);";
baseDiv.appendChild(addButtonsScript);


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

  objTarget.appendChild(script);




}


