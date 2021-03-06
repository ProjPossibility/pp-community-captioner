<?php

$dbhost = '';
$dbuser = '';
$dbpass = '';
$dbname = '';
$file_path = 'http://www.projectpossibility.org/projects/webcaption/';

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
$caption = $_POST["caption"];
//$caption = base64_decode($_GET["caption"]);


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

	try{
                //need to make sure we are storing these right and with $domain.$videoId so we can use = instead of "like"
		$query  = "SELECT XML_FilePath FROM Video where URL_ID like '%".$videoId."%'";
		$result = mysql_query($query);

		if($row = mysql_fetch_array($result, MYSQL_ASSOC)){
                        //DEBUG
			echo "alert('XML_FilePath: {$row['XML_FilePath']}');";
		}
		else
		{
                    //didn't find any rows

                    //DEBUG
                    echo "alert('didnt find any captions for videoID: ".$videoId."');";
                    
                    return "";

                }

                //we need to echo our caption xml file contents as a JS var
                //using a fake one for testing for now
                echo "var cc_strCaptions = '<?xml version=\"1.0\" encoding=\"UTF-8\"?><tt xml:lang=\"en\" xmlns=\"http://www.w3.org/2006/04/ttaf1\"  xmlns:tts=\"http:\/\/www.w3.org/2006/04/ttaf1#styling\"><head><styling><style id=\"1\" tts:textAlign=\"right\"/><style id=\"2\" tts:color=\"transparent\"/>      <style id=\"3\" style=\"2\" tts:backgroundColor=\"white\"/><style id=\"4\" style=\"2 3\" tts:fontSize=\"20\"/></styling></head><body><div xml:lang=\"en\"><p begin=\"00:00:00.00\" dur=\"00:00:03.07\">Test Caption1</p></div></body></tt>';";


		return $row['XML_FilePath'];//Prefix to it the full file path
	}
	catch(Exception $e){
	                echo "alert('Message: ' ".$e->getMessage().");";
	}
}

function getVersion($videoId,$versionNum){
	try{
		$query  = "SELECT XML_FilePath FROM Video where URL_ID like '%".$videoId."%' AND Version_ID like '%".$versionNum."%'";
		$result = mysql_query($query);

		if($row = mysql_fetch_array($result, MYSQL_ASSOC)){
			echo "alert('XML_FilePath: {$row['XML_FilePath']}');";
		 }

		return $row['XML_FilePath'];
	}
	catch(Exception $e){
		echo "alert('Message: ' ".$e->getMessage().");";
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
		echo "alert('Message: ' ".$e->getMessage().");";
	}
}

function setLock($videoId){
	try{
		$query  = "UPDATE Video set Lock = 1 where URL_ID like '%".$videoId."%'";
		$result = mysql_query($query);

		if(mysql_num_rows($result) > 0){
			return "true";
		}
		else{
				return "false";
		}
	}
	catch(Exception $e){
		echo "alert('Message: ' ".$e->getMessage().");";
	}
}

function releaseLock($videoId){
        try{
		$query  = "UPDATE Video set Lock = 0 where URL_ID like '%".$videoId."%'";
		$result = mysql_query($query);
	
		if(mysql_num_rows($result) > 0){
			return "true";
		}
		else{
		        return "false";
		}
	}
	catch(Exception $e){
		echo "alert('Message: ' ".$e->getMessage().");";
	}
}

function mkdir_recursive($pathname, $mode)
{
	is_dir(dirname($pathname)) || mkdir_recursive(dirname($pathname), $mode);
        return is_dir($pathname) || @mkdir($pathname, $mode);
}


function setCaption($xmlId,$videoId,$captionXml){
	try
	{
		$file_path = '.'.DIRECTORY_SEPARATOR."captions".DIRECTORY_SEPARATOR.substr($videoId,0,1).DIRECTORY_SEPARATOR;
		
		$mode = 0777;
	echo "&&&&&&&&&&&".getcwd(); 
		
    
	  chdir('captions');
	  if(@mkdir(substr($videoId,0,1),$mode) || is_dir(substr($videoId,0,1)))
	  {

	  	chdir(substr($videoId,0,1));
	  	
	  	if(@mkdir($videoId, $mode) || is_dir($videoId))
			{
				chdir($videoId);
				echo '.......... '.getcwd();
				echo 'success in creaging';
				$file_path = "captions/".substr($videoId,0,1)."/".$videoId.".xml";
				$file=fopen($videoId.'.xml',"w");
				echo "alert(".$captionXml.");";
				fwrite($file,$captionXml);
				//if($file){
				//	return "true";
				//	fclose($file);
				//}
				//else
				//	return "false";
				fclose($file);
			}
			else
			{
				echo 'lalala    ';
			}
	  }
	  
		
		//if(mkdir_recursive($filepath, $mode))
		
	}
	catch(Exception $e)
	{
		echo  "........".$e->getMessage()."...";
	}

	
}

echo "alert('php called mode: ".$_GET["mode"]."');";

switch($_GET["mode"]) {

case "captionExist" : 		
	echo "var cc_doesVidExist = '" . doesCapExist($url_id) . "';";
        echo "insertCaptionButtons(cc_doesVidExist);";
	//echo "alert(cc_doesVidExist);";
	break;	

case "getCaption" :
	echo "var cc_capXml = '" .$file_path.getCaption($url_id,$domain) . "';alert(cc_capXml);";
	echo "\nfunction as_to_js(){"."\n\treturn cc_capXml;"."\n}"."\nfunction CaptionURLRetrieved(){\n\ndocument.flash.CaptionURLRetrieved(cc_capXml);}\nCaptionURLRetrieved();";
	break;

case "getVersion" :
	echo "var cc_getVersion = '" . getVersion($url_id,$getVersion) . "';";
	echo "alert(cc_getVersion);";
	break;

case "setVersion" :
	echo "var cc_setVersion = '" . setVersion($url_id,$useVersion) . "';";
	echo "alert(cc_setVersion);";
	break;

case "setLock" :
	echo "var cc_setLock = '" . setLock($url_id) . "';";
	echo "alert(cc_setLock);";
	break;

case "releaseLock" :
	echo "var cc_releaseLock = '" . releaseLock($url_id) . "';";
	echo "alert(cc_releaseLock);";
	break;

case "setCaption" :

	try
	{
				//echo $url_id;
				var_dump($_POST);
		setCaption("test",$url_id,$caption);
		//echo "var cc_setCaption = '" . setCaption($xml,$url_id,$caption) . "';";
		echo "alert(cc_setCaption);";
	}
	catch(Exception $e)
	{
		echo '******'.$e->getMessage().'*****';
	}
	
	break;
}

mysql_close($conn);
?>
