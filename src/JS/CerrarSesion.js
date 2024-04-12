
    function CerrarSesion(){
        localStorage.removeItem('idUsuarios');

        window.location="../HTML/Login.html";
    }