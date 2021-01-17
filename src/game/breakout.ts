import VSAEngine from '../engine'
import { Bodies, Body, Events, Vector } from 'matter-js'
import { initCollisions } from './collisions'
import Player from './player'
import Ball from './ball'
import { 
  boundary_options, 
  boundary_bottom_options, 
  boundary_top_options, 
  block_options 
} from '../types/BodyTags.types'

					// // check for lines with only whitespace and ignore them
					// if (document.lineAt(i).text.replace(/\s/g, '').length == 0) continue;

const border_thickness = 20;

const initBreakoutMap = (vsaengine: VSAEngine) => {

  /* make boundaries */
  vsaengine.addBody([
    Bodies.rectangle(0-border_thickness, 0, border_thickness, window.innerHeight*2, boundary_options),
    Bodies.rectangle(window.innerWidth, 0, border_thickness, window.innerHeight*2, boundary_options),
    Bodies.rectangle(0, 0-border_thickness, window.innerWidth*2, border_thickness, boundary_top_options),
    Bodies.rectangle(0, window.innerHeight, window.innerWidth*2, border_thickness, boundary_bottom_options),
  ]);  

}

const lineHeight = 25;
const initWords = (vsaengine: VSAEngine, text: string[], initX: number) => {
    var initY = -text.length*lineHeight*9/10

    for (var i = 0; i < text.length; i++) {

        var line = text[i].split(' ');
        var curX = initX;

        for (var j = 0; j < line.length; j++) {
            var word = line[j];
            var wordLength = 9*word.length+15

            var newWord = Bodies.rectangle(curX, initY, wordLength, 20, block_options);
            newWord.label = word;
            vsaengine.addBody([newWord]);
            if(j!=line.length-1){
              curX += wordLength/2+line[j+1].length*9/2

            }
            Body.setVelocity(newWord,{x:0,y:0.2})
            
            
        }
        initY += lineHeight;

    }
}


export default class BreakoutGame {

  score: number

  constructor() {
    this.score = 0;
  }

  startBreakout() {

    var vsaengine = new VSAEngine();
    initBreakoutMap(vsaengine);
    initCollisions(vsaengine);
    initWords(
      vsaengine, 
      ["setTimeout(() => {",
        "var new_velo: Vector;",
        "if (ball.position.x - player.position.x > 0) { // to right",
          "new_velo = Vector.rotate({ x: 1, y: 0}, Math.random() * (Math.PI/2) );",
          "",
          "Body.setVelocity(ball, ",
            "Vector.mult( new_velo, Vector.magnitude(ball.velocity) )",
          ");"], 
        400
    );

    var player: Player = new Player(vsaengine);
    var ball: Ball = new Ball(vsaengine, 12);

  }


}

