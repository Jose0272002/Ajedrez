<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
function subida($file, $id)
{
    $errors = array();
    $file_name = $file['name'];
    $file_size = $file['size'];
    $file_tmp = $file['tmp_name'];
    $file_type = $file['type'];

    $tmp = explode('.', $file_name);
    $file_ext = end($tmp);
    $extensions = array("jpeg", "jpg", "png", "gif", "jfif");
    $dir = "dirimg/$id";


    if (in_array($file_ext, $extensions) === false) { //si la extensión no está en el array de extensiones
        $errors[] = "extensión no permitida, por favor introduce una imagen .PNG o .JPG.";
    }

    if ($file_size > 5097152) { //si la imagen tiene mas de 2mb
        $errors[] = 'El tamaño de la imagen es superior a 5 MB';
    }

    if (empty($errors) == true) { //si no hay errores

        move_uploaded_file($file_tmp, "$dir/$file_name");

    } else {
        echo ($errors[0]);
    }

}


function recortar($file, $id)
{
    $newwidth = 200;
    $newheight = 200;
    $file_ext = pathinfo($file, PATHINFO_EXTENSION); //devuelve la extension

    if ($file_ext == "png") { //imagenes png
        $im = imagecreatefrompng("./dirimg/$id/$file");
        $size = min(imagesx($im), imagesy($im));

        $im2 = imagecrop($im, ['x' => 0, 'y' => 0, 'width' => $size, 'height' => $size]); // parametros de la imagen recortada
        $thumb = imagecreatetruecolor($newwidth, $newheight);

        imagecopyresized($thumb, $im2, 0, 0, 0, 0, $newwidth, $newheight, $size, $size);

        if ($im2 !== FALSE) { //si existe $im2
            imagepng($thumb, "./dirimg/$id/$file"); //se crea la nue va imagen
            imagedestroy($im2);
        }
        imagedestroy($im);
    } else if ($file_ext == "jpg" or $file_ext == "jpeg" or $file_ext == "jfif") { //imagenes jpeg
        try {
            $im = imagecreatefromjpeg("./dirimg/$id/$file");
            $size = min(imagesx($im), imagesy($im));

            $im2 = imagecrop($im, ['x' => 0, 'y' => 0, 'width' => $size, 'height' => $size]);
            $thumb = imagecreatetruecolor($newwidth, $newheight);

            imagecopyresized($thumb, $im2, 0, 0, 0, 0, $newwidth, $newheight, $size, $size);

            if ($im2 !== FALSE) {
                imagepng($thumb, "./dirimg/$id/$file");
                imagedestroy($im2);
            }
            imagedestroy($im);
        } catch (Exception) {
            echo "Ha ocurrido un error";
        }

    }
    else if ($file_ext == "gif" ) { //imagenes gif
        try {
            $im = imagecreatefromgif("./dirimg/$id/$file");
            $size = min(imagesx($im), imagesy($im));

            $im2 = imagecrop($im, ['x' => 0, 'y' => 0, 'width' => $size, 'height' => $size]);
            $thumb = imagecreatetruecolor($newwidth, $newheight);

            imagecopyresized($thumb, $im2, 0, 0, 0, 0, $newwidth, $newheight, $size, $size);

            if ($im2 !== FALSE) {
                imagegif($thumb, "./dirimg/$id/$file");
                imagedestroy($im2);
            }
            imagedestroy($im);
        } catch (Exception) {
            echo "Ha ocurrido un error";
        }

    }

}
