import { ObjectId } from "mongoose";

export type TRating = {
    userId: ObjectId,
    recipeId: ObjectId,
    rating : number
}