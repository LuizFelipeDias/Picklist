<?php
session_start();

include 'conexao/db.php';

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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $barcode = $_POST['barcode'];
    $linha = $_POST['linha'];

    // Verificar se o barcode já existe com status 3
    $status = checkBarcodeStatus($conn, $barcode);

    if ($status === 3) {
        // Exibe uma mensagem de erro e bloqueia a inserção
        echo json_encode(['success' => false, 'message' => 'Este código de barras já foi entregue e não pode ser inserido novamente.']);
        exit;
    } else if ($status === 2) {
        // Se status for 2, atualiza para 3
        $sql = "UPDATE picklist SET status = 3 WHERE barcode = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $barcode);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Status atualizado para entregue (3).']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao atualizar o status.']);
        }
    } else if ($status === 1) {
        // Se status for 1, atualiza para 2
        $sql = "UPDATE picklist SET status = 2 WHERE barcode = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $barcode);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Status atualizado para aguardando (2).']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao atualizar o status.']);
        }
    } else {
        // Se o barcode não existir, insere com status 1
        $sql = "INSERT INTO picklist (barcode,linha, user_id, status) VALUES (?, ?, ?, 1)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('si', $barcode, $linha, $_SESSION['user']['id_user']);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Código de barras inserido com status de espera (1).']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao inserir o código de barras.']);
        }
    }
}
?>
