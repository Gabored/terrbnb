import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { ResponseStatus } from '../utils/response-status';

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
      const userData = req.body;
      const newUser = await UserModel.createUser(userData);
      res.send(newUser);
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
}

export default new UsersController();
