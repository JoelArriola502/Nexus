function IncriptarPassword(){
    const Password=document.getElementById("contra1").value;
    const PasswordEncriptada=btoa(Password);
    document.getElementById("password").value=PasswordEncriptada;
    console.log(PasswordEncriptada);
    return PasswordEncriptada;

}