
const idUsuarios=localStorage.getItem("idUsuarios");
const CargarPerfil=document.getElementById('DatosPerfil');
const PublicacionesCargar=document.getElementById('ContenidoPrincipal');
const id=parseInt(idUsuarios);


function MostrarTodoInicio(){

    let html="";

    html=html+`
    <div class="crearPublicacionContenedor" id="crearPublicacion">
                  
    </div>

    <div class="PublicacionVista" id="PublicacionVista">

    </div>
    <div class="comentariosDiv" id="comentariosDiv">
        <!-- Este es el contenedor donde se muestra la ventana comentario -->
    </div>
    `
    PublicacionesCargar.innerHTML=html;
}

function CargarDatosPerfil(){
    fetch(`http://localhost:4000/DatosPerfil/${id}`)
    .then(res=>res.json())
    .then(DatosPerfil=>{
       let html="";
       for(let i=0; i<DatosPerfil.length;i++){
        const Nombre=DatosPerfil[i].Nombre;
        const Apellido=DatosPerfil[i].Apellido;
        const Foto=DatosPerfil[i].Foto;
       
        html=html+`
        <h1 class="Titulo-Nexus">Nexus</h1>
        <button class="Perfil_boton" onclick="mostrarPerfil()">
        <img class="Foto-Perfil" src="${Foto}">
        <h5 class="Nombre">${Nombre} ${Apellido}</h5>
    </button>
        `
        
       
 CargarPerfil.innerHTML=html;

       }

    })
}
CargarDatosPerfil();
function Inicio(){
    MostrarTodoInicio();
    CargarPublicacionCrear();
    CargarDatosPublicaciones();
}
//función Mostrar Crear publicaciones
function CargarPublicacionCrear(){
    const crearPublicacion=document.getElementById("crearPublicacion");
    fetch(`http://localhost:4000/DatosPerfil/${id}`)
    .then(res=>res.json())
    .then(DatosPerfil=>{
       let html="";
       for(let i=0; i<DatosPerfil.length;i++){
        const Nombre=DatosPerfil[i].Nombre;
        const Apellido=DatosPerfil[i].Apellido;
        const Foto=DatosPerfil[i].Foto;
       
        html=html+`
        <div class="crearPublicacion" id="crearPublicacion">
        <div class="inputPublicacion">
        <img class="Foto-Perfil_p" src="${Foto}" alt="Usuario"/>
        <input id="Descripcion" class="Crear-Texto-Publicacion" type="text" placeholder="¿Qué estas pensando?" />
    </div>
    <div class="botonesPubli">
    <progress id="img-Progeros-Carga" value="0" max="100" style="width: 100%; display: none;"></progress>
    <input type="file" class="multimedia" id="FilePublicacion">
    <label for="FilePublicacion" class="SubirImagenPublicacion"><i class="fa-solid fa-photo-film"></i> Foto/Video</label>
        <button class="Etiquetar" onclick="CargarDatosEtiquetados()"><i class="fa-solid fa-tag"></i>Etiquetar</button>
        <button class="btnPublicar" id="PublicarPublicacion">Publicar</button>
        <div id="modalContainer"></div>
    </div>
    </div>
        `
        
       
 crearPublicacion.innerHTML=html;

       }
       Servidor();
       

    })
}



function openModal() {
    const CargarDatosUsuarios=document.getElementById("modalContainer");
    let html="";
    html =html+ `
        <div class="modal" id="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <p>Selecciona los amigos que quieres etiquetar en tu publicación</p>
                    <i class="fa-solid fa-x" onclick="closeModal()"></i>
                </div>
                <label class="content-search">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" class="search-bar" placeholder="Buscar amigos">
                </label>
                
                <ul class="friend-list" id="DatosUsuariosEtiquetar">
                    
                </ul>
                <button class="etiquetar-confirm" onclick="closeModal()">Etiquetar</button>
            </div>
        </div>`;
        CargarDatosUsuarios.innerHTML = html;
    document.getElementById('modalContainer').style.display = 'block';
}

function CargarDatosEtiquetados(){
    openModal();
    UsuariosEtiquetar();
}

function UsuariosEtiquetar(){
    const CargarDatosUsuarios = document.getElementById("DatosUsuariosEtiquetar");
    fetch(`http://localhost:4000/AmigosUsuarios/${id}`)
    .then(res => res.json())
    .then((Usuarios) => {
        let html = ``;
        for (let i = 0; i < Usuarios.length; i++) {
            const Foto = Usuarios[i].Foto;
            const Nombre = Usuarios[i].Nombre;
            const Apellido = Usuarios[i].Apellido;
            const idUsuarios = Usuarios[i].idUsuarios;

            // Agregar el usuario a la lista HTML
            html += `
                <li class="friend-item">
                    <div class="usuarioEtiqueta">
                        <img src="${Foto}">
                        <p>${Nombre} ${Apellido}</p>
                    </div>
                    <input class="check" type="checkbox" value="${idUsuarios}" data-id="${idUsuarios}" onchange="handleCheckboxChange(this)">
                </li>
            `;
        }

        // Actualizar el HTML en el contenedor
        CargarDatosUsuarios.innerHTML = html;

        MarcarUsuariosEtiquetado();
    })
}


function closeModal() {
    document.getElementById('modalContainer').innerHTML = '';
    
}

  document.addEventListener("DOMContentLoaded",ev=>{   
    MostrarTodoInicio();
    CargarPublicacionCrear();
    CargarDatosPublicaciones();
  })
  
  function CargarDatosPublicaciones() {
    const MostrarPublicaciones = document.getElementById("PublicacionVista");
    fetch(`http://localhost:4000/Publicaciones/${id}`)
        .then(res => res.json())
        .then((DatosPublicaciones) => {
            let html = "";
            for (let i = 0; i < DatosPublicaciones.length; i++) {
                const idPublicaciones = DatosPublicaciones[i].idPublicaciones;
                const Foto = DatosPublicaciones[i].Foto;
                const Nombre = DatosPublicaciones[i].Nombre;
                const Apellido = DatosPublicaciones[i].Apellido;
                const Fecha = DatosPublicaciones[i].Fecha;
                const Descripcion = DatosPublicaciones[i].Descripcion;
                const imagenPublicacion = DatosPublicaciones[i].imagen;
                const Likes = DatosPublicaciones[i].Likes;

                const fechaObtener = new Date(Fecha);
                const nombresMeses = [
                    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                ];
                const Dia = fechaObtener.getDate();
                const Mes = fechaObtener.getMonth();
                const Anio = fechaObtener.getFullYear();
                const MesNombre = nombresMeses[Mes];
                const LikeNull = Likes === null ? "" : Likes;

                html += `
                    <div class="vistaPublicacion">
                        <div class="usuario">
                            <div class="fotousuario">
                                <img class="Foto-Perfil-Publicacion" src="${Foto}" alt="Usuario">
                            </div>
                            <div class="infoDatosPerfilEtiquetados">
                                <div class="infoPubli">
                                    <h5 class="nameUsuario">${Nombre} ${Apellido}</h5>
                                    <p class="fecha">${Dia} ${MesNombre} ${Anio}</p>
                                </div>
                                <div class="infoPubliEtiqueta" id="infoPubliEtiqueta-${idPublicaciones}">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="descripcion">
                            <p>${Descripcion}</p>
                        </div>
                        <div class="fotoPubli">
                            <img class="imagenPublicacion" id="OcultarImagenP-${idPublicaciones}" src="${imagenPublicacion}">
                        </div>
                        <div class="btnPublicaciones">
                            <button class="like" id="LikeBoton-${idPublicaciones}"  onclick="InsertarLike(${idPublicaciones})">
                                <i class="fa-solid fa-thumbs-up"></i> Like
                            </button>
                            <p class="numLike" id="NumeroLikes-${idPublicaciones}">${LikeNull}</p>
                            <button class="comentar" onclick="mostrarComentarios(${idPublicaciones})">
                                <i class="fa-regular fa-comment"></i> Comentar
                            </button>
                            <p class="numComent" id="NumeroComentarios-${idPublicaciones}"></p>
                        </div>
                        <div class="comentariosDiv" id="comentariosDiv">
                            
                        </div>
                    </div>
                `;

                Numerocomentarios(idPublicaciones);
                ColorBotonesLike(idPublicaciones);
                OcultarImagenPublicacion(idPublicaciones);
            }
            // Establecer el contenido HTML en el contenedor de publicaciones
            MostrarPublicaciones.innerHTML = html;

            // Llenar el contenedor de usuarios etiquetados de cada publicación
            DatosPublicaciones.forEach(publicacion => {
                const idPublicaciones = publicacion.idPublicaciones;
                UsuariosEtiquetadosPublicaciones(idPublicaciones);
            });
        })
}

    
 //funcion ver usuarios etiquetados 
 function UsuariosEtiquetadosPublicaciones(idPublicaciones) {
    const MostrarEtiquetadosUsuarios = document.getElementById(`infoPubliEtiqueta-${idPublicaciones}`);
    fetch(`http://localhost:4000/UsuariosEtiquetados/${idPublicaciones}`)
        .then(res => res.json())
        .then((UsuariosEtiquetados => {
            let html = "";
            for (let i = 0; i < UsuariosEtiquetados.length; i++) {
                const Foto = UsuariosEtiquetados[i].Foto;
                const Nombre = UsuariosEtiquetados[i].Nombre;
                const Apellido = UsuariosEtiquetados[i].Apellido;
                html += `
                    <div class="usuario-etiquetado">
                        <h6 class="nameUsuarioEtiquetado">${Nombre} ${Apellido}</h6>
                    </div>
                `; 
            }
            // Se agrega el contenido al contenedor correspondiente
            MostrarEtiquetadosUsuarios.innerHTML = html;
        }))
}


    //actualizar likes
function ActualizarLikes(idPublicaciones){
    const NumeroLike = document.getElementById(`NumeroLikes-${idPublicaciones}`);
    fetch(`http://localhost:4000/PublicacionesLike/${idPublicaciones}`)
    .then(res => res.json())
    .then((DatosPublicacionLikeActualizar) => {
        const LikesActualizacion = DatosPublicacionLikeActualizar[0].Likes;

    NumeroLike.textContent = LikesActualizacion;
    
   
});
}


//funcion para  registra el like del usuario 
function InsertarLike(idPublicaciones){
    const likeButton = document.getElementById(`LikeBoton-${idPublicaciones}`);
    fetch(`http://localhost:4000/LikesUsuarios/${id}/${idPublicaciones}`)
    .then(res=>res.json())
    .then(LikeUsuario=>{
        if(LikeUsuario.length===0){
            DarLike(idPublicaciones);
                  likeButton.style.color = 'blue';
        }else{
            fetch(`http://localhost:4000/LikesUsuarios/${id}/${idPublicaciones}`)
            .then(res=>res.json())
            .then(NoLikeUsuario=>{
                const Estado=NoLikeUsuario.map((Estados)=>{return Estados.Estado}).join('');
                if(Estado=='NoLike'){
                    DarLikeActualizar(idPublicaciones);
                    likeButton.style.color = 'blue';
                    IncremntarLike(idPublicaciones);
                    
                }else{
                  
                    QuitarLike(idPublicaciones);
                    DecrementacionLike(idPublicaciones);

                }
                
        })
           
        }
    })

}

//Funcion incremntar like
function IncremntarLike(idPublicaciones){
    let Likes=1;
     //decrementacion de like
     fetch(`http://localhost:4000/LikesPublicaciones/${idPublicaciones}`,{
        method:"PUT",
        headers:{
            "content-Type":"application/json",
        },
        body: JSON.stringify({Likes}),
     })
     .then((res)=>res.json())
     .then((json)=>{
   //necesario actualiza numero like
   ActualizarLikes(idPublicaciones);

     })
     .catch((error)=>{
        console.error("Error al ACtualizar Estado",error);
    })

}
 
// funcion Decrementar like
function DecrementacionLike(idPublicaciones){
    let Likes=1;
    fetch(`http://localhost:4000/LikesPublicacionesMenos/${idPublicaciones}`,{
        method:"PUT",
        headers:{
            "content-Type":"application/json",
        },
        body: JSON.stringify({Likes}),
     })
     .then((res)=>res.json())
     .then((json)=>{
         //necesario actualiza numero like
         QuitarLike(idPublicaciones);
         ActualizarLikes(idPublicaciones);
         const likeButton = document.getElementById(`LikeBoton-${idPublicaciones}`);
          likeButton.style.color = 'black';
         
     })
     .catch((error)=>{
       
    })
}
function DarLike(idPublicaciones) {
    let Likes=1;
    fetch(`http://localhost:4000/PublicacionesLike/${idPublicaciones}`)
    .then(res => res.json())
    .then((DatosPublicacionLike) => {
        const LikesP = DatosPublicacionLike[0].Likes;
        if (LikesP === null) {
            
             fetch(`http://localhost:4000/LikesPublicacionesNull/${idPublicaciones}`,{
                method:"PUT",
                headers:{
                    "content-Type":"application/json",
                },
                body: JSON.stringify({Likes}),
             })
             .then((res)=>res.json())
             .then((json)=>{
                 //necesario actualiza numero like
                 ActualizarLikes(idPublicaciones);
                 RegistrarLike(idPublicaciones)
                
             })
             .catch((error)=>{
                console.error("Error al ACtualizar Like",error);
            })

        } else {
            //decrementacion de like
            fetch(`http://localhost:4000/LikesPublicaciones/${idPublicaciones}`,{
                method:"PUT",
                headers:{
                    "content-Type":"application/json",
                },
                body: JSON.stringify({Likes}),
             })
             .then((res)=>res.json())
             .then((json)=>{
           //necesario actualiza numero like
           ActualizarLikes(idPublicaciones);
           RegistrarLike(idPublicaciones)
        
             })
             .catch((error)=>{
                console.error("Error al ACtualizar Estado",error);
            })
        }
    });
}

// funcion insertar like
function RegistrarLike(idPublicaciones){
    const idUsuarios=id;
    let Estado="Like";
    fetch('http://localhost:4000/InsertarLikeUsuario',{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Estado,idPublicaciones,idUsuarios}),
    })
    .then((res)=>res.json())
    .then((json)=>{
       

    })
    .catch((error)=>{
        console.log(error);
    })
}


// Funcion Quitar Like

function QuitarLike(idPublicaciones){
    let Estado="NoLike";
    fetch(`http://localhost:4000/ActualizarEstado/${idPublicaciones}/${id}`,{
        method:"PUT",
        headers: {
            "content-Type":"application/json",
        },
        body: JSON.stringify({Estado})
    }

)
.then(res=>res.json())
.then((json)=>{
    
})
}
// funcion Dar like
function DarLikeActualizar(idPublicaciones){
    let Estado="Like";
    fetch(`http://localhost:4000/ActualizarEstado/${idPublicaciones}/${id}`,{
        method:"PUT",
        headers: {
            "content-Type":"application/json",
        },
        body: JSON.stringify({Estado})
    }

)
.then(res=>res.json())
.then((json)=>{
    
})
}




function ColorBotonesLike(idPublicaciones){
    fetch(`http://localhost:4000/LikesUsuariosPublicaciones/${id}/${idPublicaciones}`)
    .then(res=>res.json())
    .then(LikeUsuario=>{
        if(LikeUsuario.length===0){
            const likeButton = document.getElementById(`LikeBoton-${idPublicaciones}`);
                  likeButton.style.color = 'black';

                 
        }else{
            
                 const likeButton = document.getElementById(`LikeBoton-${idPublicaciones}`);
                  likeButton.style.color = 'blue';
                
           
        }
    })

}


function OcultarImagenPublicacion(idPublicaciones){
    fetch(`http://localhost:4000/PublicacionesUsuarios/${id}/${idPublicaciones}`)
    .then(res=>res.json())
    .then((DatosPublicacionesImagenOcultar)=>{ 
        const FotosVEr = document.getElementById(`OcultarImagenP-${idPublicaciones}`);
        for(let i=0;i<DatosPublicacionesImagenOcultar.length;i++){
            const imagen=DatosPublicacionesImagenOcultar[i].imagen;
           
        if(imagen===""){
            FotosVEr.style.display = 'none';
            
            
        }else{
            
            FotosVEr.style.display = 'blook';
           
        }
        }
      

        
    })
}


function Numerocomentarios(idPublicaciones){

    fetch(`http://localhost:4000/PublicacionesUsuarios/${id}/${idPublicaciones}`)
    .then(res=>res.json())
    .then((DatosPublicacionesFotos)=>{ 
        const FotosVEr = document.getElementById(`FotoEtiquetada-${idPublicaciones}`);
        for(let i=0;i<DatosPublicacionesFotos.length;i++){
            const NombreET=DatosPublicacionesFotos[i].Nombre2;
             
        if(NombreET===null){
            
            ActualizarNumeroComentarios(idPublicaciones);
            
            
        }else{
           
            ActualizarNumeroComentarios(idPublicaciones);
           
        }
        }
      

        
    })
    

}

function ActualizarNumeroComentarios(idPublicaciones){
    const NumerocomentariosP=document.getElementById(`NumeroComentarios-${idPublicaciones}`)
    fetch(`http://localhost:4000/ComentariosPublicacionesNumero/${idPublicaciones}`)

    .then(res=>res.json())
    .then((NumeroComentariosPublicaciones)=>{
        const ComentNumber=NumeroComentariosPublicaciones[0].Numerocomentarios;
        NumerocomentariosP.textContent=ComentNumber;
    })
}
