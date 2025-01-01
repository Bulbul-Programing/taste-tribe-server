import { z } from "zod";

const createRatingValidationSchema = z.object({
    body: z.object({
        userId: z.string({ message: "User ID is required" }),
        recipeId: z.string({ message: "Recipe ID is required" }),
        rating: z.number({ message: "rating is required" }).max(5).min(0),
    })
});

export const ratingValidating = {
    createRatingValidationSchema
}