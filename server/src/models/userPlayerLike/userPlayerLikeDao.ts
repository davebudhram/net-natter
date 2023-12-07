
import userPlayerLikeModel from './userPlayerLike';
import { IUserPlayerLike, IUserPlayerLikeDTO} from '../../interfaces/userPlayerLike';
import mongoose from 'mongoose';


class UserPlayerLikeDao {
  static async getAllUserPlayerLikes(): Promise<IUserPlayerLike[]> {
    try {
      const articles = await userPlayerLikeModel.find();
      return articles;
    } catch (error) {
      throw new Error('Error fetching userPlayerLikes from the database');
    }
  }

  static async getUserFollowedPlayers(userId: string): Promise<Number[]> {
    try {
      const userPlayerLikes = await userPlayerLikeModel.find({ userId: userId }).exec();
      const userPlayerLikesIds = userPlayerLikes.map((userPlayerLike) => { return userPlayerLike.playerId });
      return userPlayerLikesIds;
    } catch (error) {
      throw new Error('Error fetching userPlayerLikes from the database');
    }
  }

  static async getPlayerFollowers(playerId: string): Promise<mongoose.Schema.Types.ObjectId[]> {
    try {
      const userPlayerLikes = await userPlayerLikeModel.find({ playerId: playerId }).exec();
      const userPlayerLikesIds = userPlayerLikes.map((userPlayerLike) => { return userPlayerLike.userId });
      return userPlayerLikesIds;
    } catch (error) {
      throw new Error('Error fetching userPlayerLikes from the database');
    }
  }

  static async createUserPlayerLike(userPlayerData: IUserPlayerLikeDTO): Promise<void> {
    try {
      await userPlayerLikeModel.create(userPlayerData);
    } catch (error) {
      throw Error('Error creating article in the database');
    }
  }

  static async deleteUserPlayerLike(userPlayerData: IUserPlayerLikeDTO): Promise<void> {
    try {
      await userPlayerLikeModel.findOneAndDelete({ userId: userPlayerData.userId, playerId: userPlayerData.playerId}).exec();
    } catch (error) {
      throw new Error('Error deleting user player like from the database');
    }
  }
}

export default UserPlayerLikeDao;