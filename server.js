//Se crea el servidor http
const http = require('http').createServer();

//Se crea el socket
const io = require('socket.io')(http);

//Se establece el numero de puerto
const port = 3000;

//Se importa la libreria 'fs' para manejo de filesystem
const fs= require('fs');

//Se pone a escuchar al servidor en el puerto establecido
http.listen(port, () => console.log(`Servidor escuchando en el puerto: ${port}`));

//Se lee el archivo con el texto editado (si se uso el programa anteriormente)
let textoCompleto = fs.readFileSync('texto.txt', 'utf8');

//Funcion que se va a llamar cuando se conecte un usuario
//@param: socket del usuario
io.on('connection', (socket) => {
    //Se envia al usuario el texto recuperado previamente (en caso de haber usado el programa anteriormente)
    socket.emit('message', textoCompleto);
    
    //Funcion que se va a llamar cuando se reciba un texto por parte de un usuario
    socket.on('message', (texto) => {
        //Se guarda el texto
        textoCompleto= texto;
        //Se reenvia el texto a todos los demas usuarios
        socket.broadcast.emit('message', texto);
    });
});

//Funcion que se va a llamar cada cierta cantidad de tiempo (10 segundos en este caso)
//Guarda el ultimo texto recibido en un archivo 'texto.txt'
setInterval(() => {
    fs.writeFile('texto.txt', textoCompleto, ()=> {
        console.log(`Se guardo: ${textoCompleto}`);
    })
},10000);