<?php
session_start();
include 'conexao/db.php';

// Função para buscar dados de acordo com o status
function fetchData($conn, $status) {
    $sql = "SELECT * FROM picklist WHERE status = ? ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $status);
    $stmt->execute();
    return $stmt->get_result();
}
function fetchData2($conn, $status) {
    $sql = "SELECT * FROM picklist WHERE status = ? ORDER BY created_at DESC LIMIT 10";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $status);
    $stmt->execute();
    return $stmt->get_result();
}

// Buscando dados de cada status
$status1Data = fetchData($conn, 1); // Lista de espera
$status2Data = fetchData($conn, 2); // Aguardando
$status3Data = fetchData2($conn, 3); // Entregue
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <base href="http://localhost:8080/picklist/">

    <link href="assets/css/bootstrap.min.css" rel="stylesheet">

    <link href="assets/css/bootstrap.min.css" rel="stylesheet">

    <!-- JavaScript -->
    <script src="assets/js/alertify.min.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/alertify.min.css" />
    <!-- Default theme -->
    <link rel="stylesheet" href="assets/css/default.min.css" />
    <!-- Semantic UI theme -->
    <link rel="stylesheet" href="assets/css/semantic.min.css" />
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="assets/css/bootstrap-alertfy.min.css" />

    <style>
        .card-header {
            font-size: 18px;
            /* Tamanho da fonte do cabeçalho */
            font-weight: bold;
        }

        .table th,
        .table td {
            font-size: 90px;
            /* Fonte grande para as células da tabela */
            font-weight: bold;
            text-align: center;
            /* Centraliza o conteúdo */
            padding: 10px;
            /* Reduz o padding para otimizar o espaço */
        }

        body {
            background: linear-gradient(135deg, #ff7e5f, #feb47b);
            color: #333;
        }

        .card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .table thead th {
            background-color: #007bff;
            color: white;
            font-size: 20px;
            /* Ajuste do tamanho da fonte no cabeçalho da tabela */
        }

        .table-status-2 {
            background-color: #fff3cd;
        }

        .table-status-3 {
            background-color: #d4edda;
        }
    </style>
</head>

<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card mb-3">
                    <div class="card-header">
                        Em Separação
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Barcode</th>
                                    <!-- <th>Usuário</th> -->
                                </tr>
                            </thead>
                            <tbody id="waitingList">
                                <?php while ($row = $status1Data->fetch_assoc()): ?>
                                <tr>
                                    <td><?php echo $row['barcode'].' - ' .$_SESSION['user']['name_user']; ?></td>
                                </tr>
                                <?php endwhile; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card mb-3">
                    <div class="card-header">
                         Material Liberado
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Barcode</th>
                                </tr>
                            </thead>
                            <tbody id="onholdList">
                                <?php while ($row = $status2Data->fetch_assoc()): ?>
                                <tr class="table-status-2">
                                    <td><?php echo $row['barcode'].' - ' .$_SESSION['user']['name_user']; ?></td>
                                </tr>
                                <?php endwhile; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>