import { Engine, Events, Body, IEventCollision, IPair, Composite, Vector, Vertices, World } from 'matter-js'
import BreakoutGame from './breakout'
import VSAEngine from '../engine'
import { ball_options, block_options, BreakoutBodyCatagories } from '../types/BodyTags.types'
import { randomizeVelo } from '../helpers'
import { playPaddleSound, playHitSound, playWallSound } from '../soundplayer'
export const initCollisions = (game: BreakoutGame) => {

  var vsaengine: VSAEngine = game.vsaengine;

  Events.on(vsaengine.engine, 'collisionStart', (event: IEventCollision<Engine>) => {
    
    event.pairs.forEach((collision) => {

      if (isPairCollide(collision, BreakoutBodyCatagories.Player, BreakoutBodyCatagories.Ball)) {
        
        var player: Body = getBody(collision, BreakoutBodyCatagories.Player);
        var ball: Body = getBody(collision, BreakoutBodyCatagories.Ball);

        setTimeout(() => {
          // shift the ball's angle depending on position relative to center
          const minAngle = Math.PI/6;

          var new_velo: Vector;
          if (ball.position.x-player.position.x > 0) { // to right
            new_velo = Vector.rotate({ x: 1, y: 0}, minAngle+Math.random()*(Math.PI/2-minAngle));

            Body.setVelocity(
              ball, 
              Vector.mult(new_velo, Vector.magnitude(ball.velocity))
            );

          } else { // to the left
            new_velo = Vector.rotate({ x: 1, y: 0}, Math.PI/2+Math.random()*(Math.PI/2-minAngle));

            Body.setVelocity(ball, 
              Vector.mult(new_velo, Vector.magnitude(ball.velocity))
            );

          }

          // give it a little speed boot
          randomizeVelo(ball, 1, 1.2);

        }, 1);

        playPaddleSound();

      } else if (isPairCollide(collision, BreakoutBodyCatagories.Ball, BreakoutBodyCatagories.Block)) {

        var block: Body = getBody(collision, BreakoutBodyCatagories.Block);
        var ball: Body = getBody(collision, BreakoutBodyCatagories.Ball);

        setTimeout(() => {
          // give player the score
          game.modScore(block.label.length);

          // kill the blocc
          Composite.remove(vsaengine.engine.world, block);

        }, 1); // allow the ball to bounce off

        playHitSound();

      } else if (isPairCollide(collision, BreakoutBodyCatagories.BoundryTop, BreakoutBodyCatagories.Ball)) {
        var ball: Body = getBody(collision, BreakoutBodyCatagories.Ball);
        setTimeout(() => {
          if (Math.abs(ball.velocity.y) < 0.1) {
            Body.setVelocity(ball, {x:ball.velocity.x ,y: Math.sign(ball.velocity.y)*0.1})
          }
        }, 1);

        playWallSound();

      } else if (isPairCollide(collision, BreakoutBodyCatagories.Boundary, BreakoutBodyCatagories.Ball)) {

        playWallSound();

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