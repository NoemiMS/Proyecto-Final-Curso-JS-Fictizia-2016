var apiKey = 'HwoYeicxD7xs6igwFnRxASPVjqtwhOWf4VqcD1pO';
// Arrancando
nasaRequest("https://api.nasa.gov/planetary/apod?api_key=" + apiKey, "planetary");
nasaRequest("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=" + apiKey, "marsRovers");


function pushToHTML(datos,container) {
    // Actualizando el HTML
    if(container == 'planetary'){
        document.getElementById('universe-photo').setAttribute("src", datos.url);
        document.getElementById('universe-photo').setAttribute("atl", datos.title);
        document.getElementById('nasa-photo-title').innerHTML = datos.title;
        document.getElementById('nasa-photo-description').innerHTML = datos.explanation;
    }
    if(container == 'marsRovers'){
        document.getElementById('pp').innerHTML = datos.photos[0].earth_date;
    }

}

function nasaRequest(url,container) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status >= 100 && xmlHttp.status <= 300) {
                //document.getElementById("cargando").style.display = 'none';
                var datos = JSON.parse(xmlHttp.responseText);
                pushToHTML(datos,container);
            } else if (xmlHttp.status >= 400 && xmlHttp.status <= 600) {
                // Estilos
                document.getElementById("cargando").style.display = 'none';
                document.getElementById("error-ajax").style.display = 'block';
                document.getElementById("row-contenido").innerHTML = '<img src="http://www.404notfound.fr/assets/images/pages/img/androiddev101.jpg">';
                console.error("ERROR! 404", JSON.parse(xmlHttp.responseText));
            }
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}
