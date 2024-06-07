function buscarUserN() {
    const cambiar = document.getElementById('seachUser');
    const html = `
        <div class="floating-window">
            <div class="floating-window-content">
                <div class="header-perfil-foto">
                <h2>Usuarios</h2>
                <i class="fa-solid fa-xmark" onclick="closeWindow()"></i>
                </div>

                <div class="user-list">
                    <div class="user">
                        <img src="https://www.bing.com/images/blob?bcid=slQWEZxIjBwHg.R0P9ifPxwY8k3K.....50" alt="User 1" class="user-photo">
                        <div class="user-info">
                            <h2>Joel Arriola</h2>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    `;
    cambiar.innerHTML = html;

}

function closeWindow() {
    const cambiar = document.getElementById('seachUser');
    const html = `
        
    `;
    cambiar.innerHTML = html;
}