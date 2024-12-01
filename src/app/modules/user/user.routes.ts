import express from 'express';
import { userController } from './user.controller';
import { userValidationSchema } from './user.validateion';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router()

router.post('/signup', validateRequest(userValidationSchema.createUserValidationSchema), userController.createUser)
router.post('/addFollower', validateRequest(userValidationSchema.addFollowerValidationSchema), userController.addFollower)
router.put('/update', validateRequest(userValidationSchema.updateUserValidationSchema), userController.updateUser)
router.post('/update/status/:transId', userController.updateUserPremiumStatus)

export const userRouter = router