import express from 'express';
import { commentController } from './comment.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { commentValidation } from './comment.validation';

const router = express.Router();

router.post('/create', validateRequest(commentValidation.createCommentValidationSchema), commentController.addComment)
router.get('/:recipeId', commentController.getComments)
router.delete('/:recipeId', commentController.deleteComment)
export const commentRouter = router