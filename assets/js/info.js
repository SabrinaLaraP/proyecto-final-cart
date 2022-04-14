//por medio de la llamada de AJAX con get se declara la url del archivo JSON local
const URL= "assets/data/info.json";
$.getJSON(URL, function (respuesta, estado) {
  //console.log(estado);
    if(estado === "success"){
      let data = respuesta;
      for (const info of data) {
        $(".prox_productos").prepend(`<div>
                                        <p>${info.nombre}</p>
                                        <img src=${info.thumbnailUrl}>
                                      </div>`)                               
      }  
    }
});