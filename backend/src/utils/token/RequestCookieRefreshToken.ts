import { type Request } from "express";

interface RequestCookieRefreshToken extends Request {
    cookies: { refreshToken?: string };
}

export default RequestCookieRefreshToken;
