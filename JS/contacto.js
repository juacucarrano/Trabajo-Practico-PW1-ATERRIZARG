const form = document.getElementById("form-contacto");
const emailContacto = document.getElementById("email-contacto");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");


form.addEventListener("submit", enviarFormulario);

function enviarFormulario(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre-apellido").value.trim();
    const email = document.getElementById("email-contacto").value.trim();
    const asuntoVal = document.getElementById("asunto").value;

    if (!nombre || !email || !asuntoVal) {
        alert("Por favor complete todos los campos obligatorios (Nombre, Email y Asunto).");
        return;
    }

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexCorreo.test(email)) {
        alert("El formato del correo no es válido.");
        return;
    }

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
        .catch(err => {
            console.error("Error al enviar el formulario:", err);
            alert("Ocurrió un error al intentar enviar el mensaje. Por favor, intente de nuevo.");
        });
}