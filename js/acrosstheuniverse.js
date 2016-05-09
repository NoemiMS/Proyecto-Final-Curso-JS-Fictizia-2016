var apiKey = 'HwoYeicxD7xs6igwFnRxASPVjqtwhOWf4VqcD1pO';
// Arrancando
nasaRequest("https://api.nasa.gov/planetary/apod?api_key=" + apiKey, "planetary");
nasaRequest("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=" + apiKey, "marsRovers");


function pushToHTML(datos,container) {
    // Actualizando el HTML
    var photoNasa = document.getElementById('universe-photo');
    var videoNasa = document.getElementById('universe-video');
    if(container == 'planetary'){
        if (datos.media_type == 'video') {
            document.getElementById('universe-video').setAttribute("src", datos.url);
            photoNasa.classList.add("hidden");
        }else {
            document.getElementById('universe-photo').setAttribute("src", datos.url);
            document.getElementById('universe-photo').setAttribute("atl", datos.title);
            videoNasa.classList.add("hidden");
        }
        document.getElementById('nasa-photo-title').innerHTML = datos.title;
        document.getElementById('nasa-photo-description').innerHTML = datos.explanation;
    }
    if(container == 'marsRovers'){
        document.getElementById('mars-photo').setAttribute("src", datos.photos[0].img_src);
        document.getElementById('mars-photo').setAttribute("atl", datos.photos[0].full_name);
        document.getElementById('rover-name').innerHTML = datos.photos[0].rover.name;
        document.getElementById('earth-date').innerHTML = datos.photos[0].earth_date;
        document.getElementById('landing-date').innerHTML = datos.photos[0].rover.landing_date;
    }

}

function nasaRequest(url,container) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status >= 100 && xmlHttp.status <= 300) {
                var datos = JSON.parse(xmlHttp.responseText);
                pushToHTML(datos,container);
            } else if (xmlHttp.status >= 400 && xmlHttp.status <= 600) {
                // Estilos
                document.getElementById("row-contenido").innerHTML = '<img src="http://www.404notfound.fr/assets/images/pages/img/androiddev101.jpg">';
                console.error("ERROR! 404", JSON.parse(xmlHttp.responseText));
            }
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}
