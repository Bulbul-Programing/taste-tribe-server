import { z } from 'zod';

const recipeCreateSchema = z.object({
    body: z.object({
        userId: z.string({ message: "User ID is required" }),
        title: z.string({ message: "Title is required" }).min(1, 'title must be greater than 1 character'),
        description: z.string({ message: "Description is required" }).min(10, 'description must be at grater 10 characters'),
        ingredients: z.array(z.string({ message: "Each ingredient is required" })),
        instructions: z.array(z.object({
            title: z.string({ message: "title is required" }),
            time: z.number({ message: "time is required" })
        })),
        cookingTime: z.number()
            .min(1, { message: "Cooking time must be a positive number" })
            .refine(value => Number.isInteger(value), { message: "Cooking time must be an integer" }),
        category: z.string({ message: "Category is required" }),
        image: z.string({ message: "Image URL is required" }),
    })
});
const recipeUpdateSchema = z.object({
    body: z.object({
        userId: z.string({ message: "User ID is required" }).optional(),
        title: z.string({ message: "Title is required" }).optional(),
        description: z.string({ message: "Description is required" }).optional(),
        ingredients: z.array(z.string({ message: "Each ingredient is required" })).optional(),
        instructions: z.array(z.object({
            title: z.string({ message: "title is required" }),
            time: z.number({ message: "time is required" })
        })).optional(),
        cookingTime: z.number()
            .min(1, { message: "Cooking time must be a positive number" })
            .refine(value => Number.isInteger(value), { message: "Cooking time must be an integer" }).optional(),
        category: z.string({ message: "Category is required" }).optional(),
        image: z.string({ message: "Image URL is required" }).optional(),
    })
});

const recipeVotingValidationSchema = z.object({
    body: z.object({
        voteType: z.enum(["upVote", "downVote"]),
    })
})

export const recipeValidationSchema = {
    recipeCreateSchema,
    recipeUpdateSchema,
    recipeVotingValidationSchema

}
