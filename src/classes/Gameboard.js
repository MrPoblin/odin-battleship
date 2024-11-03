import Ship from "./Ship";

const Status = {
    MISSED: 1,
    DAMAGED: 2
};


export default class Gameboard{
    constructor(size = window.size){
        this.size = size;
        this.board = [];
        this.initializeBoard()
    }

    initializeBoard(){
        for(let i = 0; i < this.size; i++){
            this.board[i] = [];
            for(let j = 0; j < this.size; j++){
                this.board[i][j] = null;
            }
        }
    }

    placeShip(ship, coords, isRotated = false){
        if(this.canPlace(ship, coords, isRotated)){
            for(let i = 0; i < ship.size; i++){
                let temp = [...coords]
                if(isRotated) temp[1] += i;
                else temp[0] += i;
                this.board[temp[0]][temp[1]] = ship;
            }
            return true;
        }
        return false;
    }
    canPlace(ship, coords, isRotated){
        for(let i = 0; i < ship.size; i++){
            let temp = [...coords]
            if(isRotated) temp[1] += i;
            else temp[0] += i;
            if(temp[0] >= this.size || temp[1] >= this.size || this.board[temp[0]][temp[1]] !== null){
                return false;
            }
        }
        return true;
    }
    receiveAttack(coords){
        if(this.board[coords[0]][coords[1]] == null){
            this.board[coords[0]][coords[1]] = Status.MISSED;
            return true;
        }
        else if(typeof this.board[coords[0]][coords[1]] == "object"){
            this.board[coords[0]][coords[1]].hit();
            this.board[coords[0]][coords[1]] = Status.DAMAGED;
            return true;
        }
        else if(typeof this.board[coords[0]][coords[1]] == "number"){
            return false;
        }
    }
    allShipsSunk(){
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(typeof this.board[i][j] == "object" && this.board[i][j] !== null){
                    return false;
                }
            }
        }
        return true;
    }
}