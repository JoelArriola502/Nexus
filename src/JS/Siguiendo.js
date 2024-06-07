
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
    fetch(`http://${ip}:4000/Siguiendo/${id}`)
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
    fetch(`http://${ip}:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://${ip}:4000/Siguiendo/${id}`)
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
    fetch(`http://${ip}:4000/Seguidores/${id}`)
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
    fetch(`http://${ip}:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://${ip}:4000/Seguidores/${id}`)
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
    fetch(`http://${ip}:4000/Seguidores/${idUsuariosOrigen}/${idUsuariosDestino}`)
    .then(res=>res.json())
    .then(Respuesta=>{
      if(Respuesta.length===0){
        InsertarAmigo(idUsuarios);
      }else{
        ActualizarSolicitudEstado(idUsuarios);
        ConfimarSolicitud(idUsuarios);
        
      }
    })

    
}
function ConfimarSolicitud(idUsuarios){
    const idUsuariosOrigen=id;
    const idUsuariosDestino=idUsuarios;
    let Estado="Amigos";
    fetch(`http://${ip}:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://${ip}:4000/Seguidores/${id}`)
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
    fetch(`http://${ip}:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://${ip}:4000/Seguidores/${id}`)
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
    fetch(`http://${ip}:4000/NuevoSeguidor`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado,idUsuariosOrigen,idUsuariosDestino}),
    })
    .then(res=>res.json())
    .then(insert=>{
        fetch(`http://${ip}:4000/Usuarios/${id}`)
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
    fetch(`http://${ip}:4000/AmigosUsuarios/${id}`)
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
                    <button class="Seguir-Tambien"  onclick="msjAmigo(${idUsuarios})">Enviar Mensaje</button>
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

function msjAmigo(idUsuarios) {
    const cambiar = document.getElementById('msjrapido');
    const html = `
        <div class="msjcontenido">
            <div class="ventanaflotante">
                <div class="encabezado-msj" id="encabezado-msj">
                
                </div>
                <div class="chat-msj" id="chat-msj">
                   
                </div>
                <div class="controles">
                    <input type="file" id="msjEnviar" style="display: none;"> 
                    <!-- <label for="msjEnviar"><i class="fa-solid fa-folder-open"></i></label> -->
                    <input class="msjInput" type="text" name="mensaje" id="msjR" placeholder="Escribe un mensaje">
                    <button class="msj-enviar" onclick=" EnviarMensajeUsuarioFlotante(${idUsuarios})"><i class='bx bxs-send'></i></button>
                </div>
            </div>
        </div>
    `;
    cambiar.innerHTML = html;
    PerfilMenajeFlotante(idUsuarios);
    MensajesUsuariosNexusFlotante(idUsuarios);
    PresionarEnterFlotante(idUsuarios);
}


function PerfilMenajeFlotante(idUsuarios){
    const CargarPerfilFlotante = document.getElementById('encabezado-msj');
    let html="";
    fetch(`http://${ip}:4000/DatosPerfil/${idUsuarios}`)
    .then(res=>res.json())
    .then((respuesta)=>{
        for(let i=0;i<respuesta.length;i++){
        const Nombre=respuesta[i].Nombre;
        const Apellido=respuesta[i].Apellido;
        const Foto=respuesta[i].Foto;
        
        html=html+`
        <div class="foto-usuario-msj">
            <img src="${Foto}" alt=""> 
            </div>
            <h4>${Nombre} ${Apellido}</h4>
            <i class="fa-solid fa-xmark" onclick="closemsjAmigo()"></i>
        `
        CargarPerfilFlotante.innerHTML=html;

        }
    })

}

function MensajesUsuariosNexusFlotante(idUsu){
    const MensajesUsuariosFlotante=document.getElementById('chat-msj');
    const idUsuarios=id; // Esto parece ser un error, ¿debería ser "idUsuario"?
    const idUsuarioDestino=idUsu;
    fetch(`http://${ip}:4000/Mensajeschat/${idUsuarios}/${idUsuarioDestino}`)
    .then(res => res.json())
    .then((respuesta) => {
        let html = "";

        for (let i = 0; i < respuesta.length; i++) {
            const mensaje = respuesta[i].Mensaje;
            const idUsuarioOrigen = respuesta[i].idUsuarioOrigen;
            const idUsuarioDestino = respuesta[i].idUsuarioDestino;
            // Determinar si el mensaje es del usuario actual (origen) o del usuario con el que está chateando (destino)
            if (idUsuarioOrigen == idUsu) {
                html += `<p class="msj-amigo">${mensaje}</p>`;
            } else if (idUsuarioDestino == idUsu) {
                html += ` <p class="msj-yo">${mensaje}</p>`;
            }
        }
        
        MensajesUsuariosFlotante.innerHTML = html;
    });
    
}

function EnviarMensajeUsuarioFlotante(idUsuario){
    const MensajeInput=document.getElementById('msjR');
    const Mensaje=MensajeInput.value;
    const idUsuarioOrigen=id;
    const idUsuarioDestino=idUsuario;

fetch(`http://${ip}:4000/InsertarMensaje`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body: JSON.stringify({Mensaje,idUsuarioOrigen,idUsuarioDestino}),
})
.then(res=>res.json())
.then((respuesta)=>{
    socket.emit('mensajes',{
        Mensaje:Mensaje,
        idUsuarioOrigen:idUsuarioOrigen,
        idUsuarioDestino:idUsuarioDestino,
        
    });
    MensajeInput.value="";
    
    MensajesUsuariosNexusFlotante(idUsuario);
    
  
})

}

socket.on('mensajes', (data) => {
    const mensaje = data.Mensaje;
    const html = `<p class="msj-amigo">${mensaje}</p>`;

    // Verificar que el elemento 'Mensajes-Usuarios' exista
    const MensajesUsuarios = document.getElementById('chat-msj');
    if (MensajesUsuarios) {
      MensajesUsuarios.insertAdjacentHTML('beforeend', html);
    } else {
     const Tumensajes = document.getElementById('Tumensajes');
    }
  });

function PresionarEnterFlotante(idUsuarios){
    document.getElementById("msjR").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            // Ejecutar la función que desees
            EnviarMensajeUsuarioFlotante(idUsuarios);
        }
    });
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

fetch(`http://${ip}:4000/InsertarMensaje`,{
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
    fetch(`http://${ip}:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://${ip}:4000/AmigosUsuarios/${id}`)
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
    fetch(`http://${ip}:4000/EstadoSeguidor/${idUsuariosOrigen}/${idUsuariosDestino}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        fetch(`http://${ip}:4000/AmigosUsuarios/${id}`)
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




   
    
