const {io}=require('../index');
const connectedClients={};
io.on('connect', function(cliente){
    console.log('Conectado al servidor',cliente.id);
    cliente.on('RegistrarId', (id) => {
        console.log('Usuario registrado con ID:', id);
        connectedClients[id] = cliente;
    });
    cliente.on('disconnect', function(){
        console.log('Desconectado del servidor',cliente.id);
    })

  cliente.on('mensajes',(mensajes)=>{
    io.emit('mensajes',mensajes);
    console.log("id es ",mensajes);
  })
})