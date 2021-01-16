import { Engine, Render, World, Bodies, Body, IChamferableBodyDefinition } from 'matter-js'
import { Vec2 } from '../types/Misc.types'
import VSAEngine from '../engine'

const player_dimension: Vec2 = {
  x: 120,
  y: 20
}

const player_options: IChamferableBodyDefinition = {
  isStatic: true
}

export default class BreakOutPlayer {

  body: Body

  constructor(vsaengine: VSAEngine) {


    this.body = Bodies.rectangle(
      50,
      50,
      player_dimension.x, 
      player_dimension.y, 
      player_options
    );

    vsaengine.addBody([this.body]);

    this.handleInput();

  }

  handleInput() {

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();

      switch(event.key) {
        case "h":
        case "ArrowLeft": //left arrow
          console.log('Pressed left arrow');
          Body.translate(this.body, {x: -4, y: 0});

          break;

        case "l":
        case "ArrowRight": // right arrow
          console.log('Pressed right arrow');
          Body.translate(this.body, {x: 4, y: 0});

          break;

      }
    });

  }

}