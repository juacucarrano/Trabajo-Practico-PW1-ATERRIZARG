let ofertasPorDestino = [];
let imagenes = JSON.parse(localStorage.getItem("imagenesDestinos"))


buscarPreciosMasBajos();

cambiarImagenes();

function buscarPreciosMasBajos() {
    vuelos.forEach(v => {
        const existeMismoDestino = ofertasPorDestino.some(x => x.destino === v.destino);

        if (existeMismoDestino) {
            const indexMismoDestino = ofertasPorDestino.findIndex(x => x.destino === v.destino);

            if (v.precio < ofertasPorDestino[indexMismoDestino].precio) {
                ofertasPorDestino[indexMismoDestino] = { ...v };
            }
        } else {
            ofertasPorDestino.push({ ...v });
        }
    });
    ofertasPorDestino = ofertasPorDestino.sort((a, b) => a.precio - b.precio);
}

function cambiarImagenes() {
    const masBaratosAMostrar = ofertasPorDestino.slice(0, 4);

    const contenedorOfertas = document.getElementById("contenedor-ofertas");
    masBaratosAMostrar.forEach((v, index) => {
        contenedorOfertas.innerHTML += `
        <a href="./sub-pages/calendario.html" class="links-cards">
                        <div class="card-oferta">
                            <div class="imagen-oferta">
                                <img src="${imagenes[v.destino]}" alt="">
                            </div>
                            <div class="title-oferta">
                                <h3>${v.destino.toUpperCase()}</h3>
                                <p>Saliendo desde Buenos Aires</p>
                            </div>
                            <div class="descripcion-oferta">
                                <span>Tarifas desde</span>
                                <button><span class="unidad-moneda-oferta">AR$</span>${v.precio}</button>
                            </div>
                        </div>
                    </a>
        `
    });

}