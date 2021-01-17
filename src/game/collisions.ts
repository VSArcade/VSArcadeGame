import { Engine, Events, Body, IEventCollision, IPair, Composite, Vector, Vertices } from 'matter-js'
import VSAEngine from '../engine'
import { ball_options, BreakoutBodyCatagories } from '../types/BodyTags.types'
import { randomizeVelo } from '../helpers'

export const initCollisions = (vsaengine: VSAEngine) => {

  Events.on(vsaengine.engine, 'collisionStart', (event: IEventCollision<Engine>) => {
    
    event.pairs.forEach((collision) => {

      // if (collision.bodyA.collisionFilter.category == BreakoutBodyCatagories.Ball || collision.bodyB.collisionFilter.category == BreakoutBodyCatagories.Ball) {
      //   var ball = getBody(collision, BreakoutBodyCatagories.Ball);

      //   randomizeVelo(ball);
      // }
      
      if (isPairCollide(collision, BreakoutBodyCatagories.Player, BreakoutBodyCatagories.Ball)) {
        
        var player: Body = getBody(collision, BreakoutBodyCatagories.Player);
        var ball: Body = getBody(collision, BreakoutBodyCatagories.Ball);

        // give the ball some extra velo

        // shift the ball's angle depending on position relative to center

        setTimeout(() => {
          var new_velo: Vector;
          if (ball.position.x-player.position.x > 0) { // to right
            new_velo = Vector.rotate({ x: 1, y: 0}, Math.random()*(Math.PI/2));

            Body.setVelocity(ball, 
              Vector.mult(new_velo, Vector.magnitude(ball.velocity))
            );

            
          } else { // to the left
            new_velo = Vector.rotate({ x: 1, y: 0}, Math.PI/2+Math.random()*(Math.PI/2));

            Body.setVelocity(ball, 
              Vector.mult(new_velo, Vector.magnitude(ball.velocity))
            );
          }

        }, 1);

      } else if (isPairCollide(collision, BreakoutBodyCatagories.Ball, BreakoutBodyCatagories.Block)) {

        var block: Body = getBody(collision, BreakoutBodyCatagories.Block);
        var ball: Body = getBody(collision, BreakoutBodyCatagories.Ball);

        setTimeout(() => {
          Composite.remove(vsaengine.engine.world, block);
        }, 1); // allow the ball to bounce off

      }

    });

  });

}

export const isPairCollide = (pair: IPair, catA: number, catB: number): boolean => {

  if (!(pair.bodyA.collisionFilter.category == catA || pair.bodyB.collisionFilter.category == catA)) return false;
  if (!(pair.bodyA.collisionFilter.category == catB || pair.bodyB.collisionFilter.category == catB)) return false;
  return true;

}

/* only use this if you are sure one of the bodies in the pair is the one ypu want */
export const getBody = (pair: IPair, cat: number): Body => {

  if (pair.bodyA.collisionFilter.category == cat) return pair.bodyA;
  return pair.bodyB;

}