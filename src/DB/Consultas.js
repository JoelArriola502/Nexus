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
    .select('u.Foto', 'u.Nombre', 'u.Apellido','ud.Foto as Foto2','ud.Nombre as Nombre2','ud.Apellido as Apellido2','p.Fecha',
        'p.Descripcion','p.imagen','p.video', 'p.idUsuarios' )
        .join('Usuarios as u',' p.idUsuarios', 'u.idUsuarios')
        .leftJoin('Etiqueta as e', 'e.idPublicaciones', 'p.idPublicaciones')
        .leftJoin( 'Usuarios as ud','e.idUsuariosDestino','ud.idUsuarios')
        .where('u.idUsuarios',idUsuarios)
        .orWhere('e.idUsuariosDestino',idUsuarios)
        .orderBy(' p.Fecha','desc')

}
module.exports={usuarios, CorreoUsuario,DatosPerfil,Publicaciones};