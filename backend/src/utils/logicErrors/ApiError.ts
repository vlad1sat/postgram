export default class ApiError extends Error {
    status: number;
    errors: unknown[] = [];

    constructor(status: number, message: string, errors: unknown[] = []) {
        super(message);
        this.errors = errors;
        this.status = status;
    }

    static Unauthorized(): ApiError {
        return new ApiError(401, "Пользователь не авторизован!");
    }

    static BadRequest(message: string, errors: unknown[] = []): ApiError {
        return new ApiError(400, message, errors);
    }

    odjMessage(): object {
        const { message, errors } = this;
        return {
            message,
            errors,
        };
    }
}
