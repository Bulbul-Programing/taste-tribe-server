import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { recipeValidationSchema } from './recipe.validation';
import { recipeController } from './recipe.controller';

const router = express.Router();

router.post('/create', validateRequest(recipeValidationSchema.recipeCreateSchema), recipeController.createRecipe)


export const recipesRouter = router