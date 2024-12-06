import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema = new Schema<TComment>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    recipeId: { type: Schema.Types.ObjectId, required: true, ref: 'recipe' },
    comment: { type: String, required: true },
}, { timestamps: true })

export const commentModel = model<TComment>('comment', commentSchema)