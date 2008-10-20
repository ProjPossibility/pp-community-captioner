<?php

$dbhost = 'mysql.projectpossibility.org:3306';
$dbuser = 'webcaption';
$dbpass = 'webcaptionteam';
$dbname = 'webcaption';
$file_path = 'http://www.projectpossibility.org/projects/webcaption/captions/';
$mainFileUrl = 'http://www.projectpossibility.org/projects/webcaption/';
$file_path = $mainFileUrl;

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to mysql' . mysql_error());

mysql_select_db($dbname);

$mode = $_GET["mode"];
$useVersion = $_GET["version"];
$getVersion = $_GET["getVersion"];
$getRollbackList = $_GET["getRollbackList"];
$url_id = $_GET["url_id"];
$lock = $_GET["lock"];
$domain = $_GET["domain"];
$xml = $_POST["xml"];
//$caption = $_POST["caption"];
$caption = base64_decode($_POST["captionXML"]);
//$caption = $_GET["caption"];

$timestamp = $_GET["timestamp"];
$userName = $_GET["userName"];
$password = $_GET["password"];

$Editingflag="false";


function isUserEditing($videoId){
	
	try{
		$query  = "SELECT captionLock FROM Video where URL_ID = '".$videoId."'";
		$result = mysql_query($query);
		
		while($row = mysql_fetch_array($result, MYSQL_ASSOC)){
		      $Editingflag="true";
		      //echo $row['captionLock'];
			  $captionLock = $row['captionLock'];
	    }
		if($Editingflag=="true"){
			//echo "alert('edit flag equals true!!!');";
			$time = date('Y-m-d H:i:s');			
			if( ($time - $captionLock) < 18000){   
				// not get lock being a new version 
				//echo "alert('Another User Editing the same video since \".$captionLock.\"');";
				
				//setVersion($url_id,$useVersion);
				//echo "alert('URL_ID: {$row['URL_ID']}');";
				echo "var embedTag = document.getElementById(\"watch-player-div\");";
				echo "embedTag.innerHTML=\"Sorry!!Someone else is editing captions right now.\"+embedTag.innerHTML;";
			}
			else {
			    //greater than 5 hour , other guy left forgeting save
				setLock($videoId);
			}
		}
		else{
			//set lock and continue 
			$empty_tag="<?xml version=\"1.0\" encoding=\"UTF-8\" ?><tt xml:lang=\"en\" xmlns=\"http://www.w3.org/2006/04/ttaf1\" xmlns:tts=\"http://www.w3.org/2006/04/ttaf1#styling\"><head><styling><style id=\"b1\" tts:color=\"#ccc000\" /></styling></head><body><div xml:lang=\"en\" style=\"b1\"></div></body></tt>";
			setCaption($videoId,$empty_tag,"");
		}
	}
	catch(Exception $e){
		echo 'Message: ' .$e->getMessage();
	}
}


function doesCapExist($videoId){
	
	try{
		$query  = "SELECT * FROM Video where URL_ID like '%".$videoId."%'";
		$result = mysql_query($query);
	
		/*
		while($row = mysql_fetch_array($result, MYSQL_ASSOC)){
			echo "alert('URL_ID: {$row['URL_ID']}');";
			echo "alert('XML_FilePath: {$row['XML_FilePath']}');";
			echo "alert('Lock: {$row['Lock']} ');";
			echo "alert('Partial: {$row['Partial']} ');";
		}
		*/
				
		if(mysql_num_rows($result) > 0){
			return "true";
		}
		else{
			return "false";
		}
	}
	catch(Exception $e){
		echo 'Message: ' .$e->getMessage();
	}
}

function getCaption($videoId,$domain){

   	if(doesCapExist($videoId) == "false")
   	   return "";
   	
   	return "URL_CAPTION.php?url_id=" . $videoId;
   	/*
	try{
    //DEBUG
    //echo "alert('inside getcaption, vidID: " . $videoId . "');";

                //need to make sure we are storing these right and with $domain.$videoId so we can use = instead of "like"
		$query  = "SELECT XML_FilePath FROM Video where URL_ID like '%".$videoId."%'";
		$result = mysql_query($query);

		if($row = mysql_fetch_array($result, MYSQL_ASSOC)){
                        //DEBUG
			//echo "alert('XML_FilePath: {$row['XML_FilePath']}');";
		}
		else
		{
                    //didn't find any rows

                    //DEBUG
                    //echo "alert('didnt find any captions for videoID: ".$videoId."');";
                
                	//$foo = system('wget http://www.projectpossibility.org/projects/webcaption/captions/D/D8K90hX4PrE.xml ~',$output);
                    
                  return "";

                }

                chdir('captions');
                //have to be careful file isn't too big or need to use fopen
                $file = file_get_contents($row['XML_FilePath']);
               // echo "alert('file path in db');";
              	$file = base64_encode($file);
		echo "var cc_strCaptions='" . $file . "';";


		return $row['XML_FilePath'];//Prefix to it the full file path
		
	}
	catch(Exception $e){
                        return "";
	              //  echo "alert('Message: ' ".$e->getMessage().");";
	}
	*/
}

function getVersion($videoId,$versionNum){
	try{
		$query  = "SELECT XML_FilePath FROM Video where URL_ID like '%".$videoId."%' AND Version_ID like '%".$versionNum."%'";
		$result = mysql_query($query);

		if($row = mysql_fetch_array($result, MYSQL_ASSOC)){
			//echo "alert('XML_FilePath: {$row['XML_FilePath']}');";
		 }

		return $row['XML_FilePath'];
	}
	catch(Exception $e){
		//echo "alert('Message: ' ".$e->getMessage().");";
	}
}

function listVersions($videoId){
	try{
		$query  = "SELECT TIMESTAMP FROM Video V INNER JOIN CAPTION C ON C.URL_ID = V.URL_ID where V.URL_ID like '%".$videoId."%' ORDER BY TIMESTAMP";
		$result = mysql_query($query);

                echo "document.getElementById('content3').innerHTML = 'Versions ';";
		while($row = mysql_fetch_array($result, MYSQL_ASSOC)){
			echo "document.getElementById('content3').innerHTML += ' <a href=\'#\' onclick=\'cc_version = \"".$row['TIMESTAMP']."\"; loadCaption(\"".$row['TIMESTAMP']."\"); return false;\'>".$row['TIMESTAMP']."</a>';";
			//echo "document.getElementById('cc_DIV_UI_Contents').innerHTML += ' <a href=\'#\' onclick=\'alert(\"Go to data\"); return false;\'>".$row['TIMESTAMP']."</a>';";
		}
	}
	catch(Exception $e){
		//echo "alert('Message: ' ".$e->getMessage().");";
	}
}

function setVersion($videoId,$versionNum){
	try{
		$query  = "UPDATE Video set Version_ID = '".$versionNum."' where URL_ID like '%".$videoId."%'";
		$result = mysql_query($query);

		if(mysql_num_rows($result) > 0){
			return "true";
		}
		else{
			return "false";
		}
	}
	catch(Exception $e){
		//echo "alert('Message: ' ".$e->getMessage().");";
	}
}

function setLock($videoId){
	try{
	    $time = date('Y-m-d H:i:s');
		$query  = "UPDATE Video SET captionLock='$time' WHERE URL_ID like '%".$videoId."%'";
		$result = mysql_query($query);
        
		
		if($result){
		//echo ("User got lock since ".$time. "  ") ;
			return "true";
		}
		else{
			return "false";
		}
	}
	catch(Exception $e){
		//echo "alert('Message:  ".$e->getMessage()."');";
	}
}

function releaseLock($videoId){
        try{
		//$zero = "0000-00-00 00:00:00";
		$query  = "UPDATE Video SET captionLock = '0' where URL_ID like '%".$videoId."%'";
		$result = mysql_query($query);
	   
		if($result){
		    $Editingflag="false";
			return "true";
		}
		else{
		        return "false";
		}
	}
	catch(Exception $e){
		//echo "alert('Message:  ".$e->getMessage()."');";
	}
}

function mkdir_recursive($pathname, $mode)
{
	is_dir(dirname($pathname)) || mkdir_recursive(dirname($pathname), $mode);
        return is_dir($pathname) || @mkdir($pathname, $mode);
}


function setCaption($videoId, $caption, $name, $captionClick){
	
	if($userName == "Guest") {
		// Dont do anything
		// $userid = 0;	
		// Add an entry called guest inside the mysql table
		// Set the user id to that entry		
	} else {
		// Get ID
		$idquery    = "SELECT user_id FROM users WHERE username = '$name'";
		$result     = mysql_query($idquery);
		$row = mysql_fetch_array($result,MYSQL_ASSOC);
		// If we cannot find a user with that name...
		if($row['user_id'] == 0) {
			$password     = rand(); // Create this password to eliminate anyone from logging in 
			$insertquery  = "INSERT INTO users(first_name,last_name,username,password) VALUES ('youtube','user','$name',SHA('$password'))";
			$result2      = mysql_query($insertquery);
			$result3      = mysql_query($idquery);
			$row          = mysql_fetch_array($result3,MYSQL_ASSOC);
			$userid       = $row['user_id'];		
		} else {
			$userid = $row['user_id'];
		}
	}
	
	//echo "caption content: " . $caption;
			
	if(doesCapExist($videoId) == "false")
	{
      //echo "alert('before insertttttttttttt.......');";
      $query  = "INSERT INTO Video(URL_ID, XML_FilePath) VALUES ('" . $videoId . "','URL_CAPTION.php?url_id=" . $videoId . "');";
      if(!mysql_query($query))
      {
         //echo "alert('Error inserting new caption!');";
         return;
      }
      
	}else{
		if($captionClick=="true"){
      		setLock($videoId);
      	}else{
            //echo "alert('before releaseeee....');";
            releaseLock($videoId);
      	}
	}
   
    $query  = "INSERT INTO CAPTION(URL_ID, TIMESTAMP, CONTENT) VALUES ('" . $videoId . "','" . date("Y-m-d H-i-s") . "','" . $caption . "');";
	mysql_query($query);
    if(!mysql_query($query))
    {
      //echo "alert('Error inserting new version!');";
    }
}

function renderCaptionVersion($videoId, $timestamp, $callback) {
  if($timestamp == null)
  {
    $query = "SELECT MAX(TIMESTAMP) TIMESTAMP FROM CAPTION WHERE URL_ID='" . $videoId . "';";
    $result = mysql_query($query);
    if(mysql_num_rows($result) > 0)
    {
      $row = mysql_fetch_array($result, MYSQL_ASSOC);
      $timestamp = $row['TIMESTAMP'];
    }
  } else $timestamp = str_replace('"', '', $timestamp);
  $query = "SELECT CONTENT FROM CAPTION WHERE URL_ID='" . $videoId . "' AND TIMESTAMP='" . $timestamp . "';";
  $result = mysql_query($query);
  $content = null;
  if(mysql_num_rows($result) > 0)
  {
    $row = mysql_fetch_array($result, MYSQL_ASSOC);
    $content = $row['CONTENT'];
  }
  echo $callback."('".$content."')";
}

//echo "alert('php called mode: ".$_GET["mode"]."');";

switch($_GET["mode"]) {

case "userEditing":
    //echo "var cc_isUserEditing = '" . isUserEditing($url_id) . "';";
	isUserEditing($url_id);
    break;

case "captionExist" :
	echo "var cc_doesVidExist = '" . doesCapExist($url_id) . "';";
    echo "insertCaptionButtons(cc_doesVidExist);";
	//echo "alert(cc_doesVidExist);";
	break;

case "getCaption" :
	echo "var cc_capXml = '" .$file_path.getCaption($url_id,$domain) . "';";
	echo "if (cc_capXml == '$file_path') { cC_capXml = '-1'; }"; //return -1 if no captions are found
	echo "\nfunction as_to_js(){"."\n\treturn cc_capXml;"."\n}"."\nfunction CaptionURLRetrieved(){\ndocument.flash.CaptionURLRetrieved(cc_capXml);}\nCaptionURLRetrieved();";
	break;

case "getVersion" :
	//echo "var cc_getVersion = '" . getVersion($url_id,$getVersion) . "';";
	//echo "alert(cc_getVersion);";
	echo "var cc_capXml = '" . $file_path.getCaption($url_id,$domain) . "&timestamp=" . $timestamp . "';";
	echo "\nfunction as_to_js(){"."\n\treturn cc_capXml;"."\n}"."\nfunction CaptionURLRetrieved(){\ndocument.flash.CaptionURLRetrieved(cc_capXml);}\nCaptionURLRetrieved();";
	break;

case "setVersion" :
	echo "var cc_setVersion = '" . setVersion($url_id,$useVersion) . "';";
	//echo "alert(cc_setVersion);";
	break;

case "setLock" :
	echo "var cc_setLock = '" . setLock($url_id) . "';";
	//echo "alert(cc_setLock);";
	break;

case "releaseLock" :
	echo "var cc_releaseLock = '" . releaseLock($url_id) . "';";
	//echo "alert(cc_releaseLock);";
	break;

case "setCaption" :

	try
	{
	//echo $url_id;
	var_dump($_POST);
	echo "url_id: ".$url_id;
	setCaption($url_id,$caption,$userName);
	//echo "var cc_setCaption = '" . setCaption($xml,$url_id,$caption) . "';";
	//echo "alert(cc_setCaption);";
	}
	catch(Exception $e)
	{
		echo '******'.$e->getMessage().'*****';
	}
	
	break;
	
case "listVersions" :
	listVersions($url_id);
	break;

case "renderCaptionVersion" :
	renderCaptionVersion($url_id,$timestamp,"renderCaption");
	break;
}


mysql_close($conn);
?>
