if (!localStorage.getItem("imagenesDestinos")) {
    const mapaImagenes = {
        "Río de Janeiro": "../images/rio-de-janeiro.jpg",
        "Bariloche": "../images/bariloche.png",
        "Mendoza": "../images/mendoza.jpg",
        "Puerto Iguazú": "../images/puerto-iguazu.jpg",
        "Madrid": "../images/madrid.jpg",
        "Lima": "../images/lima.jpg",
        "Miami": "../images/miami.jpg"
    };
    localStorage.setItem("imagenesDestinos", JSON.stringify(mapaImagenes));
}