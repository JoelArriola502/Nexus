function mostrarComentarios() {
    var comentariosDiv = document.getElementById("comentariosDiv");
    comentariosDiv.style.display = "flex";

    // Contenido HTML de los comentarios
    var contenidoComentarios = `
        <div class="ventanaComentarios animate__animated animate__slideInDown">
            <div class="encabezadoPublicacion">
                <h3>Publicación de Joel</h3>
                <button class="cerrarVentanaComentario" onclick="cerrarVentanaComentario()">
                    <i class='bx bx-x'></i>
                </button>
            </div>
            
            <div class="caja">
                <div class="containerPubliUsuario">
                    <div class="userPubli">
                        <div class="fotoUserPerfil">
                            <img src="https://png.pngtree.com/thumb_back/fh260/background/20220818/pngtree-round-stamp-icon-with-cobalt-and-cyan-colors-for-user-profile-photo-image_19582402.jpg" alt="foto" class="fotoU">
                        </div>
                        <div class="nomUser">
                            <h5 Class="nom">Joel Arriola</h5>
                            <p class="fechaP">2 maz 2024</p>
                        </div>
                    </div>
                    <div class="descripcion">
                        <p>Esta es una descripcion de la publicacion para expresar algun sentimiento o alguna informacion relevantea respecto dmermof noed  disdidid dmdiedmei dksdskdmsd ss kd sk</p>
                    </div>
                    <div class="fotoPu">
                        <img class="imagenPublicacion" src="https://s1.significados.com/foto/paisaje-og.jpg?class=ogImageWide" alt="Foto">
                    </div>
                </div>
                <div class="containerComentarios">
                    <!-- Aquí van los comentarios -->
                    <h3>Comentarios</h3>
                    <hr>
                    <div class="containerComent">
                        <div class="fotoUserPerfil">
                            <img src="https://png.pngtree.com/thumb_back/fh260/background/20220818/pngtree-round-stamp-icon-with-cobalt-and-cyan-colors-for-user-profile-photo-image_19582402.jpg" alt="foto" class="fotoU">
                        </div>
                        <div class="textoPublicacion">
                            <h5 Class="nom">Joel Arriola - 2 mar 2024</h5>
                            <p class="text">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, illo ullam perspiciatis similique nesciunt aliquam neque. Laudantium assumenda ea distinctio nihil fuga vel doloremque, eligendi id, facere minima alias nam!
                            </p>
                        </div>
                    </div>
                </div> 
            </div>

            <div class="crearComentarioNuevo">
                <img src="https://png.pngtree.com/thumb_back/fh260/background/20220818/pngtree-round-stamp-icon-with-cobalt-and-cyan-colors-for-user-profile-photo-image_19582402.jpg" alt="FotoUser" class="FotoUserComentario">
                <input type="text" placeholder="Escribe un comentario..." class="inputComentario">
                <button class="botonEnviarComentario"><i class='bx bxs-send'></i></button>
            </div>

        </div>

    `;

    // Insertar el contenido de los comentarios en el div "comentariosDiv"
    comentariosDiv.innerHTML = contenidoComentarios;
}

function cerrarVentanaComentario() {
    var comentariosDiv = document.getElementById("comentariosDiv");
    comentariosDiv.style.display = "none";
}