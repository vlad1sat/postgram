import jwt from "jsonwebtoken";
import RefreshModel, {
    type ITokenDB,
} from "../../dal/mongoDB/schemas/refreshToken";
import RefreshToken from "../../dal/models/RefreshToken";
import { type Types } from "mongoose";
import defaultEnv from "../../defaultEnv";

const accessKey: string =
    process.env.SECRET_ACCESS_KEY_TOKEN ?? defaultEnv.SECRET_ACCESS_KEY_TOKEN;

const refreshKey: string =
    process.env.SECRET_REFRESH_KEY_TOKEN ?? defaultEnv.SECRET_REFRESH_KEY_TOKEN;

class TokenService {
    generateToken<T extends object>(payload: T): IGenerateTokens {
        const accessToken: string = jwt.sign(payload, accessKey, {
            expiresIn: "30m",
        });
        const refreshToken: string = jwt.sign(payload, refreshKey, {
            expiresIn: "30d",
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

    async findRefreshTokenDB(refreshToken: string): Promise<ITokenDB | null> {
        const tokenDB: ITokenDB | null = await RefreshModel.findOne({
            refreshToken,
        });
        return tokenDB;
    }

    async saveToken(userID: Types.ObjectId, token: string): Promise<void> {
        const tokenDB: ITokenDB | null = await RefreshModel.findOne({
            userID,
        });
        if (tokenDB !== null) {
            tokenDB.refreshToken = token;
            await tokenDB.save();
            return;
        }
        await RefreshModel.create(new RefreshToken(token, userID));
    }
}

export interface IGenerateTokens {
    accessToken: string;
    refreshToken: string;
}

export default new TokenService();
