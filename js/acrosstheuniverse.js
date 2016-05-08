var apiKey = 'HwoYeicxD7xs6igwFnRxASPVjqtwhOWf4VqcD1pO';

function pushToHTML(datos, tipo) {
    var contenido;

    // Modificando el HTML
    if (tipo === true) {
        // Creando el nuevo panel
        contenido = '<section id="photos-nasa"><div class="row"><div class="col-sm-6">';
        contenido = '<div id="universe-photo" class="photo-circle"><img class="img-responsive img-thumbnail" src="' + datos.url +'" alt="' + datos.title + '"></div>'
        contenido += '</div><div class="col-sm-6"><h2>' + datos.title + '</h2>';
        contenido += '<p>' + datos.description + '</p>';
        contenido += '<p>' + datos.date + '</p>';
        contenido += '<p>' + datos.copyrigth + '</p></div></div></section>';

        // Actualizando el HTML
        document.getElementById(divID).innerHTML += contenido;

    }
}

function nasaRequest(url, tema) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status >= 100 && xmlHttp.status <= 300) {
                document.getElementById("cargando").style.display = 'none';
                var datos = JSON.parse(xmlHttp.responseText);

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

    // Arrancando
    nasaRequest("https://api.nasa.gov/planetary/apod?api_key=" + apiKey, false);
