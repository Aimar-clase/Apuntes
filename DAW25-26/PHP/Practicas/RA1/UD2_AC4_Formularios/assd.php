<?php
require 'autoload.php';


$entrenamiento1 = new Entrenar("Cardio", "Correr", 30, "15/10/2025");
$entrenamiento2 = new Entrenar("Fuerza", "Pesas", 45, "5/4/2025");
$entrenamiento3 = new Entrenar("Fuerza", "Mancuernas", 60, "4/8/2025");

define('N', 5);


$actividades = [];


for ($i = 0; $i < N; $i++) {
    $actividades[] = Entrenar::aleatorio();
}


foreach ($actividades as $actividad) {
    print_r($actividad);
    echo "<br><br>";
}


echo "Atributos estaticos:";
echo "<br><br>";

// acceder a los estaticos
echo "Total al inicio: " . Entrenar::getTotalEntrenamientos() . "<br>";
echo "Ejercicio mínimo: " . Entrenar::getEjercicioMinimo() . "<br>";

// cambiar los estaticos
Entrenar::incrementarTotal();

echo "Después de incrementar: " . Entrenar::getTotalEntrenamientos() . "<br>";
Entrenar::setTotalEntrenamientos(10);
echo "Después de setear a 10: " . Entrenar::getTotalEntrenamientos() . "<br><br>";

Entrenar::resetearTotal();


echo "Hobby leer: <br>";
$lectura = new Leer("Lectura", "El Quijote", 500, "10/05/2025");
$lectura->setTiempoMinimo(20);
$lectura->setTiempoMaximo(90);

echo "Tiempo minimo: " . $lectura->getTiempoMinimo() . " minutos<br>";
echo "Tiempo maximo: " . $lectura->getTiempoMaximo() . " minutos<br><br>";

$lectura->registrarTiempo(46);
$lectura->registrarTiempo(90);
echo "Tiempo total dedicado: " . $lectura->getTiempoDedicado() . " minutos<br>";