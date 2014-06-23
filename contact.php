<?php

// Please change $email_website as your email address
$email_website = "ewiler@yahoo.com";
$email_subject = "Contact Form Submission From WilerProductions.com";


// Check if the submission data is
if(isset($_POST['submit'])){
	
	$error = '';
	$success = '';
	
	$name = trim($_POST['name']);
	$email = trim($_POST['email']);
	$message = trim($_POST['message']);
	
	if( !$name ){
		$error = 'Name is required. ';
	}else{
		if( !$email ){
			$error = 'Email is required.';
		}else{	
			if( ! valid_email($email) ){
				$error = 'Please provide a valid email address.';
			}else{
				if( !$message ){
					$error = 'Message is required. ';
				}
			}
		}
	}
		
	if( $error ){
		$result['error'] = TRUE;
		$result['message'] = '<span class="error shake">'. $error .'</span>';
	}else{	
		
		$to = $email_website;
		$message = "
			Name : $name\n
			Email : $email\n
			Message : $message";
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