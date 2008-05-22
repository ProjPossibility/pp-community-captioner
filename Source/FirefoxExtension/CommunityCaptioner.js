// ==UserScript==
// @name           youtube
// @namespace      youtube
// ==/UserScript==


//Start
var theURL = window.location.href;
//Check if we are on a youtube video, later on we will have else ifs for other known sites, and an default else clause to get the user to help us find the player div for unknown sites
if(theURL.indexOf('youtube.com/watch')!= -1)
{
//Get the first child from the dom to insert our scripts into
var objTarget=document.documentElement.firstChild;
//Create a script tag pointing to our scripts (hosted serverside for now, soon as chrome://)
var objChromeScript=document.createElement( "script" );
objChromeScript.type="text/javascript";
objChromeScript.src="http://www.projectpossibility.org/projects/webcaption/cc_chromeJS.js";
objTarget.appendChild(objChromeScript);





//Testing, probably not used? Check flash code
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
//script.innerHTML+='debugger\n'
script.innerHTML+='var strURL="document.flash.Ping(\'"+window.location.toString()+"\')";\n'
script.innerHTML+='eval(strURL);\n'
script.innerHTML+='}\n'
script.innerHTML+='catch(err){\n'
script.innerHTML+='var test=0;\n'
script.innerHTML+='}\n'
script.innerHTML+='}\n'
objTarget.appendChild(script);




}


