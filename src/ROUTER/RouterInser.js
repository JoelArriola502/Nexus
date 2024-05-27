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
        AgregarLike.Estado,
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
router.post('/InsertarComentarios',(req,res)=>{
    const Agregarcomentario=req.body;
    insertar.InsertarComentario(
        Agregarcomentario.Comentario,
        Agregarcomentario.idPublicaciones,
        Agregarcomentario.idUsuarios)
    .then((response)=>{
        if(response){
            res.json({message:"Comentario Agregado"})
        }else{
            res.status(404).json({message:"Erro al Agregar"})
        }
    })
    .catch((error)=>{
        res.status(500).json(error);
    })
})
router.post('/NuevoSeguidor',(req,res)=>{
    const AgregarNuevoSeguidor=req.body;
    insertar.InsertarSeguidorNuevo(
        AgregarNuevoSeguidor.Estado,
        AgregarNuevoSeguidor.idUsuariosOrigen,
        AgregarNuevoSeguidor.idUsuariosDestino
    )
    .then((response)=>{
        if(response){
            res.json({message:"Seguidor Nuevo Ageragado"})
        }else{
            res.status(400).json({message:"Error 400"})
        }
    })
    .catch((error)=>{
        res.status(500).json({error})
    })
})

router.post('/NuevaPublicacion',(req,res)=>{
    const PublicacionDatos=req.body;
    insertar.InsertarPublicacion(
        PublicacionDatos.Descripcion,
        PublicacionDatos.imagen,
        PublicacionDatos.video,
        PublicacionDatos.musica,
        PublicacionDatos.idUsuarios

    )
    .then((respuesta)=>{
        if(respuesta){
            res.json({message:"Publicación creada exitosamente"});
        }else{
            res.status(400).json({message:"Error al crear la publicación"})
        }
    })
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })

})

router.post('/Etiquetar',(req,res)=>{
    const Etiquetar=req.body;
    insertar.InsertarEtiqueta(
        Etiquetar.idPublicaciones,
        Etiquetar.idUsuariosOrigen,
        Etiquetar.idUsuariosDestino

    )
    .then((respuesta)=>{
        if(respuesta){
            res.json({message:"Publicación Etiquetada exitosamente"});
        }else{
            res.status(400).json({message:"Error al crear la etiquetar"})
        }
    })
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })

})

router.post('/InsertarMensaje',(req,res)=>{
    const AgregarMensaje=req.body;
    insertar.InsertarNuevoMensaje(AgregarMensaje.Mensaje,
                                  AgregarMensaje.idUsuarioOrigen,
                                  AgregarMensaje.idUsuarioDestino
    )
    .then((respuesta)=>{
        if(respuesta){
            res.json({message:"Mensaje Insertado Con Exito"});
        }else{
            res.status(400).json({message:"error"})
        }
    }).catch((error)=>{
        res.status(500).json({error:"Hay error"})
    })

})

router.post('/InsertarFoto',(req,res)=>{
    const AgregarFoto=req.body;
    insertar.InsertarFoto(AgregarFoto.Foto,AgregarFoto.idUsuarios)
    .then((respuesta)=>{
        if(respuesta){
            res.json({message:"Foto Insertada Con exito"});
        }else{
            res.status(400).json({message:"Error"});
        }
    })
    .catch((error)=>{
        res.status(500).json({error:"Hay error"})
    })
})
module.exports=router;
