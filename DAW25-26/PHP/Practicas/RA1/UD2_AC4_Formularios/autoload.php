<?php
spl_autoload_register(function ($clase) {
    $archivo = $clase . '.php';
    
    if (file_exists($archivo)) {
        require_once $archivo;
    }
});