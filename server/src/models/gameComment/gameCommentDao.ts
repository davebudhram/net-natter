// gameCommentDao.ts
import GameCommentModel, { IGameComment } from './gameComment';

class GameCommentDao {
  static async getAllGameComments(): Promise<IGameComment[]> {
    try {
      const gameComments = await GameCommentModel.find();
      return gameComments;
    } catch (error) {
      throw new Error('Error fetching Game Comments from the database');
    }
  }

  static async getGameCommentsByGameId(gameId: number): Promise<IGameComment[] | null> {
    try {
      const gameComments = await GameCommentModel.find({gameId: gameId}).exec();
      return gameComments;
    } catch (error) {
      throw new Error('Error fetching Game Comments by game id from the database');
    }
  }

  static async getGameCommentById(gameCommentId: string): Promise<IGameComment | null> {
    try {
      const gameComment = await GameCommentModel.findById(gameCommentId);
      return gameComment;
    } catch (error) {
      throw new Error('Error fetching Game Comment from the database');
    }
  }

  static async createGameComment(gameCommentData: IGameComment): Promise<IGameComment> {
    try {
      const newGameComment = await GameCommentModel.create(gameCommentData);
      return newGameComment;
    } catch (error) {
      throw new Error('Error creating Game Comment in the database');
    }
  }

  static async updateGameComment(gameCommentId: string, updatedGameCommentData: Partial<IGameComment>): Promise<IGameComment | null> {
    try {
      const updatedGameComment = await GameCommentModel.findByIdAndUpdate(gameCommentId, updatedGameCommentData, { new: true });
      return updatedGameComment;
    } catch (error) {
      throw new Error('Error updating Game Comment in the database');
    }
  }

  static async deleteGameComment(gameCommentId: string): Promise<void> {
    try {
      await GameCommentModel.findByIdAndDelete(gameCommentId);
    } catch (error) {
      throw new Error('Error deleting Game Comment from the database');
    }
  }
}

export default GameCommentDao;