<?php

if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['formularioEnviado']) ){

    $nombre = $_POST['nombre'];
    $ejercicio = $_POST['ejercicio'];
    $tiempo = (INT) $_POST['tiempo'];
    $fecha = $_POST['fecha'];


    if(!empty($_POST['nombre']) && !empty($_POST['ejercicio']) && !empty($_POST['tiempo']) && !empty($_POST['fecha'])){
        $mensajeError =  "Todos los datos recibidos";
    }else {
        $mensajeError = "No he recibido todos los parametros";
    }
}



