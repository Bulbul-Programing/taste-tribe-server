import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { recipeValidationSchema } from './recipe.validation';
import { recipeController } from './recipe.controller';
import verifyToken from '../../middleware/verifyToken';

const router = express.Router();

router.get('/', recipeController.getAllRecipes)
router.get('/user', verifyToken('user', 'admin'), recipeController.getUserAllRecipes)
router.get('/details/:recipeId', recipeController.getRecipeDetails)
router.get('/user/count', verifyToken('user', 'admin'), recipeController.getTotalUserRecipe)
router.get('/count', recipeController.getTotalRecipeCount)
router.post('/create', validateRequest(recipeValidationSchema.recipeCreateSchema), recipeController.createRecipe)
router.put('/:id', validateRequest(recipeValidationSchema.recipeUpdateSchema), recipeController.updateRecipe)
router.put('/voting/:recipeId', verifyToken('user'), validateRequest(recipeValidationSchema.recipeVotingValidationSchema), recipeController.voteInRecipe)
router.delete('/:id', recipeController.deleteRecipe)
router.put('/adminBlockRecipe/:id', verifyToken('user', 'admin'), recipeController.blockRecipeAdmin)
export const recipesRouter = router