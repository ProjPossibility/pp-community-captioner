
				function DisableChildren(obj)
				{
					var id=obj.id.split(":")[1];
					var arrIDs=new Array();
					arrIDs[arrIDs.length]="S";
					arrIDs[arrIDs.length]="E";
					arrIDs[arrIDs.length]="SINC";
					arrIDs[arrIDs.length]="SDEC";
					arrIDs[arrIDs.length]="EINC";
					arrIDs[arrIDs.length]="EDEC";
					arrIDs[arrIDs.length]="CAPTION";
					var counter=0;
					var objObj;
	
					var strID="";

					while(counter<arrIDs.length)
					{
						strID=id+":"+arrIDs[counter];
						objObj=document.getElementById(strID);
	
						if( objObj.tagName == "IMG" )
						{
							objObj.attributes[0].nodeValue="" ;
						}
						else
						{		
							objObj.disabled = true;
						}

						counter++;
					}
				}

				function EnableChildren(obj)
				{
					var id=obj.id.split(":")[1];
					var arrIDs=new Array();
					arrIDs[arrIDs.length]="S";
					arrIDs[arrIDs.length]="E";
					arrIDs[arrIDs.length]="SINC";
					arrIDs[arrIDs.length]="SDEC";
					arrIDs[arrIDs.length]="EINC";
					arrIDs[arrIDs.length]="EDEC";
					arrIDs[arrIDs.length]="CAPTION";
					var counter=0;
					var objObj;

					var strID="";


					while(counter<arrIDs.length)
					{
						strID=id+":"+arrIDs[counter];
						objObj=document.getElementById(strID);

						if( objObj.tagName == "IMG" )
						{
							if( arrIDs[ counter ] == "SINC" )
							{
								objObj.attributes[0].nodeValue= 'javascript:IncrementTime(\"" + id + ":S\")' ;
							}
							else if( arrIDs[ counter ] == "SDEC" )
							{
								objObj.attributes[0].nodeValue= 'javascript:DecremenTime(\"" + id + ":S\")' ;
							}
							else if( arrIDs[ counter ] == "EINC" )
							{
								objObj.attributes[0].nodeValue= 'javascript:IncrementTime(\"" + id + ":E\")' ;
							}
							else if( arrIDs[ counter ] == "EDEC" )
							{
								objObj.attributes[0].nodeValue= 'javascript:DecremenTime(\"" + id + ":E\")' ;
							}
						}
						else
						{		
							objObj.disabled = false;
						}

						counter++;
					}
				}

				
				function update( num )
				{
				 	for( var i = 1 ; i <= 3 ; i++ )
				 	{
				 		document.getElementById( 'content' + i ).style.display = "none" ;
				 	}
				
					document.getElementById( 'content' + num ).style.display = "inline" ;
					document.getElementById( 'cc_DIV_UI_Contents' ).className = "section-" + num ;
				}

				function editRow( id )
				{
					for( i = 0 ; i < myList.length ; i ++ )
					{

						if( id == myList[ i ].id )
						{
							myList[ i ].setAttribute( "style" , "color : black" ) ;

							EnableChildren(myList[i]);
						}
						else
						{
							myList[ i ].setAttribute( "style" , "color : grey" ) ;

							DisableChildren(myList[i]);
						}
					}
				}

				function removeRow( id )
				{
					document.getElementById("divCaptions").removeChild( document.getElementById( id ) ) ;
				}

				var counter = 0 

				myList = new Array() ;


				function AddNewRow()
				{
					for( i = 0 ; i < myList.length ; i ++ )
					{
						myList[ i ].setAttribute( "style" , "color : grey" ) ;

						DisableChildren(myList[i]);
					}

					var objTable,objTBody,objTR,objTD,objDIV;
					
					objDIV=document.createElement("div")
					objDIV.name = "CCaption"
					objDIV.setAttribute( "style" , "padding : 10px" )
					objTable=document.createElement("table")
					objTable.id="tblCaption:"+counter;

					objTBody=document.createElement("tbody")
										
					objTR=document.createElement("tr")
					objTD=document.createElement("td")

					myList[ myList.length ] = objTable
					
					objDIV.id = counter + ":R" ;
					
					objTD.innerHTML="Start: "
					objTD.setAttribute("style" , "font-family: courier ; font-weight: bold ; font-size : 12px")
					objTR.appendChild(objTD)

					objSP=document.createElement("span")
					objSP.id=counter+":S"
					objSP.innerHTML = "0:0" 
					objSP.setAttribute( 'style' , 'font-weight: normal' )
					objTD.appendChild(objSP)
					
					objTD=document.createElement("td")
					objTD.innerHTML="<img src = 'plus.gif' id='"+counter+":SINC' onclick='javascript:IncrementTime(\""+counter+":S\")' /><img src = 'minus.gif' id='"+counter+":SDEC' onclick='javascript:DecrementTime(\""+counter+":S\")' />"
					objTR.appendChild(objTD)


					objTD=document.createElement("td")
					objTD.innerHTML="- End: "
					objTD.setAttribute("style" , "font-family: courier ; font-weight: bold ; font-size : 12px")
					objTR.appendChild(objTD)

					
					objSP=document.createElement("span")
					objSP.id=counter+":E"
					objSP.innerHTML = "0:0"
					objSP.setAttribute( 'style' , 'font-weight: normal' )
					objTD.appendChild(objSP)
					
					objTD=document.createElement("td")
					objTD.innerHTML="<img src = 'plus.gif' id='"+counter+":EINC' onclick='javascript:IncrementTime(\""+counter+":E\")' /><img src = 'minus.gif' id='"+counter+":EDEC' onclick='javascript:DecrementTime(\""+counter+":E\")' />"
					objTR.appendChild(objTD)


					objTD=document.createElement("td")
					objTD.setAttribute( 'rowspan' , 2 )
					objTD.setAttribute( 'style' , 'padding : 5px' )
					objTR.appendChild(objTD)


					objA=document.createElement("a")
					objA.id = counter+":A"
					objA.setAttribute( 'href' , "javascript:removeRow('" + objDIV.id + "')" )
					objA.setAttribute( 'style' , "text-decoration: none ; font-family: courier ; font-size: 24px ; font-weight: bold ;" )
					objTD.appendChild(objA)

					objT=document.createTextNode("X")
					objA.appendChild(objT)
					

					
					objTD=document.createElement("td")
					objTD.setAttribute( 'rowspan' , 2 )
					objTD.setAttribute( 'style' , 'padding : 10px' )
					objTR.appendChild(objTD)


					objA=document.createElement("a")
					objA.id = counter+":Z"
					objA.setAttribute( 'href' , "javascript:editRow('" + objTable.id + "')" )
					objA.setAttribute( 'style' , "font-size: 12px ;" )
					objTD.appendChild(objA)

					objT=document.createTextNode("Edit")
					objA.appendChild(objT)
					


					objTBody.appendChild(objTR)
					
					objTR=document.createElement("tr")
					objTD=document.createElement("td")
					
					
					objTD.innerHTML="<input type='text' size = 50 id='"+counter+":CAPTION' />"
					objTD.setAttribute( 'colspan' , 4 ) 
					objTR.appendChild(objTD)
					
					objTBody.appendChild(objTR)
					
					objTable.appendChild(objTBody)
					
					objDIV.appendChild(objTable)
					
					
					objDIV.style.overflow="auto"
					document.getElementById("divCaptions").appendChild(objDIV)

					objDIV=document.createElement("div")
					document.getElementById("divCaptions").appendChild(objDIV)

					counter++
					
				}
				
				function IncrementTime(id)
				{

					debugger

					var obj=document.getElementById(id)
					var value=obj.innerHTML
					var mm
					var ss

					if(value=="")
					{
						mm=0;
						ss=1;	
						
						obj.innerHTML=mm+":"+ss
					}
					else
					{
						if( id.substring( id.length - 1 ) == "S" )
						{
							objE = document.getElementById( id.substring( 0 , id.length - 1 ) + "E" ) ; 

							valueE = objE.innerHTML ;
							mmE = parseInt(valueE.split(":")[0],10)
							ssE = parseInt(valueE.split(":")[1],10)	
						}
	
						mm=parseInt(value.split(":")[0],10)
						ss=parseInt(value.split(":")[1],10)
							
						if(ss%59==0 && ss!=0)
						{
							ss=0;
							mm++;
						}
						else
						{
							ss++;
						}

						obj.innerHTML=mm+":"+ss
						
						if( id.substring( id.length - 1 ) == "S" )
						{
							if( mm > mmE )
							{
								mmE = mm ;
								ssE = ss ;
							}
							else if( mm == mmE && ss > ssE )
							{
								ssE = ss ;
							}

							objE.innerHTML = mmE + ":" + ssE ;
						}
					}
				}
				
				function DecrementTime(id)
				{
						
					var obj=document.getElementById(id)
					var value=obj.innerHTML
					var mm
					var ss
					
					if(value=="")
					{
						mm=0;
						ss=1;	
						
						obj.innerHTML=mm+":"+ss
					}
					else
					{
						mm=parseInt(value.split(":")[0],10)
						ss=parseInt(value.split(":")[1],10)

						if( id.substring( id.length - 1 ) == "E" )
						{
							objS = document.getElementById( id.substring( 0 , id.length - 1 ) + "S" ) ; 

							valueS = objS.innerHTML ;
							mmS = parseInt(valueS.split(":")[0],10)
							ssS = parseInt(valueS.split(":")[1],10)	

							if( mmS == mm && ssS == ss )
							{
								return ;
							}
						}
			
						if(ss==0 && mm!=0)
						{
							ss=59;								
							
							mm--;
						}
						else 
						{
							if(mm==0 && ss==0)
							{
							}
							else
							{
								ss--;		
							}
								
						}
				
						obj.innerHTML= mm + ":" + ss
					}
				}
				
    function Change(id,type,category)
    {
        
        var obj=document.getElementById(id)
        var newObj
            
        if(obj.type!="textarea" && obj.type!="text")
        {
            
            
            newObj=document.createElement(type)
            if(type=="textarea")
            {
                newObj.rows="5"
                newObj.cols="50"
            }
            else
            {
                newObj.type="text"
                newObj.style.width="95%"       
            }
            newObj.value=obj.innerHTML
            newObj.id=id
            
            newObj.onblur=function(){Change(id,type,category)}
            newObj.className="txt"
            obj.parentNode.replaceChild(newObj,obj)
        }
        else
        {
            
            newObj=document.createElement("a")
            newObj.id=id
            newObj.innerHTML=obj.value
            newObj.href="javascript:Change('"+id+"','"+type+"','"+category+"')"
            
            newObj.style.color="Black"
            obj.parentNode.replaceChild(newObj,obj)
        }
    }
				