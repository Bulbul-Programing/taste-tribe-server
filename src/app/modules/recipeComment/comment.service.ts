import AppError from "../../error/AppError"
import { recipeModel } from "../recipes/recipe.model"
import { userModel } from "../user/user.model"
import { commentModel } from "./comment.model"

const addCommentIntoDB = async (payload: { userId: string, recipeId: string, comment: string }) => {
    const isExistUser = await userModel.findById(payload.userId)
    if (!isExistUser) {
        throw new AppError(401, 'User not found')
    }

    const isExistRecipe = await recipeModel.findById(payload.recipeId)
    if (!isExistRecipe) {
        throw new AppError(404, 'Recipe not found')
    }

    const result = await commentModel.create(payload)
    return result
}

const getCommentsIntoDB = async (recipeId: string) => {
    const result = await commentModel.find({ recipeId: recipeId }).populate('userId')
    return result
}

const deleteCommentsIntoDB = async (recipeId: string) => { 
    const result = await commentModel.deleteOne({ _id: recipeId })
    return result
}

export const commentService = {
    addCommentIntoDB,
    getCommentsIntoDB,
    deleteCommentsIntoDB
}