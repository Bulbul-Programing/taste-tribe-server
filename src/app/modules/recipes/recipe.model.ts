import { model, Schema } from "mongoose";
import { TRecipe } from "./recipe.interface";

const recipeSchema = new Schema<TRecipe>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ title: { type: String, required: true }, time: { type: Number, required: true } }],
    upVote: { type: [String] },
    downVote: { type: [String] },
    cookingTime: { type: Number, required: true },
    category: { type: String, required: true },
    premiumStatus: { type: Boolean, required: true },
    image: { type: String, required: true },
}, { timestamps: true })

export const recipeModel = model<TRecipe>('recipe', recipeSchema)