var socket=io();
socket.on('connect', function(){
    console.log('Conectado al servidor');
})

socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
})
socket.emit('mensajes',{
    mensaje:'Hola mundo',
    usuarios:"Joel Arriola"
});