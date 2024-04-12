const Actualizar=require('./Conexion');

function LikesPublicaciones(idPublicaciones,OLikes){
    return Actualizar('Publicaciones')
    .where('idPublicaciones',idPublicaciones)
    .update({
       Likes: Actualizar.raw('Likes + ?',OLikes)
    })

}

function LikesPublicacionesNull(idPublicaciones,OLikes){
    return Actualizar('Publicaciones')
    .where('idPublicaciones',idPublicaciones)
    .update({
       Likes:OLikes 
    })

}

function LikesPublicacionesMenos(idPublicaciones,OLikes){
    return Actualizar('Publicaciones')
    .where('idPublicaciones',idPublicaciones)
    .update({
       Likes: Actualizar.raw('Likes - ?',OLikes)
    })

}

module.exports={LikesPublicaciones,LikesPublicacionesNull,LikesPublicacionesMenos}