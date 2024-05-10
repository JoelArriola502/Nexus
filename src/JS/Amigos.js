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
                    
                    <button class="send">Seguir</button>
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