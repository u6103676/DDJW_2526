const resources = [0, 1, 2, 3, 4, 5];
const back = -1;

const StateCard = Object.freeze({
  DISABLE: 0,
  ENABLE: 1,
  DONE: 2
});

let redrawCallback = null;

export function setRedrawCallback(fn) {
    redrawCallback = fn;
}

var game = {
    items: [],
    states: [],
    setValue: null,
    ready: 0,
    lastCards: [],
    score: 200,
    groups: 2,
    pendingGroups: 0,
    groupSize: 2,
    mode: 1,   
    level: 1,
    maxGroups: 6,
    goBack: function(idx){
        this.setValue && this.setValue[idx](back);
        this.states[idx] = StateCard.ENABLE;
    },
    goFront: function(idx){
        this.setValue && this.setValue[idx](this.items[idx]);
        this.states[idx] = StateCard.DISABLE;
    },
    select: function(){
        this.setValue = [];
        if (sessionStorage.load){ // Carreguem partida
            let toLoad = JSON.parse(sessionStorage.load);
            this.items = toLoad.items;
            this.states = toLoad.states;
            this.lastCards = toLoad.lastCards;
            this.score = toLoad.score;
            this.groups = toLoad.groups;
            this.groupSize = toLoad.groupSize;
            this.mode = toLoad.mode || 1; 
            this.level = toLoad.level || 1;
            sessionStorage.removeItem('load');
        }
        else{ // Nova partida
            this.mode = parseInt(sessionStorage.getItem('gameMode')) || 1;
            if (this.items.length === 0) {
                this.level = 1;
                let config = localStorage.options ? JSON.parse(localStorage.options) : null;
                if (this.mode === 1 && config) {
                    this.groupSize = parseInt(config.groupSize) || 2;
                    this.groups = parseInt(config.pairs) || 2;
                }
                else {
                this.groupSize = 2;
                this.groups = 2;
                }
            }
            this.pendingGroups = this.groups;
            let pool = resources.slice();
            shuffe(pool);
            let selectedTypes = pool.slice(0, this.groups);
            let newItems = [];
            for(let i = 0; i < this.groupSize; i++){
                newItems = newItems.concat(selectedTypes);
            }        
            shuffe(newItems);
            this.items = newItems; 
            this.states = new Array(this.items.length).fill(StateCard.ENABLE);
        }
    },

    start: function(){
        this.ready = 0;
        this.items.forEach((_,indx)=>{
            if (this.states[indx] !== StateCard.ENABLE){
                this.ready++;
            }
            else{
                setTimeout(()=>{
                    this.ready++;
                    this.goBack(indx);
                }, 1000 + 100 * indx);
            }
        });
    },
    click: function(indx){
        if (this.states[indx] !== StateCard.ENABLE || this.ready < this.items.length) return;
        this.goFront(indx);
        this.lastCards.push(indx); // Primera carta clicada
        if(this.lastCards.length === this.groupSize){
            let allMatch = this.lastCards.every(cardIdx =>
                this.items[cardIdx] === this.items[this.lastCards[0]]
            );
            if(allMatch){
                this.pendingGroups--;
                this.lastCards.forEach(cardIdx => this.states[cardIdx] = StateCard.DONE);
                if(this.pendingGroups <= 0){
                    if(this.mode === 1){
                        updateRanking();
                        alert(`Has guanyat el Mode 1 amb ${this.score} punts!`);
                        window.location.assign("../");
                    }
                    else{
                        alert(`Nivell ${this.level} superat! Preparat pel següent?`);
                        this.level++;
                        this.updateDifficulty(); 
                        this.ready = 0;       
                        this.lastCards = [];
                        this.select();
                        if (redrawCallback) redrawCallback();
                        this.start();
                    }
                }
            }
            else{ // Teníem carta prèvia
                let cardsToFlip = [...this.lastCards];
                setTimeout(() => {
                    cardsToFlip.forEach(cardIdx => this.goBack(cardIdx));
                    }, 500); 
                this.score -= 25;
                if (this.score <= 0){
                    updateRanking();
                    alert ("Has perdut");
                    window.location.assign("../");
                }
            }
            this.lastCards = [];
        }
    },
save: function(){
        let to_save = JSON.stringify({
            items: this.items,
            states: this.states,
            lastCards: this.lastCards,
            score: this.score,
            groups: this.groups,          
            pendingGroups: this.pendingGroups, 
            groupSize: this.groupSize,
            level: this.level,             
            mode: this.mode
        });
        let ret = false;
        fetch('../php/save.php', {
            method: "POST",
            body: to_save,
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Error en la xarxa');
        })
        .then(data => {
            console.log("Partida guardada al servidor:", data);
            ret = true;
        })
        .catch (err => {
            console.error("Error al servidor, guardant en local:", err);
            localStorage.save = to_save;
        });
        setTimeout(() => {
            window.location.assign("../");
        }, 500);
    },

    updateDifficulty: function() {
        if (this.level % 2 === 0 && this.groupSize < 4) {
            this.groupSize++;
        } else {
            if (this.groups < this.maxGroups) this.groups++; 
        }
        this.score = 200 + (this.level * 50); 
    },
};

function shuffe(arr){
    arr.sort(function () {return Math.random() - 0.5});
}

function updateRanking() {
    let ranking = localStorage.getItem('ranking') ? JSON.parse(localStorage.getItem('ranking')) : [];
    let alias = sessionStorage.getItem('userName') || "Anonim";
    ranking.push({ name: alias, points: game.score, date: new Date().toLocaleDateString() });
    ranking.sort((a, b) => b.points - a.points);
    ranking = ranking.slice(0, 10);
    localStorage.setItem('ranking', JSON.stringify(ranking));
}

export var gameItems;
export var score; 

export function selectCards() { 
    if (game.items.length === 0) {
        game.select();
    }
    gameItems = game.items;
    score = game.score; 
}

export function clickCard(indx){ 
    game.click(indx); 
    score = game.score;
}

export function startGame(){ game.start(); }

export function initCard(callback, idx) { 
    if (!game.setValue) game.setValue = [];
    game.setValue[idx] = callback;
}

export function saveGame(){
    game.save();
}