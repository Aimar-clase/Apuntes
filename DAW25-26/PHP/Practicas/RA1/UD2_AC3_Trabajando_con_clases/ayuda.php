<?
class Ayuda {


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
}