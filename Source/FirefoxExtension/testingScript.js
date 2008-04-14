// ==UserScript==
// @name           youtube
// @namespace      youtube
// ==/UserScript==


//Start
var theURL = window.location.href;
alert(window.location.href);
if(theURL.indexOf('youtube.com/watch')!= -1)
{
var objTarget=document.documentElement.firstChild;

//Start insertCaptionButtons
var insertCaptionButtonsScript = document.createElement("script");
insertCaptionButtonsScript.type="text/javascript";
//new buttons
insertCaptionButtonsScript.innerHTML = "function insertCaptionButtons(cc_doesVidExist)";
insertCaptionButtonsScript.innerHTML +="{";

//DEBUG
insertCaptionButtonsScript.innerHTML +="alert('videxists inside insert: ' + cc_doesVidExist);";

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

objTarget.appendChild(insertCaptionButtonsScript);
//End insertCaptionButtons





//cross site:

  var remoteScript=document.createElement("div");
  remoteScript.innerHTML = "<script src='http://www.projectpossibility.org/projects/webcaption/URL_test.php?mode=captionExist&domain=" + window.location.href.split('?')[0] +"&url_id=" + window.location.href.split('?')[1].split('=')[1].split('&')[0] + "'/>Calling...";

objTarget.appendChild(remoteScript);


//js function to find and return the playerdiv
var cc_findPlayerDivJS = "function cc_findPlayerDiv(){alert('in findPlayerDiv');";
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
var cc_writePlayerDivJS = "function cc_writePlayerDiv(){alert('in cc_writePlayerDiv');";
cc_writePlayerDivJS += "var cell=document.getElementById(\"thisVidCell\");";

//style tags
cc_writePlayerDivJS += "var cc_styleInPlayer = document.createElement(\"style\");";
cc_writePlayerDivJS += "cc_styleInPlayer.type=\"text/css\";";
cc_writePlayerDivJS += "cc_styleInPlayer.media=\"screen\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+=\"#section-1 div\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+=\"{\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+=\"margin : 20px auto;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+=\"font: Verdana, Helvetica, Arial;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"padding: 0px;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"background: #fff;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"width: 80%;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"}\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"#menu \";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"{\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	border-bottom : 1px solid #ccc;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	margin : 0;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	padding-bottom : 19px;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	padding-left : 10px;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"}\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"#menu ul, #menu li	\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"{\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	display : inline;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	list-style-type : none;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	margin : 0;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	padding : 0;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"}\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"#menu a:link, #menu a:visited	\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"{\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	background : #E8EBF0;\";"; 
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	border : 1px solid #ccc;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	color : #666;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	float : left;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	font-size : small;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	font-weight : normal;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	line-height : 14px;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	margin-right : 8px;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	padding : 2px 10px 2px 10px;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	text-decoration : none;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"}\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"#menu a:link.active, #menu a:visited.active	\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"{\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	background : #fff;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	border-bottom : 1px solid #fff;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	color : #000;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"}\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"#menu a:hover	\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"{\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	color : #f00;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"}\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"#menu ul a:hover \";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"{\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	color : #f00 !important;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"}\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"div.section-1 #menu li#nav-1 a, \";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"div.section-2 #menu li#nav-2 a,\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"div.section-3 #menu li#nav-3 a\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"{\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	background : #fff;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	border-bottom : 1px solid #fff;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	color : #000;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"}\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"#contents \";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"{\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	background : #fff;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	border : 1px solid #ccc;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	border-top : none;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	clear : both;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	margin : 0px;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"	padding : 30px;\";";
cc_writePlayerDivJS += "cc_styleInPlayer.innerHTML+= \"}\";";

cc_writePlayerDivJS += "var cc_styleTarget = document.getElementById(\"baseDiv\");";
cc_writePlayerDivJS += "cc_styleTarget.insertBefore(cc_styleInPlayer, cc_styleTarget.firstChild);";

//end style

cc_writePlayerDivJS += "  var cc_objDIV=document.createElement(\"div\");";
cc_writePlayerDivJS += "  var cc_objPlayerDIV=cc_findPlayerDiv();";

cc_writePlayerDivJS += "if(document.getElementById(\"ccGetCaptionScript\")!=null) ";
cc_writePlayerDivJS += "{";
cc_writePlayerDivJS += "var cc_objParent=document.getElementById(\"ccGetCaptionScript\").parentNode;";
cc_writePlayerDivJS += "	cc_objParent.removeChild(document.getElementById(\"ccGetCaptionScript\"));";
cc_writePlayerDivJS += "}";

cc_writePlayerDivJS += "var objTarget=document.documentElement.firstChild;";
cc_writePlayerDivJS += "var remoteScript=document.createElement(\"div\");";
cc_writePlayerDivJS += "remoteScript.innerHTML = \"<script id='ccGetCaptionScript' src='http://www.projectpossibility.org/projects/webcaption/URL_test.php?mode=getCaption&domain=\" + window.location.href.split('?')[0] +\"&url_id=\" + window.location.href.split('?')[1].split('=')[1].split('&')[0] + \"'/>\";";

cc_writePlayerDivJS += "objTarget.appendChild(remoteScript);";



cc_writePlayerDivJS += "  cc_objPlayerDIV.innerHTML=\"\";";

//playerDiv new Contents

//cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"<script language=\\\"JavaScript\\\" type='text/javascript'>\";";
//Begin script inside player div
cc_writePlayerDivJS += "var cc_playerDivInnerScript = document.createElement('script');";
cc_writePlayerDivJS += "cc_playerDivInnerScript.type = \"text/javascript\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML= \"				function update( num )\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				{alert('in update');\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				 	for( var i = 1 ; i <= 3 ; i++ )\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				 	{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				 		document.getElementById( 'content' + i ).style.display = \\\"none\\\" ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				 	}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					document.getElementById( 'content' + num ).style.display = \\\"inline\\\" ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					document.getElementById( \\\"bodyDiv\\\" ).className = \\\"section-\\\" + num ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				function removeRow( id )\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					document.getElementById(\\\"divCaptions\\\").removeChild( document.getElementById( id ) ) ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				var counter = 0 ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				function AddNewRow()\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					var objTable,objTBody,objTR,objTD,objDIV;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objDIV=document.createElement(\\\"div\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objDIV.setAttribute( \\\"style\\\" , \\\"padding : 10px\\\" );\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTable=document.createElement(\\\"table\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTBody=document.createElement(\\\"tbody\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTR=document.createElement(\\\"tr\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD=document.createElement(\\\"td\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objDIV.id = counter + \\\":R\\\" ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.innerHTML=\\\"Start: \\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.setAttribute(\\\"style\\\" , \\\"font-family: courier ; font-weight: bold ; font-size : 12px\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTR.appendChild(objTD);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objSP=document.createElement(\\\"span\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objSP.id=counter+\\\":S\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objSP.innerHTML = \\\"0:0\\\" ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objSP.setAttribute( 'style' , 'font-weight: normal' );\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.appendChild(objSP);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD=document.createElement(\\\"td\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.innerHTML=\\\"<img src = 'plus.gif' id='\\\"+counter+\\\":SINC' onclick='javascript:IncrementTime(\\\"\\\"+counter+\\\":S\\\")' /><img src = 'minus.gif' id='\\\"+counter+\\\":SDEC' onclick='javascript:DecrementTime(\\\"\\\"+counter+\\\":S\\\")' />\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTR.appendChild(objTD);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD=document.createElement(\\\"td\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.innerHTML=\\\"- End: \\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.setAttribute(\\\"style\\\" , \\\"font-family: courier ; font-weight: bold ; font-size : 12px\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTR.appendChild(objTD);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objSP=document.createElement(\\\"span\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objSP.id=counter+\\\":E\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objSP.innerHTML = \\\"0:0\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objSP.setAttribute( 'style' , 'font-weight: normal' );\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.appendChild(objSP);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD=document.createElement(\\\"td\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.innerHTML=\\\"<img src = 'plus.gif' id='\\\"+counter+\\\":EINC' onclick='javascript:IncrementTime(\\\"\\\"+counter+\\\":E\\\")' /><img src = 'minus.gif' id='\\\"+counter+\\\":EDEC' onclick='javascript:DecrementTime(\\\"\\\"+counter+\\\":E\\\")' />\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTR.appendChild(objTD);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD=document.createElement(\\\"td\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.setAttribute( 'rowspan' , 2 );\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.setAttribute( 'style' , 'padding : 10px' );\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTR.appendChild(objTD);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objA=document.createElement(\\\"a\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objA.id = counter+\\\":A\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objA.setAttribute( 'href' , \\\"javascript:removeRow('\\\" + objDIV.id + \\\"')\\\" );\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objA.setAttribute( 'style' , \\\"text-decoration: none ; font-family: courier ; font-size: 24px ; font-weight: bold ;\\\" );\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.appendChild(objA);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objT=document.createTextNode(\\\"X\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objA.appendChild(objT);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTBody.appendChild(objTR);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTR=document.createElement(\\\"tr\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD=document.createElement(\\\"td\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.innerHTML=\\\"<input type='text' size = 50 id='\\\"+counter+\\\":CAPTION' />\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTD.setAttribute( 'colspan' , 4 ) ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTR.appendChild(objTD);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTBody.appendChild(objTR);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objTable.appendChild(objTBody);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objDIV.appendChild(objTable);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objDIV.style.overflow=\\\"auto\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					document.getElementById(\\\"divCaptions\\\").appendChild(objDIV);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					objDIV=document.createElement(\\\"div\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					document.getElementById(\\\"divCaptions\\\").appendChild(objDIV);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					counter++;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				function IncrementTime(id)\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					var obj=document.getElementById(id);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					var value=obj.innerHTML;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					var mm;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					var ss;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					if(value==\\\"\\\")\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						mm=0;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						ss=1;	\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						obj.innerHTML=mm+\\\":\\\"+ss;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					else\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						if( id.substring( id.length - 1 ) == \\\"S\\\" )\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							objE = document.getElementById( id.substring( 0 , id.length - 1 ) + \\\"E\\\" ) ; \";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							valueE = objE.innerHTML ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							mmE = parseInt(valueE.split(\\\":\\\")[0],10);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							ssE = parseInt(valueE.split(\\\":\\\")[1],10);	\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						mm=parseInt(value.split(\\\":\\\")[0],10);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						ss=parseInt(value.split(\\\":\\\")[1],10);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						if(ss%59==0 && ss!=0)\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							ss=0;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							mm++;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						else\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							ss++;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						obj.innerHTML=mm+\\\":\\\"+ss;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						if( id.substring( id.length - 1 ) == \\\"S\\\" )\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							if( mm > mmE )\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"								mmE = mm ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"								ssE = ss ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							else if( mm == mmE && ss > ssE )\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"								ssE = ss ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							objE.innerHTML = mmE + \\\":\\\" + ssE ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				function DecrementTime(id)\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					var obj=document.getElementById(id);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					var value=obj.innerHTML;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					var mm;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					var ss;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					if(value==\\\"\\\")\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						mm=0;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						ss=1;	\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						obj.innerHTML=mm+\\\":\\\"+ss;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					else\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						mm=parseInt(value.split(\\\":\\\")[0],10);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						ss=parseInt(value.split(\\\":\\\")[1],10);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						if( id.substring( id.length - 1 ) == \\\"E\\\" )\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							objS = document.getElementById( id.substring( 0 , id.length - 1 ) + \\\"S\\\" ) ; \";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							valueS = objS.innerHTML ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							mmS = parseInt(valueS.split(\\\":\\\")[0],10);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							ssS = parseInt(valueS.split(\\\":\\\")[1],10);	\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							if( mmS == mm && ssS == ss )\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"								return ;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"			\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						if(ss==0 && mm!=0)\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							ss=59;								\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							mm--;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						else \";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							if(mm==0 && ss==0)\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							else\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							{\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"								ss--;		\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"							}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"								\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"						obj.innerHTML= mm + \\\":\\\" + ss;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"					}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				}\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"				\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"    function Change(id,type,category)\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"    {\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"        \";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"        var obj=document.getElementById(id);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"        var newObj;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            \";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"        if(obj.type!=\\\"textarea\\\" && obj.type!=\\\"text\\\")\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"        {\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            \";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            \";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            newObj=document.createElement(type);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            if(type==\\\"textarea\\\")\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            {\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"                newObj.rows=\\\"5\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"                newObj.cols=\\\"50\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            }\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            else\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            {\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"                newObj.type=\\\"text\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"                newObj.style.width=\\\"95%\\\" ;    \";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            }\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            newObj.value=obj.innerHTML;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            newObj.id=id;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            \";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            newObj.onblur=function(){Change(id,type,category)};\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            newObj.className=\\\"txt\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            obj.parentNode.replaceChild(newObj,obj);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"        }\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"        else\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"        {\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            \";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            newObj=document.createElement(\\\"a\\\");\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            newObj.id=id;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            newObj.innerHTML=obj.value;\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            newObj.href=\\\"javascript:Change('\\\"+id+\\\"','\\\"+type+\\\"','\\\"+category+\\\"')\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            \";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            newObj.style.color=\\\"Black\\\";\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"            obj.parentNode.replaceChild(newObj,obj);\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"        }\";";
cc_writePlayerDivJS += "cc_playerDivInnerScript.innerHTML+= \"    }\";";
cc_writePlayerDivJS += "cc_objPlayerDIV.appendChild(cc_playerDivInnerScript);";
//End script inside player div



cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"<div id='bodyDiv' class = \\\"section-1\\\" >\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"<ul id=\\\"menu\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  <li id=\\\"nav-1\\\"><a href=\\\"javascript:update(1)\\\">View</a></li>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  <li id=\\\"nav-2\\\"><a href=\\\"javascript:update(2)\\\">Captions</a></li>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  <li id=\\\"nav-3\\\"><a href=\\\"javascript:update(3)\\\">Versions</a></li>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"</ul>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"<div id=\\\"contents\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	<div id = \\\"content1\\\" style = \\\"display:none\\\" >\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<table border = \\\"0\\\" width = \\\"100%\\\" >\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<tr>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<td valign = \\\"top\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		 <div style = \\\"border: 5px double #ccc; background-color: #E8EBF0; width: 500px ; height: 400px\\\" >\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<object classid=\\\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\\\" codebase=\\\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0\\\" width=\\\"100%\\\" height=\\\"100%\\\" id=\\\"ccPlayer\\\" align=\\\"middle\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	  	<param name=\\\"allowFullScreen\\\" value=\\\"true\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"        <param name=\\\"allowScriptAccess\\\" value=\\\"always\\\" />\\n\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \" 	 	<param name=\\\"allow-access-from domain\\\" value=\\\"*\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<!--<param name=\\\"movie\\\" value=\\\"ccPlayer.swf?ccVideoName=http://proxy-33.dailymotion.com/14/320x240/flv/3404263.flv?d71d137b58b5bff62c344e0b3762057d132a704&ccVideoBufferTime=5&ccCaptSourceType=external&ccCaptionSource=http://www-scf.usc.edu/~ramavajj/flash/car.dfxp.xml&ccCaptionLanguage=en&ccCaptionAutoHide=false&ccOverrideFileStyle=false&ccDisplayRollup=false\\\"/>-->\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<param name=\\\"movie\\\" value=\\\"player.swf\\\"/>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<param name=\\\"quality\\\" value=\\\"high\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<param name=\\\"bgcolor\\\" value=\\\"#cccccc\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<embed src=\\\"www.projectpossibility.org/projects/webcaption/player.swf\\\" allowfullscreen=\\\"true\\\" quality=\\\"high\\\" bgcolor=\\\"#cccccc\\\"  name=\\\"ccPlayer\\\" align=\\\"middle\\\" allowScriptAccess=\\\"sameDomain\\\" height=\\\"100%\\\" width=\\\"100%\\\" type=\\\"application/x-shockwave-flash\\\" pluginspage=\\\"http://www.macromedia.com/go/getflashplayer\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		</object>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		 </div>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		 \";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</td>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<td valign = \\\"top\\\" align = \\\"right\\\" width = \\\"50%\\\">		 		\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			<div align = \\\"left\\\" style = \\\"width : 80% ; font-size: 16px; font-family : courier;\\\" >\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			</div>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</td>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</tr>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</table>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	</div>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	<div id = \\\"content2\\\" style = \\\"display:none\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<table border = \\\"0\\\" width = \\\"100%\\\" >\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<tr>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<td valign = \\\"top\\\" width = \\\"50%\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<div style = \\\"border: 5px double #ccc; background-color: #E8EBF0; width: 500px ; height: 400px\\\" >\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<object classid=\\\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\\\" codebase=\\\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0\\\" width=\\\"100%\\\" height=\\\"100%\\\" id=\\\"ccPlayer\\\" align=\\\"middle\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	  	<param name=\\\"allowFullScreen\\\" value=\\\"true\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"        <param name=\\\"allowScriptAccess\\\" value=\\\"always\\\" />\\n\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \" 	 	<param name=\\\"allow-access-from domain\\\" value=\\\"*\\\ />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<!--<param name=\\\"movie\\\" value=\\\"ccPlayer.swf?ccVideoName=http://proxy-33.dailymotion.com/14/320x240/flv/3404263.flv?d71d137b58b5bff62c344e0b3762057d132a704&ccVideoBufferTime=5&ccCaptSourceType=external&ccCaptionSource=http://www-scf.usc.edu/~ramavajj/flash/car.dfxp.xml&ccCaptionLanguage=en&ccCaptionAutoHide=false&ccOverrideFileStyle=false&ccDisplayRollup=false\\\"/>-->\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<param name=\\\"movie\\\" value=\\\"player.swf\\\"/>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<param name=\\\"quality\\\" value=\\\"high\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<param name=\\\"bgcolor\\\" value=\\\"#cccccc\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<embed src=\\\"www.projectpossibility.org/projects/webcaption/player.swf\\\" allowfullscreen=\\\"true\\\" quality=\\\"high\\\" bgcolor=\\\"#cccccc\\\"  name=\\\"ccPlayer\\\" align=\\\"middle\\\" allowScriptAccess=\\\"sameDomain\\\" height=\\\"100%\\\" width=\\\"100%\\\" type=\\\"application/x-shockwave-flash\\\" pluginspage=\\\"http://www.macromedia.com/go/getflashplayer\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		</object>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</div>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		 \";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</td>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<td valign = \\\"top\\\"  align = \\\"right\\\">		 \";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			 <form method = \\\"get\\\" action = \\\"\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			     \";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"					 <a href=\\\"javascript:AddNewRow()\\\">Add Caption</a> <br /><br />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"						<div id=\\\"divCaptions\\\" style=\\\"height:300px;overflow:auto\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"						</div>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"					 \";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"					 <br /><br />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"					 \";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"					 <input type = \\\"submit\\\" value = \\\"Save Captions\\\" /><input type = \\\"reset\\\" value = \\\"Clear\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		 	 </form>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</td>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</tr>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</table>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	</div>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	<div id = \\\"content3\\\" >\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<table border = \\\"0\\\" width = \\\"100%\\\" >\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<tr>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<td valign = \\\"top\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		 <div style = \\\"border: 5px double #ccc; background-color: #E8EBF0; width: 500px ; height: 400px\\\" >\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<object classid=\\\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\\\" codebase=\\\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0\\\" width=\\\"100%\\\" height=\\\"100%\\\" id=\\\"ccPlayer\\\" align=\\\"middle\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	  	<param name=\\\"allowFullScreen\\\" value=\\\"true\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"        <param name=\\\"allowScriptAccess\\\" value=\\\"always\\\" />\\n\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \" 	 	<param name=\\\"allow-access-from domain\\\" value=\\\"*\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<!--<param name=\\\"movie\\\" value=\\\"ccPlayer.swf?ccVideoName=http://proxy-33.dailymotion.com/14/320x240/flv/3404263.flv?d71d137b58b5bff62c344e0b3762057d132a704&ccVideoBufferTime=5&ccCaptSourceType=external&ccCaptionSource=http://www-scf.usc.edu/~ramavajj/flash/car.dfxp.xml&ccCaptionLanguage=en&ccCaptionAutoHide=false&ccOverrideFileStyle=false&ccDisplayRollup=false\\\"/>-->\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<param name=\\\"movie\\\" value=\\\"player.swf\\\"/>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<param name=\\\"quality\\\" value=\\\"high\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<param name=\\\"bgcolor\\\" value=\\\"#cccccc\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		<embed src=\\\"www.projectpossibility.org/projects/webcaption/player.swf\\\" allowfullscreen=\\\"true\\\" quality=\\\"high\\\" bgcolor=\\\"#cccccc\\\"  name=\\\"ccPlayer\\\" align=\\\"middle\\\" allowScriptAccess=\\\"sameDomain\\\" height=\\\"100%\\\" width=\\\"100%\\\" type=\\\"application/x-shockwave-flash\\\" pluginspage=\\\"http://www.macromedia.com/go/getflashplayer\\\" />\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"  		</object>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		 </div>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		 \";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</td>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		<td valign = \\\"top\\\" align = \\\"right\\\" width = \\\"50%\\\">		 		\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			<div align = \\\"left\\\" style = \\\"width : 80% ; font-size: 16px;\\\" ><br /> Available Versions (4): <br /><br /> </div>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			<table width = \\\"70%\\\" style = \\\"font-family : courier\\\">\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			<tr>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"				<td> <b>Version 4:</b> March 23rd 08 </td> <td> <img src = \\\"play.jpg\\\" /> <img src = \\\"save.jpg\\\" /> </td>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			</tr>	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			<tr>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"				<td> <b>Version 3:</b> March 20th 08 </td> <td> <img src = \\\"play.jpg\\\" /> <img src = \\\"save.jpg\\\" /> </td>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			</tr>	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			<tr>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"				<td> <b>Version 2:</b> March 15th 08 </td> <td> <img src = \\\"play.jpg\\\" /> <img src = \\\"save.jpg\\\" /> </td>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			</tr>	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			<tr>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"				<td> <b>Version 1:</b> March 02nd 08 </td> <td> <img src = \\\"play.jpg\\\" /> <img src = \\\"save.jpg\\\" /> </td>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			</tr>	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"			</table>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</td>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</tr>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"		</table>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	</div>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"	\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"</div>\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"\";";
cc_writePlayerDivJS += "cc_objDIV.innerHTML+= \"</div>\";";

cc_writePlayerDivJS += "cc_objPlayerDIV.appendChild(cc_objDIV);";


cc_writePlayerDivJS += "var cc_updateOnce = document.createElement   update(1); /*should only work once*/\";";
//end of playerdiv new contents


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










/*
var addButtonsScript = document.createElement("script");
addButtonsScript.type="text/javascript";
addButtonsScript.innerHTML = "try { var exists = (cc_doesVidExist != undefined);}catch(e) {var exists = false; } insertCaptionButtons(cc_doesVidExist);";
baseDiv.appendChild(addButtonsScript);
*/


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


