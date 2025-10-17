<?php
//B) Genera una estructura para que haya al menos una clave cuyo valor represente uno de estos tipos de datos: 
//cadena, entero, decimal fecha.

// Genera un catálogo de N entidades de forma aleatoria, donde N es una constante PHP definida correctamente. Para ello:
// B.1) Si el tipo de dato es cadena, tendrá entre 1 y 10 caracteres.
// B.2) Si el tipo de dato es entero, deberá estar comprendido entre 3 y 8 dígitos.
// B.3) Si el tipo de dato es decimal, la parte entera deberá tener entre 1 y 3 dígitos, y la parte decimal entre 1 y 5 dígitos
// B.4) Si el tipo de dato es tipo fecha, deberá estar comprendida entre el 01/01/2025 y el 30/09/2025

define("N", 5);

$libro = array(
    "titulo" => "cadena",
    "n_paginas" => "entero",
    "precio" => "decimal",
    "fecha_publicacion" => "fecha"
);

function cadena_aleatoria() {
    $letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $l = rand(1, 10);
    $s = "";
    for ($i = 0; $i < $l; $i++) {
        $pos = rand(0, strlen($letras) - 1);
        $s .= $letras[$pos];
    }
    return $s;
}

function entero_3a8_digitos() {
    $d = rand(3, 8);
    $s = "";
    $s .= strval(rand(1, 9));
    for ($i = 1; $i < $d; $i++) {
        $s .= strval(rand(0, 9));
    }
    return (int)$s;
}

function decimal_simple() {
    $de = rand(1, 3);
    $dd = rand(1, 5);

    $entera = "";
    if ($de == 1) {
        $entera .= strval(rand(0, 9));
    } else {
        $entera .= strval(rand(1, 9));
        for ($i = 1; $i < $de; $i++) {
            $entera .= strval(rand(0, 9));
        }
    }

    $dec = "";
    for ($i = 0; $i < $dd; $i++) {
        $dec .= strval(rand(0, 9));
    }

    return $entera . "." . $dec;
}

function fecha_2025() {
    $ini = strtotime("2025-01-01");
    $fin = strtotime("2025-09-30");
    $t = rand($ini, $fin);
    return date("d/m/Y", $t);
}

function valor_por_tipo($tipo) {
    if ($tipo === "cadena") return cadena_aleatoria();
    if ($tipo === "entero") return entero_3a8_digitos();
    if ($tipo === "decimal") return decimal_simple();
    if ($tipo === "fecha") return fecha_2025();
    return null;
}

$catalogo = array();

for ($i = 0; $i < N; $i++) {
    $item = array();
    foreach ($libro as $campo => $tipo) {
        $item[$campo] = valor_por_tipo($tipo);
    }
    $catalogo[] = $item;
}

print_r(array(
    "N" => N,
    "esquema" => $libro,
    "catalogo" => $catalogo
));
