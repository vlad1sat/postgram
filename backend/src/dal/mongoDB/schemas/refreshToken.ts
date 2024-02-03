import { model, Schema, type Types, type Document } from "mongoose";
import type IRefreshToken from "../../models/interfaces/IRefreshToken";
import { userDBName } from "./users";

const RefreshTokenSchema = new Schema<IRefreshToken>({
    refreshToken: { type: "String", required: true },
    userID: { type: Schema.Types.ObjectId, ref: userDBName, required: true },
});

export const refreshTokenDBName: string = "refreshToken";

const RefreshModel = model<IRefreshToken>(
    refreshTokenDBName,
    RefreshTokenSchema,
);

export type ITokenDB = Document<unknown, {}, IRefreshToken> &
    IRefreshToken & { _id: Types.ObjectId };
export default RefreshModel;
