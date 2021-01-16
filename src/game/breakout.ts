import VSAEngine from '../engine'
import { Engine, Render, World, Bodies, Body } from 'matter-js'

const initBreakoutMap = (world: World) => {
  
}

export const startBreakout = () => {

  var vsaengine = new VSAEngine();

}


// export const initEngine = () => {

//   // create two boxes and a ground
//   var boxA: Body = Bodies.rectangle(400, 200, 80, 80, {
//       render: {
//           fillStyle: 'red',
//           lineWidth: 3
//       }
//   }
//   );
//   var boxB: Body = Bodies.rectangle(450, 50, 80, 80);
//   var ground: Body = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

//   // add all of the bodies to the world
//   World.add(engine.world, [boxA, boxB, ground]);

// }
