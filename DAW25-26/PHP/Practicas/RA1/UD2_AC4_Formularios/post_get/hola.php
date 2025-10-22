<?php

if ($_POST['nombre'] == "usuario" and $_POST["clave"] == "1234"){
    header("Location:bienvenida.html");
} else {
    header("Location:error.html");

};


