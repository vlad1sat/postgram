import type { Types } from "mongoose";
import type IComment from "../../dal/models/interfaces/IComment";

type IResponseComment = IComment & { id: Types.ObjectId };

export default IResponseComment;
