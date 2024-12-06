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
        $barcode = $_POST['barcode']; // Sempre recebe o barcode
        $status = $_POST['status']; // Sempre recebe o barcode
        $linha = isset($_POST['linha']) ? $_POST['linha'] : null; // Linha só é necessária para status 1

        // Verificar o status atual do código de barras no banco de dados
        $status = checkBarcodeStatus($conn, $barcode);

        // Status 3: Código já entregue, exibe erro
        if ($status === 3) {
            echo json_encode(['success' => false, 'message' => 'Este código de barras já foi entregue e não pode ser inserido novamente.']);
            exit;
        }

        // Status 4: Código cancelado
        else if ($status === 4) {
            $sql = "UPDATE picklist SET status = 4 WHERE barcode = ?";
            $stmt = $conn->prepare($sql);
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Cancelado (4).']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao cancelar (4)']);
            }
        }

        // Status 2: Atualiza para entregue (3)
        else if ($status === 2) {
            $sql = "UPDATE picklist SET status = 3 WHERE barcode = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s', $barcode);
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Status atualizado para entregue (3).']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao atualizar o status.']);
            }
        }

        // Status 1: Atualiza para aguardando (2)
        else if ($status === 1) {
            $sql = "UPDATE picklist SET status = 2 WHERE barcode = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s', $barcode);
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Status atualizado para aguardando (2).']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao atualizar o status.']);
            }
        }

    // Barcode ainda não existe, insere com status 1 ou 4
    else {
        $status = $_POST['status']; // Sempre recebe o barcode
        if ($status == 4){
            // Se não fornecer linha, insere com status 4
            $sql = "INSERT INTO picklist (barcode, linha, user_id, status) VALUES (?, ?, ?, 4)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('sii', $barcode,$linha, $_SESSION['user']['id_user']);
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Código de barras cancelado (4).']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao cancelar.']);
            }
        }
        else {
            // Insere o código com status 1 (linha obrigatória)
            $sql = "INSERT INTO picklist (barcode, linha, user_id, status) VALUES (?, ?, ?, 1)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('sii', $barcode, $linha, $_SESSION['user']['id_user']);
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Código de barras inserido com status de espera (1).']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao inserir o código de barras.']);
            }
        }
    }
}
?>
