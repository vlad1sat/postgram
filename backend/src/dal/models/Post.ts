import mongoose, { type Types } from "mongoose";
import type IPost from "./interfaces/IPost";
import type IRequestCreatePost from "../../interfaces/IRequestCreatePost";

export default class Post implements IPost {
    get images(): string[] {
        return this._images;
    }

    private readonly _createAt: string;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _ownerID: Types.ObjectId;
    private readonly _images: string[];
    constructor(post: IRequestCreatePost, ownerID: string) {
        const { name, description, images } = post;
        this._name = name;
        this._createAt = new Date(Date.now()).toISOString();
        this._description = description;
        this._ownerID = new mongoose.Types.ObjectId(ownerID);
        this._images = images;
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
            images: this.images,
        };
    }
}
