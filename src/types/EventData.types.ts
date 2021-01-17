
export enum EventType {
  Init = 'init'
}

export type InitEventInfo = {
  gameType: string,
  styles: {
    background: string
  },
  code: string[]
}

export type EventInfo = InitEventInfo

export type EventData = {
  eventType: EventType,
  eventInfo: InitEventInfo
}