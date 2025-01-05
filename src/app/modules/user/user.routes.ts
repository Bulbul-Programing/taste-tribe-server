import express from 'express';
import { userController } from './user.controller';
import { userValidationSchema } from './user.validateion';
import { validateRequest } from '../../middleware/validateRequest';
import verifyToken from '../../middleware/verifyToken';

const router = express.Router()

router.post('/signup', validateRequest(userValidationSchema.createUserValidationSchema), userController.createUser)
router.get('/allUsers', verifyToken('admin'), userController.getAllUser)
router.get('/allUsers/count', verifyToken('admin'), userController.getAllUserCount)
router.post('/addFollower', validateRequest(userValidationSchema.addFollowerValidationSchema), userController.addFollower)
router.post('/removeFollower', validateRequest(userValidationSchema.addFollowerValidationSchema), userController.removeFollower)
router.get('/followers', verifyToken('user', 'admin'), userController.getFollower)
router.get('/topFiveFollowers', userController.getTopFiveFollowers)
router.get('/following', verifyToken('user', 'admin'), userController.getFollowing)
router.put('/update', validateRequest(userValidationSchema.updateUserValidationSchema), userController.updateUser)
router.post('/update/status/:transId/recipeDetails/:redirectUrl', userController.updateUserPremiumStatusWithRedirect)
router.post('/update/status/:transId/basicUser', userController.updateUserPremiumStatus)
router.delete('/delete/:userId', verifyToken('admin'), userController.deleteUser)

export const userRouter = router