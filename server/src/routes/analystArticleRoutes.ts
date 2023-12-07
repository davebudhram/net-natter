import { Express, Request, Response } from "express";
import AnalystArticleController from "../controllers/analystArticleController";

// UserRoutes
function AnalystArticleRoutes(app: Express) {

    // Get All Articles
    app.get('/api/analystArticle', async (req: Request, res: Response) => {
        await AnalystArticleController.getAllArticles(req, res);
    });

     // Get All Articles by Author ID
     app.get('/api/analystArticle/author/:authorId', async (req: Request, res: Response) => {
      await AnalystArticleController.getAllArticlesByAuthor(req, res);
  });

    // Get Article by Article ID
    app.get('/api/analystArticle/:articleId', async (req: Request, res: Response) => {
        await AnalystArticleController.getArticleById(req, res);
    });

    // Create Article
    app.post('/api/analystArticle', async (req: Request, res: Response) => {
        await AnalystArticleController.createAnalystArticle(req, res);
    });

    // Update Analyst Article
    app.put('/api/analystArticle/:articleId', async (req: Request, res: Response) => {
        await AnalystArticleController.updateAnalystArticle(req, res);
    });

    // Delete User
    app.delete('/api/analystArticle/:articleId', async (req: Request, res: Response) => {
        await AnalystArticleController.deleteAnalystArticle(req, res);
    });
}

export default AnalystArticleRoutes;

