import { View } from "./View";
import { User } from '../models/User';
import { UserProps } from '../interfaces/UserProps';

export class UserForm extends View<User, UserProps> {
  eventsMap = (): { [key: string]: () => void } => {
    return {
      "mouseover:h1": this.onHeaderHover,
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-model": this.onSaveModel,
    }
  }


  onHeaderHover() {
    console.log("hoveroni");
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
    console.log(this.model.get("age"))
  }

  onSetNameClick = (): void => {
    const name = this.parent?.querySelector("input")?.value;

    if (name) {
      this.model.set({ name });
    }
  }

  onSaveModel = (): void => {
    this.model.save();
  }

  template(): string {
    return `
      <div> 
        <h1>User Form</h1>
        <input placeholder="${this.model.get("name")}" />
        <button class="set-name">Set Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save Model</button>
      </div>
    `;
  }
}