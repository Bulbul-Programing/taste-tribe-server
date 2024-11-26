import express from 'express';
import { userRouter } from '../modules/user/user.routes';
import { loginRoute } from '../modules/auth/auth.routes';
import { recipesRouter } from '../modules/recipes/recipe.routes';
import { resetPasswordRoute } from '../modules/resetPassword/resetPassword.routes';
import { paymentGateway } from '../modules/paymentGateway/paymentGateway.routes';

const router = express.Router()

const moduleRoutes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/auth',
        route: loginRoute
    },
    {
        path: '/recipe',
        route: recipesRouter
    },
    {
        path: '/resetPassword',
        route: resetPasswordRoute
    },
    {
        path: '/payment',
        route: paymentGateway
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;