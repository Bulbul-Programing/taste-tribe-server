import { z } from "zod";

const createCommentValidationSchema = z.object({
    body: z.object({
        userId: z.string({ message: "User ID is required" }),
        recipeId: z.string({ message: "Recipe ID is required" }),
        comment: z.string({ message: "comment is required" }),
    })
});

export const commentValidation = {
    createCommentValidationSchema
}