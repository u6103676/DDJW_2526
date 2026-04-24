window.showRanking = function() {
    const container = document.getElementById('ranking-container');
    const tbody = document.getElementById('ranking-body');
    const ranking = localStorage.getItem('ranking') ? JSON.parse(localStorage.getItem('ranking')) : [];
    tbody.innerHTML = "";
    if (ranking.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4' style='padding:20px; text-align:center;'>Encara no hi ha rècords.</td></tr>";
    } 
    else {
        ranking.forEach((player, index) => {
            const row = `
                <tr>
                    <td class="pos-cell">${index + 1}</td>
                    <td>${player.name}</td>
                    <td class="score-cell">${player.points}</td>
                    <td class="date-cell">${player.date}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
}

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

    document.getElementById('saves').addEventListener('click', function(){
        showSaves(); 
    });
    
    document.getElementById('exit').addEventListener('click', function(){
    console.warn("No es pot sortir!");
    });

    document.getElementById('ranking-btn').addEventListener('click', function() {
        showRanking(); 
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

window.showSaves = function() {
    const container = document.getElementById('saves-container');
    const tbody = document.getElementById('saves-body');
    const saves = localStorage.getItem('localSaves') ? JSON.parse(localStorage.getItem('localSaves')) : [];
    tbody.innerHTML = "";
    if (saves.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4' style='padding:20px; text-align:center;'>No hi ha partides guardades.</td></tr>";
    } 
    else {
        saves.forEach((save, index) => {
            const row = `
                <tr>
                    <td class="date-cell">${save.date}</td>
                    <td>Nivell ${save.level}</td>
                    <td class="score-cell">${save.score}</td>
                    <td>
                        <button onclick="loadThisSave(${index})" style="width:auto; padding:5px 10px; font-size:14px; margin:0;">
                            Carregar
                        </button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
}
window.loadThisSave = function(index) {
    const saves = JSON.parse(localStorage.getItem('localSaves'));
    sessionStorage.load = saves[index].json;
    window.location.assign("./html/game.html");
}