import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { userModel } from "../user/user.model";
import { recipeSearchableField } from "./recipe.const";
import { TRecipe } from "./recipe.interface";
import { recipeModel } from "./recipe.model";

const getAllRecipesIntoDB = async (query: Record<string, unknown>) => {
    const recipeQuery = new QueryBuilder(recipeModel.find({ blockStatus: false }).populate('userId'), query)
        .searching(recipeSearchableField)
        .filter()
        .sort()
        .infinityScroll()
        .fields()
        .priceFilter()
        .category()

    const result = await recipeQuery.modelQuery
    return result
}

const getUserAllRecipesIntoDB = async (email: string, query: Record<string, unknown>, role: string) => {
    const isExistUser = await userModel.findOne({ email: email })
    if (!isExistUser) {
        throw new AppError(401, 'User not found')
    }
    if (role === 'user') {
        const recipeQuery = new QueryBuilder(recipeModel.find({ userId: isExistUser._id }), query)
            .searching(recipeSearchableField)
            .filter()
            .sort()
            .paginate()
            .fields()
            .priceFilter()

        const result = await recipeQuery.modelQuery
        return result
    }
    if (role === 'admin') {
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
}

const getRecipeDetailsIntoDB = async (recipeId: string) => {
    const isExistRecipe = await recipeModel.findOne({ _id: recipeId }).populate('userId')

    if (!isExistRecipe) {
        throw new AppError(404, 'Recipe not found')
    }
    if (isExistRecipe.blockStatus) {
        throw new AppError(500, ' This Recipe Was Blocked')
    }
    return isExistRecipe
}

const getTotalUserRecipeIntoDB = async (email: string) => {
    const isExistUser = await userModel.findOne({ email: email })
    if (!isExistUser) {
        throw new AppError(401, 'User not found')
    }
    const totalRecipe = await recipeModel.countDocuments({ userId: isExistUser._id })
    return totalRecipe;
}

const getTotalRecipeCountIntoDB = async () => {
    const result = await recipeModel.countDocuments()
    return result
}

const createRecipeIntoDB = async (payload: TRecipe) => {
    const user = await userModel.findById(payload.userId)
    if (!user) {
        throw new AppError(401, 'User not found')
    }
    if (user.blockedUser) {
        throw new AppError(500, 'this user is Blocked!')
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

const addVotingInRecipeIntoDB = async (payload: { userId: string, recipeId: string, voteType: 'upVote' | 'downVote' }) => {
    const isExistRecipe = await recipeModel.findById(payload.recipeId)
    if (!isExistRecipe) {
        throw new AppError(404, 'Recipe not found!')
    }
    const isExistUser = await userModel.findById(payload.userId)
    if (!isExistUser) {
        throw new AppError(401, 'User not found!')
    }

    if (payload.voteType === 'upVote') {
        if (isExistRecipe.upVote.includes(payload.userId)) {
            throw new AppError(409, 'You have already upVoted this item.')
        }
        if (isExistRecipe.downVote.includes(payload.userId)) {
            await recipeModel.updateOne({ _id: payload.recipeId }, { $pull: { downVote: payload.userId } })
        }
        const result = await recipeModel.updateOne({ _id: payload.recipeId }, { $push: { upVote: payload.userId } })
        return result
    }
    else {
        if (isExistRecipe.downVote.includes(payload.userId)) {
            throw new AppError(409, 'You have already downVoted this item.')
        }

        if (isExistRecipe.upVote.includes(payload.userId)) {
            await recipeModel.updateOne({ _id: payload.recipeId }, { $pull: { upVote: payload.userId } })
        }
        const result = await recipeModel.updateOne({ _id: payload.recipeId }, { $push: { downVote: payload.userId } })
        return result
    }
}

const blockRecipeAdminIntoDB = async ({ recipeId, status }: { recipeId: string, status: boolean }) => {
    const isExistRecipe = await recipeModel.findById(recipeId)
    if (!isExistRecipe) {
        throw new AppError(404, 'Recipe not found!')
    }
    const result = await recipeModel.findByIdAndUpdate(recipeId, { blockStatus: status })
    return result
}

export const recipeService = {
    getAllRecipesIntoDB,
    getUserAllRecipesIntoDB,
    getTotalRecipeCountIntoDB,
    getRecipeDetailsIntoDB,
    createRecipeIntoDB,
    updateRecipeIntoDB,
    deleteRecipeIntoDB,
    getTotalUserRecipeIntoDB,
    addVotingInRecipeIntoDB,
    blockRecipeAdminIntoDB
}