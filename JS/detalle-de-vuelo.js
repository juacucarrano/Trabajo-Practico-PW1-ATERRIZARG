const avionData = [
    { fila: 1, izq: [{id: "1A", estado: "disponible"}, {id: "1B", estado: "disponible"}, {id: "1C", estado: "disponible"}, {id: "1D", estado: "disponible"}], pasillo: "P", der: [{id: "1E", estado: "disponible"}, {id: "1F", estado: "disponible"}, {id: "1G", estado: "disponible"}, {id: "1H", estado: "disponible"}] },
    { fila: 2, izq: [{id: "2A", estado: "disponible"}, {id: "2B", estado: "disponible"}, {id: "2C", estado: "disponible"}, {id: "2D", estado: "disponible"}], pasillo: "A", der: [{id: "2E", estado: "disponible"}, {id: "2F", estado: "disponible"}, {id: "2G", estado: "disponible"}, {id: "2H", estado: "disponible"}] },
    { fila: 3, izq: [{id: "3A", estado: "disponible"}, {id: "3B", estado: "disponible"}, {id: "3C", estado: "disponible"}, {id: "3D", estado: "disponible"}], pasillo: "S", der: [{id: "3E", estado: "disponible"}, {id: "3F", estado: "disponible"}, {id: "3G", estado: "disponible"}, {id: "3H", estado: "disponible"}] },
    { fila: 4, izq: [{id: "4A", estado: "disponible"}, {id: "4B", estado: "disponible"}, {id: "4C", estado: "disponible"}, {id: "4D", estado: "disponible"}], pasillo: "I", der: [{id: "4E", estado: "disponible"}, {id: "4F", estado: "disponible"}, {id: "4G", estado: "disponible"}, {id: "4H", estado: "disponible"}] },
    { fila: 5, izq: [{id: "5A", estado: "disponible"}, {id: "5B", estado: "disponible"}, {id: "5C", estado: "disponible"}, {id: "5D", estado: "disponible"}], pasillo: "L", der: [{id: "5E",estado: "disponible"}, {id: "5F", estado: "disponible"}, {id: "5G", estado: "disponible"}, {id: "5H", estado: "disponible"}] },
    { fila: 6, izq: [{id: "6A", estado: "disponible"}, {id: "6B", estado: "disponible"}, {id: "6C", estado: "disponible"}, {id: "6D", estado: "disponible"}], pasillo: "L", der: [{id: "6E", estado: "disponible"}, {id: "6F", estado: "disponible"}, {id: "6G", estado: "disponible"}, {id: "6H", estado: "disponible"}] },
    { fila: 7, izq: [{id: "7A", estado: "disponible"}, {id: "7B", estado: "disponible"}, {id: "7C", estado: "disponible"}, {id: "7D", estado: "disponible"}], pasillo: "O", der: [{id: "7E", estado: "disponible"}, {id: "7F", estado: "disponible"}, {id: "7G", estado: "disponible"}, {id: "7H", estado: "disponible"}] }
];

const container = document.querySelector(".asiento-container");
function renderAvion() {
    avionData.forEach(item => {
        // 1. Crear y agregar el número de fila
        const numDiv = document.createElement("div");
        numDiv.className = "numero";
        numDiv.textContent = item.fila;
        container.appendChild(numDiv);

        // 2. Agregar asientos izquierda
        item.izq.forEach(asientoId => crearSvg(asientoId));

        // 3. Agregar el pasillo
        const pasilloDiv = document.createElement("div");
        pasilloDiv.className = "pasillo";
        pasilloDiv.textContent = item.pasillo;
        container.appendChild(pasilloDiv);

        // 4. Agregar asientos derecha
        item.der.forEach(asientoId => crearSvg(asientoId));
    });
}

function crearSvg(asiento) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    
    // Asignamos la clase según el estado (disponible u ocupado)
    svg.classList.add(asiento.estado, "svg"); 
    
    svg.innerHTML = '<path d="M4,18v3h3v-3h10v3h3v-6H4V18z M19,10h3v3h-3V10z M2,10h3v3H2V10z M17,13H7V5c0-1.1,0.9-2,2-2h6c1.1,0,2,0.9,2,2V13z" />';
    
    // Solo agregamos el evento de clic si está disponible
    if (asiento.estado === "disponible") {
        svg.addEventListener("click", () => {
            // Lógica de selección
            svg.classList.toggle("seleccionado");
            console.log("Seleccionaste: " + asiento.id);

        });
    } else {
        // Opcional: Cambiar cursor para indicar que no es clickeable
        svg.style.cursor = "not-allowed";
    }
    
    container.appendChild(svg);
}
renderAvion();

// En cualquier página, primero verifica si hay alguien logueado
const usuarioEmail = localStorage.getItem("usuarioLogueado");

if (!usuarioEmail) {
    alert("Debes iniciar sesión para seleccionar asientos.");
    window.location.href = "login.html";
} else {
    // Si hay usuario, puedes cargar los asientos
    console.log("Usuario actual: " + usuarioEmail);
}