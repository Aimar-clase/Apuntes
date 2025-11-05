<?php
session_start();
if (!$_SESSION["autenticado"]){
    header('Location: error.php');
    exit;
}

$_SESSION["contador"] = 0;
$_SESSION["resultado"] = 0;

if (isset($_GET['a'], $_GET['b'], $_GET['c'])) {

    $a = $_GET['a'];
    $b = $_GET['b'];
    $c = $_GET['c'];

    $x1 = (-$b + sqrt($b * $b - 4 * $a * $c)) / (2 * $a);
    $x2 = (-$b - sqrt($b * $b - 4 * $a * $c)) / (2 * $a);
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ecuacion</title>

    <link rel="stylesheet" href="styles.css">
</head>
<body class="vh-body">
<h1 class="vh-title">Ecuacion php</h1>
<a href="logout.php" class="vh-link">Cerrar Sesion</a>
<a href="calculos.php" class="vh-link">Calculos php</a>
<form action="ecuacion.php" method="get" class="vh-form">
    <label for="a" class="vh-label">Dame la a:</label>
    <input type="number" name="a" class="vh-input">

    <label for="b" class="vh-label">Dame la b:</label>
    <input type="number" name="b" class="vh-input">

    <label for="c" class="vh-label">Dame la c:</label>
    <input type="number" name="c" class="vh-input">

    <input type="submit" value="Enviar" class="vh-input vh-btn">
    <label for="" class="vh-label">
        <?php
        echo "$x1<br>";
        echo "$x2<br>";
        ?>
    </label>
</form>

</body>
</html>