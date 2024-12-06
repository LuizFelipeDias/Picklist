<?php
session_start();

include '../conexao/db.php';

// Função para verificar o status do barcode
function checkBarcodeStatus($conn, $barcode) {
    $sql = "SELECT status FROM picklist WHERE barcode = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $barcode);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['status'];
    } else {
        return null; // Se não encontrar o barcode
    }
}
$barcode = $_POST['barcode'];

$status = checkBarcodeStatus($conn, $barcode);
echo json_encode(['success' => true, 'message' => 'Status atualizado com sucesso.',$status]);

?>