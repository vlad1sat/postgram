import jwt from "jsonwebtoken";

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
}

export interface IGenerateTokens {
    accessToken: string;
    refreshToken: string;
}

export default new TokenService();
