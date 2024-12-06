<?php
include '../conexao/db.php';

function fetchData1($conn,$linha) {
    $sql = "SELECT * FROM picklist WHERE linha = ? AND status in (1,4) ORDER BY created_at DESC LIMIT 3";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $linha);
    $stmt->execute();
    return $stmt->get_result();
}
function fetchData2($conn,$linha) {
    $sql = "SELECT * FROM picklist WHERE linha = ? AND status = 2 ORDER BY created_at DESC LIMIT 3";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $linha);
    $stmt->execute();
    return $stmt->get_result();
}

if (isset($_POST['linha'])) {
    $linha = $_POST['linha'];

    $data1 = fetchData1($conn,$linha)->fetch_all(MYSQLI_ASSOC);
    $data2 = fetchData2($conn,$linha)->fetch_all(MYSQLI_ASSOC);

    echo json_encode(['data1' => $data1, 'data2' => $data2]);
}
?>
