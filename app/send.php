<?php
// несколько получателей
$to  = 'info@bananza.cz';  // обратите внимание на запятую

//  формы
$formCallBack = $_POST['callBack']; //Call Back
$formPopup = $_POST['order']; //Special pack
$formFree = $_POST['free']; //Free


// тема письма
$subject = 'New Order';

// текст письма

if ($formPopup) {
	$message = '<html>
	<head>
			<title>' . $subject . '</title>
	</head>
	<body>
			<p>Type:<b>Special pack</b> </p>
			<p>My name is: ' . $_POST['name'] . '</p>
			<p>I\'m interested in: ' . $_POST['interested'] . '</p>
			<p>My phone number: ' . $_POST['phone'] . '</p>
	</body>
	</html>
	';
}
if ($formCallBack) {
	$message = '<html>
	<head>
			<title>' . $subject . '</title>
	</head>
	<body>
			<p>Type:<b>Call back</b> </p>
			<p>Hi there, my name is: ' . $_POST['contactName'] . '</p>
			<p>My phone number: ' . $_POST['contactPhone'] . '</p>
			<p>My email: ' . $_POST['contactEmail'] . '</p>
			<p>I want: ' . $_POST['contactWant'] . '</p>
	</body>
	</html>
	';
}
if ($formFree) {
	$message = '<html>
	<head>
			<title>' . $subject . '</title>
	</head>
	<body>
			<p>Type:<b>Free</b> </p>
			<p>My name is: ' . $_POST['name'] . '</p>
			<p>I\'m interested in ' . $_POST['interested'] . '</p>
			<p>My phone number: ' . $_POST['phone'] . '</p>
	</body>
	</html>
	';
}


// Для отправки HTML-письма должен быть установлен заголовок Content-type
$headers  = "Content-type: text/html; charset=utf-8 \r\n";
// Дополнительные заголовки
$headers .= 'To:  <info@bananza.cz>' . "\r\n"; // Свое имя и email
$headers .= 'From: '  . $_POST['name'] . $_POST['contactName'] . '<info@bananza.cz>' . "\r\n";


// Отправляем
mail($to, $subject, $message, $headers);
