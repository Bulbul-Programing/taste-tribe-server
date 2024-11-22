import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { recipeValidationSchema } from './recipe.validation';
import { recipeController } from './recipe.controller';
import verifyToken from '../../middleware/verifyToken';

const router = express.Router();

router.get('/', recipeController.getAllRecipes)
router.get('/user',verifyToken('user'), recipeController.getUserAllRecipes)
router.post('/create', validateRequest(recipeValidationSchema.recipeCreateSchema), recipeController.createRecipe)
router.put('/:id', validateRequest(recipeValidationSchema.recipeUpdateSchema), recipeController.updateRecipe)
router.delete('/:id', recipeController.deleteRecipe)
export const recipesRouter = router