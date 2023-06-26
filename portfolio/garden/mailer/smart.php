<?php 
	if (( S_POST ) || (isset($_POST["submit"]))) {
	 
		$name = $_POST['user_name'];
		$phone = $_POST['user_phone'];
		

		require_once('phpmailer/PHPMailerAutoload.php');
		$mail = new PHPMailer;
		$mail->CharSet = 'utf-8';
		//$mail->SMTPDebug = 3;                               // Enable verbose debug output
		//$mail->isSMTP();   
		$mail->SMTPKeepAlive = true; 
		$mail->SMTPAuth = true;                                    // Set mailer to use SMTP
		$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers                            // Enable SMTP authentication
		$mail->Username = 'grenvals@gmail.com';                 // Наш логин
		$mail->Password = 'veir.val17';                           // Наш пароль от ящика
		$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 465;                                    // TCP port to connect to
		 
		$mail->setFrom('grenvals@gmail.com', 'Continent');   // От кого письмо 
		$mail->addAddress('harmincer@gmail.com');     // Add a recipient
		//$mail->addAddress('grenvals@gmail.com');               // Name is optional
		//$mail->addReplyTo('info@example.com', 'Information');
		//$mail->addCC('cc@example.com');
		//$mail->addBCC('bcc@example.com');
		//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
		//$mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);    // Optional name
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject = 'Continent. Клієнт залишив заявку';
		$mail->Body    = '
			Клієнт залишив свої дані: <br> 
			Имя: ' . $name . ' <br>
			Телефон: ' . $phone . '';
		$mail->AltBody = 'Альтернативний текст';
		if($mail->send()) {
			$answer = '1';
		} else {
		 $answer = '0';
		}
		die( $answer);

	}  
 
 


 


















?>