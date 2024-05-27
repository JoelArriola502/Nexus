const conexion = require("./Conexion");
function usuarios() {
  return conexion("Usuarios");
}
function CorreoUsuario() {
  return conexion("Usuarios").select("Correo");
}

function DatosPerfil(idUsuarios) {
  return conexion("Usuarios")
    .select("Nombre", "Apellido", "Foto")
    .where("idUsuarios", idUsuarios);
}

function Publicaciones(idUsuarios) {
  return conexion("Publicaciones as p")
    .select(
      "u.Foto",
      "u.Nombre",
      "u.Apellido",
      "p.idPublicaciones",
      "p.Fecha",
      "p.Descripcion",
      "p.imagen",
      "p.video",
      "p.idUsuarios",
      "p.Likes"
    )
    .join("Usuarios as u", "p.idUsuarios", "u.idUsuarios")
    .leftJoin("Etiqueta as e", "e.idPublicaciones", "p.idPublicaciones")
    .leftJoin("Usuarios as ud", "e.idUsuariosDestino", "ud.idUsuarios")
    .where("u.idUsuarios", idUsuarios)
    .orWhere("e.idUsuariosDestino", idUsuarios)
    .groupBy(
      "p.idPublicaciones",
      "u.Foto",
      "u.Nombre",
      "u.Apellido",
      "p.Fecha",
      "p.Descripcion",
      "p.imagen",
      "p.video",
      "p.idUsuarios",
      "p.Likes"
    )
    .orderBy("p.Fecha", "desc");
}

function PublicacionesUsuarios(idUsuarios, idPublicaciones) {
  return conexion("Publicaciones as p")
    .select(
      "u.Foto",
      "u.Nombre",
      "u.Apellido",
      "ud.Foto as Foto2",
      "ud.Nombre as Nombre2",
      "ud.Apellido as Apellido2",
      "p.idPublicaciones",
      "p.Fecha",
      "p.Descripcion",
      "p.imagen",
      "p.video",
      "p.idUsuarios",
      "p.Likes"
    )
    .join("Usuarios as u", "p.idUsuarios", "u.idUsuarios")
    .leftJoin("Etiqueta as e", "e.idPublicaciones", "p.idPublicaciones")
    .leftJoin("Usuarios as ud", "e.idUsuariosDestino", "ud.idUsuarios")
    .where(function () {
      this.where("u.idUsuarios", idUsuarios).orWhere(
        "e.idUsuariosDestino",
        idUsuarios
      );
    })
    .andWhere("p.idPublicaciones", idPublicaciones)
    .orderBy("p.Fecha", "desc");
}

function PublicacionVerLikes(idPublicaciones) {
  return conexion("Publicaciones")
    .select("Likes")
    .where("idPublicaciones", idPublicaciones);
}

function LikeUsuario(idUsuarios, idPublicaciones) {
  return conexion("LikePublicaciones")
    .where("idUsuarios", idUsuarios)
    .andWhere("idPublicaciones", idPublicaciones);
}
function LikeUsuarioPublicaciones(idUsuarios, idPublicaciones) {
  return conexion("LikePublicaciones")
    .where("idUsuarios", idUsuarios)
    .andWhere("idPublicaciones", idPublicaciones)
    .andWhere("Estado", "Like");
}

function PublicacionesComentarios(idPublicaciones) {
  return conexion("Usuarios as u")
    .join("Publicaciones as P", "p.idUsuarios", "u.idUsuarios")
    .where("p.idPublicaciones", idPublicaciones);
}

function ComentariosPublicacion(idPublicaciones) {
  return conexion("Comentarios as s")
    .join("Usuarios as u", "u.idUsuarios", "s.idUsuarios")
    .where("s.idPublicaciones", idPublicaciones)
    .orderBy("s.Fecha", "desc");
}

function ComentariosPublicacionNumero(idPublicaciones) {
  return conexion("Comentarios as s")
    .count("* as Numerocomentarios")
    .join("Usuarios as u", "u.idUsuarios", "s.idUsuarios")
    .where("s.idPublicaciones", idPublicaciones);
}

function Usuarios(idUsuarios) {
  return conexion("Usuarios")
    .where("idUsuarios", "<>", idUsuarios)
    .whereNotIn("idUsuarios", function () {
      this.select("idUsuariosDestino")
        .from("Seguidores")
        .where("idUsuariosOrigen", idUsuarios)
        .whereIn("Estado", ["Siguiendo", "Amigos"]);
    })
    .whereNotIn("idUsuarios", function () {
      this.select("idUsuariosOrigen")
        .from("Seguidores")
        .where("idUsuariosDestino", idUsuarios)
        .whereIn("Estado", ["Siguiendo", "Amigos"]);
    });
}

function VerSeguidores(idUsuariosOrigen, idUsuariosDestino) {
  return conexion("Seguidores")
    .where("idUsuariosOrigen", idUsuariosOrigen)
    .andWhere("idUsuariosDestino", idUsuariosDestino);
}

function UsuariosSiguiendo(idUsuarios) {
  return conexion("Usuarios as u")
    .select("u.idUsuarios", "u.Nombre", "u.Apellido", "u.Foto")
    .join("Seguidores as s", "u.idUsuarios", "s.idUsuariosDestino")
    .where("s.idUsuariosOrigen", idUsuarios)
    .andWhere("s.Estado", "Siguiendo");
}

function UsuariosSeguidores(idUsuarios) {
  return conexion("Usuarios as u")
    .select(
      "u.idUsuarios",
      "u.Nombre",
      "u.Apellido",
      "u.Foto",
      "u.FechaCreacion"
    )
    .join("Seguidores as s", "u.idUsuarios", "s.idUsuariosOrigen")
    .where("s.idUsuariosDestino", idUsuarios)
    .andWhere("s.Estado", "Siguiendo");
}

function AmigosUsuario(idUsuarios) {
  return conexion("Seguidores as s")
    .select(
      "u.idUsuarios",
      "u.Nombre",
      "u.Apellido",
      "u.Foto",
      "u.FechaCreacion"
    )
    .join("Usuarios as u", "s.idUsuariosOrigen", "u.idUsuarios")
    .where("s.Estado", "Amigos")
    .andWhere("s.idUsuariosDestino", idUsuarios);
}

function ObtenerMaxIdPublicaciones() {
  return conexion("Publicaciones").max("idPublicaciones as idPublicaciones");
}
// select *from Usuarios u
// 	join Etiqueta as e on u.idUsuarios=e.idUsuariosDestino
// 	where e.idPublicaciones=1002
function UsuariosEtiquetados(idPublicaciones) {
  return conexion("Usuarios as u")
    .join("Etiqueta as e", "u.idUsuarios", "e.idUsuariosDestino")
    .where("e.idPublicaciones", idPublicaciones);
}

function MostraUsuariosMensaje(idUsuario) {
  return conexion("Usuarios as u")
    .select(
      "u.idUsuarios",
      "u.Nombre",
      "u.Apellido",
      "u.Foto",
      "u.FechaCreacion"
    )
    .join(
      conexion.raw(`(
        SELECT
          CASE
            WHEN m.idUsuarioOrigen = ${idUsuario} THEN m.idUsuarioDestino
            ELSE m.idUsuarioOrigen
          END AS idUsuario,
          MAX(m.FechaMensaje) AS FechaUltimoMensaje
        FROM Mensajes m
        WHERE m.idUsuarioOrigen = ${idUsuario} OR m.idUsuarioDestino = ${idUsuario}
        GROUP BY idUsuario
      ) as ultimos_mensajes`),
      "u.idUsuarios",
      "ultimos_mensajes.idUsuario"
    )
    .orderBy("ultimos_mensajes.FechaUltimoMensaje", "desc");
}

function ultimos_mensajes(idUsuarios,idUsuariosDestino){
    return conexion('Mensajes')
          .where(function(){
            this.where('idUsuarioOrigen',idUsuarios)
            this.andWhere('idUsuarioDestino',idUsuariosDestino)
          })
          .orWhere(function(){
            this.where('idUsuarioOrigen',idUsuariosDestino)
            this.andWhere('idUsuarioDestino',idUsuarios)
          })
          .orderBy('FechaMensaje','desc')
          .limit('1')

}

function MostrarMensajesChatUsuarios(idUsuario, idUsuarioDestino) {
  return conexion('Mensajes')
    .where(function() {
      this.where('idUsuarioOrigen', idUsuario)
          .andWhere('idUsuarioDestino', idUsuarioDestino)
    })
    .orWhere(function() {
      this.where('idUsuarioOrigen', idUsuarioDestino)
          .andWhere('idUsuarioDestino', idUsuario)
    })
    .orderBy('FechaMensaje');
}

function MostrarMensajesChatUsuarios(idUsuario, idUsuarioDestino) {
  return conexion('Mensajes')
    .where(function() {
      this.where('idUsuarioOrigen', idUsuario)
          .andWhere('idUsuarioDestino', idUsuarioDestino)
    })
    .orWhere(function() {
      this.where('idUsuarioOrigen', idUsuarioDestino)
          .andWhere('idUsuarioDestino', idUsuario)
    })
    .orderBy('FechaMensaje');
}


function CantidadAmigos(idUsuarios){
    return conexion('Seguidores as s')
          .count('idUsuarios as TotalAmigos')
          .join('Usuarios as u','s.idUsuariosOrigen','u.idUsuarios')
          .where('s.Estado','Amigos')
          .andWhere('s.idUsuariosDestino',idUsuarios)

}

function CantidadSeguidores(idUsuarios) {
  return conexion("Usuarios as u")
    .count('idUsuarios as TotalSeguidores')
    .join("Seguidores as s", "u.idUsuarios", "s.idUsuariosOrigen")
    .where("s.idUsuariosDestino", idUsuarios)
    .andWhere("s.Estado", "Siguiendo");
}
module.exports = {
  usuarios,
  CorreoUsuario,
  DatosPerfil,
  Publicaciones,
  PublicacionVerLikes,
  LikeUsuario,
  PublicacionesUsuarios,
  ComentariosPublicacionNumero,
  PublicacionesComentarios,
  ComentariosPublicacion,
  LikeUsuarioPublicaciones,
  Usuarios,
  VerSeguidores,
  UsuariosSiguiendo,
  UsuariosSeguidores,
  AmigosUsuario,
  ObtenerMaxIdPublicaciones,
  UsuariosEtiquetados,
  MostraUsuariosMensaje,
  ultimos_mensajes,
  MostrarMensajesChatUsuarios,
  CantidadAmigos,
  CantidadSeguidores
};
