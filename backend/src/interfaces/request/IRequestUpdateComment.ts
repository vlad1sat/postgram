import type IRequestCreateComment from "./IRequestCreateComment";

type IRequestUpdateComment = IRequestCreateComment & { id: string };

export default IRequestUpdateComment;
