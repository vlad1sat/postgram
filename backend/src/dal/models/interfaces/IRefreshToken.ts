import { type Types } from "mongoose";

interface IRefreshToken {
    refreshToken: string;
    userID: Types.ObjectId;
}

export default IRefreshToken;
