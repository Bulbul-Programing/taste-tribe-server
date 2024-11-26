import express from 'express';
import { paymentGatewayController } from './paymentGateway.controller';
import verifyToken from '../../middleware/verifyToken';

const router = express.Router()

router.post('/checkout',verifyToken('user'), paymentGatewayController.paymentProcess)
router.post('/redirect/:path', paymentGatewayController.redirect)

export const paymentGateway = router