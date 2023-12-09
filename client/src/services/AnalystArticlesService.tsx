import axios from "axios";
import {
  IAnalystArticle,
  IAnalystArticleDTO,
} from "../interfaces/analystArticle";

/**
 * Get all analyst articles from the database in sorted order
 * @returns List of all analyst articles in the database
 */
export const getAllAnalystArticles = async (): Promise<IAnalystArticle[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/analystArticle`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Trouble finding articles");
  }
};

/**
 *  Get all analyst articles for an author from the database in sorted order
 * @param userId id of the author
 * @returns List of all analyst articles for the author
 */
export const getAnalystArticlesByAuthorId = async (
  userId: string
): Promise<IAnalystArticle[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/analystArticle/author/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding articles");
  }
};

export const getAnalystArticleById = async (
  articleId: string
): Promise<IAnalystArticle> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/analystArticle/${articleId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding article");
  }
};

export const createAnalystArticle = async (
  article: IAnalystArticleDTO
): Promise<IAnalystArticle> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE}/analystArticle`,
      article
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble creating article");
  }
};

export const updateAnalystArticle = async (
  articleId: string,
  article: Partial<IAnalystArticleDTO>
): Promise<IAnalystArticle> => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE}/analystArticle/${articleId}`,
      article
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble updating article");
  }
};

export const deleteAnalystArticle = async (
  articleId: string
): Promise<void> => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE}/analystArticle/${articleId}`
    );
  } catch (error) {
    throw new Error("Trouble deleting article");
  }
};
