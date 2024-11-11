import { z } from 'zod';

const recipeCreateSchema = z.object({
    body: z.object({
        userId: z.string().nonempty({ message: "User ID is required" }),
        title: z.string().nonempty({ message: "Title is required" }),
        description: z.string().nonempty({ message: "Description is required" }),
        ingredients: z.array(
            z.string().nonempty({ message: "Each ingredient is required" })
        ).nonempty({ message: "Ingredients are required" }),
        instructions: z.array(
            z.string().nonempty({ message: "Each instruction is required" })
        ).nonempty({ message: "Instructions are required" }),
        cookingTime: z.number()
            .min(1, { message: "Cooking time must be a positive number" })
            .refine(value => Number.isInteger(value), { message: "Cooking time must be an integer" }),
        category: z.string().nonempty({ message: "Category is required" }),
        image: z.string().nonempty({ message: "Image URL is required" }),
    })
});

export const recipeValidationSchema = {
    recipeCreateSchema
}
