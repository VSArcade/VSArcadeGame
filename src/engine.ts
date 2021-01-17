import { Engine, Render, World, Bodies, Body, Composite } from 'matter-js'

export default class VSAEngine {

  engine: Engine;

  constructor() {

    this.engine = Engine.create();
    this.engine.world.gravity.y = 0;

    var e = this.engine;
    function renderCanvas(){
      const bodies = Composite.allBodies(e.world)

      var canvas = <HTMLCanvasElement> document.getElementById('game-canvas')
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    
      var context = canvas.getContext('2d')

      window.requestAnimationFrame(renderCanvas)
      context!.fillStyle = '#FFFFFF'
      context!.fillRect(0, 0, canvas.width, canvas.height)
      context!.globalAlpha = 1
      context!.beginPath()
      for (var i = 0; i < bodies.length; i += 1) {
        var body = bodies[i]
        if (body.label!=null) {

          // 30px is default font size
          var fontsize = 15
          // arial is default font family
          var fontfamily = 'Courier New'
          // white text color by default
          var color = '#FF0000'

          var content = body.label //this is the string
          
          context!.fillStyle = 'black'
          context!.save()
          context!.translate(body.position.x, body.position.y)
          const x = body.vertices[1].x - body.vertices[0].x
          const y = body.vertices[1].y - body.vertices[0].y
          const radian = Math.atan2(y, x)
          context!.rotate(radian)
          context!.textBaseline = 'middle'
          context!.textAlign = 'center'
          context!.fillStyle = color
          context!.font = fontsize + 'px ' + fontfamily
          context!.fillText(content, 0, 0)
          context!.restore()

        } else {
          var vertices = body.vertices
          context!.moveTo(vertices[0].x, vertices[0].y)
          for (var j = 1; j < vertices.length; j += 1) {
            context!.lineTo(vertices[j].x, vertices[j].y)
          }
          context!.lineTo(vertices[0].x, vertices[0].y)

        }
    
    }
    context!.lineWidth = 1.5
    context!.strokeStyle = '#000000'
    context!.stroke()

    }
    
    Engine.run(this.engine);
    renderCanvas();

  }

  addBody(new_bodies: Body[]) {
    World.add(this.engine.world, new_bodies);
  }

}