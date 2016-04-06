<?php
// uncomment to get POST contents
// echo '<pre>'; print_r($_POST); print_r($_FILES); echo '</pre>'; 

$name = $_POST['name']; //Все поля получают данные имени input'a (name="name", name="email", name="message")
$email = $_POST['email'];
$message = $_POST['description'];

$subjectuser  = "сообщение контактной формы";
$headersuser  = "From: Сообщение\r\n";
$headersuser .= "Reply-To: ". strip_tags($email) . "\r\n";
$headersuser .= "MIME-Version: 1.0\r\n";
$headersuser .= "Content-Type: text/html;charset=utf-8 \r\n";
$my_file = "";
if (!empty($_FILES['file']['tmp_name'])) 
{
$path = $_FILES['file']['name']; 
if (copy($_FILES['file']['tmp_name'], $path)) $my_file = $path; 
 }            
$my_message = 'ФИО заказчика: '.$name.'<br />E-mail заказчика:<a href="mailto:'.$email.'">'.$email.'</a><br />Описание: '.$message;
require_once('class.phpmailer.php'); //Подключаем PHPMailer
require_once('PHPMailerAutoload.php');
require_once('class.smtp.php');

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
$mail->Username   = "stubiorn@yandex.ru"; // SMTP account username (Логин от почты SMTP)
$mail->Password   = "hjccbz89";        // SMTP account password (Пароль от почты SMTP)
$mail->SetFrom('stubiorn@yandex.ru', 'noreply');
$mail->AddReplyTo('stubiorn@yandex.ru','noreply');
$mail->Subject    = "письмо с сайта портфолио";
$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

$address = "jz828059@mail.ru";
$mail->AddAddress($address, "письмо с сайта портфолио");
$mail->CharSet="UTF-8";

$plik_tmp = $_FILES['files']['tmp_name'];
$plik_rozmiar = $_FILES['files']['size'];
$plik_nazwa = $_FILES['files']['name'];
print_r($plik_tmp);
print_r($plik_rozmiar);

foreach ($plik_tmp as $file_array_element) {
	
	if(is_uploaded_file($file_array_element)) {   
		$nazwa_g=$plik_nazwa;

		move_uploaded_file($file_array_element, 'tmp_zal/'.$nazwa_g); //Папка куда будет сохраняться файл (обязательно нужны права 777)
		$filesize = filesize('tmp_zal/'.$nazwa_g);

		if($filesize<17825792) $mail->AddAttachment('tmp_zal/'.$nazwa_g, $nazwa_g);
	}

}



require_once('phar://yandex-php-library_0.4.1.phar/vendor/autoload.php');
use Yandex\Disk\DiskClient;

//yandex disk part
if (!empty($nazwa_g)) {

$diskClient = new DiskClient('122f8d7291a94855a1517516171d5ee3');
$diskClient->setServiceScheme(DiskClient::HTTPS_SCHEME);
$fileName = 'tmp_zal/'.$nazwa_g;
$newName = $nazwa_g;

$created_day_time = date("YmdHis");  
$path = '/newfolder/'.$created_day_time.'/';
$dirContent = $diskClient->createDirectory($path);
if ($dirContent) {
echo 'Создана новая директория "' . $path . '"!';
}

$diskClient->uploadFile(
$path,
array(
'path' => $fileName,
'size' => filesize($fileName),
'name' => $newName
)
);
$url = $diskClient->startPublishing($path.$newName);
echo $url;

$my_message .= '<br />ccылка на файл на яндекс.диск:<a href="'.$url.'">'.$url.'</a>';
}
//end yandex disk part

$mail->MsgHTML($my_message);


$mail->IsHTML(true); // send as HTML

if(!$mail->Send())
{
unlink('tmp_zal/'.$plik_nazwa);
echo "Ошибка отправления";

}
else
{
unlink('tmp_zal/'.$plik_nazwa);
echo 'Спасибо за отправку сообщения';
}

// old token 122f8d7291a94855a1517516171d5ee3
?>
