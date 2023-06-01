let i = 1;
var idContacto;
var idConversacion;
var contactoSeleccionado = null;
var ip = "localhost";

function cargarContactos(emailAmigo) {
    let divContactos = document.querySelector(".contenedor-amigos");
    let contenedorPrincipal = document.querySelector(".contenedor-principal");
    

    let divAmigo = document.createElement("div");
    let conversacion = document.createElement("div");
    
    // Asigna clases
    divAmigo.classList.add("div-amigo");
    conversacion.classList.add("conversacion");

    // Crea divs únicos usando "i" para iterar
    divAmigo.id = "contacto-" + i;
    divAmigo.textContent = emailAmigo;
    conversacion.id = "conversacion-" + i;

    // Agrega divs dentro de "conversacion"

    divAmigo.addEventListener("click", function () {
        idContacto = this.id;
        idConversacion = idContacto.replace("contacto", "conversacion");
        
        mostrarConversacion();
    });

    i++;
    

    // Anade los divs a sus respectivos divs padres

    divContactos.appendChild(divAmigo);
    contenedorPrincipal.appendChild(conversacion);
}

function mostrarConversacion()  {
    // Guarda los id de "contacto" y "conversacion" en varaibles
    // Usamos "target.getAttribute" porque el id no es fijo, ya que va iterando la i.
    // Está conectando la conversacion al contacto ya que el número de ínidice es el mismo para los dos.
    let conversacion = document.getElementById(idConversacion);


    // Guarda el color del fondo principal para copiarlo en el contacto
    let colorChat = window.getComputedStyle(document.querySelector(".contenedor-principal")).backgroundColor;
    let contacto = document.getElementById(idContacto);


    /// Reestablece las propiedades cuando se selecciona otro contacto
    if (contactoSeleccionado) {
        contactoSeleccionado.style.color = "";
        contactoSeleccionado.style.backgroundColor = "";
    }
    
    // Canbia el color del contacto seleccionado
    contacto.style.color = "#1e1e1e";
    contacto.style.backgroundColor = "#ffc91d";

    // Oculta todos los divs de conversación
    let listaConversaciones = document.querySelectorAll(".conversacion");
    for (let conver of listaConversaciones) {
        conver.style.display = "none";
    }

    // Muestra el div de conversación del contacto seleccionado
    conversacion.style.display = "flex";


    contactoSeleccionado = contacto;
}

function anadirAmigo() {
    let http = new XMLHttpRequest();

    let mail = sessionStorage.getItem("mail");
    let session = sessionStorage.getItem("session");
    let friend = document.getElementById("friend").value;

    http.open("POST", "http://" + ip + ":5000/XatLLM/Friend", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("mail="+mail+"&session="+session+"&friend="+friend);
    
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            let respuesta = http.responseText;
            
            if (respuesta == 0) {
                alert("ERROR. El servidor no responde");
            } else if (respuesta == 1) {                
                console.log("Contacto añadido");
                cargarContactos(friend);

            } else if (respuesta == 2) {
                alert("Contacto no encontrado");
            } else if (respuesta == 3) {
                alert("Se acabó la sesión");
                window.open("iniciarSesion.html");
            } else if (respuesta == 4) {
                alert("Ese contacto ya está en tu lista");
            }
        }
    }
}

function recibirAmigos() {
    let http = new XMLHttpRequest();

    let mail = sessionStorage.getItem("mail");
    let session = sessionStorage.getItem("session");

    http.open("GET", "http://"+ip+":5000/XatLLM/Friend?mail="+mail+"&session="+session);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            let jsonAmigos = JSON.parse(http.responseText);
            
            
            for (let i = 0; i < jsonAmigos.length; i++){
                let persona = jsonAmigos[i];
                cargarContactos(persona, i);
            }
            
        }
    }
}

function enviarMensaje() {
    let http = new XMLHttpRequest();

    let mail = sessionStorage.getItem("mail");
    let session = sessionStorage.getItem("session");
    let receptor = document.getElementById(idContacto).textContent;
    let sms = document.getElementById("sms").value;

    http.open("POST", "http://"+ ip+ ":5000/XatLLM/Xat", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("mail="+mail+"&session="+session+"&receptor="+receptor+"&sms="+sms);

    let chat = document.getElementById(idConversacion);
    chat.innerHTML += "<div class=\"mensaje mensajeUsuario\"><p class=\"texto\">" + sms + "</p></div>";
    document.getElementById("sms").value = "";
}

function recibirMensaje() {
    let http = new XMLHttpRequest();

    let mail = sessionStorage.getItem("mail");
    let session = sessionStorage.getItem("session");
    
    http.open("GET", "http://"+ ip +":5000/XatLLM/Xat?mail=" + mail + "&session=" + session, true);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            let mensajeRespuesta = JSON.parse(http.responseText);

            let chat = document.getElementById(idConversacion);
            chat.innerHTML += "<div class=\"mensaje mensajeContacto\"><p class=\"texto\">" + mensajeRespuesta.text + "</p></div>";

            recibirMensaje();
        }
    }
}

function cerrarSesion() {
    sessionStorage.removeItem("mail");
    sessionStorage.removeItem("session");
    sessionStorage.removeItem("pass");

    window.location.href = "iniciarSesion.html";
}

function nombreUsuario() {
    let mailUsuario = sessionStorage.getItem("mail");
    document.querySelector(".nombre-usuario").innerHTML = mailUsuario;
}

var inputAmigo = document.getElementById("friend");

inputAmigo.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        anadirAmigo();
    }
});


var inputMensaje = document.getElementById("sms");

inputMensaje.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        enviarMensaje();
    }
});