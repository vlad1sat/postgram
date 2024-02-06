import { Types } from "mongoose";
import ApiError from "./logicErrors/ApiError";

export const correctIDDB = (id: string): Types.ObjectId => {
    try {
        return new Types.ObjectId(id);
    } catch {
        throw ApiError.BadRequest("Неверный формат id поста.");
    }
};
