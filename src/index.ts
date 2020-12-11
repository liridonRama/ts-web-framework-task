import { User } from './models/User';


const coll = User.buildUserCollection();

coll.on("change", () => {
  console.log(coll);
})

coll.fetch();