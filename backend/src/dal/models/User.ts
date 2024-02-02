import type IUser from "./interfaces/IUser";
import type IRequestUser from "../../interfaces/IRequestUser";

export default class User implements IUser {
    email: string;
    username: string;
    password: string;
    createAt: string;

    constructor(user: IRequestUser) {
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
