//analystArticleDao.ts
import AnalystArticleModel from "./analystArticle";
import {
  IAnalystArticle,
  IAnalystArticleDTO,
} from "../../interfaces/analystArticle";

class AnalystArticleDao {
  static async getAllAnalystArticles(): Promise<IAnalystArticle[]> {
    try {
      const articles = await AnalystArticleModel.find();
      return articles;
    } catch (error) {
      throw new Error("Error fetching articles from the database");
    }
  }

  static async getArticlesByAuthorId(
    authorId: string
  ): Promise<IAnalystArticle[] | null> {
    try {
      const articles = await AnalystArticleModel.find({
        authorId: authorId,
      }).exec();
      return articles;
    } catch (error) {
      throw new Error("Error fetching articles from the database");
    }
  }

  static async getArticleById(
    articleId: string
  ): Promise<IAnalystArticle | null> {
    try {
      const article = await AnalystArticleModel.findById(articleId);
      return article;
    } catch (error) {
      throw new Error("Error fetching articles from the database");
    }
  }

  static async createAnalystArticle(
    articleData: IAnalystArticleDTO
  ): Promise<IAnalystArticle> {
    try {
      const newArticle = await AnalystArticleModel.create(articleData);
      return newArticle;
    } catch (error) {
      throw Error("Error creating article in the database");
    }
  }

  static async updateAnalystArticle(
    articleId: string,
    updatedArticleData: Partial<IAnalystArticleDTO>
  ): Promise<IAnalystArticle | null> {
    try {
      const updatedArticle = await AnalystArticleModel.findByIdAndUpdate(
        articleId,
        updatedArticleData,
        {new: true}
      );
      return updatedArticle;
    } catch (error) {
      throw new Error("Error updating article in the database");
    }
  }

  static async deleteArticle(articleId: string): Promise<void> {
    try {
      await AnalystArticleModel.findByIdAndDelete(articleId);
    } catch (error) {
      throw new Error("Error deleting article from the database");
    }
  }
}

export default AnalystArticleDao;
