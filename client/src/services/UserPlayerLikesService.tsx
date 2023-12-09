import axios from "axios";
import {
  IUserPlayerLike,
  IUserPlayerLikeDTO,
} from "../interfaces/userPlayerLike";

/**
 *
 * @returns a list of all user player likes
 */
export const getAllUserPlayerLikes = async (): Promise<IUserPlayerLike[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/userPlayerLike`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Trouble finding user player likes");
  }
};

/**
 * Gets all the user player likes for a user
 * @param userId
 * @returns
 */
export const getAllPlayerUserLikesByUser = async (
  userId: String
): Promise<Number[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/userPlayerLike/players/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding players user likes");
  }
};

export const getAllUserPlayerLikesByPlayer = async (
  playerId: number
): Promise<String[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/userPlayerLike/users/${playerId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding players user likes");
  }
};

export const createUserPlayerLikes = async (
  userPlayerLike: IUserPlayerLikeDTO
): Promise<IUserPlayerLike> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE}/userPlayerLike`,
      userPlayerLike
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble creating game comment");
  }
};

/**
 * Deletes a
 * @param gameCommentId
 */
export const deleteUserPlayerLike = async (
  userId: String,
  playerId: Number
): Promise<void> => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE}/userPlayerLike/${userId}/${playerId}`
    );
  } catch (error) {
    throw new Error("Trouble deleting game comment");
  }
};
