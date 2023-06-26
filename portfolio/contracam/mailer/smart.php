<?php 

	function clean($value = "") {
		$value = trim($value);
		$value = stripslashes($value);
		$value = strip_tags($value);
		$value = htmlspecialchars($value);
		
		return $value;
	}
	function check_length($value = "", $min, $max) {
		$result = (mb_strlen($value) < $min || mb_strlen($value) > $max);
		return !$result;
	}

	if($_SERVER['REQUEST_METHOD'] == 'POST') {	
	$name = clean($_POST['user_name']);
	$email = clean($_POST['user_email']);
	$message = clean($_POST['user_message']);

	if(!empty($name) && !empty($email) && !empty($message)) {
			$email_validate = filter_var($email, FILTER_VALIDATE_EMAIL); 
			if(check_length($name, 4, 25) && check_length($message, 20, 1000) && $email_validate) {
				$name = $_POST['user_name'];
				$email = $_POST['user_email'];
				$message = $_POST['user_message'];
				require_once('phpmailer/PHPMailerAutoload.php');
				$mail = new PHPMailer;
				$mail->CharSet = 'utf-8';
				// --------------------------SMTP------------------------------------------
				// $mail->SMTPDebug = 0;                    // Enable verbose debug output
				// $mail->isSMTP();    
				// $mail->SMTPAuth = true;               // Set mailer to use SMTP
				// $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers         
				// $mail->Username = 'sitecontracam@gmail.com';   // Login
				// $mail->Password = '*******';             // Password
				// $mail->SMTPSecure = 'ssl';               // Enable TLS encryption, `ssl` also accepted
				// $mail->Port = 465;                      // TCP port to connect to
				// --------------------------Mail-----------------------------------------
				$mail->setFrom('sitecontracam@gmail.com', 'SITE/ContraCam');   
				$mail->addAddress('harmincer@gmail.com');     // Add a recipient
				$mail->addReplyTo($email);
				$mail->isHTML(true);                                  // Set email format to HTML
				$mail->Subject = 'SITE/CONTRACAM. Сообщение от пользователя';
				$mail->Body    = '<b> Имя: </b> ' . $name . ' <br>  <b> Email: </b> ' . $email . '<br> <b> Сообщение: </b>' . $message . '' ;
				$mail->AltBody = ' Имя: ' . $name . 'Email: ' . $email . ' Сообщение:' . $message . '';
				if($mail->send()) {
					// $answer = '1';
					echo json_encode(array('result' => 'pass'));
				} else {
					echo json_encode(array('result' => 'SERVER: send fail'));
				}
			} else {
				echo json_encode(array('result' => 'SERVER:Validate fail: lenght'));
			}  
	} else {
			echo json_encode(array('result' => 'SERVES:Validate fail: email'));
		}   
	} else {
			echo json_encode(array('result' => 'SERVER:Validate fail: POST'));
		}   


 
 


 


















?>