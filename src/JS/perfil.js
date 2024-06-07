
function mostrarPerfil() {
    const profileContainer = document.getElementById('ContenidoPrincipal');
    html = `
        <div class="main-container">
        <div class="profile-container">
        <div class="cover-photo">
        <img class="foto-portada" id="FotoPortadaPerfil" src="" alt="">
            <div class="change-cover-photo" onclick="AgregarFotoPortada()" >
                <i class="fas fa-camera"></i>
                <p><strong>Agrega foto de portada</strong></p>
            </div>
            <div id="cambio"></div>
            <div class="profile-photo" id="CargarFotoPerfil">
            
           
            </div>
        </div>
        <div class="profile-details">
            <h1 id="NombrePerfilUsuarios"></h1>
            <div class="stats">
                <span class="followers" id="TotalSeguidores"></span>
                <span class="friends" id="TotalAmigos" ></span>
            </div>

            <div id="overlay" class="overlay">
                <div class="content">
                    <span onclick="cerrarVentana()" class="close" id="closeButton">&times;</span>
                    <div class="form-header">
                        <h2>Editar perfil</h2>
                        <p>Actualiza tu nombre y apellido.</p>
                    </div>
                    <form id="editForm">
                        <div class="form-group">
                            <label for="firstName">Nombre
                            <input type="text" id="firstName" name="firstName" placeholder="John" required>
                            </label>
                            <label for="lastName">Apellido
                            <input type="text" id="lastName" name="lastName" placeholder="Doe" required>
                            </label>
                        </div>
                        <input onclick="ActualizarDatosUsuario()" class="btn-Guardar-Datos" placeholder="Guardar">
                    </form>
                </div>
            </div>

            
    
        </div>
        <h1>Amigos</h1>
        <div class="friends-list" id="AmigosPerfil">
            
        </div>

        </div>
        <div class="PublicacionesPerfilUsuarios" id="PublicacionesPerfilUsuarios">
        
        </div>
        </div>
    `;
    profileContainer.innerHTML = html;
    CargarFotoPerfilUsuarios();
    CargarNombrePerfilUsuario();
    UsuariosAmigosPerfil();
    TotalAmigosPerfil();
    TotalSeguidoresPerfil();
    CargarPublicacionesPerfil();
    CargarFotoPortadaPerfil();
  
}

function MostrarPublicacionesCrear(){
    const MostrarPublicaciones = document.getElementById("PublicacionesPerfilUsuarios");
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
    MostrarPublicaciones.innerHTML=html;
}

function CargarPublicacionesPerfil(){
    MostrarPublicacionesCrear();
    CargarPublicacionCrear();
    CargarDatosPublicaciones();
}
function editarNombre() {
    overlay.style.display = 'flex';
}

function cerrarVentana() {
    overlay.style.display = 'none';
}


function CargarFotoPerfilUsuarios(){
    const CargarFotoPerfil=document.getElementById('CargarFotoPerfil')
    fetch(`http://${ip}:4000/DatosPerfil/${id}`)
    .then(res=>res.json())
    .then(DatosPerfil=>{
       let html="";
       for(let i=0; i<DatosPerfil.length;i++){
        const Foto=DatosPerfil[i].Foto;
       
        html=html+`
        <img class="imagen-perfil" src="${Foto}" alt="">
        <div class="change-profile-photo">
        <label id="" onclick="cambiarfoto()"><i class="fas fa-camera"></i></label>
            
        </div>
        `
        CargarFotoPerfil.innerHTML=html;
       

       }

    })
}

function CargarNombrePerfilUsuario(){
    const NombrePerfilUsuario=document.getElementById('NombrePerfilUsuarios');
    fetch(`http://${ip}:4000/DatosPerfil/${id}`)
    .then(res=>res.json())
    .then(DatosPerfil=>{
       let html="";
       for(let i=0; i<DatosPerfil.length;i++){
        const Nombre=DatosPerfil[i].Nombre;
        const Apellido=DatosPerfil[i].Apellido;
        const Foto=DatosPerfil[i].Foto;
       NombrePerfilUsuario.innerHTML=Nombre+" "+Apellido+`<span onclick="editarNombre()" class="edit-icon"><i class="fa-solid fa-pen"></i></span>`;
        
        


       }

    })
}


function UsuariosAmigosPerfil(){
    const CargarUsuariosPerfil=document.getElementById("AmigosPerfil");
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
           <div class="friend">
           <img class="friend-photo" src="${Foto}">
           <div class="friend-info">
               <span >${Nombre} ${Apellido}</span>
           </div>
       </div>
       
            `
            CargarUsuariosPerfil.innerHTML=html;
        }

    })
}

function TotalAmigosPerfil(){
    const CargarAmigosTotal=document.getElementById('TotalAmigos');
    fetch(`http://${ip}:4000/TotalAmigos/${id}`)
    .then(res=>res.json())
    .then((respuesta)=>{
        respuesta.forEach(TotalAmigosPerfil => {
            const AmigosTotal=TotalAmigosPerfil.TotalAmigos;
            CargarAmigosTotal.innerHTML=AmigosTotal+" Amigos";
            
        });
    })
}


function TotalSeguidoresPerfil(){
    const CargarSeguidoresTotal=document.getElementById('TotalSeguidores');
    fetch(`http://${ip}:4000/TotalSeguidores/${id}`)
    .then(res=>res.json())
    .then((respuesta)=>{
        respuesta.forEach(TotalSeguidoresPerfil => {
            const SeguidoresTotal=TotalSeguidoresPerfil.TotalSeguidores;
            CargarSeguidoresTotal.innerHTML=SeguidoresTotal+" Seguidores";
            
        });
    })
}
function ActualizarDatosUsuario(){
    const NombreInput=document.getElementById('firstName');
    const ApellidoInput=document.getElementById('lastName');
    const Nombre=NombreInput.value;
    const Apellido=ApellidoInput.value;


    if(!Nombre ||!Apellido||Nombre.trim().length===0||Apellido.trim().length===0){
     Swal.fire({
        icon:"error",
        title:"Error",
        text:"LLene los campos"
     })    
    }else{

        if(validarNombre(Nombre)&& validarNombre(Apellido)){
    fetch(`http://${ip}:4000/ActualizaNombre/${id}`,{
                method:"PUT",
                headers:{
                    "content-Type":"application/json",
                },
                body: JSON.stringify({Nombre,Apellido}),
        
            }
            )
            .then(res=>res.json())
            .then((respuesta)=>{
                
                CargarNombrePerfilUsuario();
                CargarDatosPerfil();
                cerrarVentana();
                CargarPublicacionesPerfil();
        
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: '¡Por favor, ingrese un nombre y un apellido válidos.!'
            });
        }
        
    }
   


}

function validarNombre(Datos) {
    // Verificar que el nombre tenga entre 2 y 50 caracteres
    if (Datos.length < 2 || Datos.length > 50) {
        return false; // Nombre no válido
    }
    return true; // Nombre válido
}


function cambiarfoto() {
    const cambiar = document.getElementById('cambio');
    const html = `
        <div class="floating-window">
            <div class="floating-window-content">
                <div class="header-perfil-foto">
                <h2>Cargar foto</h2>
                <i class="fa-solid fa-xmark" onclick="closeFloatingWindow()"></i>
                </div>
                <p>Seleccione una foto</p>
                <div class="panelCargarPerfil">
                    <div class="camara">
                    <input type="file" id="fPeril" style="display: none;">
                    <label class="icono-fPerfil" for="fPeril"><i class="fa-solid fa-camera"></i></label>
                    </div>
                    <div class="verFperfil">
                    <img src="" id="CargarImagenSubir"  class="CargarImagenSubir" style="display: none;">
                    </div>
                </div>
                <progress id="img-Progeros-Actualizacion" value="0" max="100" style="width: 100%; display: none;"></progress>
                <input class="cambiosFperfil" type="button" id="BotonFotoPerfil" value="Guardar cambios">
            </div>
        </div>
    `;
    cambiar.innerHTML = html;
    ImagenPerfil();
}

function closeFloatingWindow() {
    const cambiar = document.getElementById('cambio');
    const html = `
        
    `;
    cambiar.innerHTML = html;
}



function AgregarFotoPortada(){
    const cambiar = document.getElementById('cambio');
    const html = `
        <div class="floating-window">
            <div class="floating-window-content">
                <div class="header-perfil-foto">
                <h2>Cargar foto</h2>
                <i class="fa-solid fa-xmark" onclick="closeFloatingWindow()"></i>
                </div>
                <p>Seleccione una foto</p>
                <div class="panelCargarPerfil">
                    <div class="camara">
                    <input type="file" id="fPerilPortada" style="display: none;">
                    <label class="icono-fPerfil" for="fPerilPortada"><i class="fa-solid fa-camera"></i></label>
                    </div>
                    <div class="verFperfil">
                    <img src="" id="CargarImagenSubirPortada"  class="CargarImagenSubir" style="display: none;">
                    </div>
                </div>
                <progress id="img-Progeros-Actualizacion" value="0" max="100" style="width: 100%; display: none;"></progress>
                <input class="cambiosFperfil" type="button" id="BotonFotoPerfil_Portada" value="Guardar cambios">
            </div>
        </div>
    `;
    cambiar.innerHTML = html;
    ImagenPortada();
}