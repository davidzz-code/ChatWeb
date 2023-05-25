function comprobarContraseña() {
    let pass = document.getElementById("pass").value;
    let checkPass = document.getElementById("checkPassInput").value;

    if (pass != checkPass) {
        document.getElementById("checkPassLabel").style.color = "red";
        document.getElementById("checkPassLabel").style.fontStyle = "italic";
        document.getElementById("checkPassInput").style.border = "1px solid red";
    } else {
        document.getElementById("checkPassLabel").style.color = "black";
        document.getElementById("checkPassLabel").style.fontStyle = "normal";
        document.getElementById("checkPassInput").style.border = "1px solid black";
    }
}