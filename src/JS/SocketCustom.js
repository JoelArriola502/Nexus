var socket=io();
socket.on('connect', function(){
    socket.emit('RegistrarId',id);
})

socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
})