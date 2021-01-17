import { Engine, Events, Render, World, Bodies, Body, Vector, IChamferableBodyDefinition, Mouse } from 'matter-js'
import VSAEngine from '../engine'
import { player_options } from '../types/BodyTags.types'
import { clamp } from '../helpers'

const player_speed: number = 0.1;
const max_speed: number = 1.5;
const player_dimension: Vector = {
  x: 200,
  y: 20
}

export default class BreakOutPlayer {

  body: Body
  input: number

  constructor(vsaengine: VSAEngine) {

    this.body = Bodies.rectangle(
      window.innerWidth/2,
      window.innerHeight-player_dimension.y,
      player_dimension.x, 
      player_dimension.y, 
      player_options
    );

    this.input = 0;

    vsaengine.addBody([this.body]);

    Events.on(vsaengine.engine, 'beforeUpdate', () => {

      /* clamp speed */
      if (this.body.velocity.x > max_speed) {
        Body.setVelocity(this.body, {
          x: max_speed,
          y: 0
        });

      } else if (this.body.velocity.x < -max_speed) {
        Body.setVelocity(this.body, {
          x: -max_speed,
          y: 0
        });
      }
      
      // move player
      Body.applyForce(this.body, this.body.position, {x: player_speed*this.input, y: 0});

    });

    this.playerInput();

  }

  playerInput() {

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();

      switch(event.key) {
        case "h":
        case "ArrowLeft": //left arrow
          this.input = -1;
          break;

        case "l":
        case "ArrowRight": // right arrow
          this.input = 1;
          break;

      }

    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
      event.preventDefault();

      switch(event.key) {
        case "h":
        case "ArrowLeft": 
          if (this.input == -1) this.input = 0;
        case "l":
        case "ArrowRight": 
          if (this.input == 1) this.input = 0;

          break;
      }
    });

  }

}