import type IUser from "./interfaces/IUser";

export default class User implements IUser {
    email: string;
    username: string;
    password: string;
    createAt: string;

    constructor(user: Omit<IUser, "createAt">) {
        const { username, password, email } = user;
        this.email = email;
        this.password = password;
        this.username = username;
        this.createAt = new Date(Date.now()).toISOString();
    }

    objUser(): IUser {
        return { ...this };
    }
}
