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

router.get('/PublicacionesLike/:idPublicaciones',(req,res)=>{
    const idPublicaciones=req.params.idPublicaciones;
    consulta.PublicacionVerLikes(idPublicaciones)
    .then(response=>res.json(response))
    .catch((Error)=>{
        res.status(500).json({Error:"Error al ver like"})
    })
})

router.get('/LikesUsuarios/:idUsuarios/:idPublicaciones',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    const idPublicaciones=req.params.idPublicaciones;
    consulta.LikeUsuario(idUsuarios,idPublicaciones)
    .then((response)=>{
        if(response){
            res.json(response)
        }else{
            res.status(404).json({message:"Like no Registrado"})
        }
    })
    .catch((error)=>{
        res.status(500).json(error)
    })
})

router.get('/LikesUsuariosPublicaciones/:idUsuarios/:idPublicaciones',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    const idPublicaciones=req.params.idPublicaciones;
    consulta.LikeUsuarioPublicaciones(idUsuarios,idPublicaciones)
    .then((response)=>{
        if(response){
            res.json(response)
        }else{
            res.status(404).json({message:"Like no Registrado"})
        }
    })
    .catch((error)=>{
        res.status(500).json(error)
    })
})

router.get('/PublicacionesUsuarios/:idUsuarios/:idPublicaciones',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    const idPublicaciones=req.params.idPublicaciones;
    consulta.PublicacionesUsuarios(idUsuarios,idPublicaciones)
    .then((response)=>{
        if(response){
            res.json(response)
        }else{
            res.status(404).json({message:"Publicacion no encontrada"})
        }
    })
    .catch((error)=>{
        res.status(500).json(error)
    })
})


router.get('/Publicacionescomentarios/:idPublicaciones',(req,res)=>{
    const idPublicaciones=req.params.idPublicaciones;
    consulta.PublicacionesComentarios(idPublicaciones)
    .then((response)=>{
        if(response){
            res.json(response)
        }else{
            res.status(404).json({message:"No se encontro nada"})
        }
    })
    .catch((error)=>{
        res.status(500).json(error);
    })
})

router.get('/ComentariosPublicaciones/:idPublicaciones',(req,res)=>{
    const idPublicaciones=req.params.idPublicaciones;
    consulta.ComentariosPublicacion(idPublicaciones)
    .then((response)=>{
        if(response){
            res.json(response)
        }else{
            res.status(404).json({message:"No se encontro nada"})
        }
    })
    .catch((error)=>{
        res.status(500).json(error);
    })
})

router.get('/ComentariosPublicacionesNumero/:idPublicaciones',(req,res)=>{
    const idPublicaciones=req.params.idPublicaciones;
    consulta.ComentariosPublicacionNumero(idPublicaciones)
    .then((response)=>{
        if(response){
            res.json(response)
        }else{
            res.status(404).json({message:"No se encontro nada"})
        }
    })
    .catch((error)=>{
        res.status(500).json(error);
    })
})

router.get('/Usuarios/:idUsuarios',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    consulta.Usuarios(idUsuarios)
    .then(response=>res.json(response))
    .catch((e)=>res.status(500).json(e))
})
router.get('/Seguidores/:idUsuariosOrigen/:ididUsuariosDestino',(req,res)=>{
    const idUsuariosOrigen=req.params.idUsuariosOrigen;
    const idUsuariosDestino=req.params.ididUsuariosDestino;
    consulta.VerSeguidores(idUsuariosOrigen,idUsuariosDestino)
    .then(response=>res.json(response))
    .catch(error=>{
        res.status(500).json(error)
    })

})

router.get('/Siguiendo/:idUsuarios',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    consulta.UsuariosSiguiendo(idUsuarios)
    .then(response=>res.json(response))
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })
   
})
router.get('/Seguidores/:idUsuarios',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    consulta.UsuariosSeguidores(idUsuarios)
    .then(response=>res.json(response))
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })
   
})
router.get('/AmigosUsuarios/:idUsuarios',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    consulta.AmigosUsuario(idUsuarios)
    .then(response=>res.json(response))
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })
   
})
module.exports=router;