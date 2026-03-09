$(document).ready(function() {
    $('#play').click(function(){
        let aliasJugador = prompt("Introdueix el teu àlies:");
        console.log("Àlies introduït: " + aliasJugador);
        window.location.assign("./html/game.html");
    });

    $('#options').click(function(){
        console.error("Opció no implementada");
    });

    $('#saves').click(function(){
        console.error("Opció no implementada");
    });

    $('#exit').click(function(){
        console.warn("No es pot sortir!");
    });
});