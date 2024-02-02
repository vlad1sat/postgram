import type IRequestUser from "../../interfaces/IRequestUser";
import type IUser from "../../dal/models/interfaces/IUser";
import { type Document, type Types } from "mongoose";
import { type IUserDB } from "../../dal/mongoDB/schemas/users";
export interface IUserDto extends Omit<IRequestUser, "password"> {
    id: string;
}

export default class UserDto implements IUserDto {
    email: string;
    username: string;
    id: string;

    constructor(user: IUserDB) {
        const { username, email, _id } = user;
        this.id = _id.toString();
        this.username = username;
        this.email = email;
    }
}
