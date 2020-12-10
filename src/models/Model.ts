import { ModelAttributes } from "../interfaces/ModelAttributes";
import { Sync } from "../interfaces/Sync";
import { Events } from "../interfaces/Events";
import { HasId } from '../interfaces/HasId';
import { AxiosResponse } from 'axios';


export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) { }

  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.get("id");

    if (typeof id !== "string") {
      throw new Error("Can't fetch without id!");
    }

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then(() => this.events.trigger("save"))
      .catch((err: Error) => this.events.trigger("error"));
  }
}
