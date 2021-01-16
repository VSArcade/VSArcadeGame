import { Engine, Events, Body, IEventCollision, IPair, Composite } from 'matter-js'
import VSAEngine from '../engine'
import { BreakoutBodyTags } from '../types/BodyTags.types'

export const initCollisions = (vsaengine: VSAEngine) => {

  Events.on(vsaengine.engine, 'collisionStart', (event: IEventCollision<Engine>) => {
    
    event.pairs.forEach((collision) => {
      
      if (isPairCollide(collision, BreakoutBodyTags.Player, BreakoutBodyTags.Ball)) {
        console.log("player and ball collided");
        
        var ball: Body = isBodyA(collision, BreakoutBodyTags.Ball) ? collision.bodyA : collision.bodyB;

        // give the ball some extra velo

      } else if (isPairCollide(collision, BreakoutBodyTags.Ball, BreakoutBodyTags.Block)) {

        var block: Body = isBodyA(collision, BreakoutBodyTags.Block) ? collision.bodyA : collision.bodyB;

        Composite.remove(vsaengine.engine.world, block);

      }

    });

  });

}

export const isPairCollide = (pair: IPair, colA: string, colB: string): boolean => {

  if (!(pair.bodyA.label == colA || pair.bodyB.label == colA)) return false;
  if (!(pair.bodyA.label == colB || pair.bodyB.label == colB)) return false;
  return true;

}

export const isBodyA = (pair: IPair, col: string): boolean => {

  return pair.bodyA.label == col;

}