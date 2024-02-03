import type IRefreshToken from "./interfaces/IRefreshToken";
import { type Types } from "mongoose";

export default class RefreshToken implements IRefreshToken {
    refreshToken: string;
    userID: Types.ObjectId;

    constructor(refreshToken: string, userID: Types.ObjectId) {
        this.refreshToken = refreshToken;
        this.userID = userID;
    }

    objRefreshToken(): IRefreshToken {
        return { ...this };
    }
}
