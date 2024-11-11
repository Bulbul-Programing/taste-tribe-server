import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { recipeService } from "./recipe.service";


const createRecipe = catchAsync(async (req: Request, res: Response) => {
    const recipeData = req.body
    const result = await recipeService.createRecipeIntoDB(recipeData)

    res.status(200).json({
        success: true,
        massage: 'Recipe create successfully',
        data: result
    })
})

export const recipeController = {
    createRecipe,
}