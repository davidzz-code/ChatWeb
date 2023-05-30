function añadirDiv() {
    let divAmigos = document.querySelector(".contenedor-amigos");

    let emailAmigo = document.getElementById("friend").value;
    let insertarDiv = "<div class=\"div-amigo\">" + emailAmigo + "</div>"
    
    divAmigos.innerHTML += insertarDiv;
}