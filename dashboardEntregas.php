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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- JavaScript -->
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/alertify.min.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/alertify.min.css" />
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/default.min.css" />
    <!-- Semantic UI theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/semantic.min.css" />
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/bootstrap.min.css" />

    <!-- 
        RTL version
    -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/alertify.rtl.min.css" />
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/default.rtl.min.css" />
    <!-- Semantic UI theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/semantic.rtl.min.css" />
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/bootstrap.rtl.min.css" />

    <style>
        body {
            background: linear-gradient(135deg, #ff7e5f, #feb47b);
            /* Gradiente de laranja */
            color: #333;
        }

        .card {
            background: rgba(255, 255, 255, 0.9);
            /* Fundo das cartas com leve transparência */
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .btn-primary {
            background-color: #007bff;
            /* Azul padrão */
            border: none;
        }

        .btn-primary:hover {
            background-color: #0056b3;
            /* Azul mais escuro no hover */
        }

        .table thead th {
            background-color: #007bff;
            /* Azul para o cabeçalho da tabela */
            color: white;
        }

        .table tbody tr:hover {
            background-color: rgba(255, 255, 255, 0.2);
            /* Efeito de hover nas linhas da tabela */
        }

        /* Cores de status */
        .table-status-2 {
            background-color: #fff3cd;
            /* Amarelo suave */
        }

        .table-status-3 {
            background-color: #d4edda;
            /* Verde suave */
        }
    </style>
</head>

<body>
    <div class="container mt-5">
        <h2 class="text-center mb-4">Dashboard</h2>

        <!-- Formulário para inserir código de barras -->
        <div class="mb-4">
            <input type="text" id="barcodeInput" class="form-control" placeholder="Insira o código de barras" required>
            <button id="saveBarcodeButton" class="btn btn-primary mt-2">Salvar Código</button>
        </div>

        <!-- Tabelas em cartões -->

    </div>

    <script>
        document.getElementById('saveBarcodeButton').addEventListener('click', function () {
            const barcode = document.getElementById('barcodeInput').value;

            if (barcode == "") {
                alertify.error('Insira o barcode!');
            } else {

                fetch('save_barcode.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            'barcode': barcode
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        alertify.success(data.message); // Mostra a mensagem de retorno

                        // Atualiza as tabelas
                        updateTables();

                        // Limpa o campo de entrada
                        document.getElementById('barcodeInput').value = '';
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                        alertify.error('Erro ao salvar o código!');
                    });

            }

        });

        function updateTables() {
            // Atualiza a lista de espera
            fetch('get_waiting_list.php')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('waitingList').innerHTML = data;
                });

            // Atualiza a lista em aguardo
            fetch('get_onhold_list.php')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('onholdList').innerHTML = data;
                });
            // Atualiza a lista de entregas
            fetch('get_delivered_list.php')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('deliveredList').innerHTML = data;
                });
        }
    </script>
</body>

    <!-- Coluna - Últimos Entregues -->
    <div class="col-md-12">
        <div class="card mb-3">
            <div class="card-header">
                Últimos Entregues (Status 3)
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Barcode</th>
                            <th>Status</th>
                            <th>Criado em</th>
                        </tr>
                    </thead>
                    <tbody id="deliveredList">
                        <?php while ($row = $status3Data->fetch_assoc()): ?>
                        <tr class="table-status-3">
                            <td><?php echo $row['barcode']; ?></td>
                            <td>Entregue</td>
                            <td><?php echo $row['created_at']; ?></td>
                        </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

</html>