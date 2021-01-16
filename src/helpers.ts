import { Engine, Render, World, Bodies, Body, Vector } from 'matter-js'

export const smoothMove = (body: Body, offset: Vector) => {
  // const cur_pos: Vector = body.position;

  // Body.setPosition(body, new_pos);
  // Body.setVelocity(body, {x: new_pos.x-cur_pos.x, y: new_pos.y-cur_pos.y});
  // Body.translate(body, offset);
  // Body.setVelocity(body, offset);
  Body.applyForce(body,body.position,offset);
}

export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
}