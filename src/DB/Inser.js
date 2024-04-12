const conexion=require('./Conexion');

function NuevoUsuario(Nombre,Apellido,Foto,Correo,Contrasena){
    return conexion('Usuarios').insert({
        Nombre:Nombre,
        Apellido:Apellido,
        Foto:Foto,
        Correo:Correo,
        Contrasena:Contrasena
    })
}

function InsertarLikesUsuario(idPublicaciones,idUsuarios){
    return conexion('LikePublicaciones')
             .insert({
                idPublicaciones:idPublicaciones,
                idUsuarios:idUsuarios

             })
}

// insert into Comentarios(Comentario,idPublicaciones,idUsuarios)values('Esa publicacion no es muy adecuada',9,4)
function InsertarComentario(Comentario,idPublicaciones,idUsuarios){
    return conexion('Comentarios').insert({
        Comentario:Comentario,
        idPublicaciones:idPublicaciones,
        idUsuarios:idUsuarios
    })
}
module.exports={NuevoUsuario,InsertarLikesUsuario,InsertarComentario}