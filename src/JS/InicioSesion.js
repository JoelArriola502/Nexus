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

    fetch(`http://localhost:4000/IniciarSesion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Correo: Email, Contrasena: Password })
    })
    .then(res => res.json())
    .then(DatosSesion => {
        let ValidarCredenciales = false;
        const message = DatosSesion.message;
        const idUsuarios = DatosSesion.idUsuario;

        let Validar = "ContrasenaValida";

        if (Validar === message) {
            ValidarCredenciales = true;
          
            // Guardar variables de sesión
            const encryptedId = CryptoJS.AES.encrypt(idUsuarios.toString(), 'tu_clave_secreta').toString();
            localStorage.setItem('idUsuarios', encryptedId);
        }

        // Validación de inicio sesión
        if (ValidarCredenciales) {
            window.location.href= "/Nexus";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'CREDENCIALES INCORRECTAS'
            });
        }
    })
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al verificar las credenciales. Por favor, inténtalo de nuevo.'
        });
    });
}

document.addEventListener('DOMContentLoaded', (ev) => {
    const idToken=localStorage.getItem('idUsuarios');
    if (idToken) {
        window.location.href= "/Nexus";
    } else {
        // El usuario no ha iniciado sesión, se puede hacer algo aquí si es necesario
    }
});
