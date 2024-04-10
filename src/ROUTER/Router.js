const express=require('express');
const consulta=require('../DB/Consultas');
const e = require('cors');

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

router.get('/DatosPerfil/:idUsuarios',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    consulta.DatosPerfil(idUsuarios)
    .then(response=>{
        if(response){
            res.json(response);
        }else{
            res.status(404).json({message:"Datos no encontrados"})
        }
    })
    .catch((e)=>{
        res.status(500).json({e:"error"})
    })
})

router.get('/Publicaciones/:idUsuarios',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    consulta.Publicaciones(idUsuarios)
    .then(response=>res.json(response))
    .catch(error=>{
        res.status(500).json({error:"error"})
    })
})
module.exports=router;