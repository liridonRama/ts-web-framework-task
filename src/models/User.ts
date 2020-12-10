import { UserProps } from "../interfaces/UserProps"
import { Model } from './Model';
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync"


const ROOT_URL = "http://localhost:3000";

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new this(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(ROOT_URL),
    )
  }
}

const user = User.buildUser({ id: "1" });

user.on("change", () => console.log("something changed"));

user.fetch();