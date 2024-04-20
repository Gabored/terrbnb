import { Router } from 'express';
import UsersController from './../controllers/user'; // Using the UsersController Object Instance

const router = Router();

// GET all users
router.get('/', UsersController.getUsers);

// GET user by ID
router.get('/:id', UsersController.findUserById);

// UPDATE user by ID
router.put('/:id', UsersController.updateUser);

// DELETE user by ID
router.delete('/:id', UsersController.deleteUser);

export default router;

