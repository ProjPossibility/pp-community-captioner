var ul=document.createElement("ul");
ul.id="menu";
ul.innerHTML='<li id="nav-1"><a href="javascript:update(1)">View</a></li>\n';
ul.innerHTML+='<li id="nav-2"><a href="javascript:update(2)">Captions</a></li>\n';
ul.innerHTML+='<li id="nav-3"><a href="javascript:update(3)">Versions</a></li>\n';


document.getElementById("watch-player-div").appendChild(ul);
var objDIVContents=document.createElement("div");
objDIVContents.id="cc_DIV_UI_Contents";
//objDIVContents.style.width="500px";
objDIVContents.style.width="900px";
objDIVContents.style.height="400px";
objDIVContents.style.border="5px double #ccc";


var cc_Table =  document.createElement("table");
cc_Table.border = "0";
cc_Table.width = "100%";

var cc_Tr =  document.createElement("tr");
var cc_VideoTD =  document.createElement("td");
cc_VideoTD.valign = "top";
cc_VideoTD.width = "50%";


cc_VideoTD.innerHTML+='		<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="flash" align="middle">\n';
cc_VideoTD.innerHTML+='	  	<param name="allowFullScreen" value="true" />\n';
cc_VideoTD.innerHTML+=' 	 	<param name="allow-access-from domain" value="*" />\n';
cc_VideoTD.innerHTML+=' 	 	<param name="allowScriptAccess" value="always" />\n';
cc_VideoTD.innerHTML+='  		<param name="movie" value="player.swf"/>\n';
cc_VideoTD.innerHTML+='  		<param name="quality" value="high" />\n';
cc_VideoTD.innerHTML+='  		<param name="bgcolor" value="#cccccc" />\n';
cc_VideoTD.innerHTML+='  		<embed src="http://www.projectpossibility.org/projects/webcaption/player.swf" allowfullscreen="true" quality="high" bgcolor="#cccccc"  name="flash" align="middle"  allowScriptAccess="always" height="395px" width="480px" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\n';
cc_VideoTD.innerHTML+='  		</object>\n';



var cc_CapTD =  document.createElement("td");
cc_CapTD.valign = "top";
cc_CapTD.align = "right";


//Content div 1 for just the Video
var cc_content1=document.createElement("div");
cc_content1.id="content1";
cc_content1.style.zIndex=99999;
cc_content1.style.display="none";

cc_content1.innerHTML+='';
cc_CapTD.appendChild(cc_content1);



//Content div 2 for Captions
var cc_content2=document.createElement("div");
cc_content2.id="content2";
cc_content2.style.zIndex=99999;
cc_content2.style.display="none";

cc_content2.innerHTML+='					 <a href="javascript:AddNewRow(\'0:0\',\'0:0\',\'\')">Add Caption</a> <br /><br />\n';
cc_content2.innerHTML+='\n';
cc_content2.innerHTML+='						<div id="divCaptions" style="height:300px;overflow:auto">\n';
cc_content2.innerHTML+='						</div>\n';
cc_content2.innerHTML+='					 <br /><br />\n';
cc_content2.innerHTML+='					 <button id="captionsButton" onClick ="saveCaptions()">Save Captions</button><button type = "button" value = "Clear" onClick = "removeAllRows()">Clear</button>\n';

cc_CapTD.appendChild(cc_content2);




//DEBUG content3
var cc_content3=document.createElement("div");
cc_content3.id="content3";
cc_content3.style.zIndex=99999;
cc_content3.style.display="none";
cc_content3.style.border="5px double #ccc";
cc_content3.style.backgroundColor="#E8EBF0";
cc_content3.style.width="500px";
cc_content3.style.height="400px";
cc_content3.innerHTML+='Versions';
cc_CapTD.appendChild(cc_content3);



//put the parts together
cc_Tr.appendChild(cc_VideoTD);
cc_Tr.appendChild(cc_CapTD);
cc_Table.appendChild(cc_Tr);



objDIVContents.appendChild(cc_Table);

document.getElementById("watch-player-div").appendChild(objDIVContents);

var cc_callUpdate = document.createElement("script");
cc_callUpdate.type = "text/javascript";
cc_callUpdate.innerHTML ="update(1)";
document.getElementById("watch-player-div").appendChild(cc_callUpdate);