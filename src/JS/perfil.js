function mostrarPerfil() {
    const profileContainer = document.getElementById('ContenidoPrincipal');
    html = `
        <div class="main-container">
        <div class="profile-container">
        <div class="cover-photo">
        <img class="foto-portada" src="" alt="">
            <div class="change-cover-photo">
                <i class="fas fa-camera"></i>
                <p><strong>Agrega foto de portada</strong></p>
            </div>
            <div class="profile-photo">
            <img class="imagen-perfil" src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg" alt="">
                <div class="change-profile-photo">
                    <i class="fas fa-camera"></i>
                </div>
            </div>
        </div>
        <div class="profile-details">
            <h1>Jared Palmer <span onclick="editarNombre()" class="edit-icon"><i class="fa-solid fa-pen"></i></span></h1>
            <div class="stats">
                <span class="followers">1.2K Segidores</span>
                <span class="friends">500 Amigos</span>
            </div>

            <div id="overlay" class="overlay">
                <div class="content">
                    <span onclick="cerrarVentana()" class="close" id="closeButton">&times;</span>
                    <div class="form-header">
                        <h2>Editar perfil</h2>
                        <p>Actualiza tu nombre y apellido.</p>
                    </div>
                    <form id="editForm">
                        <div class="form-group">
                            <label for="firstName">Nombre
                            <input type="text" id="firstName" name="firstName" placeholder="John" required>
                            </label>
                            <label for="lastName">Apellido
                            <input type="text" id="lastName" name="lastName" placeholder="Doe" required>
                            </label>
                        </div>
                        <button type="submit" class="btn">Guardar</button>
                    </form>
                </div>
            </div>
    
        </div>
        <h1>Amigos</h1>
        <div class="friends-list">
            <div class="friend">
                <img class="friend-photo" src="https://i.pinimg.com/550x/64/ea/bd/64eabd3a40fcd787210793e762a4709b.jpg">
                <div class="friend-info">
                    <span >Jose Pérez</span>
                </div>
            </div>
        </div>

        </div>
        </div>
    `;
    profileContainer.innerHTML = html;
}


function editarNombre() {
    overlay.style.display = 'flex';
}

function cerrarVentana() {
    overlay.style.display = 'none';
}
