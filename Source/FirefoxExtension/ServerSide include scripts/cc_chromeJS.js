//All custom JS goes here to be inserted into youtube page


//Function to insert the <script> tag into the page (ie crosssite request) to call php function to get caption url
function cc_appendSRCforCaptions()
{
  //Don't do anything if captions don't exist
  if(!cc_doesVidExist){return;}
//DEBUG
alert('called cc_appendSRCforCaptions');
  
  var objTarget=document.documentElement.firstChild;
  var remoteScript=document.createElement('div');
  remoteScript.innerHTML = "<script id='ccGetCaptionScript' src='http://www.projectpossibility.org/projects/webcaption/URL_test_mjt.php?mode=getCaption&domain=" + window.location.href.split('?')[0] +"&url_id=" + window.location.href.split('?')[1].split('=')[1].split('&')[0] + "'/>";
  objTarget.appendChild(remoteScript);
}





//Function to insert get captions button if captions exist, or caption it! button if not.
//Gets called by output of captionExist php call, parameter is bool, true if captions exist, false otherwise
function insertCaptionButtons(cc_doesVidExist)
{

//DEBUG
alert('insertCaptionButtons, cc_doesVidExist: ' + cc_doesVidExist);

  //get the target div to insert button
  var subScribeDIV=document.getElementById("subscribeDiv");
  if(cc_doesVidExist == 'true')//we should probably check for partial here...   (it is undefined right now!)
  {
    //div for 'Get Captions' if captions exist
    var getCapDIV=document.createElement("div");
    getCapDIV.innerHTML = "<div id='container'/><br/><br/><a class='action-button' onclick='cc_getCations();' title='Get the captions for this video'><span class='action-button-leftcap'></span><span class='action-button-text' style='color:blue;'>Get Captions</span><span class='action-button-rightcap'></span></a>";
    subScribeDIV.appendChild(getCapDIV);
  }
  else
  {
    //div for Caption it!  if captions do not exist
    var captionItDIV=document.createElement("div");
    captionItDIV.innerHTML = "<a class='action-button' onclick='cc_captionIt();' title='Start writing captions for this video!'><span class='action-button-leftcap'></span><span class='action-button-text' style='color:blue;'>Caption It!</span><span class='action-button-rightcap'></span></a>";
    subScribeDIV.appendChild(captionItDIV);
  }
}




//function to find and return the playerdiv
function cc_findPlayerDiv(){

//DEBUG  
alert('in findPlayerDiv');

  var counter=0;
  while(document.getElementsByTagName("embed")[counter]!=null)
  {
    if(document.getElementsByTagName("embed")[counter].width>0 )
    {
      break;
    }
    counter++;
  }
  return document.getElementsByTagName("embed")[counter].parentNode;
}





/*Functions from UI*/

//Function for switching between UI tabs once playerdiv is re-written with ours, takes parameter of the div to show: 1=View, 2=Captions, 3=Versions
function update( num )
{
  //If num is 2 or 3 we need to move youtube stuff down
  var cc_wov = document.getElementById('watch-other-vids');
  var cc_x = ObjectCoOrdinates('watch-ratings-views');
  
  cc_wov.style.position = 'absolute';
  cc_x.x+=00;
  cc_x.y+=0;
  cc_wov.style.top=parseInt(cc_x.y-10,10)+'px';
  cc_wov.style.left = parseInt(cc_x.x+430,10)+'px';
  
  //Hide all the divs
  for( var i = 1 ; i <= 3 ; i++ )
  {
    var strID='content'+i;
    document.getElementById( strID).style.display = "none";
  }
  //Show the one we want
  document.getElementById( 'content' + num ).style.display = "inline";
  document.getElementById( 'cc_DIV_UI_Contents' ).className = "section-" + num;
}




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
/*End Functions from UI */


//Now that all the functions are done, actually call stuff:

/* Insert the code to check if captions exist */
var cc_remoteScript=document.createElement("div");
cc_remoteScript.innerHTML = "<script src='http://www.projectpossibility.org/projects/webcaption/URL_test_mjt.php?mode=captionExist&domain=" + window.location.href.split('?')[0] +"&url_id=" + window.location.href.split('?')[1].split('=')[1].split('&')[0] + "'/>";
document.documentElement.firstChild.appendChild(cc_remoteScript);