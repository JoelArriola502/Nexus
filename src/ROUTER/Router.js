const express=require('express');
const consulta=require('../DB/Consultas');

const router=express.Router();
router.get('/Usuarios',(req,res)=>{
    consulta.usuarios()
    .then(response=>res.json(response))
    .catch((e)=>{
        res.status(500).json(e)
    })
});

router.get('/Correo',(req,res)=>{
    consulta.CorreoUsuario()
    .then((response)=>res.json(response))
    .catch((e)=>{
        res.status(500).json({e:"Error al mostrar "})
    })
})
module.exports=router;