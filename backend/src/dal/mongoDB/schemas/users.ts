import { Schema, model } from "mongoose";
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

export default model<IUser>("user", UserSchema);
