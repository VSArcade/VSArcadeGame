import { Engine, Events, Render, World, Bodies, Body, Vector, IChamferableBodyDefinition, Mouse } from 'matter-js'
import VSAEngine from '../engine'
import { smoothMove, clamp } from '../helpers'

const player_speed: number = 0.1;
const max_speed: number = 1.5;
const player_dimension: Vector = {
  x: 120,
  y: 20
}
const player_options: IChamferableBodyDefinition = {
  // isStatic: true
  inertia: Infinity,
  frictionAir: 0.2
}

export default class BreakOutPlayer {

  body: Body
  input: number
  velocity: number

  constructor(vsaengine: VSAEngine) {

    this.body = Bodies.rectangle(
      50,
      50,
      player_dimension.x, 
      player_dimension.y, 
      player_options
    );

    this.input = 0;
    this.velocity = 0;

    vsaengine.addBody([this.body]);
    Events.on(vsaengine.engine, 'beforeUpdate', () => {
      // console.log('update');

      /* input */

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
          // Body.applyForce(this.body, this.body.position, {x: -player_speed, y: 0});
          this.input = -1;

          break;

        case "l":
        case "ArrowRight": // right arrow
          // Body.applyForce(this.body, this.body.position, {x: player_speed, y: 0});
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