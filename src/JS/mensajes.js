var socket=io();


function despliegeMensaje(){

    const mensajes = document.getElementById('ContenidoPrincipal');
    html = `
        <div class="contenido-Mensajes">
        <div class="nav-mensajes">
            <div class="encabezado">
                <h2>Mensajes</h2>
                <div class="con-bucar" style="display: none;">
                    <i class="fa-solid fa-magnifying-glass icon"></i>
                    <input class="input" type="search" placeholder="Buscar" />
                </div>
            </div>
            <div class="chat-personas" id="ChatUsuarios">
                
            </div>
            

        </div>
        <div class="container-chat" id="Contenedor-chat">
       
    </div>
    `;
    mensajes.innerHTML = html;
    MensajesUsuarios();
};


function MensajesUsuarios(){
    const CargarChat=document.getElementById('ChatUsuarios');
    fetch(`http://localhost:4000/UsuariosMensajes/${id}`)
    .then(res=>res.json())
    .then(respuesta=>{
        let html="";
        for( let i=0;i<respuesta.length;i++){
            const Nombre=respuesta[i].Nombre;
            const Apellido=respuesta[i].Apellido;
            const Foto=respuesta[i].Foto;
            const idUsuario=respuesta[i].idUsuarios;

           
            html=html+`
            <div class="personas" onclick="ChatUsuarios(${idUsuario})">
                    <div class="foto-perfil">
                        <img src="${Foto}" >
                    </div>
                    <div class="nombre-persona">
                        <h5>${Nombre} ${Apellido}</h5>
                        <p id="UltimoMensaje-${idUsuario}"></p>
                    </div>
                    <div class="hora"><p id="HoraMensaje-${idUsuario}"></p></div>
                </div>
            `
            CargarChat.innerHTML=html;
        }

        respuesta.forEach(Mensajes => {
            const idUsuario=Mensajes.idUsuarios;
            UltimoMensajeEnviado(idUsuario);
            UltimoMensajeEnviadoHora(idUsuario);
        });
    })
}



function UltimoMensajeEnviado(idUsuario){
    const CargarUltimoMensaje=document.getElementById(`UltimoMensaje-${idUsuario}`);
    fetch(`http://localhost:4000/UltimoMensaje/${id}/${idUsuario}`)
    .then(res=>res.json())
    .then((respuesta)=>{
        for(let i=0;i<respuesta.length;i++){
            const Mensajes=respuesta[i].Mensaje;
            CargarUltimoMensaje.innerText=Mensajes;
        }
    })
}

function UltimoMensajeEnviadoHora(idUsuario) {
    const CargarUltimoMensajeHora = document.getElementById(`HoraMensaje-${idUsuario}`);
    fetch(`http://localhost:4000/UltimoMensaje/${id}/${idUsuario}`)
    .then(res => res.json())
    .then((respuesta) => {
        if (respuesta.length > 0) {
            const Hora = new Date(respuesta[0].FechaMensaje);  // Convertir a objeto Date
            let horas = Hora.getHours();
            const minutos = Hora.getMinutes();
            const segundos = Hora.getSeconds();

            const ampm = horas >= 12 ? 'PM' : 'AM';
            horas = horas % 12;
            horas = horas ? horas : 12; // El 0 debe ser 12

            // Formatear minutos y segundos
            const minutosFormateados = minutos.toString().padStart(2, '0');

            // Formatear la hora en formato HH:MM:SS AM/PM
            const horaFormateada = `${horas}:${minutosFormateados} ${ampm}`;

            // Mostrar la hora formateada en el elemento HTML
            CargarUltimoMensajeHora.innerText = horaFormateada;
        }
    })
    .catch(error => {
        console.error('Error al obtener el mensaje:', error);
    });
}

function ChatUsuarios(idUsuario){
    const CargarChatUsuarios=document.getElementById('Contenedor-chat');

    let html="";

    html=html+`
    <div class="el-perfil" id="Perfil-Chat">
    
</div>
<div class="txt-chat">
    <div class="container-texto" id="Mensajes-Usuarios">
       
    </div>
</div>
<div class="chat-botones">
    <!-- <button class="btn-icono-foto"><i class="fa-solid fa-folder-open"></i></button> -->
    <input class="escribir" type="text" name="mensaje" id="txtMensaje" placeholder="   Escribe un mensaje">
    <button class="btn-enviar" onclick="EnviarMensajeUsuario(${idUsuario})"><i class='bx bxs-send'></i></button>
</div>
    
    `
    CargarChatUsuarios.innerHTML=html;
    UsuarioPerfilchat(idUsuario);
    MensajesUsuariosNexus(idUsuario);
    PresionarEnter(idUsuario);
    
}


function UsuarioPerfilchat(idUsuario){
    const CargarPerilChat=document.getElementById('Perfil-Chat')
    fetch(`http://localhost:4000/DatosPerfil/${idUsuario}`)
    .then(res=>res.json())
    .then((respuesta)=>{
        let html="";
     for(let i=0; i<respuesta.length;i++){
        const Nombre=respuesta[i].Nombre;
        const Apellido=respuesta[i].Apellido;
        const Foto=respuesta[i].Foto;
        html=html+`
        <img src="${Foto}" alt="Foto">
    <h4 class="nombre-perfil">${Nombre} ${Apellido}</h4>
        `
       
     CargarPerilChat.innerHTML=html;

     }
    })
}


function MensajesUsuariosNexus(idUsuario){
    const MensajesUsuarios=document.getElementById('Mensajes-Usuarios');
    const idUsuarios=id; // Esto parece ser un error, ¿debería ser "idUsuario"?
    const idUsuarioDestino=idUsuario;
    fetch(`http://localhost:4000/Mensajeschat/${idUsuarios}/${idUsuarioDestino}`)
    .then(res => res.json())
    .then((respuesta) => {
        let html = "";

        for (let i = 0; i < respuesta.length; i++) {
            const mensaje = respuesta[i].Mensaje;
            const idUsuarioOrigen = respuesta[i].idUsuarioOrigen;
            const idUsuarioDestino = respuesta[i].idUsuarioDestino;
            // Determinar si el mensaje es del usuario actual (origen) o del usuario con el que está chateando (destino)
            if (idUsuarioOrigen == idUsuario) {
                html += `<p class="mensaje-tercero" id="mensaje-tercero">${mensaje}</p>`;
            } else if (idUsuarioDestino == idUsuario) {
                html += `<p class="tu-mensaje" id="tu-mensaje">${mensaje}</p>`;
            }
        }
        
        MensajesUsuarios.innerHTML = html;
    });
    
}


socket.on('mensajes', (data) => {
    const mensaje = data.Mensaje;
    const html = `<p class="mensaje-tercero">${mensaje}</p>`;

    // Verificar que el elemento 'Mensajes-Usuarios' exista
    const MensajesUsuarios = document.getElementById('Mensajes-Usuarios');
    if (MensajesUsuarios) {
      MensajesUsuarios.insertAdjacentHTML('beforeend', html);
    } else {
     const Tumensajes = document.getElementById('Tumensajes');
    }
  });


function EnviarMensajeUsuario(idUsuario){
    const MensajeInput=document.getElementById('txtMensaje');
    const Mensaje=MensajeInput.value;
    const idUsuarioOrigen=id;
    const idUsuarioDestino=idUsuario;

fetch('http://localhost:4000/InsertarMensaje',{
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
    MensajesUsuariosNexus(idUsuario);
    MensajesUsuarios();
    UltimoMensajeEnviado(idUsuario);
    UltimoMensajeEnviadoHora(idUsuario);
    
  
})

}


function PresionarEnter(idUsuario){
document.getElementById("txtMensaje").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // Ejecutar la función que desees
        EnviarMensajeUsuario(idUsuario);
    }
});
}