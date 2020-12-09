
export interface Events {
  on(eventName: string, callback: () => void): void;
}