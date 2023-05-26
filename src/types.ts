export interface IUserData {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  id: string;
}

export class User implements IUserData {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  id: string;

  constructor(data: IUserData) {
    this.firstName = data.firstName ?? null;
    this.lastName = data.lastName ?? null;
    this.email = data.email ?? null;
    this.id = data.id;
  }
}
