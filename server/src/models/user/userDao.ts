// userDao.ts
import UserModel, { IUser } from './user';

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

  static async createUser(userData: IUser): Promise<IUser> {
    try {
      const newUser = await UserModel.create(userData);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(userId: string, updatedUserData: Partial<IUser>): Promise<IUser | null> {
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
}

export default UserDao;