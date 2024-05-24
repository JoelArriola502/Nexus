const express=require('express');
const Actualizar=require('../DB/Update');
const { json } = require('body-parser');
const router=express.Router();

router.put('/LikesPublicaciones/:idPublicaciones',(req,res)=>{
    const idPublicaciones=req.params.idPublicaciones;
    const ActualizarLike=req.body;
    Actualizar.LikesPublicaciones(idPublicaciones,
    ActualizarLike.Likes)
    .then((response)=>{
        if(response){
            res.json('Actualizacion Exitosa');
        }else{
            res.status(400).json({message:"Error "})
        }
    })
    .catch(error=>{
        res.status(500).json(error)
    })
})

router.put('/LikesPublicacionesNull/:idPublicaciones',(req,res)=>{
    const idPublicaciones=req.params.idPublicaciones;
    const ActualizarLike=req.body;
    Actualizar.LikesPublicacionesNull(idPublicaciones,
    ActualizarLike.Likes)
    .then((response)=>{
        if(response){
            res.json('Actualizacion Exitosa');
        }else{
            res.status(400).json({message:"Error "})
        }
    })
    .catch(error=>{
        res.status(500).json(error)
    })
})


router.put('/LikesPublicacionesMenos/:idPublicaciones',(req,res)=>{
    const idPublicaciones=req.params.idPublicaciones;
    const ActualizarLike=req.body;
    Actualizar.LikesPublicacionesMenos(idPublicaciones,
    ActualizarLike.Likes)
    .then((response)=>{
        if(response){
            res.json('Actualizacion Exitosa');
        }else{
            res.status(400).json({message:"Error "})
        }
    })
    .catch(error=>{
        res.status(500).json(error)
    })
})

router.put('/ActualizarEstado/:idPublicaciones/:idUsuarios',(req,res)=>{
    const idPublicaciones=req.params.idPublicaciones;
    const idUsuarios=req.params.idUsuarios;
    const ActualizarDato=req.body;
    Actualizar.ActualizarEstadoLike(idPublicaciones,idUsuarios,ActualizarDato.Estado)
    .then(response=>{
        if(response){
            res.json({message:"Actualizacion Exitosa"})
        }else{
            res.json(400).json("no se pudo actualizar")
        }
    })
    .catch((error)=>{
        res.status(500).json({message:"error",error})
    })

})
router.put('/EstadoSeguidor/:idUsuarioOrigen/:idUsuariosDestino',(req,res)=>{
    const idUsuarioOrigen=req.params.idUsuarioOrigen;
    const idUsuariosDestino=req.params.idUsuariosDestino;
    const EstadoActualizar=req.body;
    Actualizar.ActualizarEstadoSeguidor(
        idUsuarioOrigen,
        idUsuariosDestino,
        EstadoActualizar.Estado
    )
    .then((response)=>{
        if(response){
            res.json({message:"Estado Actualizado"});
        }else{
            res.status(400).json({message:"Error al actualizae¿r"});
        }
    })
    .catch((error)=>{
        res.status(500).json({error:"Hay un error"})
    })
})
router.put('/ActualizaNombre/:idUsuarios',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    const DatosActualizar=req.body;
    Actualizar.ActualizarNombreApellido(
        idUsuarios,
        DatosActualizar.Nombre,
        DatosActualizar.Apellido
    )
    .then((response)=>{
        if(response){
            res.json({message:"Datos Actualizado"});
        }else{
            res.status(400).json({message:"Error al actualizar"});
        }
    })
    .catch((error)=>{
        res.status(500).json({error:"Hay un error"})
    })
})

router.put('/ActualizaFotoPerfil/:idUsuarios',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    const DatosActualizar=req.body;
    Actualizar.ActualizarFotoPerfil(
        idUsuarios,
        DatosActualizar.Foto,
    )
    .then((response)=>{
        if(response){
            res.json({message:"Datos Actualizado"});
        }else{
            res.status(400).json({message:"Error al actualizar"});
        }
    })
    .catch((error)=>{
        res.status(500).json({error:"Hay un error"})
    })
})
module.exports=router;