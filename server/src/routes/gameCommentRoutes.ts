import { Express, Request, Response } from "express";
import GameCommentController from "../controllers/gameCommentController";

// UserRoutes
function GameCommentRoutes(app: Express) {

    // Get All Game Comment
    app.get('/api/gameComments', async (req: Request, res: Response) => {
        await GameCommentController.getAllGameComments(req, res);
    });
    // Get Game Comment by Game Id
    app.get('/api/gameComments/:gameId', async (req: Request, res: Response) => {
        await GameCommentController.getGameCommentsByGameId(req, res);
    });
    // Get Game Comment by Game Comment Id
    app.get('/api/gameComments/:gameCommentId', async (req: Request, res: Response) => {
        await GameCommentController.getGameCommentById(req, res);
    });
    // Create Game Comments
    app.post('/api/gameComments', async (req: Request, res: Response) => {
        await GameCommentController.createGameComment(req, res);
    });
    // Update Game Comment
    app.put('/api/gameComments/:gameCommentId', async (req: Request, res: Response) => {
        await GameCommentController.updateGameComment(req, res);
    });
    // Delete Game Comment
    app.delete('/api/gameComments/:gameCommentId', async (req: Request, res: Response) => {
        await GameCommentController.deleteGameComment(req, res);
    });
}

export default GameCommentRoutes;
