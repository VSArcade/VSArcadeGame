import { Engine, Render, World, Bodies, Body } from 'matter-js'

export default class VSAEngine {

  engine: Engine;
  render: Render;

  constructor() {

    this.engine = Engine.create();
    this.engine.world.gravity.y = 0;

    this.render = Render.create({
        element: document.body,
        engine: this.engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false
        }
    });
    this.render.canvas.id = 'game-canvas';
    
    Engine.run(this.engine);
    Render.run(this.render);

  }

  addBody(new_bodies: Body[]) {
    World.add(this.engine.world, new_bodies);
  }
}