import { model, Schema } from "mongoose";
import { TRecipe } from "./recipe.interface";

const recipeSchema = new Schema<TRecipe>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    cookingTime: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true })

export const recipeModel = model<TRecipe>('recipe', recipeSchema)