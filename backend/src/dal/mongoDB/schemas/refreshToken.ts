import { model, Schema } from "mongoose";
import type IRefreshToken from "../../models/interfaces/IRefreshToken";

const RefreshTokenSchema = new Schema<IRefreshToken>({
    refreshToken: { type: "String", required: true },
    userID: { type: "String", required: true },
});

const RefreshModel = model<IRefreshToken>("refreshToken", RefreshTokenSchema);
export default RefreshModel;
