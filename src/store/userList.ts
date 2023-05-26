import { User, IUserData } from "../types";
import { reactive } from "vue";

export class UserList {
  list: User[];

  constructor() {
    this.list = [
      new User({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        id: "1",
      }),
      new User({
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        id: "2",
      }),
    ];
  }

  addUser(userData: IUserData) {
    if (this.userExists(userData.id)) {
      throw new Error("User already exists.");
    }

    this.list.push(new User(userData));
  }

  editUser(userData: IUserData) {
    const index = this.list.findIndex((user) => user.id === userData.id);

    if (index !== -1) {
      this.list.splice(index, 1, new User(userData));
    } else {
      throw new Error("User not found.");
    }
  }

  deleteUser(id: string) {
    const index = this.list.findIndex((user) => user.id === id);

    if (index !== -1) {
      this.list.splice(index, 1);
    } else {
      throw new Error("User not found.");
    }
  }

  userExists(id: string) {
    return this.list.some((user) => user.id === id);
  }
}

export const userList = reactive(new UserList());
