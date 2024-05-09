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

function ActualizarEstadoLike(idPublicaciones,idUsuarios,Estado){
    return Actualizar('LikePublicaciones')
    .where('idPublicaciones',idPublicaciones)
    .andWhere('idUsuarios',idUsuarios)
    .update({
        Estado:Estado
    })
}

module.exports={LikesPublicaciones,LikesPublicacionesNull,LikesPublicacionesMenos,ActualizarEstadoLike}