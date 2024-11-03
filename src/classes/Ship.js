export default class Ship{
    constructor(size){
        this.size = size;
        this.hitTimes = 0;
        this.sunk = false;
    }
    hit(){
        this.hitTimes += 1;
    }
    isSunk(){
        if(this.hitTimes >= this.size){
            return true;
        }
        return false;
    }
}