import VSAEngine from '../engine'
import { Engine, Render, World, Bodies, Body } from 'matter-js'
import { initCollisions } from './collisions'
import Player from './player'
import { boundary_options, ball_options, block_options } from '../types/BodyTags.types'


					// // check for lines with only whitespace and ignore them
					// if (document.lineAt(i).text.replace(/\s/g, '').length == 0) continue;

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

const initWords = (vsaengine: VSAEngine, text: string[], initY: number, initX: number) => {

    var curY = 200;
    for (var i = 0; i < text.length; i++) {

        var line = text[i].split(' ');
        var curX = 400;

        for (var j = 0; j < line.length; j++) {
            var word = line[j];

            var newWord = Bodies.rectangle(curX, curY, 10*word.length, 20, block_options);
            newWord.label = word;
            vsaengine.addBody([newWord]);

            curX += 10*word.length 
        }
        curY += 15
    }
}

const initBall = (vsaengine: VSAEngine) => {
  var ball = Bodies.circle(200, 200, 12, ball_options);

  Body.setVelocity(ball, { 
    x: (-0.5+Math.random())*20, 
    y: (-0.5+Math.random())*20 
  });

  vsaengine.addBody([ball]);
}

export const startBreakout = () => {

  var vsaengine = new VSAEngine();
  initBreakoutMap(vsaengine);
  initBall(vsaengine);
  initCollisions(vsaengine);
  initWords(
    vsaengine, 
    ["hello, Many of you are probably feeling a little sad.",
     "This is ok. Sadness is a normal human emotion.",
     "I encourage you to watch the movie Inside Out - one of the best movies of all time.",
     "Try not to take your performance in this course as a barometer by which you should measure yourself. This is true for any course at any time but is especially true for this particular term where both the school and the students are learning to adjust to this new format. There is also the written part to to this midterm which will likely boost everyone's average (if previous Crowdmark assessments are to be believed). As it stands at the moment, the grades so far are not out of line with previous years. Specific to this course is the fact that the second half is generally easier to understand than the first half so hopefully this will give everyone a moral if not quantitative boost. At the end of it all try hard to look at your effort and be proud of the work you put in. University in general requires a big adjustment and unfortunately for everyone starting new this year will likely require a few more adjustments over the coming years. One of the biggest, most important and rarely talked about benefits of university as a whole is just a general growth of the individual regardless of what discipline they ultimately decided to study. A reflection for you. - Math 137"], 
    200, 200
  );
  var player: Player = new Player(vsaengine);

}

