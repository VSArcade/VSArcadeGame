
export enum EventType {
  Init
}

export type InitEventInfo = {
  gameType: string,
  styles: {
    background: string
  }
}

export type EventInfo = InitEventInfo

export type EventData = {
  eventType: EventType,
  eventInfo: InitEventInfo
}