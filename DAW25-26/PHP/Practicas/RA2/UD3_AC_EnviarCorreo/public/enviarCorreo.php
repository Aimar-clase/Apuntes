<?php

require_once '../vendor/autoload.php';
require_once '../src/tools/Mailer.php';

use Tools\Mailer;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $nombre = $_POST['nombre'];
    $tuCorreo = $_POST['tu-correo'];
    $mensaje = $_POST['mensaje'];
    $cc = !empty($_POST['cc']) ? $_POST['cc'] : null;

    $mailer = new Mailer();

    $resultado = $mailer->enviarCorreo(
        $tuCorreo,
        $nombre,
        $_ENV['SMTP_FROM_EMAIL'],
        'Nuevo mensaje' ,
        $mensaje,
        $cc
    );

    if ($resultado === true) {
        echo "Mensaje enviado correctamente";
    } else {
        echo $resultado;
    }
}