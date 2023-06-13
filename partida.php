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
     <div id="x" name="x"></div>
     
     <?
    if (isset($_POST["ganador"]) && !empty($_POST["ganador"])) {
     $ganador = json_decode($_POST["ganador"]);
 
     if ($ganador === "blanco") {
         echo $_POST["ganador"];
      
          if (isset($_POST["user"]) && !empty($_POST["user"]) && isset($_POST["pass"]) && !empty($_POST["pass"])) {
              $user = $_POST["user"];
              $pass = $_POST["pass"];
              $servername = "localhost";
              $database = "ajedrez";
              $username = "root";
              $password = "";
              $conn = mysqli_connect($servername, $username, $password, $database);
              if (!$conn) {
                  die("Connection failed: " . mysqli_connect_error());
              }
      
              $sql = "SELECT Partidas_jugadas FROM partidas";
      
              if (mysqli_query($conn, $sql)) {
      
                  $resultado = mysqli_query($conn, $sql);
                  $fila = mysqli_fetch_row($resultado);
                  $partidasJugadas = $fila[0] + 1;
      
                  $sql = "UPDATE partidas SET Partidas_jugadas=$partidasJugadas";
                  if (mysqli_query($conn, $sql)) {
                      echo "Número actualizado correctamente.";
                  } else {
                      echo "Error al actualizar el número: " . mysqli_error($conn);
                  }
      
                  // Cerrar la conexión
                  mysqli_close($conn);
              }
          }
      }
     }
?>      
     <script src="partida.js"></script>
</body>

</html>