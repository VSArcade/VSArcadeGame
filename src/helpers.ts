import { Engine, Render, World, Bodies, Body, Vector } from 'matter-js'
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
}

export const randomizeVelo = (body: Body, min: number, max: number) => {
  var scale = min+Math.random()*(max-min);
  var vy = scale*body.velocity.y
  if(Math.abs(vy)<0.1){
    vy = Math.sign(vy)*0.1
  }
  Body.setVelocity(body, {
    x: scale*body.velocity.x,
    y: vy
  });
}