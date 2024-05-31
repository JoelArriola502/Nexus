const express=require('express');
const cors=require('cors');
const socket=require('socket.io');
const http=require('http');
const morgan=require('morgan');
const path=require('path');
const app=express();
const port=4000;
app.use(express.json())//Insertar datos 
// app.use(morgan('dev'));
const srcpath=path.resolve(__dirname,'../src');
app.use(express.static(srcpath));
app.get('/',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'../src/HTML/index.html'));
})
let server=http.createServer(app);
app.use(cors());
app.use('/',require('../src/ROUTER/Router'));//requerimos nuestras rutas
app.use('/',require('../src/ROUTER/RouterInser'));
app.use('/',require('../src/ROUTER/RouterUpdate'));
app.use('/',require('../src/ROUTER/RouterDelete'));
let io=socket(server);

io.on('connect', function(cliente){
    console.log('Conectado al servidor')

    cliente.on('disconnect', function(){
        console.log('Desconectado del servidor')
    })

  cliente.on('mensaje',(mensajes)=>{
    io.emit('mensajes',mensajes);
  })
})
server.listen(port,()=>{
    console.log(`Corriendo en el puerto ${port}` )
})
