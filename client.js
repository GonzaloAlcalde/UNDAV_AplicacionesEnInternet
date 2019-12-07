//Se establece el servidor al que se conectara el cliente
var socket = io('http://localhost:3000');

//Se recupera el elemento HTML que contiene el editor de texto
const editor = document.getElementById("editor");

//Se agrega un evento al editor de texto que se dispara una vez el usuario deja de escribir
editor.addEventListener("keyup", () => {
    //Se recupera el texto escrito por el usuario
    const texto = editor.value;
    //Se envia al servidor dicho texto 
    socket.send(texto);
})

//Funcion que se va a llamar cuando el cliente reciba un texto por parte del servidor
socket.on('message', (texto) => {
    //Se muestra el mensaje recibido en el editor de texto
    editor.value = texto;
})