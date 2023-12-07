// gameCommentController.ts
import { Request, Response } from 'express';
import GameCommentDao from '../models/gameComment/gameCommentDao';

class GameCommentController {
  static async getAllGameComments(req: Request, res: Response): Promise<void> {
    try {
      const gameComments = await GameCommentDao.getAllGameComments();
      res.json(gameComments);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getGameCommentsByGameId(req: Request, res: Response): Promise<void> {
    try {
      const { gameId } = req.params;
      const gameComments = await GameCommentDao.getGameCommentsByGameId(parseInt(gameId));
      res.json(gameComments);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getGameCommentById(req: Request, res: Response): Promise<void> {
    try {
      const { gameCommentId } = req.params;
      const gameComment = await GameCommentDao.getGameCommentById(gameCommentId);
      if (gameComment) {
        res.json(gameComment);
      } else {
        res.status(404).json({ error: 'Game Comment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createGameComment(req: Request, res: Response): Promise<void> {
    try {
      const newGameComment = await GameCommentDao.createGameComment(req.body);
      res.status(201).json(newGameComment);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateGameComment(req: Request, res: Response): Promise<void> {
    try {
      const { gameCommentId } = req.params;
      const status = await GameCommentDao.updateGameComment(gameCommentId, req.body);
      if (status) {
        const currentUser : any = await GameCommentDao.getGameCommentById(gameCommentId);
        res.json(status);
      } else {
        res.status(404).json({ error: 'Game Comment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteGameComment(req: Request, res: Response): Promise<void> {
    try {
      const { gameCommentId } = req.params;
      await GameCommentDao.deleteGameComment(gameCommentId);
      res.json({ message: 'Game Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default GameCommentController;
