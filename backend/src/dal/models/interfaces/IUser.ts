import { type Types } from "mongoose";

interface IUser {
    email: string;
    username: string;
    password: string;
    createAt: string;
    posts: Types.ObjectId[];
}

export default IUser;
