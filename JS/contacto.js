const form = document.getElementById("form-contacto");
const emailContacto = document.getElementById("email-contacto");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");


form.addEventListener("submit", enviarFormulario);

function enviarFormulario(e) {
    e.preventDefault();

    const urlFormstree = form.action;
    const datosParaEnviar = new FormData(form);

    fetch(urlFormstree, {
        method: "POST",
        body: datosParaEnviar
    })
        .then(res => res.text())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}