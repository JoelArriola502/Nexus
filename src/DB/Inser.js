const conexion = require("./Conexion");

function NuevoUsuario(Nombre, Apellido, Foto, Correo, Contrasena) {
  return conexion("Usuarios").insert({
    Nombre: Nombre,
    Apellido: Apellido,
    Foto: Foto,
    Correo: Correo,
    Contrasena: Contrasena,
  });
}

function InsertarLikesUsuario(Estado, idPublicaciones, idUsuarios) {
  return conexion("LikePublicaciones").insert({
    Estado: Estado,
    idPublicaciones: idPublicaciones,
    idUsuarios: idUsuarios,
  });
}

// insert into Comentarios(Comentario,idPublicaciones,idUsuarios)values('Esa publicacion no es muy adecuada',9,4)
function InsertarComentario(Comentario, idPublicaciones, idUsuarios) {
  return conexion("Comentarios").insert({
    Comentario: Comentario,
    idPublicaciones: idPublicaciones,
    idUsuarios: idUsuarios,
  });
}
function InsertarSeguidorNuevo(Estado, idUsuariosOrigen, idUsuariosDestino) {
  return conexion("Seguidores").insert({
    Estado: Estado,
    idUsuariosOrigen: idUsuariosOrigen,
    idUsuariosDestino: idUsuariosDestino,
  });
}

function InsertarPublicacion(Descripcion, imagen, video, musica, idUsuarios) {
  return conexion("Publicaciones").insert({
    Descripcion: Descripcion,
    imagen: imagen,
    video: video,
    musica: musica,
    idUsuarios: idUsuarios,
  });
}

function InsertarEtiqueta(
  idPublicaciones,
  idUsuariosOrigen,
  idUsuariosDestino
) {
  return conexion("Etiqueta").insert({
    idPublicaciones: idPublicaciones,
    idUsuariosOrigen: idUsuariosOrigen,
    idUsuariosDestino: idUsuariosDestino,
  });
}

// insert into Mensajes(Mensaje,idUsuarioOrigen,idUsuarioDestino)values('Pues por el momneto ',3,1)

function InsertarNuevoMensaje(Mensaje, idUsuarioOrigen, idUsuarioDestino) {
  return conexion("Mensajes").insert({
    Mensaje: Mensaje,
    idUsuarioOrigen: idUsuarioOrigen,
    idUsuarioDestino: idUsuarioDestino,
  });
}

function InsertarFoto(Foto,idUsuarios){
  return conexion('FotosPerfil').insert({
Foto:Foto,
idUsuarios:idUsuarios

  })
}



function InsertarFotoPortada(Foto,idUsuarios){
return conexion('FotosPortada').insert({
  Foto:Foto,
  idUsuarios:idUsuarios
});
}
module.exports = {
  NuevoUsuario,
  InsertarLikesUsuario,
  InsertarComentario,
  InsertarSeguidorNuevo,
  InsertarEtiqueta,
  InsertarPublicacion,
  InsertarNuevoMensaje,
  InsertarFoto,
  InsertarFotoPortada
};
