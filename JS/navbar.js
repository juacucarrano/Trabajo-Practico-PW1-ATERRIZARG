const linkLogin =
document.getElementById("linkLogin");

const logueado =
localStorage.getItem("logueado");

if(logueado === "true"){

    linkLogin.innerHTML =
    "Mi Perfil";

    linkLogin.href =
    "./perfil.html";

}