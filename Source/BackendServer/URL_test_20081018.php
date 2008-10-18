<?php

$dbhost = 'mysql.projectpossibility.org:3306';
$dbuser = 'webcaption';
$dbpass = 'webcaptionteam';
$dbname = 'webcaption';
$file_path = 'http://www.projectpossibility.org/projects/webcaption/captions/';

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to mysql' . mysql_error());

mysql_select_db($dbname);

$query = "INSERT INTO VIDEO_20081018(URL_ID) VALUES ('TEST00');";
if(!mysql_query($query))
   echo "alert('Error inserting new version!');";
else
   echo "alert('OK!');";

mysql_close($conn);
?>
