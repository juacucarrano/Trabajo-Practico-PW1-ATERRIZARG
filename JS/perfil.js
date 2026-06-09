// recupero el mail logueado
const mailLogueado = localStorage.getItem("usuarioLogueado");
console.log(mailLogueado);
// recupero la lista de usuarios
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
console.log(usuarios);
// busco el uduario que coincida con el mail logueado
const usuarioActual = usuarios.find(u => u.correo === mailLogueado);
console.log(usuarioActual);

// autocompleto datos que tengo
const nombreUsuario = document.getElementById("nombre");
nombreUsuario.value = usuarioActual.nombre;
const apellidoUsuario = document.getElementById("apellido");
apellidoUsuario.value = usuarioActual.apellido;
const nacionalidadUsuario = document.getElementById("nacionalidad");
nacionalidadUsuario.value = usuarioActual.nacionalidad;
const documentoUsuario = document.getElementById("documento");
documentoUsuario.value = usuarioActual.documento;
const fecNacimiento = new Date(usuarioActual.fechaNac);
console.log(fecNacimiento);
const diaNac = document.getElementById("dia-nac")
diaNac.value = fecNacimiento.getDate();
const mesNac = document.getElementById("mes-nac")
mesNac.value = fecNacimiento.getMonth() + 1;
const anioNac = document.getElementById("anio-nac")
anioNac.value = fecNacimiento.getFullYear();

if (usuarioActual.genero === "Femenino") {
    document.getElementById("femenino").checked = true;
} else if (usuarioActual.genero === "Masculino") {
    document.getElementById("masculino").checked = true;
}

const mailVerificiado = document.getElementById("correo-verificado");
mailVerificiado.textContent = mailLogueado;

const formulario = document.getElementById("formPerfil");

if(formulario){

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const telefono =
    document.getElementById(
    "telefono"
    ).value;

    const direccion =
    document.getElementById(
    "direccion"
    ).value;

    const perfil = {

        telefono,
        direccion

    };

    localStorage.setItem(
        "perfil",
        JSON.stringify(perfil)
    );

    alert(
        "Datos guardados"
    );

});

}
