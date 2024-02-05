import { type Types } from "mongoose";

interface IPost {
    name: string;
    description: string;
    createAt: string;
    ownerID: Types.ObjectId;
}

export default IPost;
