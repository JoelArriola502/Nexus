const conexion=require('./Conexion');
function usuarios(){
    return conexion('Usuarios')
}
function CorreoUsuario(){
    return conexion('Usuarios').select('Correo')

}

module.exports={usuarios, CorreoUsuario};