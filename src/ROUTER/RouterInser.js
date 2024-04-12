const express=require('express');
const insertar=require('../DB/Inser')
const router=express.Router();

router.post('/NuevoUsuario',(req,res)=>{
    const AgregarUsuario=req.body;
    insertar.NuevoUsuario(
        AgregarUsuario.Nombre,
        AgregarUsuario.Apellido,
        AgregarUsuario.Foto,
        AgregarUsuario.Correo,
        AgregarUsuario.Contrasena
    )
    .then(()=>{
        res.json({message:"Usuario Agregado"})
    })
    .catch((e)=>{
        res.status(500).json({message:"Erro al agregar"})
    })
})

router.post('/InsertarLikeUsuario',(req,res)=>{
    const AgregarLike=req.body;
    insertar.InsertarLikesUsuario(
        AgregarLike.idPublicaciones,
        AgregarLike.idUsuarios
    )
    .then(()=>{
        res.json({message:" like Agregado"})
    })
    .catch((error)=>{
    res.status(500).json(error)
})

})
module.exports=router;
