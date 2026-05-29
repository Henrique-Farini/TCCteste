<?php

$host = "10.140.170.21";
$porta = "3307"; // Nova variável para a porta
$banco = "sistema_backup";
$usuario = "root";
$senha = "mlaurinha06";

try {

    // Adicionado o parâmetro ;port= no primeiro argumento
    $pdo = new PDO(
        "mysql:host=$host;port=$porta;dbname=$banco;charset=utf8",
        $usuario,
        $senha
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {

    die("Erro na conexão: " . $e->getMessage());

}

?>
