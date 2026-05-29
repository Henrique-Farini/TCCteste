<?php

session_start();

require 'conexao.php';

$login = trim($_POST['login']);
$senha = trim($_POST['senha']);

if(empty($login) || empty($senha)) {

    die("Preencha todos os campos.");

}

$stmt = $pdo->prepare(
    "SELECT * FROM usuario WHERE login = ?"
);

$stmt->execute([$login]);

$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if($usuario) {

    if($senha === $usuario['senha']) {

        $_SESSION['usuario'] = $usuario['login'];

        header("Location: painel.php");
        exit;

    } else {

        echo "Senha incorreta.";

    }

} else {

    echo "Usuário não encontrado.";

}

?>