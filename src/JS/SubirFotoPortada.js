function ImagenPortada() {
    // Agrega un evento de escucha al input de tipo file con el ID "img-uploader"
    document
      .getElementById("fPerilPortada")
      .addEventListener("change", function (event) {
        const imgPreview = document.getElementById("CargarImagenSubirPortada");
        imgPreview.style.display = "block";
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        imgPreview.src = imageUrl;
  
        if (!file) {
          alert("Por favor, selecciona un archivo");
          return;
        }
  
        // Muestra la barra de progreso
        const uploadProgress = document.getElementById(
          "img-Progeros-Actualizacion"
        );
        uploadProgress.style.display = "block";
        // Muestra el botón "Publicar"
      });
  
    document
      .getElementById("BotonFotoPerfil_Portada")
      .addEventListener("click", async function () {
        const GuardarFotoPerfil = document.getElementById("BotonFotoPerfil_Portada");
        const file = document.getElementById("fPerilPortada").files[0];
        if (!file) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "¡Seleccione una imagen.!",
          });
        } else {
          // Configura tus detalles de Cloudinary
          GuardarFotoPerfil.style.display = "none";
          const cloudName = "dn0l6f8vr"; // Reemplaza con tu Cloudinary cloud_name
          const unsignedUploadPreset = "m7lawl2h"; // Reemplaza con tu unsigned upload preset
  
          const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", unsignedUploadPreset);
  
          const uploadProgress = document.getElementById(
            "img-Progeros-Actualizacion"
          );
          const imgPreview = document.getElementById("img-preview");
  
          try {
            const response = await axios.post(url, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: function (progressEvent) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                uploadProgress.value = percentCompleted;
              },
            });
            GuardarFotoPerfil.style.display = "block";
            const FotoPerfil = response.data.url;
            InsertarFotoPortadaUsuario(FotoPerfil);
          } catch (error) {
            //manejo de errores de subida de la imagen
            console.error("Error al subir la imagen:", error);
            alert("Error al subir la imagen. Por favor, intenta de nuevo.");
          }
        }
      });
  }



  function InsertarFotoPortadaUsuario(FotoUrl){
   
    const Foto = FotoUrl;
    const idUsuarios = id;
    fetch('http://localhost:4000/InsertarFotoPortada',{
        method:"POST",
        headers:{
            "content-Type":"application/json",
        },
        body: JSON.stringify({Foto,idUsuarios}),
    })
    .then(res=>res.json())
    .then((respuesta)=>{
        CargarFotoPortadaPerfil();
        closeFloatingWindow();
    })
    .catch((error)=>{
        console.log(error);
    })
  }

  function CargarFotoPortadaPerfil(){
    fetch(`http://localhost:4000/FotoPortadaMax/${id}`)
    .then(res=>res.json())
    .then((respuesta)=>{
        for(let i=0;i<respuesta.length;i++){
            const FotoPortada=respuesta[i].Foto;
            document.getElementById('FotoPortadaPerfil').src=FotoPortada;
        }
    })
  }