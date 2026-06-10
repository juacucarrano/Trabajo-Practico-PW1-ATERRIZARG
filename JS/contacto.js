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
        body: datosParaEnviar,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                alert("Mensaje enviado con éxito");
                form.reset();
            } else {
                alert("No se pudo enviar el mensaje");
            }
        })
        .catch(error => {
            console.error("Error en la petición:", error);
            alert("Ocurrió un error de red al intentar enviar el mensaje.");
        });
}