import "./style.css";
import Ship from "./classes/Ship.js";
import Gameboard from "./classes/Gameboard.js";
import Player from "./classes/Player.js";
import { setupGameboard } from "./dom.js";

const size = 10;

const player = new Player(new Gameboard(size));
const cpu = new Player(new Gameboard(size));

setupGameboard(document.querySelector(".player-board"), size)
setupGameboard(document.querySelector(".cpu-board"), size)

