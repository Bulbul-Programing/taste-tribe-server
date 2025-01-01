import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ratingServer } from "./rating.service";


const addRating = catchAsync(async (req: Request, res: Response) => {
    const commentData = req.body
    const result = await ratingServer.addRatingIntoDB(commentData)

    res.status(200).json({
        success: true,
        massage: 'Rating added successfully',
        data: result
    })
})

const getRating = catchAsync(async (req: Request, res: Response) => {
    const recipeId = req.params.recipeId
    const result = await ratingServer.getRatingIntoDB(recipeId)

    res.status(200).json({
        success: true,
        massage: 'Recipe rating retrieve successfully',
        data: result
    })
})

export const ratingController = {
    addRating,
    getRating,
}