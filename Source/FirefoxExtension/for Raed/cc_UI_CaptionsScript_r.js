// Different Types of Errors
var validationType = 0;

// Keep Track of all Captions
var numberOfCaptions = 0;

// Global Counter ID of Most Recent Caption
var counter = 0;
myList = new Array();


function CreateCaptions()
{
        // A Counter to go through all captions' ids
        var iCounter = 0 ;
        var strID = iCounter + ":S" ;

        // Resulting XML Text
        var strXML='<?xml version="1.0" encoding="UTF-8"?>';
        var strComponentIDs = "" ;
        var innerCounter = 0 ;

        // Array for saving different types of IDs
        var arrIDs = new Array();

        arrIDs[arrIDs.length] = new Option("S","begin");
        arrIDs[arrIDs.length] = new Option("E","end");
        arrIDs[arrIDs.length] = new Option("CAPTION","CAPTION");

        // Append XML Definition
        strXML+='<?xml version="1.0" encoding="UTF-8"?><tt xml:lang="en" xmlns="http://www.w3.org/2006/04/ttaf1" xmlns:tts="http://www.w3.org/2006/04/ttaf1#styling"><head><styling><style id="b1" tts:color="#cccc00"/></styling></head><body>'
        strXML+='<div xml:lang="en" style="b1">'

        // As long as our counter is Less than the Captions' Global Counter
        while( iCounter < counter )
        {
                // Does this Caption ID Exit ?? Could have been deleted
                if( document.getElementById(strID) != null )
                {
                        // Counter for our Array of IDs
                        innerCounter = 0 ;

                        strXML+='<p ';

                        while( innerCounter < arrIDs.length )
                {
                                // Get ID
                                strComponentIDs = iCounter + ":" + arrIDs[innerCounter].text;

                                if(document.getElementById(strComponentIDs).tagName!="INPUT")
                                {
                                        // Store Begin and End
                                        strXML += arrIDs[innerCounter].value+'="'+document.getElementById(strComponentIDs).innerHTML+'" ';
                                }
                                else
                        {
                                        // Store Caption
                                strXML += '>'+ "<![CDATA[" + document.getElementById(strComponentIDs).value + "]]>" ;
                                }

                                innerCounter++;
                }

                        strXML+='</p>';
                }

        iCounter ++ ;

                strID = iCounter + ":" + arrIDs[0].text;
        }

        // Close XML
        strXML+="</div></body></tt>";

        return strXML;
}

  				
  				function saveCaptions()
				{
					document.getElementById( 'captionsButton' ).disabled = true ;
					document.getElementById( 'captionsButton' ).value = "Saving ..." ;

					// Only bother if there are captions
					if( numberOfCaptions != 0 )
					{
						// validate
						if( areCaptionsValid() )
						{
							alert( CreateCaptions() ) ;
						}
						else
						{
							// Show Error
							if( validationType == 1 )
							{
								alert( "Invalid Caption Timing! \nStart & Begin Timings are equal!" ) ;
							}
							else if( validationType == 0 )
							{
								alert( "Invalid Caption Timing! \nStart Timing is Less than Previous End Timing!" ) ;
							}
							else
							{
								alert( "No Captions Found for this Entry!" ) ;
							}
						}
					}

					document.getElementById( 'captionsButton' ).disabled = false ;
					document.getElementById( 'captionsButton' ).value = "Save Captions" ;
				}				

				function areCaptionsValid()
				{
					// Set Default
					var isValid = true ;

					var iCounter = 0 ;
        				var strID = iCounter + ":S" ;
	        			var strComponentIDs = "" ;
		        		var innerCounter = 0 ;
        
				        var arrIDs = new Array() ;

					var oldMin = 0 ;
					var oldSec = 0 ;

					var currentMin = 0 ;
					var currentSec = 0 ;

					// Array Of IDs
					arrIDs[arrIDs.length] = new Option( "S" , "begin" ) ;
					arrIDs[arrIDs.length] = new Option( "E" , "end" ) ;
					arrIDs[arrIDs.length] = new Option( "CAPTION" , "CAPTION" );
        
				        while( iCounter <= counter )
	        			{
						// Does the ID Exist ?
						if( document.getElementById( strID ) != null )
						{
       					 		strComponentIDs = iCounter + ":S" ;

                    					currentMin = document.getElementById( strComponentIDs ).innerHTML.split(":")[0] ;
                    					currentSec = document.getElementById( strComponentIDs ).innerHTML.split(":")[1] ;

							// Compare if the Previous End is Less Than the Current Start
							if( oldMin == currentMin )
							{
								if( oldSec <= currentSec )
								{
									document.getElementById( "tblCaption:" + iCounter ).bgColor = "white" ;
								}
								else
								{
									document.getElementById( "tblCaption:" + iCounter ).bgColor = "#FFCC99" ;

									isValid = false ;

									validationType = 0 ;

									break ;
								}
							}
							else if( oldMin > currentMin )
							{
								document.getElementById( "tblCaption:" + iCounter ).bgColor = "#FFCC99" ;

								isValid = false ;

								validationType = 0 ;

								break ;
							}

       					 		strComponentIDs = iCounter + ":E" ;
               
                    					oldMin = document.getElementById( strComponentIDs ).innerHTML.split(":")[0] ;
                    					oldSec = document.getElementById( strComponentIDs ).innerHTML.split(":")[1] ;

							// Check if Start and End of Current Caption are the same
							if( oldMin == currentMin && oldSec == currentSec )
							{
								document.getElementById( "tblCaption:" + iCounter ).bgColor = "#FFCC99" ;

								isValid = false ;

								validationType = 1 ;

								break ;
							}

       					 		strComponentIDs = iCounter + ":CAPTION" ;

							// Check if there is no Caption
							if( document.getElementById( strComponentIDs ).value == "" )
							{
								document.getElementById( "tblCaption:" + iCounter ).bgColor = "#FFCC99" ;

								isValid = false ;

								validationType = 2 ;

								break ;
							}
						}
            
         			   		iCounter++;
         
						strID = iCounter + ":S" ;
			        	}

					return isValid ;
				}


                                    function areCaptionsValid()
				{
					// Set Default
					var isValid = true ;

					var iCounter = 0 ;
        				var strID = iCounter + ":S" ;
	        			var strComponentIDs = "" ;
		        		var innerCounter = 0 ;
        
				        var arrIDs = new Array() ;

					var oldMin = 0 ;
					var oldSec = 0 ;

					var currentMin = 0 ;
					var currentSec = 0 ;

					// Array Of IDs
					arrIDs[arrIDs.length] = new Option( "S" , "begin" ) ;
					arrIDs[arrIDs.length] = new Option( "E" , "end" ) ;
					arrIDs[arrIDs.length] = new Option( "CAPTION" , "CAPTION" );
        
				        while( iCounter <= counter )
	        			{
						// Does the ID Exist ?
						if( document.getElementById( strID ) != null )
						{
       					 		strComponentIDs = iCounter + ":S" ;
               
                    					currentMin = document.getElementById( strComponentIDs ).innerHTML.split(":")[0] ;
                    					currentSec = document.getElementById( strComponentIDs ).innerHTML.split(":")[1] ;

							// Compare if the Previous End is Less Than the Current Start
							if( oldMin == currentMin )
							{
								if( oldSec <= currentSec )
								{
									document.getElementById( "tblCaption:" + iCounter ).bgColor = "white" ;
								}
								else
								{
									document.getElementById( "tblCaption:" + iCounter ).bgColor = "#FFCC99" ;

									isValid = false ;

									validationType = 0 ;

									break ;
								}
							}
							else if( oldMin > currentMin )
							{
								document.getElementById( "tblCaption:" + iCounter ).bgColor = "#FFCC99" ;

								isValid = false ;

								validationType = 0 ;

								break ;
							}

       					 		strComponentIDs = iCounter + ":E" ;
               
                    					oldMin = document.getElementById( strComponentIDs ).innerHTML.split(":")[0] ;
                    					oldSec = document.getElementById( strComponentIDs ).innerHTML.split(":")[1] ;

							// Check if Start and End of Current Caption are the same
							if( oldMin == currentMin && oldSec == currentSec )
							{
								document.getElementById( "tblCaption:" + iCounter ).bgColor = "#FFCC99" ;

								isValid = false ;

								validationType = 1 ;

								break ;
							}

       					 		strComponentIDs = iCounter + ":CAPTION" ;
               
							// Check if there is no Caption
							if( document.getElementById( strComponentIDs ).value == "" )
							{
								document.getElementById( "tblCaption:" + iCounter ).bgColor = "#FFCC99" ;

								isValid = false ;

								validationType = 2 ;

								break ;
							}
						}
            
         			   		iCounter++;
         
						strID = iCounter + ":S" ;
			        	}

					return isValid ;
				}

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
				
				function removeAllRows()
				{
					// Set Back to Default
					numberOfCaptions = 0 ;

					// Visually Clear All
					document.getElementById("divCaptions").innerHTML = "" ;
				}



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
				
				
				
function ObjectCoOrdinates(strObjectName)
{
        var el = document.getElementById(strObjectName);

        var totalOffsetTop = 0;
        var totalOffsetLeft=0;
        var pos=new Position();
        if (el==null)
        {
         pos.x=-1;
         pos.y=-1;
         return pos;
        }  
        while (el != null) 
        {
            totalOffsetTop += el.offsetTop;
            totalOffsetLeft+= el.offsetLeft;
            el = el.offsetParent;
        }
        pos.y=totalOffsetTop;
        pos.x=totalOffsetLeft;
        return pos;
}

function Position()
{
    this.x="";
    this.y="";
}

