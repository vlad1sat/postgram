import { type Document, model, Schema, type Types } from "mongoose";
import type IUser from "../../models/interfaces/IUser";
import { postsDBName } from "./posts";
import DateLogic from "../../../utils/DateLogic";

const UserSchema = new Schema<IUser>({
    email: { type: "String", required: true, unique: true },
    username: { type: "String", required: true, unique: true },
    password: { type: "String", required: true },
    createAt: {
        type: "String",
        required: true,
        default: DateLogic.getDateNowToISO(),
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: postsDBName,
            required: true,
            default: [],
        },
    ],
});

export const userDBName: string = "users";

const UserModel = model<IUser>(userDBName, UserSchema);

export type IUserDB = Document<unknown, {}, IUser> &
    IUser & { _id: Types.ObjectId };
export default UserModel;
