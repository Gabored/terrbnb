
import { Schema, Document, model, Model } from 'mongoose';

interface Review extends Document {
  _id: Schema.Types.ObjectId;
  // Define review properties here
}

interface ReviewModel extends Model<Review> {
  getAllReviews(): Promise<Review[]>;
  getReviewById(reviewId: string): Promise<Review | null>;
  createReview(reviewData: Review): Promise<Review>;
  updateReview(reviewId: string, updateData: Partial<Review>): Promise<Review | null>;
  deleteReview(reviewId: string): Promise<Review | null>;
}

const reviewSchema: Schema<Review> = new Schema({
  // Define review schema properties here
});

reviewSchema.statics.getAllReviews = async function (): Promise<Review[]> {
  return this.find();
};

reviewSchema.statics.getReviewById = async function (reviewId: string): Promise<Review | null> {
  return this.findById(reviewId);
};

reviewSchema.statics.createReview = async function (reviewData: Review): Promise<Review> {
  return this.create(reviewData);
};

reviewSchema.statics.updateReview = async function (reviewId: string, updateData: Partial<Review>): Promise<Review | null> {
  return this.findByIdAndUpdate(reviewId, updateData, { new: true });
};

reviewSchema.statics.deleteReview = async function (reviewId: string): Promise<Review | null> {
  return this.findByIdAndDelete(reviewId);
};

export const ReviewModel: ReviewModel = model<Review, ReviewModel>('Review', reviewSchema);
