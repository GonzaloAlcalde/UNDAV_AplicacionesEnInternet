var socket = io('http://localhost:3000');

const editor = document.getElementById("editor");

editor.addEventListener("keyup", () => {
    const texto = editor.value;
    socket.send(texto);
})

socket.on('message', (texto) => {
    editor.value = texto;
})