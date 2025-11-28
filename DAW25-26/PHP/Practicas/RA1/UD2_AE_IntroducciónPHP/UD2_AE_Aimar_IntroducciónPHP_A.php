<?php


$n = 11;

function esPrimo($numero) {
    if ($numero < 2) {
        return false;
    }

    for ($i = 2; $i <= sqrt($numero); $i++) {
        if ($numero % $i == 0) {
            return false;
        }
    }

    return true;
}


$noEsPrimo = !esPrimo($n);
$siguienteEsPrimo = esPrimo($n + 1);

if ($noEsPrimo && $siguienteEsPrimo) {
    echo $n . " no es primo y el" . ($n + 1) . " si lo es.";
} else {
    echo $n . " no cumple la condicion.";
}
