<?php
session_start();


if($_SESSION['user']==""){
    unset($_SESSION['login']);
    header('Location:login.php');
}

include 'conexao/db.php';
include 'header.php';

// Função para buscar dados de acordo com o status
function fetchData($conn, $status, $status1) {
    $sql = "SELECT * FROM picklist WHERE status in (? ,?) ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $status, $status1);
    $stmt->execute();
    return $stmt->get_result();
}
// Função para buscar dados de acordo com o status
function fetchData1($conn, $status) {
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
$status1Data = fetchData($conn, 1,4); // Lista de espera
$status2Data = fetchData1($conn, 2); // Aguardando
$status3Data = fetchData2($conn, 3); // Entregue
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>

    <style>

        .viewport {
            width: 250px;
            height: 150px;
            border: 1px solid #ccc;
            margin-bottom: 20px;
        }


        .card-header {
            font-size: 18px;
            /* Tamanho da fonte da cabeçalho */
            font-weight: bold;
        }

        .table th,

        .table td {
            font-size: 18px;
            /* Tamanho da fonte da tabela */
            font-weight: bold;
            align-content: center;
        }

        .table td {
            font-size: 18px;
            /* Tamanho da fonte do conteúdo da tabela */
            font-weight: bold;
        }

        body {
            background: linear-gradient(135deg, #969696, #ffffff);
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
        .cancelada {
            background: linear-gradient(to bottom, white, #ff3838);
            /* Amarelo suave */
        }

        /* Cores de status */
        .table-status-2 {
            background: linear-gradient(to bottom, white, #f9e261);
            /* Amarelo suave */
        }

        .table-status-3 {
            background-color: #d4edda;
            /* Verde suave */
        }

        .table-status-3 {
            background-color: #d4edda;
        }

        video{
            width: 100%;
        }

        h1 {
            font-size: 18px;
            font-weight: normal;
        }


    </style>
</head>

<link rel="stylesheet" href="style.css">
<script src="quagga.js"></script>

<body>
    <div class="container mt-5">
        <h2 class="text-center mb-4">SOLICITAÇÃO DE PICKLIST</h2>

        
        <div class="row">

            <div class="d-flex flex-column align-items-center mb-4">
                <h1>LEITOR CÓDIGO DE BARRAS</h1>
                <div id="interactive" class="viewport"></div>
            </div>

            <!-- Formulário para inserir código de barras -->
            <div class="col-md-5">
                <input type="text" id="barcodeInput" class="form-control" placeholder="Insira o código de barras" maxlength="6" required>
                <input type="hidden" id="status">
            </div>

            <div class="col-md-5">
                <select class="form-control" name="linhaInput" id="linhaInput">
                    <option value="">Escolha uma linha ...</option>
                    <option value="2">2 - linha 2</option>
                    <option value="3">3 - linha 3</option>
                    <option value="4">4 - linha 4</option>
                    <option value="5">5 - linha 5</option>
                    <option value="6">6 - linha 6</option>
                </select>
                <!-- <input type="text" id="linhaInput" class="form-control" placeholder="Insira a linha" required> -->
            </div>

            <div class="col-md-2">
                <button id="saveDataButton" class="btn btn-primary mt-2">ENVIAR</button>
            </div>

        </div>
        <br>

        <script>

        document.addEventListener('DOMContentLoaded', function () {
                    // Inicializa o Quagga
                    Quagga.init({
                        inputStream: {
                            name: "Live",
                            type: "LiveStream",
                            target: document.querySelector('#interactive'),
                            constraints: {
                                facingMode: "environment" // use a câmera traseira do dispositivo
                            }
                        },
                        decoder: {
                            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "upc_reader"] // adicione outros leitores conforme necessário
                        }
                    }, function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("Quagga iniciado");
                        Quagga.start();
                    });

                    // Ouvindo o evento de leitura de código de barras
                    Quagga.onDetected(function (data) {
                        const barcode = data.codeResult.code; // Captura o código detectado
                        document.getElementById('barcodeInput').value = barcode; // Preenche o campo com o código
                        console.log("Código detectado: ", barcode);
                    });
                });

            const selectElement = document.querySelector("#barcodeInput");
            const selectLinha = document.querySelector("#linhaInput");
            const result = document.querySelector("#status");

            selectElement.addEventListener("change", (event) => {
                fetch('consultas/checkStatus.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            'barcode': selectElement.value,
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            result.value = data[0];
                            // alertify.success(data.message); // Mostra a mensagem de sucesso
                            // Limpa os campos de entrada

                            // Atualiza as tabelas
                            // updateTables();

                            if (data[0] == '1' || data[0] == '2' || data[0] == '3') {
                                selectLinha.style.display = "none"; // Oculta o input
                            } else {
                                selectLinha.style.display = "block"; // Mostra o input, se necessário
                            }
                        }
                    })
                    .catch(error => {
                        // console.error('Erro:', error);
                        // alertify.error('Erro ao salvar os dados!');
                    });
            });


            document.getElementById('saveDataButton').addEventListener('click', function () {
                const barcode = document.getElementById('barcodeInput').value;
                const linha = document.getElementById('linhaInput').value;
                const status = document.getElementById('status').value;

                // Ouvindo a mudança no campo de código de barras
                selectElement.addEventListener("input", (event) => {
                    if (event.target.value.length === 6) { // Verifica se o código de barras tem 6 caracteres
                        selectLinha.focus(); // Troca o foco para o campo linha
                    }
                });

                
                // Condição para que as linhas não sejam necessárias para o envio de um Barcode já existente 
                if(status == 1 || status == 2 || status == 3){

                    if (barcode == "") {
                        alertify.error('Insira o barcode e a linha!');
                    } else {
                        fetch('save_barcode.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: new URLSearchParams({
                                    'barcode': barcode,                                    
                                })
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    alertify.success(data.message); // Mostra a mensagem de sucesso
                                    // Limpa os campos de entrada
                                    document.getElementById('barcodeInput').value = '';
                                    // Atualiza as tabelas
                                    updateTables();
    
                                } else {
                                    alertify.error(data.message); // Mostra a mensagem de erro
                                }
                            })
                            .catch(error => {
                                console.error('Erro:', error);
                                alertify.error('Erro ao salvar os dados!');
                            });
                    }
                }else{

                    if (barcode == "" || linha == "") {
                        alertify.error('Insira o barcode e a linha!');
                    } else {
                        fetch('save_barcode.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: new URLSearchParams({
                                    'barcode': barcode,
                                    'linha': linha,
                                    'status' : status,
                                })
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    alertify.success(data.message); // Mostra a mensagem de sucesso
                                    // Limpa os campos de entrada
                                    document.getElementById('barcodeInput').value = '';
                                    document.getElementById('linhaInput').value = '';

                                    
                                    // Atualiza as tabelas
                                    updateTables();
    
                                } else {
                                    alertify.error(data.message); // Mostra a mensagem de erro
                                }
                            })
                            .catch(error => {
                                console.error('Erro:', error);
                                alertify.error('Erro ao salvar os dados!');
                            });
                    }
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
        <!-- Primeira Coluna -  Aguardando separação -->
        <div class="row">
            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-header">
                        Aguardando
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Barcode</th>
                                    <th>Linha</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="waitingList">
                                <?php while ($row = $status1Data->fetch_assoc()): ?>
                                <?php
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
                                ?>    
                               
                                <?php endwhile; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Segunda Coluna - Disponível para Coleta -->
            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-header">
                        Entregue
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Barcode</th>
                                    <th>Linha</th>
                                    <th>Horário</th>
                                </tr>
                            </thead>
                            <tbody id="onholdList">
                                <?php while ($row = $status2Data->fetch_assoc()): ?>
                                <tr class="table-status-2">
                                    <td><?php echo $row['barcode']; ?></td>
                                    <td><?php echo $row['linha']; ?></td>
                                    <td><?php echo $row['created_at']; ?></td>
                                </tr>
                                <?php endwhile; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Terceira Coluna - Picklist Confirmada -->
            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-header">
                        Picklist Confirmada
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Barcode</th>
                                    <th>Linha</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="deliveredList">
                                <?php while ($row = $status3Data->fetch_assoc()): ?>
                                <tr class="table-status-3">
                                    <td><?php echo $row['barcode']; ?></td>
                                    <td><?php echo $row['linha']; ?></td>
                                    <td><?php echo 'Confimado'; ?></td>
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