function despliegeMensaje(){

    const mensajes = document.getElementById('ContenidoPrincipal');
    html = `
        <div class="contenido-Mensajes">
        <div class="nav-mensajes">
            <div class="encabezado">
                <h2>Mensajes</h2>
                <div class="con-bucar">
                    <i class="fa-solid fa-magnifying-glass icon"></i>
                    <input class="input" type="search" placeholder="Buscar" />
                </div>
            </div>
            <div class="chat-personas">
                <div class="personas">
                    <div class="foto-perfil">
                        <img src="https://png.pngtree.com/background/20230519/original/pngtree-young-woman-anime-cartoon-drawing-picture-image_2660945.jpg" alt="Foto">
                    </div>
                    <div class="nombre-persona">
                        <h5>Carla Carreto</h5>
                        <p>¿Qué te pasó?</p>
                    </div>
                    <div class="hora"><p>9:30 p.m.</p></div>
                </div>
            </div>
            

        </div>
        <div class="container-chat">
            <div class="el-perfil">
                <img src="https://png.pngtree.com/background/20230519/original/pngtree-young-woman-anime-cartoon-drawing-picture-image_2660945.jpg" alt="Foto">
                <h4 class="nombre-perfil">Carla Carreto</h4>
            </div>
            <div class="txt-chat">
                <div class="container-texto">
                    <p class="mensaje-tercero">Hola tal Joel</p>
                    <p class="tu-mensaje">Hola que tal Carla, me encuentro bien</p>
                </div>
            </div>
            <div class="chat-botones">
                <button class="btn-icono-foto"><i class="fa-solid fa-photo-film"></i></button>
                <input class="escribir" type="text" name="mensaje" id="txtMensaje" placeholder="   Escribe un mensaje">
                <button class="btn-enviar"><i class='bx bxs-send'></i></button>
            </div>
        </div>
    </div>
    `;
    mensajes.innerHTML = html;
};