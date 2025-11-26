<?php

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Log in</title>
</head>
<body>
<main>
    <form action="procesar.php" method="post">
        <h1>Iniciar sesion</h1>
        <label>
            Usuario
            <input type="text" name="usuario">
        </label>
        <br>
        <label>
            Contraseña
            <input type="password" name="password">
        </label>
        <input type="submit" value="Enviar">
    </form>
</main>
</body>
</html>
