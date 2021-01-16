import VSAEngine from '../engine'
import { Engine, Render, World, Bodies, Body } from 'matter-js'
import { initCollisions } from './collisions'
import Player from './player'
import { boundary_options, ball_options } from '../types/BodyTags.types'



const border_thickness = 20;

const initBreakoutMap = (vsaengine: VSAEngine) => {

  /* make boundaries */
  vsaengine.addBody([
    Bodies.rectangle(0-border_thickness, 0, border_thickness, window.innerHeight*2, boundary_options),
    Bodies.rectangle(window.innerWidth, 0, border_thickness, window.innerHeight*2, boundary_options),
    Bodies.rectangle(0, 0-border_thickness, window.innerWidth*2, border_thickness, boundary_options),
    Bodies.rectangle(0, window.innerHeight, window.innerWidth*2, border_thickness, boundary_options),
  ]);  

}
const initWords = (vsaengine: VSAEngine, text: string[],initY:number,initX:number)=>{

    var curY = 200;
    for(var i = 0; i < text.length; i++){

        var line = text[i].split(' ');
        var curX = 400;

        for (var j = 0; j < line.length; j++) {
            var word = line[j]
            console.log("hggg")

            
            vsaengine.addBody([Bodies.rectangle(curX,curY,10*word.length,20,{label:word})])
            curX+=10*word.length 

        }
        curY+=15

    }




}

const initBall = (vsaengine: VSAEngine) => {
  var ball = Bodies.circle(200, 200, 12, ball_options);

  Body.setVelocity(ball, { 
    x: (-0.5+Math.random())*20, 
    y: (-0.5+Math.random())*20 
  });

  vsaengine.addBody([ ball ]);
}

export const startBreakout = () => {

  var vsaengine = new VSAEngine();
  initBreakoutMap(vsaengine);
  initBall(vsaengine);
  initCollisions(vsaengine);
  initWords(vsaengine,["gieh efjeif","eiufhi, jfeiejfi"],200,200)
  var player: Player = new Player(vsaengine);

}

