<?php
// functions.php
function fetchData($conn, $status) {
    $sql = "SELECT * FROM picklist WHERE status = ? ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $status);
    $stmt->execute();
    return $stmt->get_result();
}
?>
