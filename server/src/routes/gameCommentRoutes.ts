import { Express, Request, Response } from "express";
import GameCommentController from "../controllers/gameCommentController";

// UserRoutes
function GameCommentRoutes(app: Express) {

    // Get All Game Comment
    app.get('/api/gameComments', GameCommentController.getAllGameComments);

    // Get Game Comment by Game Id
    app.get('/api/gameComments/:gameId', GameCommentController.getGameCommentsByGameId); 

    // Get Game Comment by Game Comment Id
    app.get('/api/gameComments/:gameCommentId', GameCommentController.getGameCommentById); 

    // Create Game Comments
    app.post('/api/gameComments', GameCommentController.createGameComment);

    // Update Game Comment
    app.put('/api/gameComments/:gameCommentId', GameCommentController.updateGameComment);
    
    // Delete Game Comment
    app.delete('/api/gameComments/:gameCommentId', GameCommentController.deleteGameComment); 
}

export default GameCommentRoutes;
