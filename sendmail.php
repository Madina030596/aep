<?php
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'PHPMailer/src/Exception.php';
// require 'PHPMailer/src/PHPMailer.php';

// $mail = new PHPMailer(true);
// $mail->CharSet = 'UTF-8';
// $mail->setLanguage('ru',  'PHPMailer/language/');
// $mail->isHTML(true);

// $mail->Host = 'ssl://smtp.yandex.ru';
// $mail->Port = 465;
// $mail->Username = 'madinadidarhanova@yandex.ru';
// $mail->Password = 'secret';

// $mail->setFrom('didarhanova.madina@mail.ru', 'Madina'); //от кого письма
// $mail->addAddress('didarkhanova.madina@gmail.com', 'Joe User'); //кому отправить
// $mail->Subject = 'Here is the subject';  //тема письма

// $body = '<h1>Вам письмо!</h1>';

// //тело письма
// if (trim(!empty($_POST['name']))) {
//     $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
// }

// if (trim(!empty($_POST['email']))) {
//     $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
// }

// if (trim(!empty($_POST['surname']))) {
//     $body.='<p><strong>Фамилия:</strong> '.$_POST['surname'].'</p>';
// }

// if (trim(!empty($_POST['message']))) {
//     $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
// }

// $mail->Body = $body;

// //отправляем
// if (!$mail->send()) {
//     $message = 'Ошибка!';
// } else {
//     $message = 'Данные отправлены';
// }

// $response = ['message' => $message];
// header('Content-type: application/json');
// echo json_encode($response);


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 
require_once '/PHPMailer/src/Exception.php';
require_once '/PHPMailer/src/PHPMailer.php';
require_once '/PHPMailer/src/SMTP.php';
 
// Для более ранних версий PHPMailer
//require_once '/PHPMailer/PHPMailerAutoload.php';
 
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
 
// Настройки SMTP
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
 
$mail->Host = 'ssl://smtp.gmail.com';
$mail->Port = 465;
$mail->Username = 'Логин';
$mail->Password = 'Пароль';
 
// От кого
$mail->setFrom('didarkhanova.madina@gmail.com', 'Madina');		
 
// Кому
$mail->addAddress('didarkhanova.madina@gmail.com', 'Madina');
 
// Тема письма
$mail->Subject = $subject;
 
// Тело письма
$body = '<p><strong>«Hello, world!» </strong></p>';
$mail->msgHTML($body);
 
// Приложение
$mail->addAttachment(__DIR__ . '/image.jpg');
 
$mail->send();
?>


