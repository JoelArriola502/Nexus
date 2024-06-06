const express=require('express');
const consulta=require('../DB/Consultas');
const  bcryptjs=require('bcryptjs');
const router=express.Router();
router.get('/Usuarios',(req,res)=>{
    consulta.usuarios()
    .then(response=>res.json(response))
    .catch((e)=>{
        res.status(500).json(e)
    })
});

router.post('/IniciarSesion',(req,res)=>{
    const Correo=req.body.Correo;
    const Contrasena=req.body.Contrasena;

    consulta.InicoSesion(Correo)
    .then(response=>{
        if(response.length>0){
            const ContraBD = response.map(usuario => usuario.Contrasena)[0]; // Obtener la contraseña de la base de datos
            const idUsuario=response.map(usuario => usuario.idUsuarios)[0];
            // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
            
            const contraseñaValida = bcryptjs.compareSync(Contrasena, ContraBD);
            if (contraseñaValida) {
                res.json({ message: "ContrasenaValida",idUsuario });
            } else {
                res.status(401).json({ message: "Contrasenaincorrecta" });
            }
        } else {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
    })
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

router.get('/Maxid',(req,res)=>{
    
    consulta.ObtenerMaxIdPublicaciones()
    .then(response=>res.json(response))
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })
   
})

router.get('/UsuariosEtiquetados/:idPublicaciones',(req,res)=>{
    const idPublicaciones=req.params.idPublicaciones;
    consulta.UsuariosEtiquetados(idPublicaciones)
    .then(response=>res.json(response))
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })
   
})

router.get('/UsuariosMensajes/:idUsuarios',(req,res)=>{
    const idUsuario=req.params.idUsuarios;
    consulta.MostraUsuariosMensaje(idUsuario)
    .then(response=>res.json(response))
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })
   
})
router.get('/UltimoMensaje/:idUsuarios/:idUsuariosDestino',(req,res)=>{
    const idUsuario=req.params.idUsuarios;
    const idUsuarioDestino=req.params.idUsuariosDestino;
    consulta.ultimos_mensajes(idUsuario,idUsuarioDestino)
    .then(response=>res.json(response))
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })
   
})

router.get('/Mensajeschat/:idUsuarios/:idUsuariosDestino',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    const idUsuariosDestino=req.params.idUsuariosDestino;
    consulta.MostrarMensajesChatUsuarios(idUsuarios,idUsuariosDestino)
    .then(response=>res.json(response))
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })
   
})
router.get('/TotalAmigos/:idUsuarios',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    consulta.CantidadAmigos(idUsuarios)
    .then(response=>res.json(response))
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })
   
})

router.get('/TotalSeguidores/:idUsuarios',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    consulta.CantidadSeguidores(idUsuarios)
    .then(response=>res.json(response))
    .catch((error)=>{
        res.status(500).json({error:"Error "})
    })
   
})

router.get('/FotoPortadaMax/:idUsuarios',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    consulta.FotosPortadaMostrar(idUsuarios)
    .then(response=>res.json(response))
    .catch((Error)=>{
        res.status(500).json({Error:"Error al ver Portada"})
    })
})
module.exports=router;