import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes"

import { UserProps } from "../interfaces/UserProps"


const ROOT_URL = "http://localhost:3000";

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(ROOT_URL);
  public atrributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.atrributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.atrributes.get;
  }

  set(update: UserProps): void {
    this.atrributes.set(update);
    this.events.trigger("change");
  }
}
