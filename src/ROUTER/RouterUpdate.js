const express=require('express');
const Actualizar=require('../DB/Update');
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
module.exports=router;