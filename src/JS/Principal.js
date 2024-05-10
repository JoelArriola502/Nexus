
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
        <button class="Perfil_boton">
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
        <input class="Crear-Texto-Publicacion" type="text" placeholder="¿Qué estas pensando?" />
    </div>
    <div class="botonesPubli">
        
        <button class="multimedia"><i class="fa-solid fa-photo-film"></i> Foto/Video</button>
        <button class="Etiquetar"><i class="fa-solid fa-tag"></i>Etiquetar</button>
        <button class="btnPublicar">Publicar</button>
    </div>
    </div>
        `
        
       
 crearPublicacion.innerHTML=html;

       }

    })
}
  document.addEventListener("DOMContentLoaded",ev=>{   
    MostrarTodoInicio();
    CargarPublicacionCrear();
    CargarDatosPublicaciones();
  })
function CargarDatosPublicaciones(){
    const MostrarPublicaciones=document.getElementById("PublicacionVista");
    fetch(`http://localhost:4000/Publicaciones/${id}`)
    .then(res=>res.json())
    .then((DatosPublicaciones)=>{
    let html="";
    for(let i=0; i<DatosPublicaciones.length;i++){
        const idPublicaciones=DatosPublicaciones[i].idPublicaciones;
        const Foto=DatosPublicaciones[i].Foto;
        const Nombre=DatosPublicaciones[i].Nombre;
        const Apellido=DatosPublicaciones[i].Apellido;
        const FotoEtiquetado=DatosPublicaciones[i].Foto2;
        const NombreEtiquetado=DatosPublicaciones[i].Nombre2;
        const ApellidoEtiquetado=DatosPublicaciones[i].Apellido2;
        const Fecha=DatosPublicaciones[i].Fecha;
        const Descripcion=DatosPublicaciones[i].Descripcion;
        const imagenPublicacion=DatosPublicaciones[i].imagen;
        const Likes=DatosPublicaciones[i].Likes;

    //Obtner dato fecha y darle nombre
    const fechaObtener=new Date(Fecha);
        const nombresMeses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ];
        const Dia=fechaObtener.getDate();
        const Mes=fechaObtener.getMonth();
        const Anio=fechaObtener.getFullYear();
        const MesNombre = nombresMeses[Mes];
        let LikeNull;
        if(Likes===null){
            LikeNull="";
        }else{
            LikeNull=Likes;
        }

 

        let DatosUsuarioEtiquetado,NombreNoNull,ApellidoNoNull,FotoNoNull;
        if(NombreEtiquetado===null&& ApellidoEtiquetado===null){
            
            NombreNoNull="";
            ApellidoNoNull="";
            FotoNoNull=" ";
            
            
        }else{
            NombreNoNull=NombreEtiquetado;
            ApellidoNoNull=ApellidoEtiquetado;
            FotoNoNull=FotoEtiquetado;
        }
      
        


       

        html=html+` 
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
            <div class="infoPubliEtiqueta">
            <div class="fotousuarioEtiquetado" >
            <img class="Foto-Perfil-Publicacion-Etiquetado"  src="${FotoNoNull}" id="FotoEtiquetada-${idPublicaciones}">
            </div>
                <h5 class="nameUsuario">${NombreNoNull} ${ApellidoNoNull}</h5>
                
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

        `
        MostrarPublicaciones.innerHTML=html;
        Numerocomentarios(idPublicaciones);
        OcultarPerfilEtiquetaNoExiste(idPublicaciones);
        ColorBotonesLike(idPublicaciones);
        OcultarImagenPublicacion(idPublicaciones);
       
       
       


    }


    })
        
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

function OcultarPerfilEtiquetaNoExiste(idPublicaciones){
    fetch(`http://localhost:4000/PublicacionesUsuarios/${id}/${idPublicaciones}`)
    .then(res=>res.json())
    .then((DatosPublicacionesFotos)=>{ 
        const FotosVEr = document.getElementById(`FotoEtiquetada-${idPublicaciones}`);
        for(let i=0;i<DatosPublicacionesFotos.length;i++){
            const NombreET=DatosPublicacionesFotos[i].Nombre2;
             
        if(NombreET===null){
            
            FotosVEr.style.display = 'None';
            
            
        }else{
           
            FotosVEr.style.display = 'blook';
           
        }
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
