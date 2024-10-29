import express from 'express';
import { userController } from './user.controller';
import { userValidationSchema } from './user.validateion';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router()

router.post('/signup',validateRequest(userValidationSchema.createUserValidationSchema), userController.createUser)

export const userRouter = router