<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $operadorUno = $_POST["operandoUno"];
    $operadorDos = $_POST["operandoDos"];
    $operacionAritmetica = $_POST["operacionAritmetica"];


    if ($operacionAritmetica === "+"){
        $resultado = $operadorUno + $operadorDos;
    } elseif ($operacionAritmetica === "-") {
        $resultado = $operadorUno - $operadorDos;
    } elseif ($operacionAritmetica === "*") {
        $resultado = $operadorUno * $operadorDos;
    } else {
        $resultado = $operadorUno / $operadorDos;
    }

    $_SESSION["resultado"] = $resultado;


    if ($resultado > 1000) {
        $_SESSION["contador"]++;
    }

    if (isset($_SESSION["contador"]) && $_SESSION["contador"] >= 5){
        header("location: ../ecuacion.php");
        exit;
    }else{
        header("location: ../calculos.php");
        exit;
    }





}
