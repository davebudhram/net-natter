// userController.ts
import {Request, Response} from "express";
import UserPlayerLikeDao from "../models/userPlayerLike/userPlayerLikeDao";

class UserPlayerLikeController {
  static async getAllUserPlayerLikes(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const articles = await UserPlayerLikeDao.getAllUserPlayerLikes();
      res.json(articles);
    } catch (error) {
      res.status(500).json({error: "Internal Server Error"});
    }
  }

  static async getUserFollowedPlayers(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const {userId} = req.params;
      const playerIds = await UserPlayerLikeDao.getUserFollowedPlayers(userId);
      res.json(playerIds);
    } catch (error) {
      res.status(500).json({error: "Internal Server Error"});
    }
  }

  static async getPlayerFollowers(req: Request, res: Response): Promise<void> {
    try {
      const {playerId} = req.params;
      const userIds = await UserPlayerLikeDao.getPlayerFollowers(playerId);
      res.json(userIds);
    } catch (error) {
      res.status(500).json({error: "Internal Server Error"});
    }
  }

  static async createUserPlayerLike(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      await UserPlayerLikeDao.createUserPlayerLike(req.body);
      res.status(200).send("Successfully followed player");
    } catch (error) {
      res.status(500).json({error: "Internal Server Error"});
    }
  }

  static async deleteUserPlayerLikeByUserId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      await UserPlayerLikeDao.deleteUserPlayerLike(
        req.params.userId,
        parseInt(req.params.playerId)
      );
      res.json({message: "Successfully unfollowed player"});
    } catch (error) {
      res.status(500).json({error: "Internal Server Error"});
    }
  }
}

export default UserPlayerLikeController;
