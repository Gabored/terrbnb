
import { Request, Response } from 'express';
import { PostModel } from '../models/post';
import { ResponseStatus } from '../utils/response-status';

class PostController {

  async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await PostModel.find();
      res.send(posts);
    } catch (error) {
      console.error('Error retrieving posts:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while retrieving posts.');
    }
  }

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const postData = req.body;
      const newPost = await PostModel.create(postData);
      res.send(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to create post');
    }
  }

  async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      const post = await PostModel.findById(postId);
      if (post) {
        res.send(post);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Post not found');
      }
    } catch (error) {
      console.error('Error finding post by ID:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while finding post by ID.');
    }
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      const updateData = req.body;
      const updatedPost = await PostModel.findByIdAndUpdate(postId, updateData, { new: true });
      if (updatedPost) {
        res.send(updatedPost);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Post not found');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to update post');
    }
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      const deletedPost = await PostModel.findByIdAndDelete(postId);
      if (deletedPost) {
        res.send('Post deleted successfully!');
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Post not found');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to delete post');
    }
  }
}

export default new PostController();
