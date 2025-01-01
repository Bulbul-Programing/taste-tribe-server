import { model, Schema } from "mongoose";
import { TRating } from "./rating.interface";

const ratingSchema = new Schema<TRating>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    recipeId: { type: Schema.Types.ObjectId, required: true, ref: 'recipe' },
    rating: { type: Number, required: true },
}, { timestamps: true })

export const ratingModel = model<TRating>('rating', ratingSchema)