<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru',  'PHPMailer/language/');
$mail->isHTML(true);

$mail->Host = 'ssl://smtp.mail.ru';
$mail->Port = 465;
$mail->Username = 'didarhanova.madina@mail.ru';
$mail->Password = 'secret';

$mail->setFrom('didarhanova.madina@mail.ru', 'Madina'); //от кого письма
$mail->addAddress('didarkhanova.madina@gmail.com', 'Joe User'); //кому отправить
$mail->Subject = 'Here is the subject';  //тема письма

$body = '<h1>Вам письмо!</h1>';

//тело письма
if (trim(!empty($_POST['name']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}

if (trim(!empty($_POST['email']))) {
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}

if (trim(!empty($_POST['surname']))) {
    $body.='<p><strong>Фамилия:</strong> '.$_POST['surname'].'</p>';
}

if (trim(!empty($_POST['message']))) {
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
}

$mail->Body = $body;

//отправляем
if (!$mail->send()) {
    $message = 'Ошибка!';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);

?>