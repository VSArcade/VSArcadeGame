import { Engine, Events, Body, IEventCollision, IPair, Composite } from 'matter-js'
import VSAEngine from '../engine'
import { BreakoutBodyCatagories } from '../types/BodyTags.types'

export const initCollisions = (vsaengine: VSAEngine) => {

  Events.on(vsaengine.engine, 'collisionStart', (event: IEventCollision<Engine>) => {
    
    event.pairs.forEach((collision) => {
      
      if (isPairCollide(collision, BreakoutBodyCatagories.Player, BreakoutBodyCatagories.Ball)) {
        console.log("player and ball collided");
        
        var ball: Body = isBodyA(collision, BreakoutBodyCatagories.Ball) ? collision.bodyA : collision.bodyB;

        // give the ball some extra velo

      } else if (isPairCollide(collision, BreakoutBodyCatagories.Ball, BreakoutBodyCatagories.Block)) {

        var block: Body = isBodyA(collision, BreakoutBodyCatagories.Block) ? collision.bodyA : collision.bodyB;

        Composite.remove(vsaengine.engine.world, block);

      }

    });

  });

}

export const isPairCollide = (pair: IPair, catA: number, catB: number): boolean => {

  if (!(pair.bodyA.collisionFilter.category == catA || pair.bodyB.collisionFilter.category == catA)) return false;
  if (!(pair.bodyA.collisionFilter.category == catB || pair.bodyB.collisionFilter.category == catB)) return false;
  return true;

}

export const isBodyA = (pair: IPair, cat: number): boolean => {

  return pair.bodyA.collisionFilter.category == cat;

}