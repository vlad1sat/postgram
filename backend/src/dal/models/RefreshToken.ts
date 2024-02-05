import type IRefreshToken from "./interfaces/IRefreshToken";
import { type Types } from "mongoose";

export default class RefreshToken implements IRefreshToken {
    private readonly _refreshToken: string;
    private readonly _userID: Types.ObjectId;

    constructor(refreshToken: string, userID: Types.ObjectId) {
        this._refreshToken = refreshToken;
        this._userID = userID;
    }

    get userID(): Types.ObjectId {
        return this._userID;
    }

    get refreshToken(): string {
        return this._refreshToken;
    }

    objRefreshToken(): IRefreshToken {
        return {
            refreshToken: this.refreshToken,
            userID: this.userID,
        };
    }
}
