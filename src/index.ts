import { UserProps } from './interfaces/UserProps';
import { Collection } from './models/Collection';
import { User } from './models/User';
import { UserEdit } from './views/UserEdit';
import { UserList } from './views/UserList';

const user = User.buildUser({ name: "name", age: 20 });


const root = document.getElementById("root");

if (root) {
  // const userEdit = new UserEdit(root, user);
  // userEdit.render();

  // console.log(userEdit);
  const list = new UserList(User.buildUserCollection(), root);
  list.collection.fetch();
  list.collection.on("change", () => list.render());


} else {
  throw new Error("passed parent element not found");
} 
