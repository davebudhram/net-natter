// userController.ts
import { Request, Response } from 'express';
import UserDao from '../models/user/userDao';

class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserDao.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await UserDao.getUserById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await UserDao.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const status = await UserDao.updateUser(userId, req.body);
      if (status) {
        const currentUser : any = await UserDao.getUserById(userId);
        req.session['currentUser'] = currentUser;
        
        res.json(status);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      await UserDao.deleteUser(userId);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserController;
