import BreakoutGame from './game/breakout';
import { EventType, EventInfo, EventData, InitEventInfo } from './types/EventData.types'

export const initListeners = () => {

  window.addEventListener('message', (event: MessageEvent) => {

    const data: EventData = event.data;

    switch (data.eventType) {

      case EventType.Init:

        const info: InitEventInfo = data.eventInfo;

        console.log('Welcome to VSArcade!!');
        var game: BreakoutGame = new BreakoutGame();
        game.setWords(info.code);

        break;

      default:
        console.warn(`Illegal event data type: ${data.eventType}`);

    }

  });

}