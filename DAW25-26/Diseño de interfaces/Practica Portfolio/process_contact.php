<?php

require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido. Use POST.'
    ]);
    exit;
}

function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];

try {
    $nombre = isset($_POST['nombre']) ? sanitizeInput($_POST['nombre']) : '';
    $email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
    $asunto = isset($_POST['asunto']) ? sanitizeInput($_POST['asunto']) : '';
    $mensaje = isset($_POST['mensaje']) ? sanitizeInput($_POST['mensaje']) : '';

    if (empty($nombre)) {
        $response['errors'][] = 'El nombre es obligatorio';
    } elseif (strlen($nombre) < 2) {
        $response['errors'][] = 'El nombre debe tener al menos 2 caracteres';
    } elseif (strlen($nombre) > 100) {
        $response['errors'][] = 'El nombre no puede superar los 100 caracteres';
    }

    if (empty($email)) {
        $response['errors'][] = 'El email es obligatorio';
    } elseif (!isValidEmail($email)) {
        $response['errors'][] = 'El email no tiene un formato válido';
    } elseif (strlen($email) > 150) {
        $response['errors'][] = 'El email no puede superar los 150 caracteres';
    }

    if (empty($asunto)) {
        $response['errors'][] = 'El asunto es obligatorio';
    } elseif (strlen($asunto) < 3) {
        $response['errors'][] = 'El asunto debe tener al menos 3 caracteres';
    } elseif (strlen($asunto) > 200) {
        $response['errors'][] = 'El asunto no puede superar los 200 caracteres';
    }

    if (empty($mensaje)) {
        $response['errors'][] = 'El mensaje es obligatorio';
    } elseif (strlen($mensaje) < 10) {
        $response['errors'][] = 'El mensaje debe tener al menos 10 caracteres';
    } elseif (strlen($mensaje) > 5000) {
        $response['errors'][] = 'El mensaje no puede superar los 5000 caracteres';
    }

    if (!empty($response['errors'])) {
        $response['message'] = 'Por favor, corrige los errores del formulario';
        echo json_encode($response);
        exit;
    }

    $ip_cliente = $_SERVER['REMOTE_ADDR'] ?? null;

    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip_cliente = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }

    $conn = getDBConnection();

    if (!$conn) {
        throw new Exception('Error al conectar con la base de datos');
    }

    $sql = "INSERT INTO contact_messages (nombre, email, asunto, mensaje, ip_cliente)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception('Error al preparar la consulta: ' . $conn->error);
    }

    $stmt->bind_param("sssss", $nombre, $email, $asunto, $mensaje, $ip_cliente);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = '¡Mensaje enviado correctamente! Te responderé pronto.';
        $response['message_id'] = $stmt->insert_id;
        http_response_code(200);
    } else {
        throw new Exception('Error al insertar el mensaje: ' . $stmt->error);
    }

    $stmt->close();
    closeDBConnection($conn);

} catch (Exception $e) {
    error_log("Error en process_contact.php: " . $e->getMessage());

    $response['success'] = false;
    $response['message'] = 'Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
    $response['error_detail'] = $e->getMessage();
    http_response_code(500);
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
