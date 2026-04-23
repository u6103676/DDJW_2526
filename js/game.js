import { clickCard, gameItems, selectCards, startGame, initCard, setRedrawCallback } from "./memory.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const cardW = 100;
const cardH = 120;
const gap = 15; 

function getSVGDataURL(type){
    let shape = "";
    switch(type) {
        case 0: shape = '<circle cx="50" cy="50" r="40" fill="#FF5733" />'; break; 
        case 1: shape = '<rect x="15" y="15" width="70" height="70" fill="#33FF57" />'; break;
        case 2: shape = '<polygon points="50,10 90,90 10,90" fill="#3357FF" />'; break; 
        case 3: shape = '<rect x="20" y="40" width="60" height="40" fill="#F333FF" />'; break; 
        case 4: shape = '<polygon points="50,5 63,35 95,35 70,55 80,85 50,70 20,85 30,55 5,35 37,35" fill="#FFD433" />'; break;
        case 5: shape = '<ellipse cx="50" cy="50" rx="40" ry="25" fill="#33FFF3" />'; break;  
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">${shape}</svg>`;
    return "data:image/svg+xml;base64," + btoa(svg);
}

function drawCard(x, y, value){
    ctx.clearRect(x, y, cardW, cardH);
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ffa500";
    ctx.fillStyle = "#2c3e50";  
    if (ctx.roundRect) {
        ctx.roundRect(x, y, cardW, cardH, 10);
    } else {
        ctx.rect(x, y, cardW, cardH);
    }
    ctx.fill();  
    ctx.stroke();
    if (value === -1) {
        ctx.fillStyle = "#1a252f";
        ctx.fillRect(x+10, y+10, cardW-20, cardH-20);
        ctx.fillStyle = "#ffa500";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("?", x + (cardW/2), y + (cardH/2));
    }
    else{
        const img = new Image();
        img.src = getSVGDataURL(value);
        img.onload = () => {
            ctx.drawImage(img, x + 10, y + 10, cardW - 20, cardH - 20);
        };
    }
}

export function setupBoard() {
    selectCards();
    if (!gameItems || gameItems.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cols = 4; 
    const rows = Math.ceil(gameItems.length / cols);
    const totalW = cols * cardW + (cols - 1) * gap;
    const totalH = rows * cardH + (rows - 1) * gap;
    const startX = (canvas.width - totalW) / 2;
    const startY = (canvas.height - totalH) / 2;

    gameItems.forEach((value, idx) => {
        const x = startX + (idx % cols) * (cardW + gap);
        const y = startY + Math.floor(idx / cols) * (cardH + gap);
        drawCard(x, y, value);
        initCard((val) => {
            drawCard(x, y, val);
        }, idx);                       // Modify values
    });

    canvas.onclick = (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        gameItems.forEach((_, idx) => {
            const x = startX + (idx % cols) * (cardW + gap);
            const y = startY + Math.floor(idx / cols) * (cardH + gap);
            if (mouseX >= x && mouseX <= x + cardW && mouseY >= y && mouseY <= y + cardH) {
                clickCard(idx);
            }
        });
    };
}

setRedrawCallback(setupBoard);
setupBoard();
startGame();