import { Engine, Render, World, Bodies, Body } from 'matter-js'
import { initListeners } from './reciever'
import { startBreakout } from './game/breakout';

initListeners();
startBreakout();
