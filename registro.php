<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <link rel="stylesheet" type="text/css" href="registro.css" />
</head>

<body>
    <div class="a">

        <form id="form" action="registro.php" method="post">
            <h1 style="color:white;">Registro</h1>
            <span style="color:white;">Nombre <br><input type="text" name="nombre" id="nombre required"></span> <br>
            <span style="color:white;">Usuario <br><input type="text" name="user" id="user" required></span><br>
            <span style="color:white;">1º Apellido<br><input type="text" name="ap1" id="ap1" required></span><br>
            <span style="color:white;">2º Apellido<br><input type="text" name="ap2" id="ap2"></span><br>
            <span style="color:white;">Contraseña <br><input type="password" name="pass" id="pass" required></span><br><span style="visibility:hidden; color:white; background-color:red;" id="cnv">debe tener mínimo 8 caracteres </span><br>
            <span style="color:white;">Repetir Contraseña<br><input type="password" name="pass2" id="pass2" required></span><br> <span style="visibility:hidden; color:white; background-color:red;" id="cnc">contraseña errónea</span><br>
            
            <div class="g-recaptcha" data-sitekey="6LdAt5EmAAAAANu34DOZKlqM_1WpFFyYe0kRElio"></div>
            <br><input type="submit" value="Registrarse" class="y">

        </form>
        <script>
            document.addEventListener("readystatechange", cargarEventos);
            let nombre = document.getElementById("nombre");
            let user = document.getElementById("user");
            let ap1 = document.getElementById("ap1");
            let ap2 = document.getElementById("ap2");
            let pass = document.getElementById("pass");
            let pass2 = document.getElementById("pass2");

            function cargarEventos() {
                if (document.readyState == "interactive") {
                    pass.addEventListener("keyup", contraseña);
                    pass2.addEventListener("keyup", contraseñas);
                }
            }

            function contraseña() {
                let con = /^[a-zA-Z0-9]+$/gi;
                if (con.test(document.getElementById("pass").value) && document.getElementById("pass").value.length >= 8) {
                    document.getElementById("cnv").style.visibility = "hidden";
                } else {
                    document.getElementById("cnv").style.visibility = "visible";
                }
            }

            function contraseñas() {
                if (document.getElementById("pass").value == document.getElementById("pass2").value) {
                    document.getElementById("cnc").style.visibility = "hidden";
                } else {
                    document.getElementById("cnc").style.visibility = "visible";
                }
            }
        </script>
        <?php
        if (
            isset($_POST["user"]) && isset($_POST["nombre"]) && isset($_POST["pass"]) && isset($_POST["ap1"]) && isset($_POST["ap1"]) &&
            !empty($_POST["user"]) && !empty($_POST["nombre"]) && !empty($_POST["pass"]) && !empty($_POST["ap1"]) && !empty($_POST["ap1"])
        ) {
            $user = $_POST["user"];
            $nombre = $_POST["nombre"];
            $pass = $_POST["pass"];
            $ap1 = $_POST["ap1"];
            $ap2 = $_POST["ap2"];

            $servername = "localhost";
            $database = "ajedrez";
            $username = "jose";
            $password = "Nohay2sin3";

            if (preg_match('/^.{8,}$/', $pass)) {
                $conn = mysqli_connect($servername, $username, $password, $database);
                if (!$conn) {
                    die("connection failed: " . mysqli_connect_error());
                }
                $sql = "insert into usuario(user,nombre,contrasena,apellido1,apellido2) values('$user','$nombre',md5('$pass'),'$ap1','$ap2')";

                if (mysqli_query($conn, $sql)) {
                    echo "Usuario creado ";
                } else {
                    echo "error: " . $sql . "<br>" . mysqli_error($conn);
                }
            } else {
                echo "La contraseña no cumple con el requisito de 8 caracteres.";
            }
            mysqli_close($conn);
        }
        ?>
        <form action="acceso.php" method="post">
            <br><input type="submit" value="Acceso" class="y">
        </form>
    </div>
</body>

</html>