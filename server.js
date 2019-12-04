const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 3000;

const fs= require('fs');

http.listen(port, () => console.log(`Servidor escuchando en el puerto: ${port}`));

let textoCompleto = fs.readFileSync('texto.txt', 'utf8');
//console.log(textoCompleto);

io.on('connection', (socket) => {
    //console.log('Conectado');

    socket.emit('message', textoCompleto);
    
    socket.on('message', (texto) => {
        textoCompleto= texto;
        //console.log(textoCompleto);
        socket.broadcast.emit('message', texto);
    });
});

setInterval(() => {
    fs.writeFile('texto.txt', textoCompleto, ()=> {
        //console.log(`Se guardo: ${textoCompleto}`);
    })
},10000);