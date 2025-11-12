<?php
require_once __DIR__ . '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
<form action="../src/controllers/login.php" method="POST">
    <h2>Iniciar Sesión</h2>

    <label for="usuario">Usuario:</label>
    <input type="text" id="usuario" name="usuario" required>

    <label for="clave">Contraseña:</label>
    <input type="password" id="clave" name="clave" required>

    <input type="submit" value="Iniciar Sesion">
</form>
</body>
</html>