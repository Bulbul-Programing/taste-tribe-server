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

    const isThisUserAlreadyRating = await ratingModel.findOne({ userId: payload.userId, recipeId: payload.recipeId })
    if (isThisUserAlreadyRating) {
        const result = await ratingModel.findByIdAndUpdate(isThisUserAlreadyRating._id, { rating: payload.rating })
        return result
    }

    const result = await ratingModel.create(payload)
    return result
}

const getRatingIntoDB = async (recipeId: string) => {
    const result = await ratingModel.find({ recipeId: recipeId }).populate('userId')
    return result
}

const getAverageRatingInRecipeIntoDB = async (recipeId: string) => {
    const isExistRecipe = await recipeModel.findById(recipeId)
    if (!isExistRecipe) {
        throw new AppError(404, 'recipe not found!')
    }
    const result = await ratingModel.aggregate([
        {
            $group: {
                _id: "$recipeId",
                averageRating: { $avg: "$rating" }
            }
        }
    ])
    return result
}

const userRatingThisRecipeIntoDB = async (userId: string, recipeId: string) => {
    const isThisUserAlreadyRating = await ratingModel.findOne({ userId, recipeId })
    return isThisUserAlreadyRating
}

export const ratingServer = {
    addRatingIntoDB,
    getRatingIntoDB,
    getAverageRatingInRecipeIntoDB,
    userRatingThisRecipeIntoDB
}