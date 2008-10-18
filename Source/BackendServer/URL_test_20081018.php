<?php

$dbhost = 'mysql.projectpossibility.org:3306';
$dbuser = 'webcaption';
$dbpass = 'webcaptionteam';
$dbname = 'webcaption';
$file_path = 'http://www.projectpossibility.org/projects/webcaption/captions/';

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to mysql' . mysql_error());

mysql_select_db($dbname);
echo "alert('php called mode: "');";
mysql_close($conn);
?>
