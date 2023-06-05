<!DOCTYPE html>
<html lang="en">

<head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="stylesheet" href="partida.css">
     <title>Document</title>
</head>

<body>
     <button type="button" class="b" onclick="window.history.back()">Home</button>
     <form action="acceso.php" method="post" >
          <input type="submit" value="salir" class="a" >
     </form>
     <?php
     if (isset($_SERVER['HTTP_REFERER'])) {
          $referer = $_SERVER['HTTP_REFERER'];

     } else {
          session_start();
          $_SESSION["error"] = "x";
          header("location:http://localhost/ajedrez/acceso.php");
     }
     require_once("tablero.php");

     ?>
     <script src="partida.js"></script>

</body>

</html>