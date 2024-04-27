import { Router } from 'express';
import userRoutes from './user';
import propertyRoutes from './property';
import chatMessageRoutes from './chatMessage';
import reservationRoutes from './reservation';
import reviewRoutes from './review';
import postRoutes from './post';
import authMW from '../middlewares/auth';
import adminMW from '../middlewares/admin';

const router = Router();

// Middlewares

//router.use(authMW); 
//router.use(adminMW);

router.use('/users', userRoutes);
router.use('/properties', propertyRoutes);
router.use('/chatMessages', chatMessageRoutes);
router.use('/reservations', reservationRoutes);
router.use('/reviews', reviewRoutes);
router.use('/post', postRoutes)

router.get('/protected-route', authMW, (req, res) => {
    // This route is protected and will only be accessible if the user is authenticated
    // Access the authenticated user's information from req.user
    const user = (req as any).user;
    res.send(`Welcome ${user.userName}!`);
});

export default router;
