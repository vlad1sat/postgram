import { type Request } from "express";

interface CookieRefreshTokenRequest extends Request {
    cookies: { refreshToken: string };
}

export default CookieRefreshTokenRequest;
