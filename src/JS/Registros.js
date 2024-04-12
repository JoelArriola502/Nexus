const NombreInput = document.getElementById('nombre');
const ApellidoInput = document.getElementById('apellido');
const CorreoInput = document.getElementById('correo');
const ContrasenaInput = document.getElementById('contra1');
const ConfirmarContrasenaInput = document.getElementById('contra2');

function NuevoUsuario() {
const Nombre=NombreInput.value;
const Apellido=ApellidoInput.value;
const Correo=CorreoInput.value;
const Contrasena=ContrasenaInput.value;
const Contrasena2=ConfirmarContrasenaInput.value;

    //confimar que todo los campos esten llenos 
    if(!Nombre ||!Apellido ||!Correo ||!Contrasena){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡Por favor, asegúrese de que todos los campos estén llenos!'
        });
    }else{
//Valida que nombre y apellido tengan mas de 1 caracter
 if(validarNombre(Nombre) && validarNombre(Apellido)){
    //Validacion de correo 
    if(ValidarCorreo(Correo)){
        // Verificar si las contraseñas coinciden
    if (Contrasena !== Contrasena2) {
        // Si las contraseñas no coinciden, muestra un mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden. Por favor, ingresa la misma contraseña en ambos campos.'
        });
       
        
    }else{
           // Si las contraseñas coinciden, continuar con el registro 
           //metodo validar que no exista el correo   
           fetch("http://localhost:4000/Correo")
           .then(res=>res.json())
           .then((Correos)=>{
       
            const CorreosRegistrados = Correos.map(CorreoRe => CorreoRe.Correo);
            if (CorreosRegistrados.includes(Correo)) {
                           
               Swal.fire({
                   icon: 'error',
                   title: 'Error',
                   text: 'Ya Existe una Cuenta Registrada con el mismo Correo'
               });
               return;
           }else{
            
            RegistroCuenta(Nombre, Apellido, Correo, Contrasena)
           }
           })
        
      

    }
}else{
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: '¡Por favor, ingrese un correo electronico válidos.!'
    });

   }

}else{
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: '¡Por favor, ingrese un nombre y un apellido válidos.!'
    });

}
    }
}


function RegistroCuenta(Nombre, Apellido, Correo, Contrasena){
    let Foto="../img/Foto1.jpg"
    fetch('http://localhost:4000/NuevoUsuario', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Nombre, Apellido,Foto, Correo, Contrasena}),
    })
    .then((res) => res.json())
    .then((json) => {
        // Limpiar los campos después de enviar la solicitud
        document.getElementById('nombre').value = "";
        document.getElementById('apellido').value = "";
        document.getElementById('correo').value = "";
        document.getElementById('contra1').value = "";
        document.getElementById('contra2').value = "";

        // Mostrar mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: '¡La cuenta se creo correctamente!'
        });
    })
    .catch((error) => {
        // Manejo de errores: mostrar un mensaje de error al usuario
        console.error('Error al registrar:', error);
        // Mostrar mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡Error al Crear su cuenta. Inténtalo de nuevo más tarde.!'
        });
       
    });
}

function validarNombre(Datos) {
    // Verificar que el nombre tenga entre 2 y 50 caracteres
    if (Datos.length < 2 || Datos.length > 50) {
        return false; // Nombre no válido
    }
    return true; // Nombre válido
}

function ValidarCorreo(Correo) {
    const expReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expReg.test(Correo);
}



