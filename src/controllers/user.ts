import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { ResponseStatus } from '../utils/response-status';
import jwt from 'jsonwebtoken';


class UsersController {

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.getAllUsers();
      res.send(users);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while retrieving users.');
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {

      console.log('Request body:', req.body); // Log the request body

      // const { name, email, password, role } = req.body;

      const userData = req.body;
      const newUser = await UserModel.createUser(userData);
      res.send({ "userCreated": newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to create user');
    }
  }

  async findUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await UserModel.getUserById(userId);
      if (user) {
        res.send(user);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('User not found');
      }
    } catch (error) {
      console.error('Error finding user by ID:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while finding user by ID.');
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      const updatedUser = await UserModel.updateUser(userId, updateData);
      if (updatedUser) {
        res.send(updatedUser);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('User not found');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to update user');
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const deletedUser = await UserModel.deleteUser(userId);
      if (deletedUser) {
        res.send('User deleted successfully!');
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('User not found');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to delete user');
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await UserModel.findOne({ email });

      if (!user) {
        res.status(ResponseStatus.UNAUTHENTICATED).send('Invalid credentials');
      }

      // Verify password
      const isValidPassword = await user.comparePassword(password);

      if (!isValidPassword) {
        res.status(ResponseStatus.UNAUTHENTICATED).send('Invalid credentials');
        return;
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(ResponseStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
  }
}



export default new UsersController();
