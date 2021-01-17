import VSAEngine from '../engine'
import { Bodies, Body, Composite, Events, Vector, World } from 'matter-js'
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
// const fallSpeed = 0.2;
const fallSpeed = 0.2;
const initWords = (game: BreakoutGame, text: string[], initX: number): number => {

    var vsaengine: VSAEngine = game.vsaengine;

    var initY = -text.length*lineHeight*9/10

    var totalLen = 0; // this is used to calculate max score

    for (var i = 0; i < text.length; i++) {

        var line = text[i].split(' ');
        var curX = initX;

        for (var j = 0; j < line.length; j++) {
            var word = line[j];
            var wordLength = 9*word.length+15;
            totalLen += word.length;

            var newWord = Bodies.rectangle(curX, initY, wordLength, 20, block_options);
            newWord.label = word;
            vsaengine.addBody([newWord]);
            if(j!=line.length-1){
              curX += wordLength/2+line[j+1].length*9/2;
            }
            Body.setVelocity(newWord,{x:0,y:fallSpeed});

        }
        initY += lineHeight;
    }

    /* check for words to be deleted */
    Events.on(vsaengine.engine, 'beforeUpdate', () => {

      const bodies: Body[] = Composite.allBodies(vsaengine.engine.world);
      var word_count = 0;

      bodies.forEach((body: Body) => {
        
        if (body.label == undefined) return; // don't care about non-words 

        if (body.position.y > window.innerHeight+40) {
          Composite.remove(vsaengine.engine.world, body);
          // console.log(`There are ${bodies.length} bodies`);
        } else {
          word_count += 1;
        }

      });

      if (word_count == 0) { // gameover when there are no more words
        game.gameover();
      }


    });

    return totalLen;
}

const deathPenalty = 50;
export default class BreakoutGame {

  vsaengine: VSAEngine;
  score: number
  possibleScore: number

  constructor() {
    this.score = 0;

    this.vsaengine = new VSAEngine();
    initBreakoutMap(this.vsaengine);
    initCollisions(this);
    this.possibleScore = initWords(
      this, 
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

    var player: Player = new Player(this.vsaengine);
    var ball: Ball = new Ball(this, 12);

  }

  modScore(deltaScore: number) {
    this.score += deltaScore;

    /* tell ui to update */
    var scoreBoard = <HTMLDivElement>document.getElementById('score-board');
    scoreBoard.innerHTML = `score: ${this.score}`;

  }

  deductOnDeath() {
    this.modScore(-deathPenalty);
  }

  gameover() {

  }

}

