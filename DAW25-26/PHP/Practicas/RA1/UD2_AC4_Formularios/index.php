<?php include('back.php'); ?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Entrenar</title>
</head>
<body>

    <section class="form-section">

        <div class="container">
            <?php if(isset($mensajeError)): ?>
                <div style="text-align: center; padding: 15px; background:
            <?php echo $mensajeError; ?>
                </div>
            <?php endif; ?>
            <div class="form-card">
                <form method="POST" id="formEntrenar" class="custom-form" enctype="multipart/form-data">
                    <input type="hidden" name="formularioEnviado">
                    <div class="form-header">
                        <h2>Registrar Entrenamiento</h2>
                        <p>Completa tus datos de ejercicio</p>
                    </div>

                    <div class="form-group">
                        <label for="nombre">
                            <i></i>
                            Nombre:
                        </label>
                        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre">
                    </div>

                    <div class="form-group">
                        <label for="ejercicio">
                            <i class="fas fa-dumbbell"></i>
                            Ejercicio:
                        </label>
                        <input type="text" id="ejercicio" name="ejercicio" placeholder="Tipo de ejercicio">
                    </div>

                    <div class="form-group">
                        <label for="tiempo">
                            <i class="fas fa-clock"></i>
                            Tiempo:
                        </label>
                        <input type="number" id="tiempo" name="tiempo" placeholder="Minutos">
                    </div>

                    <div class="form-group">
                        <label for="fecha">
                            <i class="fas fa-calendar"></i>
                            Fecha:
                        </label>
                        <input type="date" id="fecha" name="fecha">
                    </div>

                    <div>
                        <input type="file" name="fichero">
                    </div>

                    <button type="submit" class="btn-submit">
                        Enviar
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </form>
            </div>
        </div>
    </section>

</body>
</html>