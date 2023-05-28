function añadirAmigo() {
    let http = new XMLHttpRequest();

    let mail = sessionStorage.getItem("mail");
    let session = sessionStorage.getItem("session");
    let friend = document.getElementById("friend").value;

    http.open("POST", "http://localhost:5000/XatLLM/Friend", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("mail="+mail+"&session="+session+"&friend="+friend);
    
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            let respuesta = http.responseText;
            
            if (respuesta == 0) {
                console.log("ERROR. El servidor no responde");
            } else if (respuesta == 1) {                
                console.log("Amigo añadido")
                recibirAmigos();

            } else if (respuesta == 2) {
                console.log("Amigo no encontrado");
            } else if (respuesta == 3) {
                console.log("Se acabó la sesión");
                document.getElementById("repetirSesion").innerHTML = "Sesión caducada. Vuelve a iniciar sesión";
                window.open("iniciarSesion.hmtl", "_blank");
            }
        }
    }
}


function recibirAmigos() {
    let http = new XMLHttpRequest();

    let mail = sessionStorage.getItem("mail");
    let session = sessionStorage.getItem("session");

    http.open("GET", "http://localhost:5000/XatLLM/Friend?mail="+mail+"&session="+session);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            let jsonAmigos = JSON.parse(http.responseText);

            let select = document.getElementById("listaAmigos");
            select.innerHTML = "";
            
            for (let i = 0; i < jsonAmigos.length; i++){
                let option = document.createElement("option");
                
                option.text = jsonAmigos[i];
                option.value = jsonAmigos[i];
                select.add(option);
            }
        }
    }
}

function enviarMensaje() {
    let http = new XMLHttpRequest();

    let mail = sessionStorage.getItem("mail");
    let session = sessionStorage.getItem("session");
    let receptor = document.getElementById("listaAmigos").value;
    let sms = document.getElementById("sms").value;

    http.open("POST", "http://localhost:5000/XatLLM/Xat", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("mail="+mail+"&session="+session+"&receptor="+receptor+"&sms="+sms);

    let chat = document.querySelector(".chat");
    chat.innerHTML += mail + ": " + sms + "<br>";
    document.getElementById("sms").value = "";
}


function recibirMensaje() {
    let http = new XMLHttpRequest();

    let mail = sessionStorage.getItem("mail");
    let session = sessionStorage.getItem("session");
    
    http.open("GET", "http://localhost:5000/XatLLM/Xat?mail=" + mail + "&session=" + session, true);
    http.send();
    console.log("Enviado a GET");

    http.onreadystatechange = function () {
        console.log("Ready state:", http.readyState);
        console.log("Status:", http.status);
        if (http.readyState == 4 && http.status == 200) {
            console.log("si status");
            let mensajeRespuesta = JSON.parse(http.responseText);

            let chat = document.querySelector(".chat");
            chat.innerHTML += mensajeRespuesta.emisor + ": " + mensajeRespuesta.text + "<br>";
        }
    }
}

setInterval(recibirMensaje, 4000);

function cerrarSesion() {
    sessionStorage.setItem("mail", "");
    sessionStorage.setItem("session", "");
    sessionStorage.setItem("pass", "");

    window.location.href = "iniciarSesion.html";
}

function nombreUsuario() {
    let mailUsuario = sessionStorage.getItem("mail");

    document.querySelector(".titulo").innerHTML = "Hola " + mailUsuario;
}