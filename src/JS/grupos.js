
//Funcion para mostrar todos los grupos 
function mostrarGrupos(){
    const contenedorGrupos = document.getElementById('ContenidoPrincipal')
    html = `
    <div class="contenedor-todo">
        <div class="left-panel">
            <h1>Grupos</h1>
            <button class="panel-button selected" id="btnVerGrupos" onclick="selectButton(this), mostrarGrupos()">
                <i class="fa-regular fa-compass"></i> Explorar
            </button>
            <button class="panel-button" id="btnMisGrupos" onclick="selectButton(this), misGrupos()">
                <i class="fa-solid fa-users"></i> Mis Grupos
            </button>
            <button class="panel-button" id="btnCrearGrupo" onclick="selectButton(this), nuevoGrupo()">
                <i class="fa-solid fa-plus"></i> Crear Grupo
            </button>
            <!-- Este div es para crear un nuevo grupo -->
            <div id="modalCrearGrupo"></div>
            
        </div>
    <div class="right-panel" id="groupsContainer">
        <div class="group-item">
            <img src="https://hips.hearstapps.com/hmg-prod/images/jujutsu-kaisen-3-653902d844077.jpg?resize=980:*" alt="Portada del Grupo" class="group-image">
            <h3>Nombre del Grupo</h3>
            <p>Descripción corta del grupo... est es la continucaciond ela descripcion de la carder delskd ddnwindakdnaodnnadnidnadnadnaodn</p>
            <div class="group-buttons">
                <button class="view-button" onclick="vergrupo()">Ver</button>
                <button class="join-button">Unirse</button>
            </div>
        </div>
        <div class="group-item">
            <img src="https://hips.hearstapps.com/hmg-prod/images/jujutsu-kaisen-3-653902d844077.jpg?resize=980:*" alt="Portada del Grupo" class="group-image">
            <h3>Nombre del Grupo</h3>
            <p>Descripción corta del grupo... est es la continucaciond ela descripcion de la carder delskd ddnwindakdnaodnnadnidnadnadnaodn</p>
            <div class="group-buttons">
                <button class="view-button" onclick="vergrupo()">Ver</button>
                <button class="join-button">Unirse</button>
            </div>
        </div>
        <div class="group-item">
            <img src="https://hips.hearstapps.com/hmg-prod/images/jujutsu-kaisen-3-653902d844077.jpg?resize=980:*" alt="Portada del Grupo" class="group-image">
            <h3>Nombre del Grupo</h3>
            <p>Descripción corta del grupo... est es la continucaciond ela descripcion de la carder delskd ddnwindakdnaodnnadnidnadnadnaodn</p>
            <div class="group-buttons">
                <button class="view-button" onclick="vergrupo()">Ver</button>
                <button class="join-button">Unirse</button>
            </div>
        </div>
       

        <!-- Repite este bloque para cada tarjeta de grupo -->
    </div>
</div>

    `;
    contenedorGrupos.innerHTML = html;
}

//Funcon para que quede marcado el boton seleccionado
function selectButton(button) {
    const buttons = document.querySelectorAll('.panel-button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

//Funcion para mostrar los grupos que se unio o creo el usuario
function misGrupos(){
    const misgrupos = document.getElementById('groupsContainer');
    html = `
    <div class="group-item">
        <img src="https://hips.hearstapps.com/hmg-prod/images/jujutsu-kaisen-3-653902d844077.jpg?resize=980:*" alt="Portada del Grupo" class="group-image">
        <h3>Nombre del Grupo</h3>
        <p>Descripción corta del grupo... est es la continucaciond ela descripcion de la carder delskd ddnwindakdnaodnnadnidnadnadnaodn</p>
        <div class="group-buttons">
            <button class="view-button" onclick="verMisgrupo()">Ver</button>
        </div>
    </div>
    `;

    misgrupos.innerHTML=html;

}


//funciaon para cargar la ventana de crear grupo nuevo
function nuevoGrupo() {
    const nuevo = document.getElementById('modalCrearGrupo')
    html = `
    <div id="overlay" class="nuevog">
        <div class="content">
            <span onclick="cerrarVentana()" class="close" id="closeButton">&times;</span>
                <div class="tituloVentanaCrear">
                    <h2>Crear grupo</h2>
                </div>
            <form id="formCrearGrupo">
                <div class="formL">
                    <input type="file" id="archivoPortada" class="gru1" required>
                    <label class="v1" for="archivoPortada" ><i class="fa-solid fa-camera-retro"></i>
                        
                    <label class="v1">Nombre del grupo
                        <input type="text" id="nombreGrupo" class="gru" placeholder="Nombre del grupo" required>
                    </label>
                    <label class="v1">Descripción
                        <input type="text" id="descripcionGrupo" class="gru" placeholder="Descripción del grupo" required>
                    </label>
                </div>
                <button type="submit" class="btn-crear-grupo">Crear grupo</button>
            </form>
        </div>
    </div>
    `;
    nuevo.innerHTML=html;
}

//Cerrar ventana para crear grupo nuevo
function cerrarVentana() {
    overlay.style.display = 'none';
}

//funcion para cargar el contenido de los grupos 
function vergrupo(){
    const ver = document.getElementById('ContenidoPrincipal');
    html =`
    <div class="group-profile">
        <div class="header">
            <div class="back-button">
                <button onclick="mostrarGrupos()">
                <i class="fa-solid fa-arrow-left"></i>
                Atrás
                </button>
            </div>
            <div class="image-placeholder">
                <img src="https://vamos.com.py/wp-content/uploads/2016/06/del-rio-viajes-portada.jpg">
            </div>
        </div>
        <div class="infogrupo">
            <div class="title-container">
                <h1>Exploradores de Viajes</h1>
                <button class="join-button">Unirse</button>
            </div>
            <p>¡Bienvenido a nuestro grupo de amantes de los viajes! Aquí compartimos nuestras experiencias, consejos y fotos de nuestros viajes por el mundo. Únete a nosotros para inspirarte y descubrir nuevos destinos.</p>
        </div>
        <div class="footer">
            <div class="publications">
                <h2>Publicaciones</h2>
            </div>
            <div class="members">
                <h2>Miembros</h2>
            </div>
        </div>
        <div class="cargar">
            
        </div>
    </div>
    `;

    ver.innerHTML = html;
}

//funcion para cargar el contenido de los grupos 
function verMisgrupo(){
    const xgrupo = document.getElementById('ContenidoPrincipal');
    xgrupo.innerHTML=``;
    html =`
    <div class="group-profile">
        <div class="header">
            <div class="back-button">
            <button onclick="mostrarGrupos()">
                <i class="fa-solid fa-arrow-left"></i>
                Atrás
            </button>
            </div>
            <div class="image-placeholder">
                <img src="https://vamos.com.py/wp-content/uploads/2016/06/del-rio-viajes-portada.jpg" alt="Imagen del grupo">
            </div>
        </div>
        <div class="infogrupo">
            <div class="title-container">
                <h1>Exploradores de Viajes</h1>
            </div>
            <p>¡Bienvenido a nuestro grupo de amantes de los viajes! Aquí compartimos nuestras experiencias, consejos y fotos de nuestros viajes por el mundo. Únete a nosotros para inspirarte y descubrir nuevos destinos.</p>
        </div>
        <div class="footer">
            <div class="publications">
                <h2>Publicaciones</h2>
            </div>
            <div class="members">
                <h2>Miembros</h2>
            </div>
        </div>
        <div class="carga">

        </div>
    </div>
    `;

    xgrupo.innerHTML = html;
}

