<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="home.css">
</head>

<body>

    <?php
    session_start();
    session_destroy();
    require_once("funciones.php");

    if (isset($_POST["user"]) && !empty($_POST["user"]) && isset($_POST["pass"]) && !empty($_POST["pass"])) {
        $user = $_POST["user"];
        $pass = $_POST["pass"];
        $servername = "localhost";
        $database = "ajedrez";
        $username = "root";
        $password = "";
        $conn = mysqli_connect($servername, $username, $password, $database);

        if (!$conn) {
            die("connection failed: " . mysqli_connect_error());
        }

        $sql = "select nombre,apellido1,apellido2,id,user from usuario where user='$user' and contrasena=md5('$pass')";

        if (mysqli_query($conn, $sql)) {

            $resultado = mysqli_query($conn, $sql);
            $fila = mysqli_fetch_row($resultado);
            if (isset($fila)) { //comprueba la select
                $ima = scandir("./dirimg");
                foreach ($ima as $i) { //comprueba si el directorio de la imagenes
                    if (!is_dir("dirimg/$fila[3]")) { //si no existe ningun directorio igual al id del usuario lo crea
                        mkdir("dirimg/$fila[3]");
                    }
                    if ($i == $fila[3]) { //si uno de los directorios es el id del ususario
                        if (isset($_FILES['imagen']) and $_FILES['imagen']['size'] != null) { //si se sube alguna imagen

                            $archivos = array_map('unlink', glob("dirimg/$i/*.*")); // borra todo lo de dentro de la carpeta
                            subida($_FILES['imagen'], $i);
                            recortar($_FILES['imagen']['name'], $i);
                        } else { //si no se pasa ninguna imagen pero existe el directorio id se pone la imagen que esté en el
                            $img = scandir("./dirimg/$i");
                            if (isset($img[2]) and $img[2] != null) {
                                $dir = $i;
                                $file_name = $img[2];
                            }
                        }
                        $img = scandir("./dirimg/$i");
                        $dir = $i;
                        if (isset($img[2])) {
                            $file_name = $img[2];
                        } else { //si existe el directorio pero está vacío
                            $dir = "def";
                            $file_name = "perfil.png";
                        }
                        break;
                    } else {
                        $dir = "def";
                        $file_name = "perfil.png";
                    }
                }


                $tmp = explode('.', $file_name);

                $file_ext = end($tmp);
                echo "<div id='img' class='perfil'><img src='dirimg/$dir/$file_name'></div>";
                echo "<h1 class='perfil' style='color:white'>Bienvenido $fila[4]</h1>";
            } else {
                session_start();
                $_SESSION["error"] = "x";
                header("location:http://localhost/ajedrez/acceso.php");
                die();
            }
        } else {
            echo "error: " . $sql . "<br>" . mysqli_error($conn);
        }
        mysqli_close($conn);


    ?>
        <form action="home.php" method="post" enctype="multipart/form-data" class="x">
            <input type="submit" value="cambiar imagen" class="z">
            <input type="file" name="imagen" id="imagen" class="z">
            <?php
            $us = $_POST['user'];
            $pss = $_POST['pass'];
            echo "<input type='hidden'class='w' name='user' id='user' value='$us' required>";
            echo "<input type='hidden'class='w' name='pass' id='pass' value='$pss' required>";
            ?>
        </form>


        <form action="partida.php" method="post" class="x">
            <input type="submit" value="Jugar" class="z">
            <input type="hidden" name="user" value="<? $user ?>" checked>
            <input type="hidden" name="pass" value="<? $pass ?>" checked>
        </form>
        <form action="acceso.php" method="post" class="x">
            <input type="submit" value="salir" class="zz">
        </form>
    <?php
    } else {
        echo "<h1 style='color:red'>Necesitas hacer login</h1>";
        echo "<form action='acceso.php' method='post' >
            <input type='submit' value='volver' class='z'>
        </form>";
    }
    ?>
</body>

</html>