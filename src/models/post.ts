
import { Schema, Document, model, Model } from 'mongoose';

interface Post extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

interface PostModel extends Model<Post> {
  getAllPosts(): Promise<Post[]>;
  getPostById(postId: string): Promise<Post | null>;
  createPost(postData: Post): Promise<Post>;
  updatePost(postId: string, updateData: Partial<Post>): Promise<Post | null>;
  deletePost(postId: string): Promise<Post | null>;
}

const postSchema: Schema<Post> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now }
});

postSchema.statics.getAllPosts = async function (): Promise<Post[]> {
  return this.find();
};

postSchema.statics.getPostById = async function (postId: string): Promise<Post | null> {
  return this.findById(postId);
};

postSchema.statics.createPost = async function (postData: Post): Promise<Post> {
  return this.create(postData);
};

postSchema.statics.updatePost = async function (postId: string, updateData: Partial<Post>): Promise<Post | null> {
  return this.findByIdAndUpdate(postId, updateData, { new: true });
};

postSchema.statics.deletePost = async function (postId: string): Promise<Post | null> {
  return this.findByIdAndDelete(postId);
};

export const PostModel: PostModel = model<Post, PostModel>('Post', postSchema);
