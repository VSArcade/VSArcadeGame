import { Engine, Render, World, Bodies, Body } from 'matter-js'

// window.addEventListener("message", (event) => {
    // let code = event.data.msg.code;
    let code = ["fdsfs", "fsjdkfsdlk", "fdsfjsdfkl", "jklfsdkjfks"]
    // then here you'll start the game
    // create an engine
    var engine: Engine = Engine.create();

    // create a renderer
    var render: Render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false
        }
    });
    render.canvas.id = 'game-canvas';

    // create two boxes and a ground
    var boxA: Body = Bodies.rectangle(400, 200, 80, 80, {
        render: {
            fillStyle: 'red',
            lineWidth: 3
        }
    }
    );
    var boxB: Body = Bodies.rectangle(450, 50, 80, 80);
    var ground: Body = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, ground]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
// })