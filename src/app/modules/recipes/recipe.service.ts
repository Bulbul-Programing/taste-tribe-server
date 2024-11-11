import AppError from "../../error/AppError";
import { userModel } from "../user/user.model";
import { TRecipe } from "./recipe.interface";
import { recipeModel } from "./recipe.model";

const createRecipeIntoDB = async (payload: TRecipe) => {
    const user = await userModel.findById(payload.userId)
    if (!user) {
        throw new AppError(401, 'User not found')
    }

    const createRecipe = await recipeModel.create(payload);
    return createRecipe;
}

export const recipeService = {
    createRecipeIntoDB
}