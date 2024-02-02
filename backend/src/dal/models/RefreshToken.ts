import type IRefreshToken from "./interfaces/IRefreshToken";

export default class RefreshToken implements IRefreshToken {
    refreshToken: string;
    userID: string;

    constructor(refreshToken: string, userID: string) {
        this.refreshToken = refreshToken;
        this.userID = userID;
    }

    objRefreshToken(): IRefreshToken {
        return { ...this };
    }
}
