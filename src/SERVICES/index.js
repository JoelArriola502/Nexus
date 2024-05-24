const express=require('express');
const cors=require('cors');
const app=express();
const port=4000;
app.use(express.json())//Insertar datos 
app.use(cors());
app.use('/',require('../ROUTER/Router'));//requerimos nuestras rutas
app.use('/',require('../ROUTER/RouterInser'));
app.use('/',require('../ROUTER/RouterUpdate'));
app.use('/',require('../ROUTER/RouterDelete'));
app.listen(port,()=>{
    console.log(`Corriendo en el puerto ${port}` )
})