import { Model } from '../models/Model';


export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(protected parent: Element, protected model: T) {
    this.bindModel();
  }
  abstract template(): string;

  protected eventsMap = (): { [key: string]: () => void } => ({});
  protected regionsMap = (): { [key: string]: string } => ({});


  bindModel() {
    this.model.on("change", () => this.render());
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

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    Object.keys(regionsMap).forEach(key => {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element
      }
    })
  }

  protected onRender(): void { }


  render(): void {
    if (!this.parent) {
      throw new Error("no proper parent element was passed");
    }

    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.mapRegions(templateElement.content);
    this.bindEvents(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}