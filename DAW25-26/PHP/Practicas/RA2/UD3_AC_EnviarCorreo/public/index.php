<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contacto</title>
</head>
<body>

<form action="enviarCorreo.php" method="post">
    <h2>Contactar</h2>

    <label for="nombre">Nombre:</label>
    <input type="text" name="nombre" id="nombre" required>
    <br><br>

    <label for="tu-correo">Tu correo:</label>
    <input type="email" name="tu-correo" id="tu-correo" required>
    <br><br>

    <label for="cc">CC:</label>
    <input type="email" name="cc" id="cc">
    <br><br>

    <label for="mensaje">Mensaje:</label>
    <textarea name="mensaje" id="mensaje" required></textarea>
    <br><br>

    <input type="submit" value="Enviar">
</form>

</body>
</html>