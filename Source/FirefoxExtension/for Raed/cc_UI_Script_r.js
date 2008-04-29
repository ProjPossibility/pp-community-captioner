var cc_updateScript = document.createElement("script");
cc_updateScript.type = "text/javascript";
cc_updateScript.innerHTML ="function update( num ){";
//If num is 2 or 3 we need to move youtube stuff down
cc_updateScript.innerHTML +="var cc_wov = document.getElementById('watch-other-vids');";

cc_updateScript.innerHTML +="var cc_x = ObjectCoOrdinates('watch-ratings-views');";

cc_updateScript.innerHTML +="cc_wov.style.position = 'absolute';";
cc_updateScript.innerHTML +="cc_x.x+=00;";
cc_updateScript.innerHTML +="cc_x.y+=0;";
cc_updateScript.innerHTML +="cc_wov.style.top=parseInt(cc_x.y-10,10)+'px';";
cc_updateScript.innerHTML +="cc_wov.style.left = parseInt(cc_x.x+430,10)+'px';";
cc_updateScript.innerHTML +="for( var i = 2 ; i <= 3 ; i++ ){";
cc_updateScript.innerHTML +="var strID='content'+i;";
cc_updateScript.innerHTML +="document.getElementById( strID).style.display = \"none\";";
cc_updateScript.innerHTML +="}";
cc_updateScript.innerHTML +="document.getElementById( 'content' + num ).style.display = \"inline\";";
cc_updateScript.innerHTML +="document.getElementById( 'cc_DIV_UI_Contents' ).className = \"section-\" + num;";
cc_updateScript.innerHTML +="}";
document.getElementById("watch-player-div").appendChild(cc_updateScript);



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

//Content div 1 for Video
var cc_content1=document.createElement("div");
cc_content1.id="content1";
cc_content1.style.zIndex=99999;
cc_content1.style.display="none";
/*
cc_content1.style.border="5px double #ccc";
cc_content1.style.backgroundColor="#E8EBF0";
cc_content1.style.width="100%";
cc_content1.style.height="100%";
cc_content1.style.width="500px";
cc_content1.style.height="400px";
*/

cc_content1.innerHTML+='		<center><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="ccPlayer" align="middle">\n';
cc_content1.innerHTML+='	  	<param name="allowFullScreen" value="true" />\n';
cc_content1.innerHTML+=' 	 	<param name="allow-access-from domain" value="*" />\n';
cc_content1.innerHTML+=' 	 	<param name="allowScriptAccess" value="always" />\n';
cc_content1.innerHTML+='  		<param name="movie" value="player.swf"/>\n';
cc_content1.innerHTML+='  		<param name="quality" value="high" />\n';
cc_content1.innerHTML+='  		<param name="bgcolor" value="#cccccc" />\n';
cc_content1.innerHTML+='  		<embed src="http://www.projectpossibility.org/projects/webcaption/player.swf" allowfullscreen="true" quality="high" bgcolor="#cccccc"  name="flash" align="middle" id="flash1" allowScriptAccess="always" height="395px" width="480px" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\n';
cc_content1.innerHTML+='  		</object></center>\n';

objDIVContents.appendChild(cc_content1);



//Content div 2 for Captions
var cc_content2=document.createElement("div");
cc_content2.id="content2";
cc_content2.style.zIndex=99999;
cc_content2.style.display="none";
var cc_content2Table =  document.createElement("table");
cc_content2Table.border = "0";
cc_content2Table.width = "100%";

var cc_content2Tr =  document.createElement("tr");
var cc_content2VideoTD =  document.createElement("td");
cc_content2VideoTD.valign = "top";
cc_content2VideoTD.width = "50%";
/*

cc_content2VideoTD.innerHTML+='		<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="ccPlayer" align="middle">\n';
cc_content2VideoTD.innerHTML+='	  	<param name="allowFullScreen" value="true" />\n';
cc_content2VideoTD.innerHTML+=' 	 	<param name="allow-access-from domain" value="*" />\n';
cc_content2VideoTD.innerHTML+=' 	 	<param name="allowScriptAccess" value="always" />\n';
cc_content2VideoTD.innerHTML+='  		<param name="movie" value="player.swf"/>\n';
cc_content2VideoTD.innerHTML+='  		<param name="quality" value="high" />\n';
cc_content2VideoTD.innerHTML+='  		<param name="bgcolor" value="#cccccc" />\n';
cc_content2VideoTD.innerHTML+='  		<embed src="http://www.projectpossibility.org/projects/webcaption/player.swf" allowfullscreen="true" quality="high" bgcolor="#cccccc"  name="flash" align="middle" id="flash1" allowScriptAccess="always" height="395px" width="480px" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\n';
cc_content2VideoTD.innerHTML+='  		</object>\n';

                */

var cc_content2CapTD =  document.createElement("td");
cc_content2CapTD.valign = "top";
cc_content2CapTD.align = "right";


cc_content2CapTD.innerHTML+='					 <a href="javascript:AddNewRow()">Add Caption</a> <br /><br />\n';
cc_content2CapTD.innerHTML+='\n';
cc_content2CapTD.innerHTML+='						<div id="divCaptions" style="height:300px;overflow:auto">\n';
cc_content2CapTD.innerHTML+='						</div>\n';
cc_content2CapTD.innerHTML+='					 <br /><br />\n';
cc_content2CapTD.innerHTML+='					 <button onClick ="alert(\'s\')">Save Captions</button><button type = "button" value = "Clear" onClick = "removeAllRows()">Clear</button>\n';

//put the parts together
cc_content2Tr.appendChild(cc_content2VideoTD);
cc_content2Tr.appendChild(cc_content2CapTD);
cc_content2Table.appendChild(cc_content2Tr);
cc_content2.appendChild(cc_content2Table);
objDIVContents.appendChild(cc_content2);






//DEBUG content2
/*
var cc_content2=document.createElement("div");
cc_content2.id="content2";
cc_content2.style.display="none";
cc_content2.style.border="5px double #ccc";
cc_content2.style.backgroundColor="#E8EBF0";
cc_content2.style.width="500px";
cc_content2.style.height="400px";
/*cc_content2.innerHTML+='		Content 2<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="ccPlayer" align="middle">\n';
cc_content2.innerHTML+='	  	<param name="allowFullScreen" value="true" />\n';
cc_content2.innerHTML+=' 	 	<param name="allow-access-from domain" value="*" />\n';
cc_content2.innerHTML+=' 	 	<param name="allowScriptAccess" value="always" />\n';
cc_content2.innerHTML+='  		<param name="movie" value="player.swf"/>\n';
cc_content2.innerHTML+='  		<param name="quality" value="high" />\n';
cc_content2.innerHTML+='  		<param name="bgcolor" value="#cccccc" />\n';
cc_content2.innerHTML+='  		<embed src="http://www.projectpossibility.org/projects/webcaption/player.swf" allowfullscreen="true" quality="high" bgcolor="#cccccc"  name="flash" align="middle" id="flash1" allowScriptAccess="always" height="395" width="480" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\n';
cc_content2.innerHTML+='  		</object>\n';

objDIVContents.appendChild(cc_content2);
*/

//DEBUG content3
var cc_content3=document.createElement("div");
cc_content3.id="content3";
cc_content3.style.zIndex=99999;
cc_content3.style.display="none";
cc_content3.style.border="5px double #ccc";
cc_content3.style.backgroundColor="#E8EBF0";
cc_content3.style.width="500px";
cc_content3.style.height="400px";
/*
cc_content3.innerHTML+='		cc_content3<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="ccPlayer" align="middle">\n';
cc_content3.innerHTML+='	  	<param name="allowFullScreen" value="true" />\n';
cc_content3.innerHTML+=' 	 	<param name="allow-access-from domain" value="*" />\n';
cc_content3.innerHTML+=' 	 	<param name="allowScriptAccess" value="always" />\n';
cc_content3.innerHTML+='  		<param name="movie" value="player.swf"/>\n';
cc_content3.innerHTML+='  		<param name="quality" value="high" />\n';
cc_content3.innerHTML+='  		<param name="bgcolor" value="#cccccc" />\n';
cc_content3.innerHTML+='  		<embed src="http://www.projectpossibility.org/projects/webcaption/player.swf" allowfullscreen="true" quality="high" bgcolor="#cccccc"  name="flash" align="middle" id="flash1" allowScriptAccess="always" height="395" width="480" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\n';
cc_content3.innerHTML+='  		</object>\n';
*/
objDIVContents.appendChild(cc_content3);


/*

objDIVContents.innerHTML+='\n';
objDIVContents.innerHTML+='	<div id = "content3" style = "display:none">\n';
objDIVContents.innerHTML+='\n';
objDIVContents.innerHTML+='		<table border = "0" width = "100%" >\n';
objDIVContents.innerHTML+='		<tr>\n';
objDIVContents.innerHTML+='		<td valign = "top">\n';
objDIVContents.innerHTML+='	\n';
objDIVContents.innerHTML+='		 <div style = "border: 5px double #ccc; background-color: #E8EBF0; width: 500px ; height: 400px" >\n';
objDIVContents.innerHTML+='\n';
/*objDIVContents.innerHTML+='		<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="ccPlayer" align="middle">\n';
objDIVContents.innerHTML+='	  	<param name="allowFullScreen" value="true" />\n';
objDIVContents.innerHTML+=' 	 	<param name="allow-access-from domain" value="*" />\n';
objDIVContents.innerHTML+=' 	 	<param name="allowScriptAccess" value="always" />\n';
objDIVContents.innerHTML+='  		<param name="movie" value="player.swf"/>\n';
objDIVContents.innerHTML+='  		<param name="quality" value="high" />\n';
objDIVContents.innerHTML+='  		<param name="bgcolor" value="#cccccc" />\n';
objDIVContents.innerHTML+='  		<embed src="http://www.projectpossibility.org/projects/webcaption/player.swf" allowfullscreen="true" quality="high" bgcolor="#cccccc"  name="flash" align="middle" id="flash1" allowScriptAccess="always" height="395" width="480" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\n';
objDIVContents.innerHTML+='  		</object>\n';
objDIVContents.innerHTML+='	\n';
objDIVContents.innerHTML+='		 </div>\n';
objDIVContents.innerHTML+='		 \n';
objDIVContents.innerHTML+='		</td>\n';
objDIVContents.innerHTML+='		\n';
objDIVContents.innerHTML+='		<td valign = "top" align = "right" width = "50%">		 		\n';
objDIVContents.innerHTML+='\n';
objDIVContents.innerHTML+='			<div align = "left" style = "width : 80% ; font-size: 16px;" ><br /> Available Versions (4): <br /><br /> </div>\n';
objDIVContents.innerHTML+='\n';
objDIVContents.innerHTML+='			<table width = "70%" style = "font-family : courier">\n';
objDIVContents.innerHTML+='\n';
objDIVContents.innerHTML+='			<tr>\n';
objDIVContents.innerHTML+='				<td> <b>Version 4:</b> March 23rd 08 </td> <td> <img src = "play.jpg" /> <img src = "save.jpg" /> </td>\n';
objDIVContents.innerHTML+='			</tr>	\n';
objDIVContents.innerHTML+='		\n';
objDIVContents.innerHTML+='			<tr>\n';
objDIVContents.innerHTML+='				<td> <b>Version 3:</b> March 20th 08 </td> <td> <img src = "play.jpg" /> <img src = "save.jpg" /> </td>\n';
objDIVContents.innerHTML+='			</tr>	\n';
objDIVContents.innerHTML+='\n';
objDIVContents.innerHTML+='			<tr>\n';
objDIVContents.innerHTML+='				<td> <b>Version 2:</b> March 15th 08 </td> <td> <img src = "play.jpg" /> <img src = "save.jpg" /> </td>\n';
objDIVContents.innerHTML+='			</tr>	\n';
objDIVContents.innerHTML+='\n';
objDIVContents.innerHTML+='			<tr>\n';
objDIVContents.innerHTML+='				<td> <b>Version 1:</b> March 02nd 08 </td> <td> <img src = "play.jpg" /> <img src = "save.jpg" /> </td>\n';
objDIVContents.innerHTML+='			</tr>	\n';
objDIVContents.innerHTML+='	\n';
objDIVContents.innerHTML+='			</table>\n';
objDIVContents.innerHTML+='		</td>\n';
objDIVContents.innerHTML+='		</tr>\n';
objDIVContents.innerHTML+='		</table>\n';
objDIVContents.innerHTML+='\n';
objDIVContents.innerHTML+='	</div>\n';

                                          /*
var cc_contentXML = 'var cc_text = \'<div id = "master" class = "section-1">\';';
cc_contentXML += 'cc_text += \'<ul id = "menu">\';';
cc_contentXML += 'cc_text += \'  <li id="nav-1"><a href="javascript:update(1)">View</a></li>\';';
cc_contentXML += 'cc_text += \'  <li id="nav-2"><a href="javascript:update(2)">Captions</a></li>\';';
cc_contentXML += 'cc_text += \'  <li id="nav-3"><a href="javascript:update(3)">Versions</a></li>\';';
cc_contentXML += 'cc_text += \'</ul>\';';
cc_contentXML += 'cc_text += \'<div id="contents">\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'		<table border = "0" width = "100%" >\';';
cc_contentXML += 'cc_text += \'		<tr>\';';
cc_contentXML += 'cc_text += \'		<td valign = "top">\';';
cc_contentXML += 'cc_text += \'	\';';
cc_contentXML += 'cc_text += \'		<div style = "border: 5px double #ccc; background-color: #E8EBF0; width: 100% ; height: 400px" >\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'			<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="ccPlayer" align="middle">\';';
cc_contentXML += 'cc_text += \'			  	<param name="allowFullScreen" value="true" />\';';
cc_contentXML += 'cc_text += \'		 	 	<param name="allow-access-from domain" value="*" />\';';
cc_contentXML += 'cc_text += \' 	 			<param name="allowScriptAccess" value="always" />\';';
cc_contentXML += 'cc_text += \'  				<param name="movie" value="player.swf"/>\';';
cc_contentXML += 'cc_text += \'		  		<param name="quality" value="high" />\';';
cc_contentXML += 'cc_text += \'  				<param name="bgcolor" value="#cccccc" />\';';
cc_contentXML += 'cc_text += \'  				<embed src="http://www.projectpossibility.org/projects/webcaption/player.swf" allowfullscreen="true" quality="high" bgcolor="#cccccc"  name="flash" align="middle" id="flash1" allowScriptAccess="always" height="100%" width="100%" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\';';
cc_contentXML += 'cc_text += \' 	 		</object>\';';
cc_contentXML += 'cc_text += \'	\';';
cc_contentXML += 'cc_text += \'		</div>\';';
cc_contentXML += 'cc_text += \'		 \';';
cc_contentXML += 'cc_text += \'		</td>\';';
cc_contentXML += 'cc_text += \'		\';';
cc_contentXML += 'cc_text += \'		<td valign = "top" align = "right" width = "50%">		 		\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'		<div id = "content1">\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'			<div align = "left" style = "width : 80% ; font-size: 16px; font-family : courier;" >\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'			<br /> \';';
cc_contentXML += 'cc_text += \'			Credits: \';';
cc_contentXML += 'cc_text += \'			<br /><br /> \';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'			<ul>\';';
cc_contentXML += 'cc_text += \'			<li> <b> Amgen </b> </li>\';';
cc_contentXML += 'cc_text += \'				<ul>		\';';
cc_contentXML += 'cc_text += \'			    		<li> Ely Lerner </li> \';';
cc_contentXML += 'cc_text += \'				</ul>\';';
cc_contentXML += 'cc_text += \'			</ul>\';';
cc_contentXML += 'cc_text += \'			<ul>\';';
cc_contentXML += 'cc_text += \'			<li> <b> USC </b> </li>\';';
cc_contentXML += 'cc_text += \'				<ul>\';';
cc_contentXML += 'cc_text += \'	    				<li> Jeffrey Chan </li>\';';
cc_contentXML += 'cc_text += \'		    			<li> Chaitanya Ramavajjala </li>\';';
cc_contentXML += 'cc_text += \'		    			<li> Chetan Sharma </li>\';';
cc_contentXML += 'cc_text += \'    					<li> Raed Shomali </li>\';';
cc_contentXML += 'cc_text += \'				</ul> \';';
cc_contentXML += 'cc_text += \'			</ul>\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'			</div>\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'		</div>\';';
cc_contentXML += 'cc_text += \'	\';';
cc_contentXML += 'cc_text += \'		<div id = "content2" style = "display:none">\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'			 <form method = "get" action = "">\';';
cc_contentXML += 'cc_text += \'			     \';';
cc_contentXML += 'cc_text += \'					 <a href="javascript:AddNewRow(\\\'0:0\\\' , \\\'0:0\\\' , \\\'\\\')">Add Caption</a> <br /><br />\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'						<div id="divCaptions" style = "height:300px ; overflow:auto" >\';';
cc_contentXML += 'cc_text += \'						</div>\';';
cc_contentXML += 'cc_text += \'					 \';';
cc_contentXML += 'cc_text += \'					 <br /><br />\';';
cc_contentXML += 'cc_text += \'					 \';';
cc_contentXML += 'cc_text += \'					 <input id = "captionsButton" type = "button" value = "Save Captions" onClick = "saveCaptions()" /><input type = "button" value = "Clear" onClick = "removeAllRows()" />\';';
cc_contentXML += 'cc_text += \'		 	 </form>\';';
cc_contentXML += 'cc_text += \'		</div>\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'		<div id = "content3" style = "display:none">\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'			<div align = "left" style = "width : 80% ; font-size: 16px;" ><br /> Available Versions (4): <br /><br /> </div>\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'			<table width = "70%" style = "font-family : courier">\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'			<tr>\';';
cc_contentXML += 'cc_text += \'				<td> <b>Version 4:</b> March 23rd 08 </td> <td> <img src = "play.jpg" /> <img src = "save.jpg" /> </td>\';';
cc_contentXML += 'cc_text += \'			</tr>	\';';
cc_contentXML += 'cc_text += \'		\';';
cc_contentXML += 'cc_text += \'			<tr>\';';
cc_contentXML += 'cc_text += \'				<td> <b>Version 3:</b> March 20th 08 </td> <td> <img src = "play.jpg" /> <img src = "save.jpg" /> </td>\';';
cc_contentXML += 'cc_text += \'			</tr>	\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'			<tr>\';';
cc_contentXML += 'cc_text += \'				<td> <b>Version 2:</b> March 15th 08 </td> <td> <img src = "play.jpg" /> <img src = "save.jpg" /> </td>\';';
cc_contentXML += 'cc_text += \'			</tr>	\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'			<tr>\';';
cc_contentXML += 'cc_text += \'				<td> <b>Version 1:</b> March 02nd 08 </td> <td> <img src = "play.jpg" /> <img src = "save.jpg" /> </td>\';';
cc_contentXML += 'cc_text += \'			</tr>	\';';
cc_contentXML += 'cc_text += \'	\';';
cc_contentXML += 'cc_text += \'			</table>\';';
cc_contentXML += 'cc_text += \'		</div>\';';
cc_contentXML += 'cc_text += \'\';';
cc_contentXML += 'cc_text += \'		</td>\';';
cc_contentXML += 'cc_text += \'		</tr>\';';
cc_contentXML += 'cc_text += \'		</table>\';';
cc_contentXML += 'cc_text += \'	\';';
cc_contentXML += 'cc_text += \'</div>\';';
cc_contentXML += 'cc_text += \'</div>\';';


cc_contentXML += "var parser = new DOMParser();";
cc_contentXML += "var xmlDoc = parser.parseFromString(cc_text,\"text/xml\");";
cc_contentXML += "var subDIV = cc_findPlayerDiv();";
cc_contentXML += "subDIV.appendChild(xmlDoc.documentElement);";
cc_contentXML += "alert('affter appendChild');";

var objDIVContents = document.createElement("script");
objDIVContents.type="text/javascript"
objDIVContents.innerHTML = cc_contentXML;      */

document.getElementById("watch-player-div").appendChild(objDIVContents);

var cc_callUpdate = document.createElement("script");
cc_callUpdate.type = "text/javascript";
cc_callUpdate.innerHTML ="update(1)";
document.getElementById("watch-player-div").appendChild(cc_callUpdate);