import express from 'express';
import { loginValidation } from './auth.validation';
import { loginController } from './auth.controller';
import { validateRequest } from '../../middleware/validateRequest';


const router = express.Router()

router.post('/login', validateRequest(loginValidation.loginValidationSchema), loginController.loginUser)
router.get('/userData/:email', loginController.getUserData)

export const loginRoute = router