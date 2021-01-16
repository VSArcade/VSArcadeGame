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

  renderCanvas() {

    var words: string[] = []; // nithin delete this

    var canvas = <HTMLCanvasElement> document.getElementById('game-canvas')
    
    var context = canvas.getContext('2d')

    // window.requestAnimationFrame(render)
    context!.fillStyle = '#FFFFFF'
    context!.fillRect(0, 0, canvas.width, canvas.height)
    context!.globalAlpha = 1
    context!.beginPath()
    for (var i = 0; i < words.length; i += 1) {
      var word = words[i]
      if (true) {
        // 30px is default font size
        var fontsize = 15
        // arial is default font family
        var fontfamily = 'Courier New'
        // white text color by default
        var color = '#FF0000'

        var content = word.text//this is the string
        
        context!.fillStyle = 'black'
        context!.save()
        context!.translate(word.body.position.x, word.body.position.y)
        const x = word.body.vertices[1].x - word.body.vertices[0].x
        const y = word.body.vertices[1].y - word.body.vertices[0].y
        const radian = Math.atan2(y, x)
        context!.rotate(radian)
        context!.textBaseline = 'middle'
        context!.textAlign = 'center'
        context!.fillStyle = color
        context!.font = fontsize + 'px ' + fontfamily
        context!.fillText(content, 0, 0)
        context!.restore()

      }
    //   var vertices = word.body.vertices
    //   context!.moveTo(vertices[0].x, vertices[0].y)
    //   for (var j = 1; j < vertices.length; j += 1) {
    //     context!.lineTo(vertices[j].x, vertices[j].y)
    //   }
    //   context!.lineTo(vertices[0].x, vertices[0].y)
    }
    context!.lineWidth = 1.5
    context!.strokeStyle = '#000000'
    context!.stroke()
  }

  addBody(new_bodies: Body[]) {
    World.add(this.engine.world, new_bodies);
  }

}