
import { Request, Response } from 'express';
import { ReviewModel } from '../models/review';
import { ResponseStatus } from '../utils/response-status';

class ReviewController {

  async getAllReviews(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await ReviewModel.find();
      res.send(reviews);
    } catch (error) {
      console.error('Error retrieving reviews:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while retrieving reviews.');
    }
  }

  async createReview(req: Request, res: Response): Promise<void> {
    try {
      const reviewData = req.body;
      const newReview = await ReviewModel.create(reviewData);
      res.send(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to create review');
    }
  }

  async getReviewById(req: Request, res: Response): Promise<void> {
    try {
      const reviewId = req.params.id;
      const review = await ReviewModel.findById(reviewId);
      if (review) {
        res.send(review);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Review not found');
      }
    } catch (error) {
      console.error('Error finding review by ID:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while finding review by ID.');
    }
  }

  async updateReview(req: Request, res: Response): Promise<void> {
    try {
      const reviewId = req.params.id;
      const updateData = req.body;
      const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, updateData, { new: true });
      if (updatedReview) {
        res.send(updatedReview);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Review not found');
      }
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to update review');
    }
  }

  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const reviewId = req.params.id;
      const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);
      if (deletedReview) {
        res.send('Review deleted successfully!');
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Review not found');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to delete review');
    }
  }
}

export default new ReviewController();
