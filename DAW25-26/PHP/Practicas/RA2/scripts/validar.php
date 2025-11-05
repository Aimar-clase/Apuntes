<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    function validarUsuario($usuario, $contraseña)
    {
        $usuarioAdmin = "Aimar";
        $contraseñaAdmin = "asd";

        if ($usuario === $usuarioAdmin && $contraseña === $contraseñaAdmin) {

            $_SESSION["autenticado"] = true;
            return true;

        } else {
            $_SESSION["autenticado"] = false;
            return false;
        }
    }

    if (validarUsuario($_POST["usuario"], $_POST["contraseña"])) {
        header("Location: ../calculos.php");
        exit;
    } else {
        header("Location: ../error.php");
        exit;
    }


}