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
</head>
<body>
    <h1>Calculos</h1>
    <form action="scripts/resolucion.php" method="post">
        <label for="operandoUno">Operando 1:</label>
        <input type="number" name="operandoUno"> <br>
        <label for="operacionAritmetica">Operador aritmetico:</label>
        <select name="operacionAritmetica">
            <option value="+">Sumar</option>
            <option value="-">Restor</option>
            <option value="*">Multiplicar</option>
            <option value="/">Dividir</option>
        </select> <br>
        <label for="operandoDos">Operando 2:</label>
        <input type="number" name="operandoDos"> <br>

        <input type="submit" value="Enviar"> <br>

        <label for=""><?php echo $_SESSION["resultado"] . "<br>"; echo $_SESSION["contador"]; ?></label>

    </form>
</body>
</html>
