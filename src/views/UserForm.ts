import { User } from '../models/User';

export class UserForm {
  constructor(public parent: Element | null, public model: User) { }

  onButtonCLick(): void {
    console.log("hi there");
  }

  eventsMap = (): { [key: string]: () => void } => {
    return {
      "mouseover:h1": this.onHeaderHover,
      "click:.set-age": this.onSetAgeClick,
    }
  }
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
    console.log(this.model.get("age"))
  }

  template(): string {
    return `
      <div> 
        <h1>User Form</h1>
        <div>Username: ${this.model.get("name")}</div>
        <div>Age: ${this.model.get("age")}</div>
        <input />
        <button>Click me</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  }

  onHeaderHover() {
    console.log("hoveroni");
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    Object.keys(eventsMap).forEach(eventKey => {
      const [eventName, selector] = eventKey.split(":");
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey])
      });
    });
  }

  render(): void {
    if (!this.parent) {
      throw new Error("no proper parent element was passed");
    }

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}