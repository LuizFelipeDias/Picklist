<?php
$host = "";
$user = "";
$pass = "";
$dbname = "picklist";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Conexão falhou: ' . $conn->connect_error]));
}
?>