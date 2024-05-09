const AmigosCargar=document.getElementById('PublicacionVista');
function MostrarUsuarios(){
    fetch(`http://localhost:4000/Usuarios/${id}`)
    .then(res=>res.json())
    .then((Usuarios)=>{
        let html="";
        let i;
        for(i=0;i<Usuarios.length;i++){
           const Foto=Usuarios[i].Foto;
           const Nombre=Usuarios[i].Nombre;
           const Apellido=Usuarios[i].Apellido;




           html=html+ `
           <article class="Seguidores">
           <section class="frisends">
               <img src="${Foto}">
               <div class="text">
                   <h2>${Nombre} ${Apellido}</h2>
               </div>
       
               <div class="botones">
                   <button class="delete_Amigo">Eliminar</button>
                   <button class="send">Seguir</button>
               </div>
       
           </section>
       
       </article>
            `
            AmigosCargar.innerHTML=html;
        }
    })
}
