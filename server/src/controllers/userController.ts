// userController.ts
import { Request, Response } from 'express';
import UserDao from '../models/user/userDao';

class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserDao.getAllUsers();
      res.status(200).json(users);
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
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const status = await UserDao.updateUser(userId, req.body);
      if (status) {
        const currentUser : any = await UserDao.getUserById(userId);
        req.session['currentUser'] = currentUser;
        
        res.status(204).json(status);
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
      res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAllFollowers(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const followers = await UserDao.getAllFollowers(userId);
      res.status(200).json(followers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAllFollowees(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const followees = await UserDao.getAllFollowees(userId);
      res.status(200).json(followees);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async addUserToFollowers(req: Request, res: Response): Promise<void> {
    try {
      const { followerId, followeeId } = req.params;
      await UserDao.addUserToFollowers(followerId, followeeId);
      res.status(200).json({ message: 'User added to followers successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async removeUserFromFollowers(req: Request, res: Response): Promise<void> {
    try {
      const { followerId, followeeId } = req.params;
      await UserDao.removeUserFromFollowers(followerId, followeeId);
      res.status(200).json({ message: 'User added to followers successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async userSignUp(req: Request, res:Response): Promise<void> {
    try {
      const user = await UserDao.userSignUp(req.body);
      req.session.currentUser = user;
      res.status(200).json({ message: 'User signed up successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async userSignIn(req: Request, res:Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await UserDao.userSignIn(username, password);
      req.session.currentUser = user;
      res.status(200).json({ message: 'User signed in successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async userSignOut(req: Request, res:Response): Promise<void> {
    try {
      req.session.destroy;
      res.status(200).json({ message: 'User signed out successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async userAccount(req: Request, res:Response): Promise<void> {
    try {
      if (req.session.currentUser === null) {
        throw new Error('Current User does not exists');
      }
      res.status(200).json(req.session.currentUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserController;
