import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { commentService } from "./comment.service";


const addComment = catchAsync(async (req: Request, res: Response) => {
    const commentData = req.body
    const result = await commentService.addCommentIntoDB(commentData)

    res.status(200).json({
        success: true,
        massage: 'comment added successfully',
        data: result
    })
})

const getComments = catchAsync(async (req: Request, res: Response) => {
    const recipeId = req.params.recipeId
    const result = await commentService.getCommentsIntoDB(recipeId)

    res.status(200).json({
        success: true,
        massage: 'Recipe comment retrieve successfully',
        data: result
    })
})

const deleteComment = catchAsync(async (req: Request, res: Response) => {
    const recipeId = req.params.recipeId
    const result = await commentService.deleteCommentsIntoDB(recipeId)

    res.status(200).json({
        success: true,
        massage: 'Comment delete successfully',
        data: result
    })
})

export const commentController = {
    addComment,
    getComments,
    deleteComment
}