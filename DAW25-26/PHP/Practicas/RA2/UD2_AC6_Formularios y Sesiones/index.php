<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pagina de login</title>

    <link rel="stylesheet" href="styles.css">
</head>
<body class="vh-body">
<h1 class="vh-title">Inicia sesion</h1>
<form action="scripts/validar.php" method="post" class="vh-form">
    <label for="usuario" class="vh-label">Usuario:</label>
    <input type="text" name="usuario" class="vh-input"> <br>
    <label for="contraseña" class="vh-label">Contraseña:</label>
    <input type="password" name="contraseña" class="vh-input"> <br>
    <input type="submit" value="Enviar" class="vh-input vh-btn">
</form>
</body>
</html>
