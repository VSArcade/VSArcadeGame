import { Engine, Render, World, Bodies, Body } from 'matter-js'
import BreakoutGame from './game/breakout';
import { createScoreCounter } from './game/ui'

// initListeners();
// startBreakout();

// var styles = grabStyles();
// console.log(styles);

var game: BreakoutGame = new BreakoutGame();

createScoreCounter();




