import { UserProps } from '../interfaces/UserProps';
import { User } from '../models/User';
import { CollectionView } from './CollectionView';

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: DocumentFragment): void {
    const ele = document.createElement("div");
    ele.innerHTML = `
      <div style="margin-top: 20px;" id=${model.get("id")}>
        <div>ID: ${model.get("id")}</div>
        <div>Name: ${model.get("name")}</div>
        <div>Age: ${model.get("age")} </div>
      </div>
    `

    itemParent.appendChild(ele);
  }

}