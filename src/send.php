<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['clientName']) && isset($_POST['clientPhoneNumber']) && isset($_POST['regionId'])) {
    // Получаем данные из POST-запроса
    $clientName = $_POST['clientName'];
    $clientPhoneNumber = $_POST['clientPhoneNumber'];
    $regionId = $_POST['regionId']; // Получаем название города

    // Параметры для отправки письма
    $to = "test@biggames.kz"; // Замените на вашу почту
    $subject = "=?UTF-8?B?" . base64_encode("Новая заявка с формы") . "?="; // Тема письма в кодировке UTF-8
    $message = "Имя: " . $clientName . "\n";
    $message .= "Телефон: " . $clientPhoneNumber . "\n";
    $message .= "Город: " . $regionId . "\n"; // Добавляем название города

    $headers = "From: no-reply@biggames.kz" . "\r\n" .
        "Content-type: text/plain; charset=UTF-8\r\n"; // Адрес отправителя и кодировка

    // Отправляем письмо
    if (mail($to, $subject, $message, $headers)) {
        // Если письмо успешно отправлено, отправляем успешный HTTP-ответ
        http_response_code(200);
        echo "Message sent successfully!";
    } else {
        // Если возникла ошибка при отправке письма, отправляем ошибку
        http_response_code(500);
        echo "Error sending message.";
    }
} else {
    // Если запрос не является POST-запросом или отсутствуют обязательные поля, отправляем ошибкуp
    http_response_code(400);
    echo "Invalid request.";
}
