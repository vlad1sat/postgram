declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            DB_CONNECT: string;
            SECRET_ACCESS_KEY_TOKEN: string;
            SECRET_REFRESH_KEY_TOKEN: string;
        }
    }
}

export {};
