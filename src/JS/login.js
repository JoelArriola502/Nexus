const  IniciarSecion=document.getElementById("signUp");
const  Registrarse=document.getElementById("signIn");
const Reganimacion=document.querySelector(".Registrar");
const iniAnimacion=document.querySelector(".Sesion");

IniciarSecion.addEventListener("click",ev=>{
    iniAnimacion.classList.add("Registrar");
    Reganimacion.classList.remove("Registrar")
})
Registrarse.addEventListener("click",ev=>{
    Reganimacion.classList.add("Registrar");
    iniAnimacion.classList.remove("Registrar")
})

