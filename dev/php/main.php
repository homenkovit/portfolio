<?php
// uncomment to view POST contents
// echo '<pre>'; print_r($_POST); print_r($_FILES); echo '</pre>'; 

$name    = $_POST['name']; // all fields get input's name
$email   = $_POST['email'];
$message = $_POST['description'];

$subjectuser  = "сообщение контактной формы";
$headersuser  = "From: Сообщение\r\n";
$headersuser .= "Reply-To: ". strip_tags($email) . "\r\n";
$headersuser .= "MIME-Version: 1.0\r\n";
$headersuser .= "Content-Type: text/html;charset=utf-8 \r\n";

$my_message = 'ФИО заказчика: '.$name.'<br />E-mail заказчика: <a href="mailto:'.$email.'">'.$email.'</a><br />Описание: '.$message;

require_once('class.phpmailer.php');
require_once('PHPMailerAutoload.php');
require_once('class.smtp.php');
require_once('phar://yandex-php-library_0.4.1.phar/vendor/autoload.php');
use Yandex\Disk\DiskClient;

$mail = new PHPMailer(true); //New instance, with exceptions enabled
$mail->CharSet = "UTF-8";
$mail->IsSMTP(); // telling the class to use SMTP
$mail->Host       = "smtp.yandex.ru"; // SMTP server
$mail->SMTPDebug  = 1;                     // enables SMTP debug information (for testing)
                                           // 1 = errors and messages
                                           // 2 = messages only
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->Port       = 465;                    // set the SMTP port for the GMAIL server
$mail->SMTPSecure = 'ssl';                 //Secure SMTP
$mail->Username   = "fl-portfolio@yandex.ru"; // SMTP account username (Логин от почты SMTP)
$mail->Password   = "hjccbz89";        // SMTP account password (Пароль от почты SMTP)
$mail->SetFrom('fl-portfolio@yandex.ru', 'noreply');
$mail->AddReplyTo('fl-portfolio@yandex.ru','noreply');
$mail->Subject    = "письмо с сайта портфолио";
$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

$mail->AddAddress( "jz828059@mail.ru", "письмо с сайта портфолио");
$mail->AddAddress( "homenkovit@gmail.com", "письмо с сайта портфолио");

$mail->CharSet="UTF-8";

$names_array     = $_FILES['files']['name'];
$tmp_names_array = $_FILES['files']['tmp_name'];
$names_count     = count($names_array);
$uploaded_files_array = array();

if ( !empty($names_array) ) {

	$diskClient = new DiskClient('5e4a52be669d45e79f3edab8372caf97');
	$diskClient->setServiceScheme(DiskClient::HTTPS_SCHEME);

	$created_day_time      = date("YmdHis");
	$created_day_time      = (string) $created_day_time;
	$path                  = '/newfolder/'.$created_day_time.'/';
	$dirContent            = $diskClient->createDirectory($path);
	$dirUrl                = $diskClient->startPublishing($path);
	echo $dirUrl;

	for ( $i = 0; $i < $names_count; $i++ ) {

		$current_file_name     = $names_array[$i];
		$current_tmp_file_name = $tmp_names_array[$i];
		$upload_path           = 'temp_upload_files/'.$current_file_name;
		$my_message .= '<br /><a href="'.$dirUrl.'">ссылка на папку с файлами</a><br />';

		if ( copy($current_tmp_file_name, $upload_path) ) {

			array_push( $uploaded_files_array, $upload_path);

			$diskClient->uploadFile(
			$path,
			array(
			'path' => $upload_path,
			'size' => filesize($upload_path),
			'name' => $current_file_name
			)
			);
			$url = $diskClient->startPublishing($path.$current_file_name);
			echo $url;

			$my_message .= '<br /><a href="'.$url.'">'.$current_file_name.'</a><br />';

			if ( filesize($upload_path) < 1600000 ) {
			$mail->AddAttachment($upload_path);
			}
		}	
	}
}            

$mail->MsgHTML($my_message);

$mail->IsHTML(true); // send as HTML

if(!$mail->Send()) {

	foreach ($uploaded_files_array as $uploaded_file) {
	
		unlink($uploaded_file);
	}
	echo "Ошибка отправления";
}

else {
	
	foreach ($uploaded_files_array as $uploaded_file) {
		
		unlink($uploaded_file);
	}
	echo 'Спасибо за отправку сообщения';
}

?>
