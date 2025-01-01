import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { ratingValidating } from './rating.validation';
import { ratingController } from './rating.controller';
const router = express.Router();

router.post('/', validateRequest(ratingValidating.createRatingValidationSchema), ratingController.addRating)
router.get('/', ratingController.getRating)
router.get('/average/:recipeId', ratingController.getAverageRatingInRecipe)
router.get('/:userId/:recipeId', ratingController.userRatingThisRecipe)
export const ratingRouter = router