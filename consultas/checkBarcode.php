<?php
session_start();
include 'conexao/db.php';

// Função para verificar se o barcode existe e retornar seu status
function checkBarcodeExists($conn, $barcode) {
    $sql = "SELECT status FROM picklist WHERE barcode = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $barcode);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        return $result->fetch_assoc(); // Retorna o status do barcode
    } else {
        return null; // Se não encontrar o barcode
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $barcode = $_POST['barcode'];

    // Verificar se o código de barras existe
    $barcodeData = checkBarcodeExists($conn, $barcode);

    if ($barcodeData) {
        // Se existir, retorna o status
        echo json_encode(['exists' => true, 'status' => $barcodeData['status']]);
    } else {
        // Se não existir, retorna que não existe
        echo json_encode(['exists' => false]);
    }
}
?>
