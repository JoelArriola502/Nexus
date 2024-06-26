// Array para almacenar los datos
let datosArray = [];

// Función para manejar el cambio de estado del checkbox
function handleCheckboxChange(checkbox) {
  let idUsuario = checkbox.dataset.id;

  if (checkbox.checked) {
    // Verificar si el idUsuario ya está en el array antes de agregarlo
    if (!datosArray.some((dato) => dato.idUsuario === idUsuario)) {
      // Agregar los datos al array
      datosArray.push({
        idUsuario: idUsuario,
      });
    }
  } else {
    // Eliminar los datos del array
    datosArray = datosArray.filter((dato) => dato.idUsuario !== idUsuario);
  }
  // Mostrar los datos en la lista
  mostrarDatos();
}

/// no tiene funcionalidad
function EliminarDatosArray() {
  datosArray = [];
 
  mostrarDatos();
}
// Función para mostrar los datos en la lista
function mostrarDatos() {
  // Iterar sobre los datos y agregarlos a la lista como elementos de lista
  datosArray.forEach(function (dato) {
  });
}
// Obtener todos los checkboxes
function MarcarUsuariosEtiquetado() {
  // Recorrer todos los checkboxes y marcar los correspondientes según datosArray
  const checkboxes = document.querySelectorAll(".check");
  checkboxes.forEach((checkbox) => {
    const idUsuario = checkbox.dataset.id;
    checkbox.checked = datosArray.some((dato) => dato.idUsuario === idUsuario);
  });
}
function CrearPublicacionetiquetadaSinImagen() {
  if (datosArray.length === 0) {
    insertarPublicacionSinImagen();
  } else {
    insertarPublicacionSinImagenEtiquetado();
  }
}

function EtiquetarPublicacion(dato, idPublicaciones) {
  const DescripcionInput = document.getElementById("Descripcion");
  const idUsuariosOrigen = id;
  const idUsuariosDestino = dato; //Este sera El id Que SE optiene del chek
  fetch(`http://${ip}:4000/Etiquetar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idPublicaciones,
      idUsuariosOrigen,
      idUsuariosDestino,
    }),
  })
    .then((res) => res.json())
    .then((respuesta) => {
    
      datosArray = [];
    });
}

function CrearPublicacionetiquetadaConImagen(URL_imagen) {
  if (datosArray.length === 0) {
    insertarPublicacionConImagen(URL_imagen);
  } else {
    insertarPublicacionConImagenEtiquetado(URL_imagen);
  }
}
