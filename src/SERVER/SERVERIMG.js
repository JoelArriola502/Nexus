function ValidarEscribaAlgo() {
  if (!Descripcion) {
    alert("LA descripcion esta vacia");
  } else {
    Servidor();
  }
}
function Servidor() {
  // Agrega un evento de escucha al input de tipo file con el ID "FilePublicacion"
  document
    .getElementById("FilePublicacion")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];

      if (!file) {
        alert("Por favor, selecciona un archivo o imagen");
        return;
      }

      // Muestra la barra de progreso
      const uploadProgress = document.getElementById("img-Progeros-Carga");
      uploadProgress.style.display = "block";

      // Muestra el botón "Publicar"
      const publicarBtn = document.getElementById("PublicarPublicacion");
    });

  document
    .getElementById("PublicarPublicacion")
    .addEventListener("click", async function () {
      const file = document.getElementById("FilePublicacion").files[0];
      const DescripcionInput = document.getElementById("Descripcion");

      const Descripcion = DescripcionInput.value;
      if (!file) {
        if (!Descripcion || Descripcion.trim().length === 0) {
          DescripcionInput.classList.add("vacio");
        } else {
          CrearPublicacionetiquetadaSinImagen();
          DescripcionInput.classList.remove("vacio");
        }
      } else {
        if (!Descripcion || Descripcion.trim().length === 0) {
          DescripcionInput.classList.add("vacio");
        } else {
          // Configura tus detalles de Cloudinary
          const cloudName = "dn0l6f8vr"; // Reemplaza con tu Cloudinary cloud_name
          const unsignedUploadPreset = "m7lawl2h"; // Reemplaza con tu unsigned upload preset

          const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", unsignedUploadPreset);

          const uploadProgress = document.getElementById("img-Progeros-Carga");
          //const imgPreview = document.getElementById('img-preview');

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

            const URL_imagen = response.data.url;
            CrearPublicacionetiquetadaConImagen(URL_imagen);
            uploadProgress.style.display = "none";
            DescripcionInput.classList.remove("vacio");
          } catch (error) {
            //manejo de errores de subida de la imagen
            console.error("Error al subir la imagen:", error);
            alert("Error al subir la imagen. Por favor, intenta de nuevo.");
          }
        }
      }
    });
}

function insertarPublicacionSinImagen() {
  const DescripcionInput = document.getElementById("Descripcion");
  const imagen = "";
  const video = "";
  const musica = "";
  const Descripcion = DescripcionInput.value;
  const idUsuarios = id;

  return fetch(`http://${ip}:4000/NuevaPublicacion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Descripcion, imagen, video, musica, idUsuarios }),
  })
    .then((res) => res.json())
    .then((respuesta) => {
      DescripcionInput.value = "";
      CargarDatosPublicaciones();
    });
}

function insertarPublicacionSinImagenEtiquetado() {
  const DescripcionInput = document.getElementById("Descripcion");
  const imagen = "";
  const video = "";
  const musica = "";
  const Descripcion = DescripcionInput.value;
  const idUsuarios = id;

  return fetch(`http://${ip}:4000/NuevaPublicacion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Descripcion, imagen, video, musica, idUsuarios }),
  })
    .then((res) => res.json())
    .then((respuesta) => {
      DescripcionInput.value = "";

      InsertarPublicacionEtiquetada();
      CargarDatosPublicaciones();
    });
}

function InsertarPublicacionEtiquetada() {
  fetch(`http://${ip}:4000/Maxid`)
    .then((res) => res.json())
    .then((respuesta) => {
      const idPublicacionesMax = respuesta
        .map((id) => {
          return id.idPublicaciones;
        })
        .join("");
      const idPubli = parseInt(idPublicacionesMax);
      const idUsuariosOrigen = id;
      datosArray.forEach(function (dato) {
        const idPublicaciones = idPubli;
        EtiquetarPublicacion(dato.idUsuario, idPublicaciones);
       
      });
    });
}
function insertarPublicacionConImagen(URL_imagen) {
  console.log("funcion ver cuantas veces se ejecuta ");
  const DescripcionInput = document.getElementById("Descripcion");
  const imagen = URL_imagen;
  const video = "";
  const musica = "";
  const Descripcion = DescripcionInput.value;
  const idUsuarios = id;
  fetch(`http://${ip}:4000/NuevaPublicacion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Descripcion, imagen, video, musica, idUsuarios }),
  })
    .then((res) => res.json())
    .then((respuesta) => {
      DescripcionInput.value = "";
      const input = document.getElementById("FilePublicacion");

      // Restablecer el valor del input
      input.value = "";
      CargarDatosPublicaciones();
    });
}

function insertarPublicacionConImagenEtiquetado(URL_imagen) {
  const DescripcionInput = document.getElementById("Descripcion");
  const imagen = URL_imagen;
  const video = "";
  const musica = "";
  const Descripcion = DescripcionInput.value;
  const idUsuarios = id;
  fetch(`http://${ip}:4000/NuevaPublicacion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Descripcion, imagen, video, musica, idUsuarios }),
  })
    .then((res) => res.json())
    .then((respuesta) => {
      DescripcionInput.value = "";
      const input = document.getElementById("FilePublicacion");

      // Restablecer el valor del input
      input.value = "";
      InsertarPublicacionEtiquetada();
      CargarDatosPublicaciones();
    });
}
