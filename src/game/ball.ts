import VSAEngine from '../engine'
import { Bodies, Body, Events, Vector } from 'matter-js'
import { ball_options } from '../types/BodyTags.types'

const minBallSpeed = 5;
const maxBallSpeed = 12;

export default class Ball {

  body: Body

  constructor(vsaengine: VSAEngine, radius: number) {
    this.body = Bodies.circle(0, 0, radius, ball_options);

    this.resetPos();

    this.onUpdate(vsaengine);

    vsaengine.addBody([this.body]);
  }

  resetPos() {

    /* Spawn ball somewhere along middle of screen */
    const edgePad = 5; // min distance from wall
    Body.setPosition(this.body, {
        x: edgePad+Math.random()*(innerWidth-2*edgePad),
        y: window.innerHeight/2
    });

    /* start ball off with some initial velocity */
    Body.setVelocity(this.body, 
      Vector.mult(
        Vector.rotate({ x: 1, y: 0 }, Math.random()*2*Math.PI),
        minBallSpeed+Math.random()*(maxBallSpeed-minBallSpeed)
      )
    );

  }

  onUpdate(vsaengine: VSAEngine) {
    Events.on(vsaengine.engine, 'beforeUpdate', () => {

      /* clamp speed */
      var cur_speed = Vector.magnitude(this.body.velocity);
      if (cur_speed >= maxBallSpeed) {
        Body.setVelocity(
          this.body,
          Vector.mult(this.body.velocity, maxBallSpeed/cur_speed)
        );
      }

      if (cur_speed <= minBallSpeed) {
        Body.setVelocity(
          this.body,
          Vector.mult(this.body.velocity, minBallSpeed/cur_speed)
        );
      }

      /* check for death */
      // console.log(`${this.body.position.y}, ${window.innerHeight}`)
      if (this.body.position.y > window.innerHeight+40) {
        this.resetPos();
      }
      
    });
  }


}