import type IRequestCreateComment from "./IRequestCreateComment";
import { type Types } from "mongoose";

type IRequestUpdateComment = IRequestCreateComment & { id: Types.ObjectId };

export default IRequestUpdateComment;
