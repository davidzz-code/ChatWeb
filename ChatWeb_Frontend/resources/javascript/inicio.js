var contrasenaValida = false;
var ip = "localhost";

function comprobarContrasena() {
    let pass = document.getElementById("pass").value;
    let checkPass = document.getElementById("checkPass").value;

    if (pass != checkPass) {
        document.getElementById("checkPass").style.border = "1px solid red";
    } else {
        document.getElementById("checkPass").style.border = "1px solid black";
        contrasenaValida = true;
    }


}

function enviarRegistro() {
    var http = new XMLHttpRequest();

    let user = document.getElementById("user").value;
    let mail = document.getElementById("mail").value;
    let pass = document.getElementById("pass").value;
    let checkPass = document.getElementById("checkPass").value;
    let codeCountry = document.getElementById("codeCountry").value;
    let conditions = document.getElementById('conditions');
    http.open("POST", "http://"+ip+":5000/XatLLM/Register", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("user="+user+"&mail="+mail+"&pass="+pass+"&codeCountry="+codeCountry);
    
    // Respuesta
    if (pass == checkPass) {
        if (conditions.checked) {

            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {// Si el atributo Status es igual a 200 significa que HA IDO TODO BIEN
                    if (user.trim() === '' || mail.trim() === '' || pass.trim() === '' || codeCountry.trim() === '') {
                        document.querySelector(".result").innerHTML = "Completa todos los campos";
                        return;
                    }

                    console.log("Registro completado: " + http.responseText);

                    document.querySelector(".result").innerHTML = "Te has registrado";
                    document.querySelector(".result").style.color = "#1470df";
                    
                }
            }
        } else {
            document.querySelector(".result").innerHTML = "Debes aceptar las condiciones";
        }
    } else {
        document.querySelector(".result").innerHTML = "Las contraseñas no coinciden";
    }
}

function enviarLogin() {
    let http = new XMLHttpRequest();
    let mail = document.getElementById("mail").value;
    let pass = document.getElementById("pass").value;

    http.open("GET", "http://"+ip+":5000/XatLLM/Login?mail="+mail+"&pass="+pass);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            let session = this.responseText;
            if (session != "false") {
                window.sessionStorage.setItem("mail", mail);
                window.sessionStorage.setItem("pass", pass);
                window.sessionStorage.setItem("session", session);
                window.location.href = "chat.html";
            } else {
                document.querySelector(".result").innerHTML = "Login incorrecto";
            }
        }
    }
}

function getCountries() {
    let http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("ready");

            let jsonString = http.responseText;

            let countryList = JSON.parse(jsonString);
            console.log(countryList);

            for (let i = 0; i < countryList.length; i++){
                let select = document.getElementById("codeCountry");
                let option = document.createElement("option");
                option.text = countryList[i].name;
                option.value = countryList[i].code;
                select.add(option);
            }
        }
    }
    http.open("GET", "http://"+ip+":5000/XatLLM/Register", true);
    http.send();
}