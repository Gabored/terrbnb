import { Router } from 'express';
import UsersController from './../controllers/user'; // Using the UsersController Object Instance

const router = Router();

// GET all users
router.get('/', UsersController.getUsers);

// GET user by ID
router.get('/:id', UsersController.findUserById);

// Create a new user and login route
router.post('/', UsersController.createUser);
router.post('/login', UsersController.loginUser);


// UPDATE user by ID
router.put('/:id', UsersController.updateUser);

// DELETE user by ID
router.delete('/:id', UsersController.deleteUser);

export default router;

