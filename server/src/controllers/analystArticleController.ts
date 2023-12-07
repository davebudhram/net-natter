// userController.ts
import { Request, Response } from 'express';
import AnalystArticleDao from '../models/analystArticle/analystArticleDao';

class AnalystArticleController {
  static async getAllArticles(req: Request, res: Response): Promise<void> {
    try {
      const articles = await AnalystArticleDao.getAllAnalystArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAllArticlesByAuthor(req: Request, res: Response): Promise<void> {
    try {
      const { authorId } = req.params;
      const articles = await AnalystArticleDao.getArticlesByAuthorId(authorId);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getArticleById(req: Request, res: Response): Promise<void> {
    try {
      const { articleId } = req.params;
      const article = await AnalystArticleDao.getArticleById(articleId);
      if (article) {
        res.json(article);
      } else {
        res.status(404).json({ error: 'Article not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createAnalystArticle(req: Request, res: Response): Promise<void> {
    try {
      const newArticle = await AnalystArticleDao.createAnalystArticle(req.body);
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateAnalystArticle(req: Request, res: Response): Promise<void> {
    try {
      const { articleId } = req.params;
      const article = await AnalystArticleDao.updateAnalystArticle(articleId, req.body);
      if (article) {
        res.json(article);
      } else {
        res.status(404).json({ error: 'Article not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteAnalystArticle(req: Request, res: Response): Promise<void> {
    try {
      const { articleId } = req.params;
      await AnalystArticleDao.deleteArticle(articleId);
      res.json({ message: 'Article deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AnalystArticleController;
