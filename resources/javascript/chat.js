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
                console.log("Todo bien")
                
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

    let
}