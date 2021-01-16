import Matter from 'matter-js';
import { Engine, Render, World, Bodies, Body } from 'matter-js'
import { GameWord } from './GameWord'
import { initListeners } from './reciever'
import VSAEngine from './engine'
import Player from './game/player'
import { EventType, EventInfo, EventData, InitEventInfo } from './types/EventData.types'


// initListeners();

window.addEventListener('message', (event: MessageEvent) => {

  const data: EventData = event.data;

  switch (data.eventType) {

    case EventType.Init:

      const info: InitEventInfo = data.eventInfo;
      console.log(`vscode-background: ${info.styles.background}`);

      break;

    default:
      console.warn('Illegal event data type');

  }

  let text = event.data.msg.code;

  // create an engine
  var engine: Engine = Engine.create();

  function createGameWords(text: string): GameWord[] {
    var curLength = 400;
    return text.split(' ').map((word, index) => {
      console.log(curLength)
      var gm = new GameWord(word, curLength, 200, 10 * word.length, 20)
      curLength += 10 * word.length
      return gm
    });
  }

  var words = createGameWords(text)
  var ground: Body = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  // add all of the bodies to the world
  World.add(engine.world, ground);
  words.forEach((word) => {
    World.add(engine.world, word.body)
  })



  // run the engine
  Engine.run(engine);

  function render() {
    var canvas = <HTMLCanvasElement>document.getElementById('game-canvas')

    var context = canvas.getContext('2d')

    window.requestAnimationFrame(render)
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

  render()


});