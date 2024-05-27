const Actualizar = require("./Conexion");

function LikesPublicaciones(idPublicaciones, OLikes) {
  return Actualizar("Publicaciones")
    .where("idPublicaciones", idPublicaciones)
    .update({
      Likes: Actualizar.raw("Likes + ?", OLikes),
    });
}

function LikesPublicacionesNull(idPublicaciones, OLikes) {
  return Actualizar("Publicaciones")
    .where("idPublicaciones", idPublicaciones)
    .update({
      Likes: OLikes,
    });
}

function LikesPublicacionesMenos(idPublicaciones, OLikes) {
  return Actualizar("Publicaciones")
    .where("idPublicaciones", idPublicaciones)
    .update({
      Likes: Actualizar.raw("Likes - ?", OLikes),
    });
}

function ActualizarEstadoLike(idPublicaciones, idUsuarios, Estado) {
  return Actualizar("LikePublicaciones")
    .where("idPublicaciones", idPublicaciones)
    .andWhere("idUsuarios", idUsuarios)
    .update({
      Estado: Estado,
    });
}
function ActualizarEstadoSeguidor(idUsuariosOrigen, idUsuariosDestino, Estado) {
  return Actualizar("Seguidores")
    .where("idUsuariosOrigen", idUsuariosOrigen)
    .andWhere("idUsuariosDestino", idUsuariosDestino)
    .update({
      Estado: Estado,
    });
}

function ActualizarNombreApellido(idUsuarios,Nombre,Apellido){
    return Actualizar('Usuarios')
          .where('idUsuarios',idUsuarios)
          .update({
            Nombre:Nombre,
            Apellido:Apellido
          })
}


function ActualizarFotoPerfil(idUsuarios,Foto){
  return Actualizar('Usuarios')
      .where('idUsuarios',idUsuarios)
      .update({
        Foto:Foto
      })
}
module.exports = {
  LikesPublicaciones,
  LikesPublicacionesNull,
  LikesPublicacionesMenos,
  ActualizarEstadoLike,
  ActualizarEstadoSeguidor,
  ActualizarNombreApellido,
  ActualizarFotoPerfil
};
