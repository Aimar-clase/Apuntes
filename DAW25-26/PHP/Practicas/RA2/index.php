<?php
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pagina de login</title>
</head>
<body>
    <h1>Inicia sesion</h1>
    <form action="scripts/validar.php" method="post">
        <label for="usuario">Usuario:</label>
        <input type="text" name="usuario"> <br>
        <label for="contraseña">Contraseña:</label>
        <input type="password" name="contraseña"> <br>
        <input type="submit" value="Enviar">
    </form>
</body>
</html>
