import axios from "axios";
import {IGameComment, IGameCommentDTO} from "../interfaces/gameComment";

/**
 * Get all analyst articles from the database in sorted order
 * @returns List of all analyst articles in the database
 */
export const getAllGameComments = async (): Promise<IGameComment[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/gameComment`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Trouble finding game comments");
  }
};

/**
 * Gets all the game comments for a game
 * @param gameId
 * @returns
 */
export const getGameCommentsByGame = async (
  gameId: number
): Promise<IGameComment[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/analystArticle/author/${gameId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding game comments for game");
  }
};

/**
 * Gets a game comment by id
 * @param gameCommentId
 * @returns
 */
export const getGameCommentById = async (
  gameCommentId: string
): Promise<IGameComment> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/gameComment/${gameCommentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding game comment");
  }
};

/**
 * Creates a game comment
 * @param gameComment
 * @returns
 */
export const createGameComment = async (
  gameComment: IGameCommentDTO
): Promise<IGameComment> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE}/gameComment`,
      gameComment
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble creating game comment");
  }
};

/**
 * Updates a game comment by id
 * @param gameCommentId
 * @param gameComment
 * @returns
 */
export const updateGameComment = async (
  gameCommentId: string,
  gameComment: Partial<IGameCommentDTO>
): Promise<IGameComment> => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE}/gameComment/${gameCommentId}`,
      gameComment
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble updating game comment");
  }
};

/**
 * Deletes a game comment by id
 * @param gameCommentId
 */
export const deleteGameComment = async (
  gameCommentId: string
): Promise<void> => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE}/gameComment/${gameCommentId}`
    );
  } catch (error) {
    throw new Error("Trouble deleting game comment");
  }
};
