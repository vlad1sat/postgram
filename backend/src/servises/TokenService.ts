import jwt from "jsonwebtoken";
import { type Types } from "mongoose";
import defaultEnv from "../defaultEnv";
import RefreshModel, {
    type ITokenDB,
} from "../dal/mongoDB/schemas/refreshToken";
import RefreshToken from "../dal/models/RefreshToken";
import type RequestCookieRefreshToken from "../utils/token/RequestCookieRefreshToken";
import ApiError from "../utils/logicErrors/ApiError";

const accessKey: string =
    process.env.SECRET_ACCESS_KEY_TOKEN ?? defaultEnv.SECRET_ACCESS_KEY_TOKEN;

const refreshKey: string =
    process.env.SECRET_REFRESH_KEY_TOKEN ?? defaultEnv.SECRET_REFRESH_KEY_TOKEN;

const timeRefreshToken: string =
    process.env.VALID_TIME_REFRESH_TOKEN_DAY ??
    defaultEnv.VALID_TIME_REFRESH_TOKEN_DAY;

class TokenService {
    generateToken<T extends object>(payload: T): IGenerateTokens {
        const accessToken: string = jwt.sign(payload, accessKey, {
            expiresIn: "30m",
        });
        const refreshToken: string = jwt.sign(payload, refreshKey, {
            expiresIn: timeRefreshToken + "d",
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    private static correctToken(
        token: string,
        key: string,
    ): string | jwt.JwtPayload | null {
        try {
            return jwt.verify(token, key);
        } catch (e) {
            return null;
        }
    }

    correctRefreshToken(refreshToken: string): string | jwt.JwtPayload | null {
        return TokenService.correctToken(refreshToken, refreshKey);
    }

    correctAccessToken(accessToken: string): string | jwt.JwtPayload | null {
        return TokenService.correctToken(accessToken, accessKey);
    }

    haveRefreshToken(req: RequestCookieRefreshToken): string {
        const { refreshToken } = req.cookies;
        if (refreshToken == null) {
            throw ApiError.Unauthorized();
        }
        return refreshToken;
    }

    async findRefreshTokenDB(refreshToken: string): Promise<ITokenDB | null> {
        const tokenDB: ITokenDB | null = await RefreshModel.findOne({
            refreshToken,
        });
        return tokenDB;
    }

    async removeRefreshTokenDB(refreshToken: string): Promise<void> {
        await RefreshModel.deleteOne({ refreshToken });
    }

    async saveRefreshTokenDB(
        userID: Types.ObjectId,
        token: string,
    ): Promise<void> {
        const tokenDB: ITokenDB | null = await RefreshModel.findOne({
            userID,
        });
        if (tokenDB !== null) {
            tokenDB.refreshToken = token;
            await tokenDB.save();
            return;
        }
        const refreshTokenClass = new RefreshToken(token, userID);
        await RefreshModel.create(refreshTokenClass.objRefreshToken());
    }
}

export interface IGenerateTokens {
    accessToken: string;
    refreshToken: string;
}

export default new TokenService();
