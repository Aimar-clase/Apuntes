<?php

define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3306');
define('DB_NAME', 'portfolio');
define('DB_USER', 'root');
define('DB_PASS', 'Aimar1212');

date_default_timezone_set('Europe/Madrid');

function getDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);

    if ($conn->connect_error) {
        error_log("Error de conexión a BD: " . $conn->connect_error);
        return false;
    }

    $conn->set_charset("utf8mb4");

    return $conn;
}

function closeDBConnection($conn) {
    if ($conn) {
        $conn->close();
    }
}
?>
