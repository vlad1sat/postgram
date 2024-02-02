import jwt from "jsonwebtoken";
import RefreshModel, {
    type ITokenDB,
} from "../../dal/mongoDB/schemas/refreshToken";
import RefreshToken from "../../dal/models/RefreshToken";

class TokenService {
    generateToken<T extends object>(payload: T): IGenerateTokens {
        const accessToken: string = jwt.sign(payload, "accessToken", {
            expiresIn: "30m",
        });
        const refreshToken: string = jwt.sign(payload, "refreshToken", {
            expiresIn: "30d",
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userID: string, token: string): Promise<void> {
        const tokenDB: ITokenDB | null = await RefreshModel.findOne({
            userID: userID,
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
