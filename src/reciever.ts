import { InitEvent } from './types/EventData.types'

export const initListeners = () => {

  window.addEventListener("message", (event: MessageEvent) => {

    const data: InitEvent = event.data;

    console.log(`vscode-background: ${data.styles.background}`); 

  });

}