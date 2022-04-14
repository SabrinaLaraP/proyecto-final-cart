//Animación con scroll para nav
$(document).ready(function(){
    $(window).scroll(function(){
        if($(window).scrollTop() > 60 ){
        $('.custom_navbar').addClass('scroll');
        }
        else{
        $('.custom_navbar').removeClass('scroll');
        }
    });
});

//Animación del fondo del título
const alto = document.body.scrollHeight - window.innerHeight;
const fondo = document.getElementById("fondo");
// const fondo = $("#fondo")[0]; Intenté hacerlo con jquery pero no lo tomaba

window.onscroll = () => {
    const anchoFondo = (window.pageYOffset / alto) * 300;
    if(anchoFondo <=100){
    fondo.style.width = anchoFondo + '%';
    }
};

//Animación de galeria, la posición de la imagen y el efecto de zoom se busca con find las class. 
//Al no estar posicionado el cursor el class=ocultando desaparece con fadeOut para ocultar y remove class para salir de la clase zoom.
$(document).ready(function(){
    $(".imagen").hover(function(){
        $(this).find(".ocultando").fadeIn();
        $(this).find(".imagen_hover").addClass("zoom");
    }, function(){
        $(".ocultando").fadeOut();
        $(".imagen_hover").removeClass("zoom");
    });   
});

//FadeOut para hacer desaparecer imagen al carga página
$(".popUp").fadeOut();
//Muestra la imagen al hacer click
$(".gale_1").click (function(){
    $("#img_1").slideDown(500);
});
 
$(".gale_2").click (function(){
    $("#img_2").slideDown(500);
});

$(".gale_3").click (function(){
    $("#img_3").slideDown(500);
});

$(".gale_4").click (function(){
    $("#img_4").slideDown(500);
});

$(".gale_5").click (function(){
    $("#img_5").slideDown(500);
});

$(".gale_6").click (function(){
    $("#img_6").slideDown(500);
});

$(".gale_7").click (function(){
    $("#img_7").slideDown(500);
});

$(".gale_8").click (function(){
    $("#img_8").slideDown(500);
});

$(".gale_9").click (function(){
    $("#img_9").slideDown(500);
});
//Cierra imagen al hacer click
$(".cerrar").click(function(){
    $(".popUp").slideUp(500);
});




