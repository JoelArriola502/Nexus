const idUs=localStorage.getItem('idUsuarios');
function mostrarComentarios(idPublicaciones) {
    Numerocomentarios(idPublicaciones);
    var comentariosDiv = document.getElementById("comentariosDiv");
        comentariosDiv.style.display = "flex";
    fetch(`http://localhost:4000/Publicacionescomentarios/${idPublicaciones}`)
    .then(res=>res.json(res))
    .then((PublicacionComentariosVEr)=>{ 
      
      for(let i=0;i<PublicacionComentariosVEr.length;i++){
        const Nombre=PublicacionComentariosVEr[i].Nombre;
        const Apellido=PublicacionComentariosVEr[i].Apellido;
        const imagen=PublicacionComentariosVEr[i].imagen;
        const Foto=PublicacionComentariosVEr[i].Foto;
        const Fecha=PublicacionComentariosVEr[i].Fecha;
        const Descripcion=PublicacionComentariosVEr[i].Descripcion;

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
    // Contenido HTML de los comentarios
    var contenidoComentarios = `
    <div class="ventanaComentarios animate__animated animate__slideInDown">
        <div class="encabezadoPublicacion">
            <h3>Publicación de ${Nombre}</h3>
            <button class="cerrarVentanaComentario" onclick="cerrarVentanaComentario()">
                <i class='bx bx-x'></i>
            </button>
        </div>
        
        <div class="caja">
            <div class="containerPubliUsuario">
                <div class="userPubli">
                    <div class="fotoUserPerfil">
                        <img src="${Foto}" class="fotoU">
                    </div>
                    <div class="nomUser">
                        <h5 Class="nom">${Nombre} ${Apellido}</h5>
                        <p class="fechaP">${Dia} ${MesNombre} ${Anio}</p>
                    </div>
                </div>
                <div class="descripcion">
                    <p>${Descripcion}</p>
                </div>
                <div class="fotoPu" id="OcultarImagenPublicacion-${idPublicaciones}">
                    <img class="imagenPublicacion" src="${imagen}" >
                </div>
            </div>
            <div class="containerComentarios" >
            <!-- Aquí van los comentarios -->
            <h3>Comentarios</h3>
            <hr>
             <div id="ComentariosPublicacion">
             </div>
            </div> 
        </div>

        <div class="crearComentarioNuevo">
            <img src="${Foto}" class="fotoU">
            <input type="text" placeholder="Escribe un comentario..." class="inputComentario" id="ComentarioPublicacion-${idPublicaciones}">
            <button class="botonEnviarComentario" onclick="InsertarComentario(${idPublicaciones})"><i class='bx bxs-send'></i></button>
        </div>

    </div>

`;

// Insertar el contenido de los comentarios en el div "comentariosDiv"
comentariosDiv.innerHTML = contenidoComentarios;
OcultarImagenPublicacionUnica(idPublicaciones);
ComentariosPublicacion(idPublicaciones);
PresionarEnterComentario(idPublicaciones);
    
      }

    

    })
   
}

function PresionarEnterComentario(idPublicaciones){
    document.getElementById(`ComentarioPublicacion-${idPublicaciones}`).addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            // Ejecutar la función que desees
            InsertarComentario(idPublicaciones);
        }
    });
    }

function cerrarVentanaComentario() {
    var comentariosDiv = document.getElementById("comentariosDiv");
    comentariosDiv.style.display = "none";
}

function OcultarImagenPublicacionUnica(idPublicaciones){
    fetch(`http://localhost:4000/Publicacionescomentarios/${idPublicaciones}`)
    .then(res=>res.json())
    .then((DatosPublicacionesImagenOcultar)=>{ 
        const FotosVEr = document.getElementById(`OcultarImagenPublicacion-${idPublicaciones}`);
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


function ComentariosPublicacion(idPublicaciones){
    const ImprimirDatos=document.getElementById('ComentariosPublicacion');
    fetch(`http://localhost:4000/ComentariosPublicaciones/${idPublicaciones}`)
    .then(res=>res.json(res))
    .then((ComentariosPublicacionDatos)=>{
        let html="";
        for(let i=0;i<ComentariosPublicacionDatos.length;i++){
            const Nombre=ComentariosPublicacionDatos[i].Nombre;
            const Apellido=ComentariosPublicacionDatos[i].Apellido;
            const Foto=ComentariosPublicacionDatos[i].Foto;
            const Comentario=ComentariosPublicacionDatos[i].Comentario;
            const Fecha=ComentariosPublicacionDatos[i].Fecha;

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
            
          
            <div class="containerComent animate__animated animate__fadeInDownBig">
                <div class="fotoUserPerfil">
                    <img src="${Foto}" alt="foto" class="fotoU">
                </div>
                <div class="textoPublicacion">
                    <h5 Class="nom">${Nombre} ${Apellido} - ${Dia} ${MesNombre} ${Anio}</h5>
                    <p class="text">
                    ${Comentario}
                    </p>
                </div>
            </div>
            `;
            ImprimirDatos.innerHTML=html;


        }
        
    })
}



function InsertarComentario(idPublicaciones){

    const idUsuarios=String(idUs);
    const ComentarioInput=document.getElementById(`ComentarioPublicacion-${idPublicaciones}`);

    const Comentario=ComentarioInput.value;
    if(!Comentario){
        ComentarioInput.classList.add("vacio"); 
    }else{
         fetch('http://localhost:4000/InsertarComentarios',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({Comentario,idPublicaciones,idUsuarios}),
    })
    .then(res=>res.json())
    .then(DatosAgregados=>{
        ComentarioInput.value="";
        ComentarioInput.classList.remove("vacio"); 
        ActualizarNumeroComentarios(idPublicaciones);
        ComentariosPublicacion(idPublicaciones);
        
    })
    }
   

}