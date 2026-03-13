import {$} from "../library/jquery-4.0.0.slim.module.min.js";
import {clickCard, gameItems, selectCards, startGame, initCard, saveGame} from "./memory.js";

let game = $('#game');
let canvas = game[0].getContext('2d');
if (canvas){
    // Inicialitzar CANVAS
    game.attr("width", 800);
    game.attr("height", 600);
}