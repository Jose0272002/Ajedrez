<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="acceso.css" />
</head>

<body>
    <div class="a">
        <form id="form" action="home.php" method="post">
            <h1 style="color:white;">LOGIN</h1>
            <h4 style="color:white;">usuario</h4>
            <div><span><input type="text" name="user" id="user" required></span></div><br><br>
            <h4 style="color:white;">contraseña</h4>
            <div><span><input type="password" name="pass" id="pass" required></span></div>

            <?php
            session_start();

            if (isset($_SESSION["error"])) { //comprueba la sesion de error para mostrar datos incorrectos 
                if ($_SESSION["error"] == "x") {
                    echo "<span style='color:white; background-color:red;'>Inicio de sesión erróneo</span>";
                }
            }


            ?>
            <br>
            <div><span><input type="submit" value="enviar" class="y"></span></div>
        </form>


        <form action="registro.php" method="post">
            <input type="submit" value="registro" class="y">
        </form>
    </div>
</body>

</html>