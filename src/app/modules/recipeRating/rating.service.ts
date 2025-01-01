import AppError from "../../error/AppError"
import { recipeModel } from "../recipes/recipe.model"
import { userModel } from "../user/user.model"
import { ratingModel } from "./rating.model"

const addRatingIntoDB = async (payload: { userId: string, recipeId: string, rating: number }) => {
    const isExistUser = await userModel.findById(payload.userId)
    if (!isExistUser) {
        throw new AppError(401, 'User not found')
    }

    const isExistRecipe = await recipeModel.findById(payload.recipeId)
    if (!isExistRecipe) {
        throw new AppError(404, 'Recipe not found')
    }

    const result = await ratingModel.create(payload)
    return result
}

const getRatingIntoDB = async (recipeId: string) => {
    const result = await ratingModel.find({ recipeId: recipeId }).populate('userId')
    return result
}

export const ratingServer = {
    addRatingIntoDB,
    getRatingIntoDB
}