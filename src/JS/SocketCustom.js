var socket=io();
socket.on('connect', function(){
    console.log('Conectado al servidor',id);
    socket.emit('RegistrarId',id);
})

socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
})