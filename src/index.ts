import { User } from "./models/User";

const user = new User({ id: "12", name: "Kris", age: 22 });

user.on("change", () => console.log("something was changed"));

user.set({ age: 30 });