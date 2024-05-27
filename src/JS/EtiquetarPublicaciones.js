 // Array para almacenar los datos
 let datosArray = [];

 // Función para manejar el cambio de estado del checkbox
 function handleCheckboxChange(checkbox) {
    let idUsuario = checkbox.dataset.id;
    
    if (checkbox.checked) {
        // Verificar si el idUsuario ya está en el array antes de agregarlo
        if (!datosArray.some(dato => dato.idUsuario === idUsuario)) {
            // Agregar los datos al array
            datosArray.push({
                idUsuario: idUsuario
            });
        }
    } else {
        // Eliminar los datos del array
        datosArray = datosArray.filter(dato => dato.idUsuario !== idUsuario);

    }
    // Mostrar los datos en la lista
    mostrarDatos();
}


/// no tiene funcionalidad
 function EliminarDatosArray(){
    datosArray=[];
    console.log("Estoy en funcion eliminar",datosArray);
    mostrarDatos();
 }
 // Función para mostrar los datos en la lista
 function mostrarDatos() {
     // Iterar sobre los datos y agregarlos a la lista como elementos de lista
     datosArray.forEach(function(dato) {
        console.log(dato)
     });
 }
// Obtener todos los checkboxes
function MarcarUsuariosEtiquetado(){
        // Recorrer todos los checkboxes y marcar los correspondientes según datosArray
        const checkboxes = document.querySelectorAll('.check');
        checkboxes.forEach(checkbox => {
            const idUsuario = checkbox.dataset.id;
            checkbox.checked = datosArray.some(dato => dato.idUsuario === idUsuario);
        });
}
 function CrearPublicacionetiquetadaSinImagen(){
    fetch('http://localhost:4000/Maxid')
    .then(res=>res.json())
    .then((respuesta)=>{
        const idPublicacionesMax=respuesta.map((id)=>{return id.idPublicaciones}).join('');
       const idPubli=parseInt(idPublicacionesMax);
       
        
       if(datosArray.length===0){
        insertarPublicacionSinImagen();
        console.log('Estoy en el if ya que no hay datos')
       }else{
       const idUsuariosOrigen=id;
           insertarPublicacionSinImagen();
        datosArray.forEach(function(dato) {
            const idPublicaciones=idPubli+1;
            EtiquetarPublicacion(dato.idUsuario,idPublicaciones);
            

            
         });
       }
    })
 }


 function EtiquetarPublicacion(dato,idPublicaciones){
    const DescripcionInput=document.getElementById('Descripcion');
    console.log("Dato en la funcion es ",dato)
    const idUsuariosOrigen=id;
    const idUsuariosDestino=dato;//Este sera El id Que SE optiene del chek
    fetch('http://localhost:4000/Etiquetar',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({idPublicaciones,idUsuariosOrigen,idUsuariosDestino}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        console.log("Etiquetado con exito")
        datosArray=[];
    })
}



function CrearPublicacionetiquetadaConImagen(URL_imagen){
    fetch('http://localhost:4000/Maxid')
    .then(res=>res.json())
    .then((respuesta)=>{
        const idPublicacionesMax=respuesta.map((id)=>{return id.idPublicaciones}).join('');
       const idPubli=parseInt(idPublicacionesMax);
       
        
       if(datosArray.length===0){
        insertarPublicacionConImagen(URL_imagen);
        console.log('Estoy en el if ya que no hay datos')
       }else{
       const idUsuariosOrigen=id;
       insertarPublicacionConImagen(URL_imagen);
        datosArray.forEach(function(dato) {
            const idPublicaciones=idPubli+1;
            EtiquetarPublicacion(dato.idUsuario,idPublicaciones);
            

            
         });
       }
    })
 }