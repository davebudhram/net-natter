import {Express, Request, Response} from "express";
import UserPlayerLikeController from "../controllers/userPlayerLikeController";

// UserRoutes
function UserPlayerLikesRoutes(app: Express) {
  // Get All UserPlayerLikes (will most likely not be used)
  app.get(
    "/api/userPlayerLike",
    UserPlayerLikeController.getAllUserPlayerLikes
  );

  // Get PlayerIds by User ID
  app.get(
    "/api/userPlayerLike/players/:userId",
    UserPlayerLikeController.getUserFollowedPlayers
  );

  // Get UserIds by Player ID
  app.get(
    "/api/userPlayerLike/users/:playerId",
    UserPlayerLikeController.getPlayerFollowers
  );

  // Create UserPlayerLike
  app.post(
    "/api/userPlayerLike",
    UserPlayerLikeController.createUserPlayerLike
  );

  // Delete UserPlayerLike
  app.delete(
    "/api/userPlayerLike/:userId/:playerId",
    UserPlayerLikeController.deleteUserPlayerLikeByUserId
  );
}

export default UserPlayerLikesRoutes;
