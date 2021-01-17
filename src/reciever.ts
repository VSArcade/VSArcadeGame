import { EventType, EventInfo, EventData, InitEventInfo } from './types/EventData.types'
// import { startBreakout } from './game/breakout';

export const initListeners = () => {

  window.addEventListener('message', (event: MessageEvent) => {

    const data: EventData = event.data;

    switch (data.eventType) {

      case EventType.Init:

        const info: InitEventInfo = data.eventInfo;

        console.log('READY TO START!!');
        // info.code.forEach(line => {
        //   console.log(line);
        // });

        break;

      default:
        console.warn(`Illegal event data type: ${data.eventType}`);

    }

  });

}