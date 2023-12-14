import mongoose from "mongoose";

export interface IUserDTO {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  favoriteTeamID?: number;
  bio?: string;
  organization?: string;
  followers?: string[];
  followings?: string[];
}

export interface IUser extends mongoose.Document, IUserDTO {}

export type Role = "ANALYST" | "ADMIN" | "USER";
