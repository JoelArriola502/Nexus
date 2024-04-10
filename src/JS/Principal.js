const idUsuarios=localStorage.getItem("idUsuarios");
const CargarPerfil=document.getElementById('DatosPerfil');
const id=parseInt(idUsuarios);
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
        <div class="inputPublicacion">
        <img class="Foto-Perfil_p" src="${Foto}" alt="Usuario"/>
        <input class="Crear-Texto-Publicacion" type="text" placeholder="¿Qué estas pensando?" />
    </div>
    <div class="botonesPubli">
        
        <button class="multimedia"><i class="fa-solid fa-photo-film"></i> Foto/Video</button>
        <button class="Etiquetar"><i class="fa-solid fa-tag"></i>Etiquetar</button>
        <button class="btnPublicar">Publicar</button>
    </div>
        `
        
       
 crearPublicacion.innerHTML=html;

       }

    })
}
CargarPublicacionCrear();
function CargarDatosPublicaciones(){
    const MostrarPublicaciones=document.getElementById("PublicacionVista");
    fetch(`http://localhost:4000/Publicaciones/${id}`)
    .then(res=>res.json())
    .then((DatosPublicaciones)=>{
        console.log(DatosPublicaciones);
    let html="";
    for(let i=0; i<DatosPublicaciones.length;i++){
        const Foto=DatosPublicaciones[i].Foto;
        const Nombre=DatosPublicaciones[i].Nombre;
        const Apellido=DatosPublicaciones[i].Apellido;
        const FotoEtiquetado=DatosPublicaciones[i].Foto2;
        const NombreEtiquetado=DatosPublicaciones[i].Nombre2;
        const ApellidoEtiquetado=DatosPublicaciones[i].Apellido2;
        const Fecha=DatosPublicaciones[i].Fecha;
        const Descripcion=DatosPublicaciones[i].Descripcion;
        const imagenPublicacion=DatosPublicaciones[i].imagen;

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
       

        html=html+` 
        <div class="vistaPublicacion">
    <div class="usuario">
        <div class="fotousuario">
            <img class="Foto-Perfil-Publicacion" src="${Foto}" alt="Usuario"/>
        </div>
        <div class="infoPubli">
            <h5 class="nameUsuario">${Nombre} ${Apellido}</h5>
            <p class="fecha">${Dia} ${MesNombre} ${Anio}</p>
        </div>
    </div>
    <div class="descripcion">
        <p>${Descripcion}</p>
    </div>
    <div class="fotoPubli">
        <img class="imagenPublicacion" src="${imagenPublicacion}" alt="Foto">
    </div>
    <div class="btnPublicaciones">
        <button class="like">
            <i class="fa-regular fa-thumbs-up"></i> Like
        </button>
        <p class="numLike">200</p>
        <button class="comentar">
            <i class="fa-regular fa-comment"></i> Comentar
        </button>
        <p class="numComent">200</p>
    </div>

</div>

        `
        MostrarPublicaciones.innerHTML=html;


    }


    })
        
    }
    
    CargarDatosPublicaciones();