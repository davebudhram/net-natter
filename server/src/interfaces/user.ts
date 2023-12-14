import mongoose from "mongoose";

export interface IUserDTO {
  fullName: string;
  email: string;
  password: string;
  role: "ANALYST" | "ADMIN" | "USER";
  favoriteTeamID?: number;
  bio?: string;
  organization?: string;
  followers?: string[];
  followings?: string[];
}

export interface IUser extends mongoose.Document, IUserDTO {}
