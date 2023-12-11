"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const analystArticleController_1 = __importDefault(require("../controllers/analystArticleController"));
// UserRoutes
function AnalystArticleRoutes(app) {
    // Get All Articles
    app.get('/api/analystArticle', analystArticleController_1.default.getAllArticles);
    // Get All Articles by Author ID
    app.get('/api/analystArticle/author/:authorId', analystArticleController_1.default.getAllArticlesByAuthor);
    // Get Article by Article ID
    app.get('/api/analystArticle/:articleId', analystArticleController_1.default.getArticleById);
    // Create Article
    app.post('/api/analystArticle', analystArticleController_1.default.createAnalystArticle);
    // Update Analyst Article
    app.put('/api/analystArticle/:articleId', analystArticleController_1.default.updateAnalystArticle);
    // Delete User
    app.delete('/api/analystArticle/:articleId', analystArticleController_1.default.deleteAnalystArticle);
}
exports.default = AnalystArticleRoutes;
