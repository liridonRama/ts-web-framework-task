import { UserProps } from "../interfaces/UserProps"
import { Model } from './Model';
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync"
import { Collection } from './Collection';


const ROOT_URL = "http://localhost:3000";

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new this(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(ROOT_URL),
    )
  }

  setRandomAge(): void {
    this.set({ age: Math.floor(Math.random() * 100) });
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      `${ROOT_URL}/users`,
      (json: UserProps) => User.buildUser(json)
    )
  }
}