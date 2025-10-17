<?php
require 'Entrenar.php';


define('N', 5);


$actividades = [];


for ($i = 0; $i < N; $i++) {
    $actividades[] = Entrenar::aleatorio();
}


foreach ($actividades as $actividad) {
    print_r($actividad);
    echo "<br><br>";
}
