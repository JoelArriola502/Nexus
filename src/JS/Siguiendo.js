
function CargarUsuariosSiguiendo(){
    let html="";
    html=html+`
    <div class="Tituilo-Users">
        <h2>Usuarios Siguiendo</h2>
     </div>
    <div class="Usuarios-Principal" id="ContenidoUsuarios">
    </div>
    
    `
    AmigosCargar.innerHTML=html;
}

function MostrarlosUsuariosSiguiendo(){
    CargarUsuariosSiguiendo();
    MostrarUsuariosSiguiendo();
}


function MostrarUsuariosSiguiendo(){
    const CargarDatosUsuarios=document.getElementById("ContenidoUsuarios");
    fetch(`http://localhost:4000/Siguiendo/${id}`)
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
                    <button class="CancelarSeguir"  onclick="DejarDeSeguirUsuarios(${idUsuarios})">X</button>
                </div>
             </div>
        </div>
        
        </div>
       
            `
            CargarDatosUsuarios.innerHTML=html;
        }

    })
}


function DejarDeSeguirUsuarios(idUsuarios){
    const idUsuariosOrigen=id;
    const idUsuariosDestino=idUsuarios;
    let Estado="NoSiguiendo";
    fetch(`http://localhost:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://localhost:4000/Siguiendo/${id}`)
        .then(res=>res.json())
        .then(respuesta=>{
            if(respuesta.length===0){
                MostrarlosUsuariosSiguiendo();
            }else{
                MostrarUsuariosSiguiendo();
            }
        })
        .catch(error=>{
            console.log(error);
        })
    })

}










//funciones De seguidores

function CargarUsuariosSeguidores(){
    let html="";
    html=html+`
    <div class="Tituilo-Users">
        <h2>Seguidores </h2>
     </div>
    <div class="Usuarios-Principal" id="ContenidoUsuarios">
    </div>
    
    `
    AmigosCargar.innerHTML=html;
}

function MostrarlosUsuariosSeguidores(){
    CargarUsuariosSeguidores();
    MostrarUsuariosSeguidores();
}


function MostrarUsuariosSeguidores(){
    const CargarDatosUsuarios=document.getElementById("ContenidoUsuarios");
    fetch(`http://localhost:4000/Seguidores/${id}`)
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
                    <button class="CancelarSeguir"  onclick="CancelarSeguimiento(${idUsuarios})">X</button>
                    <button class="Seguir-Tambien"  onclick="AgregarAmigos(${idUsuarios})">Aceptar Solicitud</button>
                </div>
             </div>
        </div>
        
        </div>
       
            `
            CargarDatosUsuarios.innerHTML=html;
        }

    })
}
function CancelarSeguimiento(idUsuarios){
    const idUsuariosOrigen=idUsuarios;
    const idUsuariosDestino=id;
    let Estado="NoSiguiendo"
    fetch(`http://localhost:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://localhost:4000/Seguidores/${id}`)
        .then(res=>res.json())
        .then(respuesta=>{
            if(respuesta.length===0){
                MostrarlosUsuariosSeguidores();
            }else{
                MostrarUsuariosSeguidores();
            }
        })
        .catch(error=>{
            console.log(error);
        })
    })

}

function AgregarAmigos(idUsuarios){
    const idUsuariosOrigen=id;
    const idUsuariosDestino=idUsuarios;
    console.log("estoy Agregando solicitud ",idUsuariosOrigen,idUsuariosDestino)
    fetch(`http://localhost:4000/Seguidores/${idUsuariosOrigen}/${idUsuariosDestino}`)
    .then(res=>res.json())
    .then(Respuesta=>{
    console.log(Respuesta);
      if(Respuesta.length===0){
        console.log("Estoy en el if")
        InsertarAmigo(idUsuarios);
      }else{
        console.log("Estoy en el else")
        ActualizarSolicitudEstado(idUsuarios);
        ConfimarSolicitud(idUsuarios);
        
      }
    })

    
}
function ConfimarSolicitud(idUsuarios){
    const idUsuariosOrigen=id;
    const idUsuariosDestino=idUsuarios;
    let Estado="Amigos";
    console.log("estoy Confirmando solicitud ",idUsuariosOrigen,idUsuariosDestino,Estado)
    fetch(`http://localhost:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://localhost:4000/Seguidores/${id}`)
        .then(res=>res.json())
        .then(respuesta=>{
            if(respuesta.length===0){
                MostrarlosUsuariosSeguidores();
            }else{
                MostrarUsuariosSeguidores();
            }
        })
        .catch(error=>{
            console.log(error);
        })
    })

}

function ActualizarSolicitudEstado(idUsuarios){
    const idUsuariosOrigen=idUsuarios;
    const idUsuariosDestino=id;
    let Estado="Amigos"
    console.log("estoy Actualizando solicitud ",idUsuariosOrigen,idUsuariosDestino,Estado)
    fetch(`http://localhost:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://localhost:4000/Seguidores/${id}`)
        .then(res=>res.json())
        .then(respuesta=>{
            if(respuesta.length===0){
                MostrarlosUsuariosSeguidores();
            }else{
                MostrarUsuariosSeguidores();
            }
        })
        .catch(error=>{
            console.log(error);
        })
    })

}
function InsertarAmigo(idUsuarios){
    const idUsuariosOrigen=id;
    const idUsuariosDestino=idUsuarios;
    let Estado="Amigos";
    console.log("estoy insertando solicitud ",idUsuariosOrigen,idUsuariosDestino,Estado)
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
            ActualizarSolicitudEstado(idUsuarios);
            if(respuesta.length===0){
                MostrarlosUsuariosSeguidores();
            }else{
                MostrarUsuariosSeguidores();
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








///funciones Boton amigos

function CargarUsuariosAmigos(){
    let html="";
    html=html+`
    <div class="Tituilo-Users">
        <h2>Seguidores </h2>
     </div>
    <div class="Usuarios-Principal" id="ContenidoUsuarios">
    </div>
    
    `
    AmigosCargar.innerHTML=html;
}

function MostrarlosUsuariosAmigos(){
    CargarUsuariosAmigos();
    UsuariosAmigosCargar();
}


function UsuariosAmigosCargar(){
    const CargarDatosUsuarios=document.getElementById("ContenidoUsuarios");
    fetch(`http://localhost:4000/AmigosUsuarios/${id}`)
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
                    <button class="CancelarSeguir"  onclick="EliminarAmigos(${idUsuarios})">X</button>
                    <button class="Seguir-Tambien"  onclick="msjAmigo()">Enviar Mensaje</button>
                </div>
             </div>
        </div>
        
        <div id="msjrapido"></div>

        </div>
       
            `
            CargarDatosUsuarios.innerHTML=html;
        }

    })
}

function msjAmigo() {
    const cambiar = document.getElementById('msjrapido');
    const html = `
        <div class="msjcontenido">
            <div class="ventanaflotante">
                <div class="encabezado-msj">
                    <div class="foto-usuario-msj">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrmRXbObuANjRXxUTTLPhJRSY8BRb6sIr4AlKOe5KxAQ&s" alt=""> 
                    </div>
                    <h4>Angel López</h4>
                    <i class="fa-solid fa-xmark" onclick="closemsjAmigo()"></i>
                </div>
                <div class="chat-msj">
                    <p class="msj-amigo">Hola tal Joel</p>
                    <p class="msj-yo">Hola que tal Carla, me encuentro bien</p>
                </div>
                <div class="controles">
                    <input type="file" id="msjEnviar" style="display: none;"> 
                    <label for="msjEnviar"><i class="fa-solid fa-folder-open"></i></label>
                    <input class="msjInput" type="text" name="mensaje" id="msjR" placeholder="Escribe un mensaje">
                    <button class="msj-enviar" ><i class='bx bxs-send'></i></button>
                </div>
            </div>
        </div>
    `;
    cambiar.innerHTML = html;
}

function initializeEmojiPicker() {
    const input = document.getElementById('msjR');
    const picker = new EmojiButton();

    picker.on('emoji', emoji => {
        input.value += emoji;
    });

    picker.togglePicker();
}



function closemsjAmigo() {
    const cambiar = document.getElementById('msjrapido');
    const html = ``;
    cambiar.innerHTML = html;
}

function EliminarAmigos(idUsuarios){
    ActualizarEstadoAmistadDos(idUsuarios);
    ActualizarEstadoAmistadUno(idUsuarios);

}

function EnviarMensajeUsuariosAmigo(idUsuarios){
    const Mensaje="";
    const idUsuarioOrigen=id;
    const idUsuarioDestino=idUsuarios;

fetch('http://localhost:4000/InsertarMensaje',{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body: JSON.stringify({Mensaje,idUsuarioOrigen,idUsuarioDestino}),
})
.then(res=>res.json())
.then((respuesta)=>{
    
    despliegeMensaje();
    MensajesUsuariosNexus(idUsuarios);
})


}
function ActualizarEstadoAmistadUno(idUsuarios){
    const idUsuariosOrigen=idUsuarios;
    const idUsuariosDestino=id;
    let Estado="NoSiguiendo"
    fetch(`http://localhost:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://localhost:4000/AmigosUsuarios/${id}`)
        .then(res=>res.json())
        .then(respuesta=>{
            if(respuesta.length===0){
                MostrarlosUsuariosAmigos();
            }else{
                UsuariosAmigosCargar();
            }
        })
        .catch(error=>{
            console.log(error);
        })
    })

}


function ActualizarEstadoAmistadDos(idUsuarios){
    const idUsuariosOrigen=id;
    const idUsuariosDestino=idUsuarios;
    let Estado="NoSiguiendo"
    fetch(`http://localhost:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://localhost:4000/AmigosUsuarios/${id}`)
        .then(res=>res.json())
        .then(respuesta=>{
            if(respuesta.length===0){
                MostrarlosUsuariosAmigos();
            }else{
                UsuariosAmigosCargar();
            }
        })
        .catch(error=>{
            console.log(error);
        })
    })

}