import { Router } from 'express';
import { uploadS3 } from './../middlewares/upload-s3';

import userRoutes from './user';
import propertyRoutes from './property';
import chatMessageRoutes from './chatMessage';
import reservationRoutes from './reservation';
import reviewRoutes from './review';
import postRoutes from './post';
import authMW from '../middlewares/auth';
import adminMW from '../middlewares/admin';

const router = Router();
interface MulterFileWithLocation extends Express.Multer.File {
    location: string;
}

// Middlewares

//router.use(authMW); 
//router.use(adminMW);

router.use('/users', userRoutes);
router.use('/properties', propertyRoutes);
router.use('/chatMessages', chatMessageRoutes);
router.use('/reservations', reservationRoutes);
router.use('/reviews', reviewRoutes);
router.use('/post', postRoutes)

router.get('/protected-route', authMW, adminMW, (req, res) => {
    // This route is protected and will only be accessible if the user is authenticated
    // Access the authenticated user's information from req.user
    const user = (req as any).user;
    res.send(`Welcome ${user.userName}!`);
});

router.get('/index', (req, res) => {
    res.render('index');
})

router.get('/calendar', (req, res) => {
    res.render('calendar');
})

router.get('/posts', (req, res) => {
    res.render('posts');
})

router.get('/reserve', (req, res) => {
    res.render('reserves');
})

router.get('/signup', (req, res) => {
    res.render('signup', { layout: 'login_layout' });
})


router.post('/upload', uploadS3.single('image'), (req, res) => {
    // Verifica si se subió correctamente el archivo
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }

    const fileWithLocation = req.file as MulterFileWithLocation;
    const url = fileWithLocation.location;

    // Obtén la URL pública de la imagen
    // const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_BUCKET_REGION}.amazonaws.com/${req.file.key}`;

    // Envía la URL pública como respuesta
    res.status(200).json({ imageUrl: url });
});

export default router;
