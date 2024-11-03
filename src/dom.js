import { randomize, playerAttacks } from "./index.js";

export function setupGameboard(whichBoard, size = window.size){
    let parent;
    let isCPU;
    if(whichBoard == "player"){
        parent = document.querySelector(".player-outer-board");
        isCPU = false;
    }
    else if(whichBoard == "cpu"){
        parent = document.querySelector(".cpu-outer-board"); 
        isCPU = true;
    }
    const board = parent.querySelector(".board");
    const letters = parent.querySelector(".letters");
    const numbers = parent.querySelector(".numbers");
    for(let i = 1; i <= size; i++){
        const number = document.createElement("div");
        number.setAttribute("class", "number");
        number.textContent = i;
        numbers.appendChild(number);
    }
    for(let i = 0; i < size; i++){
        const letter = document.createElement("div");
        letter.textContent = String.fromCharCode(i + 65);
        letters.appendChild(letter);
        for(let j = 0; j < size; j++){
            const tile = document.createElement("div");
            tile.setAttribute("class", "tile");
            tile.setAttribute("data-coord", `[${i}, ${j}]`);
            board.appendChild(tile);
            tile.addEventListener("click", playerAttack);
        }
    }
}

export function displayBoard(dataBoard, isPlayer){
    let domBoard;
    if(isPlayer){
        domBoard = document.querySelector(".player-board");
    }
    else{
        domBoard = document.querySelector(".cpu-board"); 
    }
    clearBoard(domBoard);
    const children = domBoard.children;
    const childrenArray = Array.from(children);
    childrenArray.forEach(child => {
        const coords = JSON.parse(child.getAttribute("data-coord"));
        const tileData = dataBoard.board[coords[0]][coords[1]];
        if(tileData === null);
        else if(typeof tileData == "object" && isPlayer){
            const ship = document.createElement("div");
            ship.setAttribute("class", "ship");
            child.appendChild(ship);
        }
        else if(typeof tileData == "number"){
            if(tileData == 1){
                const missed = document.createElement("div");
                missed.setAttribute("class", "missed");
                child.appendChild(missed);
            }
            else if(tileData == 2){
                const damaged = document.createElement("div");
                damaged.setAttribute("class", "damaged");
                child.appendChild(damaged);
            }
        }
    });
}

function clearBoard(board){
    const children = board.children;
    const childrenArray = Array.from(children);
    childrenArray.forEach(child => {
        removeChildren(child);        
    });
}

function removeChildren(parent){
    while(parent.hasChildNodes()){
        parent.removeChild(parent.firstChild);
    }
}

const randomButton = document.querySelector(".randomize");

randomButton.addEventListener("click", randomButtonClicked);

function randomButtonClicked(){
    randomize(true);
}

function playerAttack(e){
    playerAttacks(e);
    randomButton.disabled = true;
}