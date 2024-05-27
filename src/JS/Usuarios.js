
const AmigosCargar=document.getElementById('ContenidoPrincipal');
function CargarUsuarios(){
    let html="";
    html=html+`
    <div class="Tituilo-Users">
        <h2>Usuarios </h2>
     </div>
    <div class="Usuarios-Principal" id="ContenidoUsuarios">
    </div>
    
    `
    AmigosCargar.innerHTML=html;
}

function MostrarlosUsuarioscontenedor(){
    CargarUsuarios();
    MostrarUsuarios();
}


function MostrarUsuarios(){
    const CargarDatosUsuarios=document.getElementById("ContenidoUsuarios");
    fetch(`http://localhost:4000/Usuarios/${id}`)
    .then(res=>res.json())
    .then((Usuarios)=>{
        let html=` `;
        let i;
        for(i=0;i<Usuarios.length;i++){

           const Foto=Usuarios[i].Foto;
           const Nombre=Usuarios[i].Nombre;
           const Apellido=Usuarios[i].Apellido;
           const idUsuarios=Usuarios[i].idUsuarios;




           html=html+ `
           <div class="Usuarios-Nexus">
           
            <div class="Datos-Usuarios-nexus">
           <div class="Foto_users">
                <img src="${Foto}" class="Fotos-usurios">
            </div>
            <div class="Datos-Users">
                <div class="text-Datos">
                    <h2>${Nombre} ${Apellido}</h2>
                </div>
        
                <div class="botones-users">
                    
                    <button class="send"  onclick="SeguirUsuarios(${idUsuarios})">Seguir</button>
                </div>
             </div>
        </div>
        
        </div>
       
            `
            CargarDatosUsuarios.innerHTML=html;
        }

    })
}


function seleccionarBoton(valor) {
    // Eliminar la clase 'seleccionado' de todos los botones
    var botones = document.querySelectorAll('.botones-funciones');
    botones.forEach(function(boton) {
        boton.parentElement.classList.remove('seleccionado');
    });
    
    // Agregar la clase 'seleccionado' al botón clicado
    var botonClicado = event.target.closest('label');
    botonClicado.classList.add('seleccionado');
}


function SeguirUsuarios(idUsuarios){
    const idUsuariosOrigen=id;
    const idUsuariosDestino=idUsuarios;
    fetch(`http://localhost:4000/Seguidores/${idUsuariosOrigen}/${idUsuariosDestino}`)
    .then(res=>res.json())
    .then(Respuesta=>{
      if(Respuesta.length===0){
        InsertarSeguidor(idUsuarios);
      }else{

        ActualizarSeguidorEstado(idUsuarios);
        
      }
    })

    
}

function ActualizarSeguidorEstado(idUsuarios){
    const idUsuariosOrigen=id;
    const idUsuariosDestino=idUsuarios;
    let Estado="Siguiendo"
    fetch(`http://localhost:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://localhost:4000/Usuarios/${id}`)
        .then(res=>res.json())
        .then(respuesta=>{
            if(respuesta.length===0){
                MostrarlosUsuarioscontenedor();
            }else{
                MostrarUsuarios();
            }
        })
        .catch(error=>{
            console.log(error);
        })
    })

}
function InsertarSeguidor(idUsuarios){
    const idUsuariosOrigen=id;
    const idUsuariosDestino=idUsuarios;
    let Estado="Siguiendo";
    fetch(`http://localhost:4000/NuevoSeguidor`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado,idUsuariosOrigen,idUsuariosDestino}),
    })
    .then(res=>res.json())
    .then(insert=>{
        fetch(`http://localhost:4000/Usuarios/${id}`)
        .then(res=>res.json())
        .then(respuesta=>{
            if(respuesta.length===0){
                MostrarlosUsuarioscontenedor();
            }else{
                MostrarUsuarios();
            }
        })
        .catch(error=>{
            console.log(error);
        })
    
    })
    .catch(Error=>{
      console.error(error);
})
}