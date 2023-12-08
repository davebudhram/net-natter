// userDao.ts
import UserModel from './user';
import { IUser, IUserDTO } from '../../interfaces/user';

class UserDao {
  static async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw new Error('Error fetching users from the database');
    }
  }

  static async getUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      throw new Error('Error fetching user from the database');
    }
  }

  static async createUser(userData: IUserDTO): Promise<IUser> {
    try {
      const newUser = await UserModel.create(userData);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(userId: string, updatedUserData: Partial<IUserDTO>): Promise<IUser | null> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user in the database');
    }
  }

  static async deleteUser(userId: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error('Error deleting user from the database');
    }
  }

  static async getAllFollowers(userId: string): Promise<String[]> {
    try {
      const user = await UserModel.findById(userId);
      if (user) {
        const followers = user.followers || [];
        return followers;
      } else {
        throw new Error('Error finding user in database');
      }
    } catch (error) {
      throw new Error('Error fetching userPlayerLikes from the database');
    }
  }

  static async getAllFollowees(userId: string): Promise<String[]> {
    try {
      const user = await UserModel.findById(userId);
      if (user) {
        const followees = user.followings || [];
        return followees;
      } else {
        throw new Error('Error finding user in database');
      }
    } catch (error) {
      throw new Error('Error fetching userPlayerLikes from the database');
    }
  }

  static async addUserToFollowers(followerId: string, followeeId: string): Promise<void> {
    try {
      const follower = await UserModel.findById(followerId);
      const followee = await UserModel.findById(followeeId);
      if (follower && followee) {
        await UserModel.findByIdAndUpdate(
          followerId, 
          { $push: { followers: followeeId } },
          { new: true }
        );
        await UserModel.findByIdAndUpdate(
          followeeId, 
          { $push: { followings: followerId } },
          { new: true }
        );
      } else {
        throw new Error('Error adding fake user to analyst followers');
      }
    } catch (error) {
      throw new Error('Error adding user to analyst followers');
    }
  }

  static async removeUserFromFollowers(followerId: string, followeeId: string): Promise<void> {
    try {
      const follower = await UserModel.findById(followerId);
      const followee = await UserModel.findById(followeeId);
      if (follower && followee) {
        await UserModel.findByIdAndUpdate(
          followerId, 
          { $pull: { followers: followeeId } },
          { new: true }
        );
        await UserModel.findByIdAndUpdate(
          followeeId, 
          { $pull: { followings: followerId } },
          { new: true }
        );
      } else {
        throw new Error('Error removing fake user to analyst followers');
      }
    } catch (error) {
      throw new Error('Error removing user to analyst followers');
    }
  }

  static async userSignUp(userData: IUserDTO): Promise<IUser> {
    try {
      const newUser = await UserModel.create(userData);
      return newUser;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  static async userSignIn(username: string, password: string): Promise<IUser | null> {
    try {
      const signedUser = await UserModel.findOne({ username, password }).exec();
      return signedUser;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }
}

export default UserDao;