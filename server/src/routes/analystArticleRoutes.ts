import { Express, Request, Response } from "express";
import AnalystArticleController from "../controllers/analystArticleController";

// UserRoutes
function AnalystArticleRoutes(app: Express) {

    // Get All Articles
    app.get('/api/analystArticle', AnalystArticleController.getAllArticles); 

     // Get All Articles by Author ID
     app.get('/api/analystArticle/author/:authorId', AnalystArticleController.getAllArticlesByAuthor); 

    // Get Article by Article ID
    app.get('/api/analystArticle/:articleId', AnalystArticleController.getArticleById);

    // Create Article
    app.post('/api/analystArticle', AnalystArticleController.createAnalystArticle);

    // Update Analyst Article
    app.put('/api/analystArticle/:articleId', AnalystArticleController.updateAnalystArticle);

    // Delete User
    app.delete('/api/analystArticle/:articleId', AnalystArticleController.deleteAnalystArticle); 
}

export default AnalystArticleRoutes;

