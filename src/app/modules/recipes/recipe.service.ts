import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { userModel } from "../user/user.model";
import { recipeSearchableField } from "./recipe.const";
import { TRecipe } from "./recipe.interface";
import { recipeModel } from "./recipe.model";

const getAllRecipesIntoDB = async (query: Record<string, unknown>) => {
    const recipeQuery = new QueryBuilder(recipeModel.find(), query)
        .searching(recipeSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields()
        .priceFilter()

    const result = await recipeQuery.modelQuery
    return result
}

const createRecipeIntoDB = async (payload: TRecipe) => {
    const user = await userModel.findById(payload.userId)
    if (!user) {
        throw new AppError(401, 'User not found')
    }

    const createRecipe = await recipeModel.create(payload);
    return createRecipe;
}

const updateRecipeIntoDB = async (id: string, payload: Partial<TRecipe>) => {
    const isExistRecipe = await recipeModel.findById(id)
    if (!isExistRecipe) {
        throw new AppError(404, 'Recipe not found')
    }
    const result = await recipeModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
}

const deleteRecipeIntoDB = async (id: string) => {
    const isExistRecipe = await recipeModel.findById(id)
    if (!isExistRecipe) {
        throw new AppError(404, 'Recipe not found')
    }

    const result = await recipeModel.deleteOne({ _id: id })
    return result;
}

export const recipeService = {
    getAllRecipesIntoDB,
    createRecipeIntoDB,
    updateRecipeIntoDB,
    deleteRecipeIntoDB
}