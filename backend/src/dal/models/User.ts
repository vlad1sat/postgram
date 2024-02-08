import type IUser from "./interfaces/IUser";
import type IRequestUser from "../../interfaces/request/IRequestUser";
import { type Types } from "mongoose";

export default class User implements IUser {
    private readonly _email: string;
    private readonly _username: string;
    private readonly _password: string;
    private readonly _createAt: string;

    constructor(user: IRequestUser) {
        const { username, password, email } = user;
        this._email = email;
        this._password = password;
        this._username = username;
        this._createAt = new Date(Date.now()).toISOString();
        this._posts = [];
    }

    private readonly _posts: Types.ObjectId[];

    get createAt(): string {
        return this._createAt;
    }

    get password(): string {
        return this._password;
    }

    get username(): string {
        return this._username;
    }

    get email(): string {
        return this._email;
    }

    get posts(): Types.ObjectId[] {
        return this._posts;
    }

    objUser(): IUser {
        return {
            username: this.username,
            password: this.password,
            email: this.email,
            createAt: this.createAt,
            posts: this.posts,
        };
    }
}
