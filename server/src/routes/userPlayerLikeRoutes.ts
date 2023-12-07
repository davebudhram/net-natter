import { Express, Request, Response } from "express";
import UserPlayerLikeController from "../controllers/userPlayerLikeController";

// UserRoutes
function UserPlayerLikesRoutes(app: Express) {

  // Get All UserPlayerLikes (will most likely not be used)
  app.get('/api/userPlayerLikes', UserPlayerLikeController.getAllUserPlayerLikes);

  // Get PlayerIds by User ID
  app.get('/api/userPlayerLikes/players/:userId', UserPlayerLikeController.getUserFollowedPlayers);

  // Get UserIds by Player ID
  app.get('/api/userPlayerLikes/users/:playerId', UserPlayerLikeController.getPlayerFollowers);

  // Create UserPlayerLike
  app.post('/api/userPlayerLikes', UserPlayerLikeController.createUserPlayerLike);

  // Delete UserPlayerLike
  app.delete('/api/userPlayerLikes', UserPlayerLikeController.deleteUserPlayerLikeByUserId);
}

export default UserPlayerLikesRoutes;
   