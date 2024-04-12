const express=require('express');
const Delete=require('../DB/Delete');
const router=express.Router();

router.delete('/LikesUsuarios/:idUsuarios/:idPublicaciones',(req,res)=>{
    const idUsuarios=req.params.idUsuarios;
    const idPublicaciones=req.params.idPublicaciones;
    Delete.EliminarRegistroLike(idUsuarios,idPublicaciones)
    .then((response)=>{
        if(response){
            res.json(response)
        }else{
            res.status(404).json({message:"Like no Registrado"})
        }
    })
    .catch((error)=>{
        res.status(500).json({error:"no se Pudo eliminar"})
    })
})
module.exports=router;