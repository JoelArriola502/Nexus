const PasswordInput = document.getElementById("password");
const EmailInput = document.getElementById("email");

function IniciarSesion() {
    const Password = PasswordInput.value;
    const Email = EmailInput.value;

    if (!Password || !Email) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'LLene Los Campos'
        });
        return;
    }

    console.log(Email, Password);

    fetch(`http://localhost:4000/IniciarSesion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Correo: Email, Contrasena: Password })
    })
    .then(res => res.json())
    .then(DatosSesion => {
        console.log(DatosSesion);

        let ValidarCredenciales = false;
        const message = DatosSesion.message;
        const idUsuarios = DatosSesion.idUsuario;

        console.log("mensaje", message);
        console.log("id", idUsuarios);
        let Validar = "ContrasenaValida";

        if (Validar === message) {
            ValidarCredenciales = true;
            console.log("Validar", ValidarCredenciales);

            // Guardar variables de sesión
            localStorage.setItem('idUsuarios', idUsuarios);
        }

        // Validación de inicio sesión
        if (ValidarCredenciales) {
            window.location = "../HTML/index.html";
            console.log("Validar", ValidarCredenciales);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'CREDENCIALES INCORRECTAS'
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al verificar las credenciales. Por favor, inténtalo de nuevo.'
        });
    });
}


