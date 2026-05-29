<?php
session_start();

if(isset($_SESSION['usuario'])) {
    header("Location: painel.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>

    <meta charset="UTF-8">
    <title>Login</title>
   <link rel="stylesheet" href="../css/login.css">
   <link rel="icon" type="image/x-icon" href="img/fav.ico">


</head>
<body>

<div class="login-page">

  <div class="login-card">

    <div class="login-header">
      <span class="login-tag">NYXCLOUD</span>
      <h1>Bem-vindo de volta</h1>
      <p>
        Acesse sua plataforma de monitoramento e gerenciamento de backups.
      </p>
    </div>

    <form action="login.php" method="POST" class="login-form">

      <div class="input-group">
        <label>Login</label>
        <input 
          type="text" 
          name="login" 
          placeholder="Digite seu login" 
          required
        >
      </div>

      <div class="input-group">
        <label>Senha</label>
        <input 
          type="password" 
          name="senha" 
          placeholder="Digite sua senha" 
          required
        >
      </div>

      <button type="submit" class="btn-login">
        Entrar no painel
      </button>

    </form>

    <div class="login-footer">
      <span>Monitoramento seguro • Backup Intelligence</span>
    </div>

  </div>

</div>

</body>
</html>