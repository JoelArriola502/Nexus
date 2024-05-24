//creamos la funcion para obtener la imagen 

function ImagenPerfil(){
   // Agrega un evento de escucha al input de tipo file con el ID "img-uploader"
document.getElementById('fPeril').addEventListener('change', function(event) {
    const imgPreview = document.getElementById('CargarImagenSubir');
    imgPreview.style.display="block";
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    imgPreview.src=imageUrl;

    if (!file) {
        alert('Por favor, selecciona un archivo');
        return;
    }

    // Muestra la barra de progreso
    const uploadProgress = document.getElementById("img-Progeros-Actualizacion");
      uploadProgress.style.display = "block";
      // Muestra el botón "Publicar"
      
});

document.getElementById('BotonFotoPerfil').addEventListener('click', async function() {
    const GuardarFotoPerfil = document.getElementById("BotonFotoPerfil");
    const file = document.getElementById('fPeril').files[0];
    if(!file){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡Seleccione una imagen.!'
        });
    }else{
   // Configura tus detalles de Cloudinary
   GuardarFotoPerfil.style.display="none";
   const cloudName = 'dn0l6f8vr'; // Reemplaza con tu Cloudinary cloud_name
   const unsignedUploadPreset = 'm7lawl2h'; // Reemplaza con tu unsigned upload preset

   const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
   const formData = new FormData();
   formData.append('file', file);
   formData.append('upload_preset', unsignedUploadPreset);

   const uploadProgress = document.getElementById('img-Progeros-Actualizacion');
   const imgPreview = document.getElementById('img-preview');

   try {
       const response = await axios.post(url, formData, {
           headers: {
               'Content-Type': 'multipart/form-data'
           },
           onUploadProgress: function(progressEvent) {
               const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
               uploadProgress.value = percentCompleted;
               
           }
       });
       GuardarFotoPerfil.style.display="block";
       const FotoPerfil=response.data.url;
       InsertarFotoPerfilUsuarios(FotoPerfil);
       ActualizarFotoPerfil(FotoPerfil);
    
   } catch (error) {

       //manejo de errores de subida de la imagen
       console.error('Error al subir la imagen:', error);
       alert('Error al subir la imagen. Por favor, intenta de nuevo.');
   }
    }
 
});
}



function InsertarFotoPerfilUsuarios(FotoPerfil){
    const Foto=FotoPerfil;
    const idUsuarios=id;
    fetch('http://localhost:4000/InsertarFoto',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Foto,idUsuarios}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        
    })

}

function ActualizarFotoPerfil(FotoPerfil){
    const QuitarImagen=document.getElementById('fPeril');
    const Foto=FotoPerfil;
    fetch(`http://localhost:4000/ActualizaFotoPerfil/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",

        },
        body: JSON.stringify({Foto}),

    })
    .then(res=>res.json())
    .then((respuesta)=>{
        QuitarImagen.value="";
        const imgPreview = document.getElementById('CargarImagenSubir');
        imgPreview.src="";
        imgPreview.style.display="none";
        CargarFotoPerfilUsuarios();
        CargarDatosPerfil();
        CargarPublicacionesPerfil();
        closeFloatingWindow();
    })

}