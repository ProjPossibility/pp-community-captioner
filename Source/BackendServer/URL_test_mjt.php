<?php

$dbhost = 'mysql.projectpossibility.org:3306';
$dbuser = 'webcaption';
$dbpass = 'webcaptionteam';
$dbname = 'webcaption';
$file_path = 'http://www.projectpossibility.org/projects/webcaption/captions/';

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
          
    //DEBUG
    //echo "alert('inside getcaption, vidID: " . $videoId . "');";

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
                
                	//$foo = system('wget http://www.projectpossibility.org/projects/webcaption/captions/D/D8K90hX4PrE.xml ~',$output);
                    
                  return "";

                }

                chdir('captions');
                //have to be careful file isn't too big or need to use fopen
                $file = file_get_contents($row['XML_FilePath']);
                echo "alert('file path in db');";
              	$file = base64_encode($file);
		echo "var cc_strCaptions='" . $file . "';";


		return $row['XML_FilePath'];//Prefix to it the full file path
	}
	catch(Exception $e){
                        return "";
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


function setCaption($videoId, $caption){
	
	//echo "caption content: " . $caption;
	
	try
	{
		//$file_path = '.'.DIRECTORY_SEPARATOR."captions".DIRECTORY_SEPARATOR.substr($videoId,0,1).DIRECTORY_SEPARATOR;
		
		$mode = 0777;
		
		//check to see if the folder exists for the video
		
		chdir('captions');
		//echo 'caption='.$caption;

	  if(@mkdir(substr($videoId,0,1),$mode) || is_dir(substr($videoId,0,1)))
	  {

	  	chdir(substr($videoId,0,1));

	  	if(@mkdir($videoId, $mode) || is_dir($videoId))
		{       
                        //DEBUG
			echo"inside if";
				chdir($videoId);
				//echo '.......... '.getcwd();
				//echo 'success in creating';
				$file_path = $videoId.".xml";

				if (file_exists($file_path))  //race condition here
				{
			//DEBUG
                        echo "alert('file exists');";
                                  //rename the current file to a timestamp version
                                  date_default_timezone_set('UTC');
                                  $strNewFileName = date("dmYHis").".xml";
                                  
                        //DEBUG
                        echo "alert('new name is: "+$strNewFileName+"');";
                                  if(!rename($file_path,$strNewFileName))
                                  {
                                   //rename failed! try with miliseconds
                                   $strNewFileName = date("dmYHisu").".xml";
                                   if(!rename($file_path,$strNewFileName))
                                   {
                                    //if we still cant then error
                                    echo "alert('error renaming old version!');";
                                   }
                                  }
                                  //add a version entry for the renamed file
                                  try
                                  {
                              		$query  = "INSERT into Version (URL_ID, Version_ID) VALUES ('".$videoId."','".$strNewFileName."');";

                        //DEBUG
                        echo "alert('running query to insert new filename: "+$query+"');";

                              		if(!mysql_query($query))
                              		{
                                         echo "alert('Error inserting old version!');";
                                        }
                                  }
                              	  catch(Exception $e)
                                  {
                              		echo "alert('Message: ' ".$e->getMessage().");";
                              	  }
				}
                $file=fopen($videoId.".xml","w");
				echo "alert(".$caption.");";
				fwrite($file,$caption);
				fclose($file);
				
                       				
            if(doesCapExist($videoId) == "false")
            {
              $query  = "INSERT into Video VALUES ('".$videoId."','".substr($videoId,0,1)."/".$videoId."/".$videoId.".xml','0','0');";
                if(!mysql_query($query))
                {
                 echo "alert('Error inserting new version!');";
                 echo "alert($query);";
                 }

            }

		}
		else
		{
			echo "alert('Cannot make dir!');";
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
	echo "var cc_capXml = '" .$file_path.getCaption($url_id,$domain) . "';";
	echo "if (cc_capXml == '$file_path') { cC_capXml = '-1'; }"; //return -1 if no captions are found
	echo "\nfunction as_to_js(){"."\n\treturn cc_capXml;"."\n}"."\nfunction CaptionURLRetrieved(){\ndocument.flash.CaptionURLRetrieved(cc_capXml);}\nCaptionURLRetrieved();";
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
	echo "url_id: ".$url_id;
	setCaption($url_id,$caption);
	//echo "var cc_setCaption = '" . setCaption($xml,$url_id,$caption) . "';";
	//echo "alert(cc_setCaption);";
	}
	catch(Exception $e)
	{
		echo '******'.$e->getMessage().'*****';
	}
	
	break;
}

mysql_close($conn);
?>
