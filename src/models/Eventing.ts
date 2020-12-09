
type Callback = () => void;

export class Eventing {
  private events: { [key: string]: Callback[] } = {};

  /**
   * 
   * @param eventName the event name that triggers the callback
   * @param callback the function that gets called after a event has been triggered
   */
  on = (eventName: string, callback: Callback): void => {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
  }

  trigger = (eventName: string): void => {
    if (this.events[eventName]) {
      this.events[eventName].forEach(cb => cb());
    }
  }
}