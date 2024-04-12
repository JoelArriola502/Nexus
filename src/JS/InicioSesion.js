const PasswordInput=document.getElementById("password");
const EmailInput=document.getElementById("email");

function IniciarSesion(){
    const Password=PasswordInput.value;
    const Email=EmailInput.value;
    if(!Password || !Email){

        Swal.fire({
            icon:'error',
            title:'Error',
            text:'LLene Los Campos'
        })
        return;
    }else{

        fetch('http://localhost:4000/Usuarios')
        .then(res=>res.json())
        .then(DatosSesion=>{
            let ValidarCredenciales=false;//variable inicialisada en false
    
            for(let i=0;i<DatosSesion.length;i++){
                console.log("Datos",DatosSesion);
                const Nombre=DatosSesion[i].Nombre;
                const Apellido=DatosSesion[i].Apellido;
                const Contrasena=DatosSesion[i].Contrasena;
                const Correo=DatosSesion[i].Correo;
                const idUsuarios=DatosSesion[i].idUsuarios;
                console.log("Correo",Correo);
                console.log("Contra",Contrasena);

                if(Email===Correo && Password===Contrasena){
                     //la comparar si todo es igual la variable Validad credenciales pasa a verdadera
                    ValidarCredenciales=true; 
                   

                //variables de sesión
                localStorage.setItem('idUsuarios',idUsuarios);
            

                }
    
    
    
                
            }
            //validacion de inicio sesión 
            if(ValidarCredenciales){
                // si la validacion es verdadera dirigira al panel principal
              
                
                window.location="../HTML/index.html";

            }else{
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:'CREDENCIALES INCORRECTAS'

                });

            }
    
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al verificar las credenciales. Por favor, inténtalo de nuevo.'
            });
        })

    }

  
}

