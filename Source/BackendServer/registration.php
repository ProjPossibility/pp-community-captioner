<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>SS12 Caption Registration</title>
</head>
<?php 

$dbhost = '';
$dbuser = '';
$dbpass = '';
$dbname = '';
$file_path = 'http://www.projectpossibility.org/projects/webcaption/captions/';

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to mysql' . mysql_error());

mysql_select_db($dbname);

if(isset($_POST['submitted']))
{	
	$errors = array();
	if(empty($_POST['first_name']))
		$errors[] = 'You forgot your first name';
	else
		$fn = $_REQUEST['first_name'];
	if(empty($_POST['last_name']))
		$errors[] = 'You forgot your last name';
	else
		$ln = $_REQUEST['last_name'];
	if(empty($_POST['email']))
		$errors[] = 'You forgot your email';
	else
		$em = $_REQUEST['email'];
	if(empty($_POST['password']))
		$errors[] = 'You forgot your password';
	else
		$pass = $_REQUEST['password'];
	if(empty($_POST['gender']))
		$errors[] = 'You forgot to input your gender';
	else
		$gen = $_REQUEST['gender'];
	if(empty($_POST['hometown']))
		$errors[] = 'You forgot your hometown';
	else
		$ht = $_REQUEST['hometown'];

	if(empty($errors))
	{
		// Insure that email is not being used
		$query_email  = "SELECT * FROM users WHERE email = '$em'";
		$result_email = mysql_query($query_email);
		$row          = mysql_fetch_array($result_email,MYSQL_ASSOC);

		if($row['first_name'] != '')
			print 'That email is being used';
		else
		{
			$query  = "INSERT INTO users(first_name,last_name,email,password)
			VALUES ('$fn','$ln','$em',SHA('$pass'))";
			$result = mysql_query($query);

			if($result)
				print 'You are registered';
		}
	}
	else
	{
		print 'The following errors occurred: ';
		print '<br />';
		print '<font style="color:red;">';
		foreach($errors as $msg)
		{
			print "$msg! <br /> \n";
		}
		print '</font>';
	}
}
?>

<body>
<form method="post" action="registration.php">
First Name:
<input type="text" name="first_name" maxlength="60" size="20" />
<br />
Last Name:
<input type="text" name="last_name" maxlength="60" size="20" />
<br />
Email:
<input type="email" name="email" maxlength="80" size="20"  />
<br />
Password:
<input type="password" name="password" maxlength="60" size="20" />
<br />
Gender: Male
<input name="gender" type="radio" value="M" />
Female<input name="gender" type="radio" value="F" />
<br />
<input type="image" src="images/loginbutton.jpg" name="submit"  />
<input type="hidden" name="submitted" value="true"  />
</form>
</body>
</html>