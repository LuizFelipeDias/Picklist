<?php
session_start();
include '../conexao/db.php';
include '../header.php';


?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <style>
        .card-header {
            font-size: 18px;
            /* Tamanho da fonte do cabeçalho */
            font-weight: bold;
        }

        .table td {
            /* Fonte grande para as células da tabela */
            font-weight: bold;
            text-align: center;
            /* Centraliza o conteúdo */
            padding: 10px;
            font-size: 120px
                /* Reduz o padding para otimizar o espaço */
        }

        body {
            background: linear-gradient(135deg, #ffffff, #969696);
            color: #333;
        }

        .card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .table thead th {
            text-align: center;
            background-color: white;
            color: black;
            font-size: 20px;
            /* Ajuste do tamanho da fonte no cabeçalho da tabela */
        }

        .table-status-2 {
            background-color: #fff3cd;
        }

        .table-status-3 {
            background-color: #d4edda;
        }

        .table-linha {
            background-color: #d4edda;
        }
    </style>
</head>


<body>

    <div class="container mt-5">
        <a href="index.php"><i class="fas fa-home"></i></a>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card mb-3">
                    <div class="card-header">
                        Em Separação
                    </div>
                    <div class="card-body" style="background-color:#3cafe8">
                        <table class="table" id="status1Table">
                            <thead>
                                <tr>
                                    <th>Barcode</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Conteúdo será atualizado pelo Ajax -->
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
                    <div class="card-body" style="background-color:#73e08d">
                        <table class="table" id="status2Table">
                            <thead>
                                <tr>
                                    <th>Barcode</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Conteúdo será atualizado pelo Ajax -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<script>
    function alertNovaOrdem() {
        var alertSound = new Audio(
            'assets/audio/picklist-liberada.mp3');
        alertSound.play();
        // Verifica se o dispositivo suporta a API de vibração
        if ('vibrate' in navigator) {
            // Ativa a vibração do dispositivo
            navigator.vibrate([3000, 100, 3000]); // 200ms de duração da vibração
        } else {}

    }

    setInterval(function () {
        // alert(aux)
        $.ajax({
            url: 'consultas/consultaCountPick.php',
            type: 'POST',
            data: {
                linha: 3
            },
            dataType: 'json',
            success: function (response) {
                console.log(response)
                var alertaNovaordem = response;
                if (alertaNovaordem != 0 && aux != 0) {

                    alertNovaOrdem()
                    
                }


            }
        });

        aux = 1;
    }, 10000);
    let previousStatus2Count = 0; // Inicializando o valor globalmente para comparação

    function updateTables() {
        $.ajax({
            url: 'consultas/consultaAtualizaTabela.php',
            type: 'POST',
            data: {
                linha: 3
            }, // Exemplo de envio da linha
            dataType: 'json',
            success: function (response) {
                // Limpar e atualizar a tabela de Status 1
                let status1Table = $('#status1Table tbody');
                status1Table.empty(); // Limpar o conteúdo da tabela
                response.data1.forEach(function (item) {
                    status1Table.append(`<tr>
                    <td>${item.barcode}</td>
                </tr>`);
                });

                // Limpar e atualizar a tabela de Status 2
                let status2Table = $('#status2Table tbody');
                status2Table.empty(); // Limpar o conteúdo da tabela
                // Atualizar a tabela de Status 2
                response.data2.forEach(function (item) {
                    status2Table.append(`<tr>
                    <td>${item.barcode}</td>
                </tr>`);
                });
                let count;
                if (count > previousStatus2Count) {
                    playAlarm();
                }

                // Atualizar o valor de previousStatus2Count
                previousStatus2Count = count;
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }


    // Chamar a função a cada 5 segundos (5000 ms)
    setInterval(updateTables, 5000);

    // Atualizar ao carregar a página
    $(document).ready(function () {
        updateTables();
    });

    // Recarregar a página a cada 30 minutos (1800000 ms)
    setInterval(function () {
    location.reload();
    }, 1800000); // 30 minutos
</script>

</html>