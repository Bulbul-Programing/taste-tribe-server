import express from 'express';
import { resetPasswordValidationSchema } from './resetPassword.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { resetPasswordController } from './resetPassword.controller';


const router = express.Router();

router.post('/', validateRequest(resetPasswordValidationSchema.resetPasswordMailSend), resetPasswordController.resetPasswordMailSend)
router.put('/', validateRequest(resetPasswordValidationSchema.resetPassword), resetPasswordController.resetPassword)

export const resetPasswordRoute = router