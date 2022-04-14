const cards = $('#cards')[0];
const items = $("#items")[0];
const footer = $("#footer")[0];
const templateCard = $("#template-card")[0].content;
const templateFooter = $("#template-footer")[0].content;
const templateCarrito = $("#template-cart")[0].content;
const fragment = document.createDocumentFragment();
let cart = {};

// Para leer el array de la data.js
//forma corta del método .ready() 
//Al actualizar la página el carrito no se vacía
//Se obtiene el cart
$(() => {
    fetchData();
    if(localStorage.getItem("cart")) {
    cart = jQuery.parseJSON(localStorage.getItem("cart"));
    drawCart();
    }
});

//propiedad target para aumentar y disminuir 
$(cards).click(function (e) { 
    addCart(e);
    
});

//propiedad target para aumentar y disminuir 
$(items).click(function(e) {
    buttonAction(e);
});

//Versión asíncrona con javaScript
// const fetchData = async () => {
//     try {
//         const res   = await fetch('assets/data/data.json');
//         const data  = await res.json();
//         // console.log(data);
//         //se ejecuta la funcion drawCards y se le da el parametro data
//         drawCards(data);
//     } catch (error){
//         console.log(error);
//     }
// } 

//Declaramos la url del archivo JSON local. Version con shorthand, sin manejador de error 
//const URLJSON = "assets/data/data.json";
// function fetchData(){ 
//     $.getJSON(URLJSON, function (respuesta, estado) {
//         if(estado === "success"){
//             const data = respuesta;
//             //console.log(data);
//             drawCards(data);
//         } else if(estado !== "success") {
//             console.log("error:" + estado);
//         }
// };

//Version con manejador de error
function fetchData() {
    $.ajax({
        url: 'assets/data/data.json',
        dataType: 'json',
        success: function( data ) {
          console.log( "SUCCESS:  " + JSON.stringify(data));
          drawCards(data);
        },
        error: function( data ) {
          console.log( "ERROR:  " + JSON.stringify(data));
        }
    });
};

// De los elementos que vengan de los template card selecciona las etiquetas,
// y su textcontent va a ser igual al valor title del parámetro product.
const drawCards = data => {
    data.forEach(product => {
            templateCard.querySelector("h5").textContent = product.title;
            templateCard.querySelector("p").textContent = product.precio;
            templateCard.querySelector("img").setAttribute("src", product.thumbnailUrl);
            templateCard.querySelector(".btn-dark").dataset.id = product.id;
            const clone = templateCard.cloneNode(true);
            $(fragment).append(clone);

            // templateCard.$("h5").textContent = product.title;
            // templateCard.$("p").textContent = product.precio;
            // templateCard.$("img").setAttribute("src", product.thumbnailUrl);
            // templateCard.$(".btn-dark").dataset.id = product.id;
            // const clone = templateCard.cloneNode(true);
            // $(fragment).append(clone);
    });
    //para evitar el reflow, ya que se guarda el fragment en la memoria volátil 
    $(cards).append(fragment);
};

//Captura todos los elementos, y detecta todos los button btn-dark con solo un .click. 
//Al hacer click la acción es agregar al cart, y genera la colección de objetos
const addCart = e => {
    if (e.target.classList.contains("btn-dark")) {
        setCart(e.target.parentElement);  
    }
    //Detiene otro evento que se genere en items, 
    //para evitar que se genere la información que heredaban los eventos del contenedor padre.
    e.stopPropagation();
};
//setCart manipula los objetos del cart, captura los elementos
//se construye la cons = product con una colección de objetos para acceder a la información
const setCart = objeto => {
    const product = {
        id: objeto.querySelector(".btn-dark").dataset.id,
        title: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1

        // id: objeto.$(".btn-dark").dataset.id,
        // title: objeto.$("h5").textContent,
        // precio: objeto.$("p").textContent,
        // cantidad: 1
    }
    //Aumentar la cantidad al dar click a añadir al cart
    if(cart.hasOwnProperty(product.id)) {
        product.cantidad = cart[product.id].cantidad + 1
    }
    //Spread operator, se toman los valores de product y se insertan en cart
    cart[product.id] = {...product}
    drawCart();

};
//Template del cart
const drawCart = () => {
    items.innerHTML = "";
    Object.values(cart).forEach(product => {
        templateCarrito.querySelector("th").textContent = product.id; 
        templateCarrito.querySelectorAll("td")[0].textContent = product.title;
        templateCarrito.querySelectorAll("td")[1].textContent = product.cantidad;
        templateCarrito.querySelector(".btn-success").dataset.id = product.id;
        templateCarrito.querySelector(".btn-light").dataset.id = product.id;
        templateCarrito.querySelector("span").textContent = product.cantidad * product.precio;

        // templateCarrito.$("th").textContent = product.id; 
        // templateCarrito.$("td")[0].textContent = product.title;
        // templateCarrito.$("td")[1].textContent = product.cantidad;
        // templateCarrito.$(".btn-success").dataset.id = product.id;
        // templateCarrito.$(".btn-light").dataset.id = product.id;
        // templateCarrito.$("span").textContent = product.cantidad * product.precio;

        const clone = templateCarrito.cloneNode(true);
        $(fragment).append(clone);

    });
    $(items).append(fragment);

    drawFooter();
    //Se guarda cart en el localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
};
//Template del footer
const drawFooter = () => {
    footer.innerHTML = "";
    if (Object.keys(cart).length === 0) {
        footer.innerHTML = ` <th scope="row" colspan="5">Su Cart esta vacío</th> `

        return;
    }
    //la funcion reduce para sumar las cantidades, 
    //y el acumulador por cada iteración va a acumular lo que se haga como suma
    const sumProducts = Object.values(cart).reduce((acc, {cantidad} ) => acc + cantidad,0);
    const multiplyPrices = Object.values(cart).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0);

    templateFooter.querySelectorAll("td")[0].textContent = sumProducts;
    templateFooter.querySelector("span").textContent = multiplyPrices;

    // templateFooter.$("td").textContent[0] = sumProducts;
    // templateFooter.$("span").textContent[0] = multiplyPrices;

    const clone = templateFooter.cloneNode(true);
    $(fragment).append(clone);
    $(footer).append(fragment);

    //evento vaciar cart 
    const buttonVaciar = $("#vaciar-cart");
    $(buttonVaciar).click(() => { 
        cart = {};
        drawCart ();
    });
};

//Evento para disminuir y aumentar las cantidades
const buttonAction = e => {
    if (e.target.classList.contains("btn-success")){
        const product = cart[e.target.dataset.id];
        product.cantidad = cart[e.target.dataset.id].cantidad + 1;
        cart[e.target.dataset.id] = {...product};
        drawCart();
    }

    if (e.target.classList.contains("btn-light")) {
        const product = cart[e.target.dataset.id];
        product.cantidad = cart[e.target.dataset.id].cantidad - 1;
        if(product.cantidad === 0) {
            delete cart[e.target.dataset.id];
        }
        drawCart();
    }

    e.stopPropagation();
};

//Tuve algunos problemas para pasar a jquery, en algunas como querySelector sobre todo,
//algunas funciones de javascript son las más idóneas para su funcionamiento


