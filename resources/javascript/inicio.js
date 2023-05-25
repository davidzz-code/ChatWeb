function comprobarContraseña() {
    let pass = document.getElementById("pass").value;
    let checkPass = document.getElementById("checkPass").value;

    if (pass != checkPass) {
        document.getElementById("checkPass").style.border = "1px solid red";
    } else {
        document.getElementById("checkPass").style.border = "1px solid black";
    }
}
    // FALTA AÑADIR QUE SI LAS CONTRASEÑAS NO COINCIDEN NO SE PUEDA ENVIAR