import express from 'express';
import { userRouter } from '../modules/user/user.routes';
import { loginRoute } from '../modules/auth/auth.routes';

const router = express.Router()

const moduleRoutes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/auth',
        route: loginRoute
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;