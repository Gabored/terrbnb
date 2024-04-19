import { Router } from 'express';
import PostController from '../controllers/post'; // Using the PropertyController Object Instance

const router = Router();

// GET all properties
router.get('/', PostController.getAllPosts);

// GET property by ID
router.get('/:id', PostController.getPostById);

// CREATE a new property
router.post('/', PostController.createPost);

// UPDATE property by ID
router.put('/:id', PostController.updatePost);

// DELETE property by ID
router.delete('/:id', PostController.deletePost);

export default router;