import { User } from "./models/User";

const user = new User({ id: "12" });

user.on("save", () => console.log(user));

user.save();