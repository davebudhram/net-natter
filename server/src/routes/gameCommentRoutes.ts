import {Express, Request, Response} from "express";
import GameCommentController from "../controllers/gameCommentController";

// UserRoutes
function GameCommentRoutes(app: Express) {
  // Get All Game Comment
  app.get("/api/gameComment", GameCommentController.getAllGameComments);

  // Get Game Comment by Game Id
  app.get(
    "/api/gameComment/:gameId",
    GameCommentController.getGameCommentsByGameId
  );

  // Get Game Comment by Game Comment Id
  app.get(
    "/api/gameComment/:gameCommentId",
    GameCommentController.getGameCommentById
  );

  // Create Game Comments
  app.post("/api/gameComment", GameCommentController.createGameComment);

  // Update Game Comment
  app.put(
    "/api/gameComment/:gameCommentId",
    GameCommentController.updateGameComment
  );

  // Delete Game Comment
  app.delete(
    "/api/gameComment/:gameCommentId",
    GameCommentController.deleteGameComment
  );
}

export default GameCommentRoutes;
