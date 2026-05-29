<?php

session_start();

if(!isset($_SESSION['usuario'])) {

    header("Location: index.php");
    exit;

}

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Painel</title>

    <link rel="stylesheet" href="../css/painel.css">
    <link rel="icon" type="image/x-icon" href="img/fav.ico">

</head>
<body>

<div class="painel-container">

    <div class="painel-card">

        <div class="badge">
            NYXCLOUD
        </div>

        <h1>
            Bem-vindo,
            <span>
                <?php echo $_SESSION['usuario']; ?>
            </span>
        </h1>

        <p>
            Seu painel está pronto para uso.
            Gerencie backups, monitoramentos e dashboards em um único lugar.
        </p>

        <div class="painel-buttons">

            <a href="#" class="btn-primary">
                Acessar Painel
            </a>

            <a href="logout.php" class="btn-secondary">
                Sair
            </a>

        </div>

    </div>

</div>

</body>
</html>