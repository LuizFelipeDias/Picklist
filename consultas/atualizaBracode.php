<?php
session_start();
include 'conexao/db.php';

// Função para atualizar o status do barcode
function updateBarcodeStatus($conn, $barcode, $newStatus) {
    $sql = "UPDATE picklist SET status = ? WHERE barcode = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $newStatus, $barcode);
    return $stmt->execute(); // Retorna true ou false
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $barcode = $_POST['barcode'];
    $status = $_POST['status']; // O novo status que deve ser atualizado

    // Atualiza o status do código de barras
    if (updateBarcodeStatus($conn, $barcode, $status)) {
        echo json_encode(['success' => true, 'message' => 'Status atualizado com sucesso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao atualizar o status.']);
    }
}
?>
