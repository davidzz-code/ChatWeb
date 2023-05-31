function añadirDiv() {
    let divAmigos = document.querySelector(".contenedor-amigos");
    let emailAmigo = document.getElementById("friend").value;


    let nuevoDiv = document.createElement("div");
    nuevoDiv.textContent = emailAmigo;
    nuevoDiv.classList.add("div-amigo");
    nuevoDiv.addEventListener("click", elegirChat);
    
    divAmigos.appendChild(nuevoDiv);
    document.getElementById("friend").value = "";
    
    nuevoDiv.style.backgroundColor = "lightgrey";
}

function elegirChat() {
    let colorChat = window.getComputedStyle(document.querySelector(".contenedor-principal")).backgroundColor;
    let todosLosAmigos = document.querySelectorAll(".div-amigo");


    for (let divAmigo of todosLosAmigos) {
        divAmigo.classList.remove("seleccionado");
        divAmigo.style.backgroundColor = "lightgray";
    }

    let chatElegido = this;
    chatElegido.classList.add("seleccionado");
    chatElegido.style.backgroundColor = colorChat;
    chatElegido.style.borderRight = "none";

}