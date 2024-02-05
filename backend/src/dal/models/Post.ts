import { type Types } from "mongoose";
import type IPost from "./interfaces/IPost";
import type IRequestCreatePost from "../../interfaces/IRequestCreatePost";
import mongoose from "mongoose";

export default class Post implements IPost {
    private readonly _createAt: string;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _ownerID: Types.ObjectId;

    constructor(post: IRequestCreatePost, ownerID: string) {
        const { name, description } = post;
        this._name = name;
        this._createAt = new Date(Date.now()).toISOString();
        this._description = description;
        this._ownerID = new mongoose.Types.ObjectId(ownerID);
    }

    get ownerID(): Types.ObjectId {
        return this._ownerID;
    }

    get description(): string {
        return this._description;
    }

    get name(): string {
        return this._name;
    }

    get createAt(): string {
        return this._createAt;
    }

    objPost(): IPost {
        return {
            name: this.name,
            description: this.description,
            ownerID: this.ownerID,
            createAt: this.createAt,
        };
    }
}
