import { UserProps } from '../interfaces/UserProps';
import { User } from '../models/User';
import { View } from "./View";



export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
    <div class="">
      <h1>User Show</h1>
      <div class="">User Name: ${this.model.get("name")}</div>
      <div class="">Age: ${this.model.get("age")}</div>
    </div>
  `
  }
}