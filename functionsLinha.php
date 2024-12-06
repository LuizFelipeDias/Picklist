<?php
// functions.php
function fetchLinha($conn, $linha) {
    $sql = "SELECT * FROM picklist WHERE linha = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $linha);
    $stmt->execute();
    return $stmt->get_result();
}
?>
