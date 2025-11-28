<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST["usuario"];
    $password = $_POST["password"];

    $db = new databaseManager('localhost', 'U3_LOGIN', 8080, 'root', 'Aimar1212');
    echo $usuario;



}