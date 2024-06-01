var socket=io();
socket.on('connect', function(){
    console.log('Conectado al servidor',idUsuarios);
    socket.emit('RegistrarId',idUsuarios);
})

socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
})