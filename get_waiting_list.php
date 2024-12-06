<?php
session_start(); // Iniciar a sessão
include 'conexao/db.php';

function fetchData($conn, $status, $status1) {
    $sql = "SELECT * FROM picklist WHERE status in (?, ?) ORDER BY created_at DESC LIMIT 10";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $status, $status1);
    $stmt->execute();
    return $stmt->get_result();
}

// Verificar se a sessão do usuário está definida
if (isset($_SESSION['user']) && isset($_SESSION['user']['name_user'])) {
    // Buscar dados da lista de espera (status = 1)
    $status1Data = fetchData($conn, 1, 4);

    // Gerar as linhas da tabela com os dados da lista de espera
    while ($row = $status1Data->fetch_assoc()) {
        if($row['status']==4){
            echo "<tr class='cancelada'>";
            echo "<td>".$row['barcode']."</td>";
            echo "<td>".$row['linha']."</td>";
            echo "<td>Cancelada</td>";
            echo "<tr>";
        } else {
            echo "<tr>";
            echo "<td>".$row['barcode']."</td>";
            echo "<td>".$row['linha']."</td>";
            echo "<td>Aguardando</td>";
            echo "<tr>";
        }
    }
} else {
    echo "Erro: Sessão do usuário não encontrada.";
}
?>
