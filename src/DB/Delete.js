const Delete=require('./Conexion');

function EliminarRegistroLike(idPublicaciones,idUsuarios){
    return Delete('LikePublicaciones')
           .where('idPublicaciones',idPublicaciones)
           .andWhere('idUsuarios',idUsuarios)
           .del()
}
module.exports={EliminarRegistroLike};