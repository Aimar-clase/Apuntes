<?php
session_start();
if (!$_SESSION["autenticado"]){
    header('Location: error.php');

}else{
    if (!isset($_SESSION["resultado"])){
        $_SESSION["resultado"] = 0;
    }
    if (!isset($_SESSION["contador"])){
        $_SESSION["contador"] = 0;
    }

}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Calculos</title>

    <link rel="stylesheet" href="styles.css">
</head>
<body class="vh-body">
<h1 class="vh-title">Calculos</h1>
<form action="scripts/resolucion.php" method="post" class="vh-form">
    <label for="operandoUno" class="vh-label">Operando 1:</label>
    <input type="number" name="operandoUno" class="vh-input"> <br>
    <label for="operacionAritmetica" class="vh-label">Operador aritmetico:</label>
    <select name="operacionAritmetica" class="vh-select">
        <option value="+">Sumar</option>
        <option value="-">Restor</option>
        <option value="*">Multiplicar</option>
        <option value="/">Dividir</option>
    </select> <br>
    <label for="operandoDos" class="vh-label">Operando 2:</label>
    <input type="number" name="operandoDos" class="vh-input"> <br>

    <input type="submit" value="Enviar" class="vh-input vh-btn"> <br>

</form>
</body>
</html>
