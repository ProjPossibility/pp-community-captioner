	function loadXMLString( txt )
				{
					try //Internet Explorer
  					{
  						xmlDoc=new ActiveXObject( "Microsoft.XMLDOM" ) ;
  						xmlDoc.async = "false" ;
  						xmlDoc.loadXML( txt ) ;
  						return( xmlDoc ) ; 
  					}
					catch(e)
  					{
  						try //Firefox, Mozilla, Opera, etc.
    						{
    							parser = new DOMParser() ;
    							xmlDoc = parser.parseFromString( txt , "text/xml" ) ;
    							return( xmlDoc ) ;
    						}
  						catch( e ) 
						{
							alert( e.message ) ;
						}
  					}

					return( null ) ;
				}

				function CreateCaptions()
    				{
					// A Counter to go through all captions' ids
				        var iCounter = 0 ;
        				var strID = iCounter + ":S" ;

					// Resulting XML Text
	        			var strXML="";
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

				// Different Types of Errors
				var validationType = 0 ;

                                 /*creates iframe as soon as we are loaded for caption submit*/
                                //var objIFrame=document.getElementById("ifr")
                                var objIFrame=document.createElement("iframe");
                                var objDIV=document.getElementById("baseDiv");
                                objIFrame.id="ifr";
                                //make it hidden
                                objIFrame.height = "0px";
                                objIFrame.width = "0px";
                                objDIV.appendChild(objIFrame);

                                /******/
                                //Function to submit captions to the server
                                function SubmitCaption(cc_CaptionContent)
                                {
                                  //get rid of it so we can submit again
                                  var ifr=document.getElementById("ifr");
                                  var objDIV=document.getElementById("baseDiv");
                                  objDIV.removeChild(ifr);

                                  //now recreate iframe
                                  var objIFrame=document.createElement("iframe");
                                var objDIV=document.getElementById("baseDiv");
                                objIFrame.id="ifr";
                                //make it hidden
                                objIFrame.height = "0px";
                                objIFrame.width = "0px";
                                objDIV.appendChild(objIFrame);

                                  var cc_b64Captions = btoa(cc_CaptionContent);

                                  var objForm=objIFrame.contentDocument.createElement("form");
                                  objForm.innerHTML=parent.window.location;
                                  objForm.id="frm";
                                  objForm.action="http://www.projectpossibility.org/projects/webcaption/URL_test_mjt.php?mode=setCaption&url_id="+window.location.href.split("=")[1];
                                  objForm.method="POST";
                                  objForm.innerHTML="<input type='hidden' name='captionXML' id='captionXML' value='"+ cc_b64Captions +"'/> <input type='submit' value='submit' />"
                                  objIFrame.contentDocument.body.appendChild(objForm);
                                  //alert(objIFrame.contentDocument.innerText)

                                         document.getElementById("ifr").contentDocument.getElementById("frm").submit();
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
                                                      var strcc_capText =  CreateCaptions();
                                                        SubmitCaption(strcc_capText);
                                                        //DEBUG
							alert(strcc_capText) ;
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

				function update( num )
				{
					// Hide All
				 	for( var i = 1 ; i <= 3 ; i++ )
				 	{
				 		document.getElementById( 'content' + i ).style.display = "none" ;
				 	}
				
					// Show What you selected
					document.getElementById( 'content' + num ).style.display = "inline" ;
					document.getElementById( "master" ).className = "section-" + num ;
				}

				function removeRow( id )
				{
					// Decrease Number of captions available
					numberOfCaptions -- ;

					// Visually remove it
					document.getElementById("divCaptions").removeChild( document.getElementById( id ) ) ;
				}

				function removeAllRows()
				{
					// Set Back to Default
					numberOfCaptions = 0 ;

					// Visually Clear All
					document.getElementById("divCaptions").innerHTML = "" ;
				}

				// Keep Track of all Captions
				var numberOfCaptions = 0 ;

				// Global Counter ID of Most Recent Caption
				var counter = 0 

				function AddNewRow( start , end , caption )
				{
					// increase Caption
					numberOfCaptions ++ ;	

					var objTable,objTBody,objTR,objTD,objDIV;
					
					objDIV=document.createElement("div")
					objDIV.name = "CCaption"
					objDIV.setAttribute( "style" , "padding : 10px" )
				
					objTable=document.createElement("table")
					objTable.id="tblCaption:"+counter;

					objTBody=document.createElement("tbody")
										
					objTR=document.createElement("tr")
					objTD=document.createElement("td")

					objDIV.id = counter + ":R" ;
					
					objTD.innerHTML="Start: "
					objTD.setAttribute("style" , "font-family: courier ; font-weight: bold ; font-size : 12px")
					objTR.appendChild(objTD)

					objSP=document.createElement("span")
					objSP.id=counter+":S"
					if(start != 'undefined')
					{
                                          objSP.innerHTML = start;
                                        }
                                        else
                                        {
                                           objSP.innerHTML = "0:0";
                                        }
					objSP.setAttribute( 'style' , 'font-weight: normal' )
					objTD.appendChild(objSP)
					
					objTD=document.createElement("td")
					objTD.innerHTML="<img src = 'http://www.projectpossibility.org/projects/webcaption/plus.gif' id='"+counter+":SINC' onclick='javascript:IncrementTime(\""+counter+":S\")' /><img src = 'http://www.projectpossibility.org/projects/webcaption/minus.gif' id='"+counter+":SDEC' onclick='javascript:DecrementTime(\""+counter+":S\")' />"
					objTR.appendChild(objTD)


					objTD=document.createElement("td")
					objTD.innerHTML="- End: "
					objTD.setAttribute("style" , "font-family: courier ; font-weight: bold ; font-size : 12px")
					objTR.appendChild(objTD)

					
					objSP=document.createElement("span")
					objSP.id=counter+":E"
					if(end != 'undefined')
					{
                                          objSP.innerHTML = end;
                                        }
                                        else
                                        {
                                           objSP.innerHTML = "0:0";
                                        }

					objSP.setAttribute( 'style' , 'font-weight: normal' )
					objTD.appendChild(objSP)
					
					objTD=document.createElement("td")
					objTD.innerHTML="<img src = 'http://www.projectpossibility.org/projects/webcaption/plus.gif' id='"+counter+":EINC' onclick='javascript:IncrementTime(\""+counter+":E\")' /><img src = 'http://www.projectpossibility.org/projects/webcaption/minus.gif' id='"+counter+":EDEC' onclick='javascript:DecrementTime(\""+counter+":E\")' />"
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


					objTBody.appendChild(objTR)
					
					objTR=document.createElement("tr")
					objTD=document.createElement("td")
					
					
					objTD.innerHTML="<input type='text' size = 50 id='"+counter+":CAPTION' value = '" + caption + "' />"
					objTD.setAttribute( 'colspan' , 4 ) 
					objTR.appendChild(objTD)
					
					objTBody.appendChild(objTR)
					
					objTable.appendChild(objTBody)
					
					objDIV.appendChild(objTable)
					
					
					objDIV.style.overflow="auto"
					document.getElementById("divCaptions").appendChild(objDIV)

					objDIV=document.createElement("div")
					document.getElementById("divCaptions").appendChild(objDIV)

					// Update Counter ID
					counter++ ;	
				}
				
				function IncrementTime(id)
				{
					var obj = document.getElementById(id) ;
					var value = obj.innerHTML ;
					var mm ;
					var ss ;

					if( value == "" )
					{
						mm = 0 ;
						ss = 1 ;	
						
						obj.innerHTML = mm + ":" + ss ;
					}
					else
					{
						if( id.substring( id.length - 1 ) == "S" )
						{
							objE = document.getElementById( id.substring( 0 , id.length - 1 ) + "E" ) ; 

							valueE = objE.innerHTML ;

							mmE = parseInt( valueE.split(":")[0] , 10 ) ;
							ssE = parseInt( valueE.split(":")[1] , 10 ) ;	
						}
	
						mm = parseInt( value.split(":")[0] , 10 )
						ss = parseInt( value.split(":")[1] , 10 )
							
						if( ss % 59 == 0 && ss != 0 )
						{
							ss = 0 ;
							mm ++ ;
						}
						else
						{
							ss ++ ;
						}

						obj.innerHTML = mm + ":" + ss ;
						
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
						
					var obj = document.getElementById( id ) ;
					var value = obj.innerHTML ;
					var mm ;
					var ss ;
					
					if( value == "" )
					{
						mm = 0;
						ss = 1;	
						
						obj.innerHTML = mm + ":" + ss ;
					}
					else
					{
						mm=parseInt( value.split(":")[0] , 10 )
						ss=parseInt( value.split(":")[1] , 10 )

						if( id.substring( id.length - 1 ) == "E" )
						{
							objS = document.getElementById( id.substring( 0 , id.length - 1 ) + "S" ) ; 

							valueS = objS.innerHTML ;

							mmS = parseInt( valueS.split(":")[0] , 10 ) ;
							ssS = parseInt( valueS.split(":")[1] , 10 ) ;

							if( mmS == mm && ssS == ss )
							{
								return ;
							}
						}
			
						if( ss == 0 && mm != 0 )
						{
							ss = 59 ;								
							
							mm -- ;
						}
						else 
						{
							if( mm == 0 && ss == 0 )
							{
							}
							else
							{
								ss --;		
							}
								
						}
				
						obj.innerHTML = mm + ":" + ss
					}
				}
				
				function Change( id , type , category )
    				{ 
        				var obj=document.getElementById( id ) ;

        				var newObj ;
            
        				if( obj.type != "textarea" && obj.type != "text" )
        				{
					        newObj = document.createElement( type ) ;
            
	    					if( type == "textarea" )
            					{
					                newObj.rows = "5" ;
                					newObj.cols = "50" ;
            					}
					        else
            					{
					                newObj.type = "text" ;
                					newObj.style.width = "95%" ;       
            					}
            
						newObj.value = obj.innerHTML ;
            					newObj.id = id ;
            
          					newObj.onblur = function(){ Change( id , type , category ) } ;
       						newObj.className = "txt" ;
            					obj.parentNode.replaceChild( newObj , obj ) ;
        				}
				        else
        				{
			        	    	newObj = document.createElement("a") ;
       					    	newObj.id = id ;
			        	    	newObj.innerHTML = obj.value ;
        				    	newObj.href = "javascript:Change('"+id+"','"+type+"','"+category+"')" ;
            
          					newObj.style.color = "Black" ;
            					obj.parentNode.replaceChild( newObj , obj ) ;
        				}
    				}

		//var cc_Captions = '<?xml version="1.0" encoding="UTF-8"?><tt xml:lang="en" xmlns="http://www.w3.org/2006/04/ttaf1"  xmlns:tts="http://www.w3.org/2006/04/ttaf1#styling"><head><styling><style id="b1" tts:color="#cccc00"/></styling></head><body><div xml:lang="en" style="b1"><p begin="00:13" end="00:14"><![CDATA[The heart is a bloom]]></p><p begin="00:17" end="00:20"><![CDATA[Shoots up through the stony ground]]></p><p begin="00:20" end="00:21"><![CDATA[Theres no room]]></p></div></body></tt>' ;

				function loading(cc_Captions)
				{
					// Convert String To XML
					xmlDoc = loadXMLString( cc_Captions ) ;

					var captions = xmlDoc.getElementsByTagName( "div" )[0].getElementsByTagName( "p" ) ;

					// Load Captions
					for( var i = 0 ; i < captions.length ; i ++ )
					{
						AddNewRow( captions[i].getAttribute("begin") , captions[i].getAttribute("end") , "" + captions[i].childNodes[0].nodeValue.replace( /\"/g , "" ).replace( /\'/g , "" ) + "" ) ; 
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
