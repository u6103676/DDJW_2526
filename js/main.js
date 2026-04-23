addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', 
    function(){
        let aliasJugador = prompt("Introdueix el teu alias;");
        if (aliasJugador && aliasJugador.trim() !== "") {
            console.log("Alias introduit: " + aliasJugador);
            sessionStorage.setItem('userName', aliasJugador);
            sessionStorage.removeItem('load');
            document.getElementById('play').style.display = 'none';
            document.getElementById('mode-selection').style.display = 'block';
        }
        else{
            alert("Alias no vàlid. Si us plau, introdueix un alias vàlid per jugar.");
        }
    });

    document.getElementById('mode-1').addEventListener('click', function() {
        sessionStorage.setItem('gameMode', '1');
        window.location.assign("./html/game.html");
    });

    document.getElementById('mode-2').addEventListener('click', function() {
        sessionStorage.setItem('gameMode', '2');
        window.location.assign("./html/game.html");
    });

    document.getElementById('options').addEventListener('click', 
    function(){
        window.location.assign("./html/options.html");
    });

    document.getElementById('saves').addEventListener('click', 
    function(){
        let to_load = localStorage.save;
        fetch('../php/load.php', {
            method: "POST",
            body: JSON.stringify({}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(json => to_load = (!json.error)?JSON.stringify(json.save): localStorage.save)
        .catch (err => {
            console.error(err);
            console.warn("La partida s'intentarà carregar de local");
        });

        if (!to_load) {
            alert("No hi ha cap partida a carregar");
            return;
        }
        sessionStorage.load = to_load;
        window.location.assign("./html/game.html");
    });
    document.getElementById('exit').addEventListener('click', function(){
    console.warn("No es pot sortir!");
    });
    function SVG(type){
        let svg = "";
        switch(type){
            case 0: 
                svg = '<circle cx="50" cy="50" r="40" fill="#e74c3c" />'; break;
            case 1: 
                svg = '<rect x="15" y="15" width="70" height="70" fill="#3498db" />'; break;
            case 2: 
                svg = '<polygon points="50,15 90,85 10,85" fill="#f1c40f" />'; break;
            case 3:
                svg = '<polygon points="50,5 63,35 95,35 70,55 80,85 50,70 20,85 30,55 5,35 37,35" fill="#2ecc71" />'; break;
            case 4: 
                svg = '<polygon points="50,10 90,50 50,90 10,50" fill="#9b59b6" />'; break;
            case 5: 
                svg = '<rect x="20" y="30" width="60" height="40" rx="10" fill="#e67e22" />'; break;
            default:
                svg = '<text x="35" y="75" font-family="Arial" font-size="60" fill="white">?</text>';
        }
        let fullSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">${svg}</svg>`;
        return "data:image/svg+xml;base64," + btoa(fullSVG);
    }
});