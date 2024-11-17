import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { recipeService } from "./recipe.service";

const getAllRecipes = catchAsync(async (req: Request, res: Response) => {

    const result = await recipeService.getAllRecipesIntoDB()

    res.status(200).json({
        success: true,
        massage: 'Recipe retrieve successfully',
        data: result
    })
})

const createRecipe = catchAsync(async (req: Request, res: Response) => {
    const recipeData = req.body
    const result = await recipeService.createRecipeIntoDB(recipeData)

    res.status(200).json({
        success: true,
        massage: 'Recipe create successfully',
        data: result
    })
})

const updateRecipe = catchAsync(async (req: Request, res: Response) => {
    const recipeId = req.params.id
    const updateRecipeData = req.body
    const result = await recipeService.updateRecipeIntoDB(recipeId, updateRecipeData)

    res.status(200).json({
        success: true,
        massage: 'Recipe update successfully',
        data: result
    })
})

const deleteRecipe = catchAsync(async (req: Request, res: Response) => {
    const recipeId = req.params.id
    const result = await recipeService.deleteRecipeIntoDB(recipeId)

    res.status(200).json({
        success: true,
        massage: 'Recipe Delete successfully',
        data: result
    })
})

export const recipeController = {
    getAllRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
}