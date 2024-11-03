export function setupGameboard(parent, size){
    const empty = document.createElement("div");
    parent.appendChild(empty);
    for(let i = 1; i <= size; i++){
        const number = document.createElement("div");
        number.setAttribute("class", "number");
        number.textContent = i;
        parent.appendChild(number);
    }
    for(let i = 0; i < size; i++){
        const letter = document.createElement("div");
        letter.textContent = String.fromCharCode(i + 65);
        parent.appendChild(letter);
        for(let j = 0; j < size; j++){
            const tile = document.createElement("div");
            tile.setAttribute("class", "tile");
            tile.setAttribute("data-coord", `[${i}, ${j}]`);
            parent.appendChild(tile);
        }
    }
}

export function displayBoard(board, isPlayer){

}

function clearBoard(board){
    
}

function removeChildren(parent){

}