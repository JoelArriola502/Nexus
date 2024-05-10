function animRegistro(){
    const registrocont =  document.getElementById('regForm');
    const inicio = document.getElementById('iniciofrom');
    registrocont.style.display = "block";
    inicio.style.display = "none";
}

function iniciosec(){
    const conten = document.getElementById('iniciofrom');
    conten.style.display = "flex";
    const registrocont =  document.getElementById('regForm');
    registrocont.style.display = "none";
}

iniciosec();