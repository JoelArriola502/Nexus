const conexion=require('./Conexion');
function usuarios(){
    return conexion('Usuarios')
}
function CorreoUsuario(){
    return conexion('Usuarios').select('Correo')

}

function DatosPerfil(idUsuarios){
return conexion('Usuarios').select(
    'Nombre',
    'Apellido',
    'Foto'
)
.where('idUsuarios',idUsuarios)
}


function Publicaciones(idUsuarios){
    return conexion(' Publicaciones as p')
    .select('u.Foto', 'u.Nombre', 'u.Apellido','ud.Foto as Foto2','ud.Nombre as Nombre2','ud.Apellido as Apellido2','p.idPublicaciones','p.Fecha',
        'p.Descripcion','p.imagen','p.video', 'p.idUsuarios','p.Likes' )
        .join('Usuarios as u',' p.idUsuarios', 'u.idUsuarios')
        .leftJoin('Etiqueta as e', 'e.idPublicaciones', 'p.idPublicaciones')
        .leftJoin( 'Usuarios as ud','e.idUsuariosDestino','ud.idUsuarios')
        .where('u.idUsuarios',idUsuarios)
        .orWhere('e.idUsuariosDestino',idUsuarios)
        .orderBy(' p.Fecha','desc')

}


function PublicacionesUsuarios(idUsuarios, idPublicaciones) {
    return conexion('Publicaciones as p')
        .select('u.Foto', 'u.Nombre', 'u.Apellido', 'ud.Foto as Foto2', 'ud.Nombre as Nombre2', 'ud.Apellido as Apellido2', 'p.idPublicaciones', 'p.Fecha',
            'p.Descripcion', 'p.imagen', 'p.video', 'p.idUsuarios', 'p.Likes')
        .join('Usuarios as u', 'p.idUsuarios', 'u.idUsuarios')
        .leftJoin('Etiqueta as e', 'e.idPublicaciones', 'p.idPublicaciones')
        .leftJoin('Usuarios as ud', 'e.idUsuariosDestino', 'ud.idUsuarios')
        .where(function () {
            this.where('u.idUsuarios', idUsuarios)
                .orWhere('e.idUsuariosDestino', idUsuarios);
        })
        .andWhere('p.idPublicaciones', idPublicaciones)
        .orderBy('p.Fecha', 'desc');
}



function PublicacionVerLikes(idPublicaciones){
    return conexion('Publicaciones')
    .select('Likes')
    .where('idPublicaciones',idPublicaciones)
}

function LikeUsuario(idUsuarios,idPublicaciones){
    return conexion('LikePublicaciones')
    .where('idUsuarios',idUsuarios)
    .andWhere('idPublicaciones',idPublicaciones)
}
function LikeUsuarioPublicaciones(idUsuarios,idPublicaciones){
    return conexion('LikePublicaciones')
    .where('idUsuarios',idUsuarios)
    .andWhere('idPublicaciones',idPublicaciones)
    .andWhere('Estado','Like')
}



function PublicacionesComentarios(idPublicaciones){
 return conexion('Usuarios as u')
        .join('Publicaciones as P','p.idUsuarios','u.idUsuarios')
        .where('p.idPublicaciones',idPublicaciones)

}

function ComentariosPublicacion(idPublicaciones){
    return conexion('Comentarios as s')
         .join('Usuarios as u','u.idUsuarios','s.idUsuarios')
         .where('s.idPublicaciones',idPublicaciones)
         .orderBy('s.Fecha',"desc")
}



function ComentariosPublicacionNumero(idPublicaciones){
    return conexion('Comentarios as s').count('* as Numerocomentarios')
         .join('Usuarios as u','u.idUsuarios','s.idUsuarios')
         .where('s.idPublicaciones',idPublicaciones)
}

function Usuarios(idUsuarios) {
    return conexion('Usuarios')
      .where('idUsuarios', '<>', idUsuarios)
      .whereNotIn('idUsuarios', function() {
        this.select('idUsuariosDestino')
          .from('Seguidores')
          .where('idUsuariosOrigen', idUsuarios)
          .whereIn('Estado', ['Siguiendo', 'Amigos']);
      })
      .whereNotIn('idUsuarios', function() {
        this.select('idUsuariosOrigen')
          .from('Seguidores')
          .where('idUsuariosDestino', idUsuarios)
          .whereIn('Estado', ['Siguiendo', 'Amigos']);
      });
  }
  
function VerSeguidores(idUsuariosOrigen,idUsuariosDestino){
    return conexion('Seguidores')
          .where('idUsuariosOrigen',idUsuariosOrigen)
          .andWhere('idUsuariosDestino',idUsuariosDestino)
}

function UsuariosSiguiendo(idUsuarios){
    return conexion('Usuarios as u').select('u.idUsuarios','u.Nombre', 'u.Apellido', 'u.Foto')
    .join('Seguidores as s','u.idUsuarios','s.idUsuariosDestino')
    .where('s.idUsuariosOrigen',idUsuarios)
    .andWhere('s.Estado','Siguiendo')
}

function UsuariosSeguidores(idUsuarios){
    return conexion('Usuarios as u')
    .select('u.idUsuarios','u.Nombre', 'u.Apellido', 'u.Foto' ,'u.FechaCreacion')
    .join('Seguidores as s','u.idUsuarios','s.idUsuariosOrigen')
    .where('s.idUsuariosDestino',idUsuarios)
    .andWhere('s.Estado','Siguiendo')
}

// SELECT u.idUsuarios,u.Nombre, u.Apellido, u.Foto ,u.FechaCreacion
// FROM Seguidores AS s
// JOIN Usuarios AS u ON s.idUsuariosOrigen = u.idUsuarios
// WHERE s.Estado = 'Amigos'
//   AND s.idUsuariosDestino= 2;
function AmigosUsuario(idUsuarios){
    return conexion('Seguidores as s')
    .select('u.idUsuarios','u.Nombre', 'u.Apellido', 'u.Foto' ,'u.FechaCreacion')
    .join('Usuarios as u','s.idUsuariosOrigen','u.idUsuarios')
    .where('s.Estado', 'Amigos')
    .andWhere('s.idUsuariosDestino',idUsuarios)

}

module.exports={usuarios, CorreoUsuario,DatosPerfil,Publicaciones,PublicacionVerLikes,LikeUsuario,
    PublicacionesUsuarios,ComentariosPublicacionNumero,PublicacionesComentarios,ComentariosPublicacion,
    LikeUsuarioPublicaciones,Usuarios,VerSeguidores,UsuariosSiguiendo,UsuariosSeguidores,AmigosUsuario
};