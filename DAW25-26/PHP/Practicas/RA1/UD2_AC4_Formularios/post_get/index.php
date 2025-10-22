<?php

if ($_SERVER["REQUEST_METHOD"] == "POST"){  
    if ($_POST['nombre'] == "usuario" and $_POST["clave"] == "1234"){
        header("Location:bienvenida.html");
    } else {
        $err = true;
    }

}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario Básico</title>
</head>
<body>
    <h1>Formulario de Registro</h1>
    
    <?php if(isset($err)){
        echo "<p>revise usuario y contraseña</p>";
    }?>

    
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
        <label for="nombre">Nombre:</label>
        <input value="<?php if(isset($_POST['nombre'])) echo htmlspecialchars($_POST['nombre']); ?>" type="text" id="nombre" name="nombre" required>
        <br><br>
        
        <label for="clave">Clave:</label>
        <input type="password" id="clave" name="clave" required>
        <br><br>
        
        <button type="submit">Enviar</button>
    </form>
</body>
</html>