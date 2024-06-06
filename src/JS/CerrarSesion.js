
    function CerrarSesion(){
        localStorage.removeItem('idUsuarios');

        window.location="/Login";
    }