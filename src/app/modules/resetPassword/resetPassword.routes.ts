import express from 'express';
import { resetPasswordValidationSchema } from './resetPassword.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { resetPasswordController } from './resetPassword.controller';


const router = express.Router();

router.post('/', validateRequest(resetPasswordValidationSchema.resetPassword), resetPasswordController.resetPassword)
router.post('/codeValidate', validateRequest(resetPasswordValidationSchema.validateCode), resetPasswordController.validateCode)


export const resetPasswordRoute = router