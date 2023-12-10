import axios from "axios";
import {IUser, IUserDTO} from "../interfaces/user";
type emailPassword = {
  email: string;
  password: string;
};

const request = axios.create({
  withCredentials: true,
});

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const response = await request.get(
      `${process.env.REACT_APP_API_BASE}/users`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding users");
  }
};

export const getUserById = async (userId: string): Promise<IUser> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/users/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding user");
  }
};

export const createUser = async (user: any): Promise<IUser> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE}/users`,
      user
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble creating user");
  }
};

export const updateUser = async (
  userId: string,
  userData: Partial<IUserDTO>
): Promise<IUser> => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE}/users/${userId}`,
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble updating user");
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_BASE}/users/${userId}`);
  } catch (error) {
    throw new Error("Trouble deleting user");
  }
};

export const signUp = async (user: IUserDTO): Promise<IUser> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE}/auth/signup`,
      user
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble signing up");
  }
};

export const signIn = async (user: emailPassword): Promise<IUser> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE}/auth/signin`,
      user
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble signing in");
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await axios.post(`${process.env.REACT_APP_API_BASE}/auth/signout`);
  } catch (error) {
    throw new Error("Trouble signing out");
  }
};

export const getSignedInUser = async (): Promise<IUser | undefined | null> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/auth/account`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble getting signed in user");
  }
};

export const getUserFollowerIds = async (userId: string): Promise<String[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/users/${userId}/followerIds`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding user followers");
  }
};

export const getUserFolloweesId = async (userId: string): Promise<String[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/users/${userId}/followeeIds`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding user following");
  }
};

export const getUserFollowers = async (userId: string): Promise<IUser[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/users/${userId}/followers`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding user followers");
  }
};

export const getUserFollowees = async (userId: string): Promise<IUser[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/users/${userId}/followees`
    );
    return response.data;
  } catch (error) {
    throw new Error("Trouble finding user following");
  }
};

export const followUser = async (
  userId: string,
  followerId: string
): Promise<void> => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_BASE}/users/follow/${followerId}/${userId}`
    );
  } catch (error) {
    throw new Error("Trouble following user");
  }
};

export const unfollowUser = async (
  userId: string,
  followerId: string
): Promise<void> => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE}/users/unfollow/${followerId}/${userId}`
    );
  } catch (error) {
    throw new Error("Trouble unfollowing user");
  }
};
