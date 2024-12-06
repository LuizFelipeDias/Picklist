<?php
session_start(); // Iniciar a sessão

include 'conexao/db.php';

function fetchData($conn, $status) {
    $sql = "SELECT * FROM picklist WHERE status = ? ORDER BY created_at DESC LIMIT 3";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $status);
    $stmt->execute();
    return $stmt->get_result();
}

// Buscando dados com status 3 (Entregue)
$status3Data = fetchData($conn, 3);


// Gerando as linhas da tabela com status 3 (verde)
while ($row = $status3Data->fetch_assoc()) {
    echo "<tr class='table-status-3'>";
    echo "<td>" . $row['barcode'] . "</td>";
    echo "<td>Entregue</td>";
    echo "<td>" . $row['created_at'] . "</td>";
    echo "</tr>";
}
?>
