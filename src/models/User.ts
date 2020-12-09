import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes"

import { UserProps } from "../interfaces/UserProps"
import { AxiosResponse } from 'axios';


const ROOT_URL = "http://localhost:3000";

export class User {
  private events: Eventing = new Eventing();
  private sync: Sync<UserProps> = new Sync<UserProps>(ROOT_URL);
  private attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.get("id");

    if (typeof id !== "number") {
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
