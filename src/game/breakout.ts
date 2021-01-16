import VSAEngine from '../engine'
import { Engine, Render, World, Bodies, Body } from 'matter-js'
import { BreakoutBodyTags } from '../types/BodyTags.types'

const border_thickness = 20;

export const initBreakoutMap = (vsaengine: VSAEngine) => {

  /* make boundaries */
  vsaengine.addBody([
    Bodies.rectangle(0-border_thickness, 0, border_thickness, window.innerHeight*2, {isStatic: true}),
    Bodies.rectangle(window.innerWidth, 0, border_thickness, window.innerHeight*2, {isStatic: true}),
    Bodies.rectangle(0, 0-border_thickness, window.innerWidth*2, border_thickness, {isStatic: true}),
    Bodies.rectangle(0, window.innerHeight, window.innerWidth*2, border_thickness, {isStatic: true}),
  ]);   

}

export const initBall = (vsaengine: VSAEngine) => {
  var ball = Bodies.circle(200, 200, 12, {
    restitution: 1,
    frictionAir: 0
  });

  Body.setVelocity(ball, { 
    x: (-0.5+Math.random())*20, 
    y: (-0.5+Math.random())*20 
  });

  ball.label = BreakoutBodyTags.Ball;
  vsaengine.addBody([ ball ]);
}

export const startBreakout = () => {

  var vsaengine = new VSAEngine();

}

