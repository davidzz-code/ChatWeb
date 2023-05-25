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

function enviarRegistro() {
    var http = new XMLHttpRequest();

    let user = document.getElementById("user");
    let mail = document.getElementById("mail");
    let pass = document.getElementById("pass");
    let codeCountry = document.getElementById("codeCountry");

    http.open("POST", "http://localhost:5000/XatLLM/Register");
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("user=" + user + "&pass=" + pass + "&mail=" + mail + "&codeCountry=" + codeCountry);
}