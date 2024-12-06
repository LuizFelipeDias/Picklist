<?php
session_start(); // Iniciar a sessão

include 'conexao/db.php';

function fetchData($conn, $status) {
    $sql = "SELECT * FROM picklist WHERE status = ? ORDER BY created_at DESC LIMIT 10";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $status);
    $stmt->execute();
    return $stmt->get_result();
}

// Buscando dados com status 2 (Aguardando)
$status2Data = fetchData($conn, 2);

// Gerando as linhas da tabela com status 2 (amarelo)
while ($row = $status2Data->fetch_assoc()) {
    echo "<tr class='table-status-2'>";
    echo "<td>" . $row['barcode'] . "</td>";
    echo "<td>Aguardando</td>";
    echo "<td>" . $row['created_at'] . "</td>";
    echo "</tr>";
}
?>
