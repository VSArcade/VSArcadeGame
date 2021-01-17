import { Engine, Render, World, Bodies, Body } from 'matter-js'
import { initListeners } from './reciever'
import { startBreakout } from './game/breakout';
import { grabStyles } from './styles'

initListeners();
startBreakout();

// var styles = grabStyles();
// console.log(styles);




