import mongoose, { type Types } from "mongoose";
import type IPost from "./interfaces/IPost";
import type IRequestCreatePost from "../../interfaces/request/IRequestCreatePost";
import DateLogic from "../../utils/DateLogic";

export default class Post implements IPost {
    private readonly _createAt: string;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _ownerID: Types.ObjectId;
    private readonly _images: string[];
    private readonly _comments: Types.ObjectId[];
    constructor(post: IRequestCreatePost, ownerID: string) {
        const { name, description, images, comments } = post;
        this._name = name;
        this._createAt = DateLogic.getDateNowToISO();
        this._description = description;
        this._ownerID = new mongoose.Types.ObjectId(ownerID);
        this._images = images;
        this._comments = comments;
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

    get comments(): Types.ObjectId[] {
        return this._comments;
    }

    get images(): string[] {
        return this._images;
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
            comments: this.comments,
        };
    }
}
