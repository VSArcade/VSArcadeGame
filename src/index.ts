import { greet } from './game'

greet();

window.addEventListener("message", (event) => {
    let code = event.data.msg.code;
    // then here you'll start the game
})
