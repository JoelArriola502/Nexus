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
module.exports={usuarios, CorreoUsuario,DatosPerfil,Publicaciones,PublicacionVerLikes,LikeUsuario,PublicacionesUsuarios,ComentariosPublicacionNumero,PublicacionesComentarios,ComentariosPublicacion};