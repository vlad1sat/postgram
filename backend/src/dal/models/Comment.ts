import mongoose, { type Types } from "mongoose";
import type IComment from "./interfaces/IComment";
import type IRequestCreateComment from "../../interfaces/request/IRequestCreateComment";
import DateLogic from "../../utils/DateLogic";

export default class Comment implements IComment {
    private readonly _ownerID: Types.ObjectId;
    private readonly _postID: Types.ObjectId;
    private readonly _text: string;
    private readonly _createAt: string;
    private readonly _isUpdated: boolean;

    constructor(comment: IRequestCreateComment, ownerID: string) {
        const { text, postID } = comment;
        this._isUpdated = false;
        this._createAt = DateLogic.getDateNowToISO();
        this._postID = new mongoose.Types.ObjectId(postID);
        this._text = text;
        this._ownerID = new mongoose.Types.ObjectId(ownerID);
    }

    get isUpdated(): boolean {
        return this._isUpdated;
    }

    get createAt(): string {
        return this._createAt;
    }

    get text(): string {
        return this._text;
    }

    get postID(): Types.ObjectId {
        return this._postID;
    }

    get ownerID(): Types.ObjectId {
        return this._ownerID;
    }

    objComment(): IComment {
        const { ownerID, postID, createAt, text, isUpdated } = this;
        return {
            ownerID,
            postID,
            createAt,
            text,
            isUpdated,
        };
    }
}
