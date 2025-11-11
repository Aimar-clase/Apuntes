<?php
namespace Tools;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mailer
{
    public function enviarCorreo($remitente, $nombreRemitente, $destinatario, $titulo, $mensaje, $cc = null)
    {
        $mail = new PHPMailer(true);

        try {

            $mail->isSMTP();
            $mail->Host = $_ENV['SMTP_HOST'];
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['SMTP_USERNAME'];
            $mail->Password = $_ENV['SMTP_PASSWORD'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $_ENV['SMTP_PORT'];
            $mail->CharSet = 'UTF-8';


            $mail->setFrom($remitente, $nombreRemitente);
            $mail->addAddress($destinatario);


            if ($cc != null) {
                $mail->addCC($cc);
            }


            $mail->addAttachment(__DIR__ . '/../../public/Git.pdf');


            $mail->isHTML(true);
            $mail->Subject = $titulo;
            $mail->Body = $mensaje;

            $mail->send();
            return true;

        } catch (Exception $e) {
            return "Error: " . $mail->ErrorInfo;
        }
    }
}