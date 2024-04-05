const conexion=require('./Conexion');

function NuevoUsuario(Nombre,Apellido,Correo,Contrasena){
    return conexion('Usuarios').insert({
        Nombre:Nombre,
        Apellido:Apellido,
        Correo:Correo,
        Contrasena:Contrasena
    })
}
module.exports={NuevoUsuario}