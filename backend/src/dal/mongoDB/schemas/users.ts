import { Schema, model, type Types, type Document } from "mongoose";
import type IUser from "../../models/interfaces/IUser";

const UserSchema = new Schema<IUser>({
    email: { type: "String", required: true, unique: true },
    username: { type: "String", required: true, unique: true },
    password: { type: "String", required: true },
    createAt: {
        type: "String",
        required: true,
        default: new Date(Date.now()).toISOString(),
    },
});

const UserModel = model<IUser>("user", UserSchema);

export type IUserDB = Document<unknown, {}, IUser> &
    IUser & { _id: Types.ObjectId };
export default UserModel;
