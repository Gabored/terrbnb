import { Router } from 'express';
import ReviewController from '../controllers/review'; // Using the ReviewController Object Instance

const router = Router();

// GET all reviews
router.get('/', ReviewController.getAllReviews);

// GET review by ID
router.get('/:id', ReviewController.getReviewById);

// CREATE a new review
router.post('/', ReviewController.createReview);

// UPDATE review by ID
router.put('/:id', ReviewController.updateReview);

// DELETE review by ID
router.delete('/:id', ReviewController.deleteReview);

export default router;
