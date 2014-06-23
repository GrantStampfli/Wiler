<?php

// Please change $email_website as your email address
$email_website = "ewiler@yahoo.com";
$email_subject = "Mailing List Registration From WilerProductions.com";


// Check if the submission data is
if(isset($_POST['submit'])){
	
	$error = '';
	$success = '';
	
	$email = trim($_POST['email']);
	
	if( !$email ){
		$error = 'Email is required.';
	}else{	
		if( ! valid_email($email) ){
			$error = 'Please provide a valid email address.';
		}
	}
		
	if( $error ){
		$result['error'] = TRUE;
		$result['message'] = '<span class="error shake">'. $error .'</span>';
	}else{	
		
		$to = $email_website;
		$message = "
			Email : $email";
		$headers = "From:" . $email;
		if( mail($to, $email_subject, $message, $headers) ){	
			$result['success'] = TRUE;
			$result['message'] = '<span class="info">Thank you! The submission has been sent.</span>';
		}else{
			$result['error'] = TRUE;
			$result['message'] = '<span class="error shake">We are sorry! The submission could not be sent.</span>';
		}
	}
	
	if(isset($_GET['ajax'])){
		echo json_encode($result);
		exit;
	}else{
		echo $result['message'];
	}
}
	
function valid_email( $email ) {
	if(!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)){
		return false;
	}
	return true;
}
?>