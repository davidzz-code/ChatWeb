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

    let user = document.getElementById("user").value;
    let mail = document.getElementById("mail").value;
    let pass = document.getElementById("pass").value;
    let codeCountry = document.getElementById("codeCountry").value;

    http.open("POST", "http://localhost:5000/ChatWeb_Backend/Register", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("user="+user+"&mail="+mail+"&pass="+pass+"&codeCountry="+codeCountry);

    // Respuesta
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { // Si el atributo Status es igual a 200 significa que HA IDO TODO BIEN
            console.log("Registro completado: " + http.responseText);
            document.getElementById("result").innerHTML = "Te has registrado";
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
    http.open("GET", "http://localhost:5000/ChatWeb_Backend/Register", true);
    http.send();
}