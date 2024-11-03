import "./style.css";
import Ship from "./classes/Ship.js";
import Gameboard from "./classes/Gameboard.js";
import Player from "./classes/Player.js";
import { setupGameboard, displayBoard } from "./dom.js";

window.size = 10;



const player = new Player(new Gameboard());
const cpu = new Player(new Gameboard());

setupGameboard("player");
setupGameboard("cpu");

export function randomize(isPlayer){
    let current;
    if(isPlayer){
        current = player;
    }
    else{
        current = cpu;
    }
    current.board.initializeBoard();
    const ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
    ships.forEach(ship => {
        let coords;
        let randomBool;
        do{
            coords = [Math.floor(Math.random() * window.size), Math.floor(Math.random() * window.size)];
            randomBool = Math.random() < 0.5;
        }while(!current.board.placeShip(ship, coords, randomBool));
    });
    displayBoard(current.board, isPlayer);
}

randomize(true); 
randomize(false); 

export function playerAttacks(e){
    if(e.srcElement.dataset.coord){
        const coords = JSON.parse(e.srcElement.dataset.coord);
        cpu.board.receiveAttack(coords);
        displayBoard(cpu.board, false);
        if(cpu.board.allShipsSunk()){
            alert("You won!")
            location.reload();
        }
        enemyAttacks();
    }
    
}

function enemyAttacks(){
    let coords;
    do{
        coords = [Math.floor(Math.random() * window.size), Math.floor(Math.random() * window.size)];
    }while(!player.board.receiveAttack(coords))
        displayBoard(player.board, true);
        if(player.board.allShipsSunk()){
            alert("You lost!");
            location.reload();
        }
}