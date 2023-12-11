import mongoose from "mongoose";

export interface IGameCommentDTO {
  userId: string;
  userFullName: string;
  gameId: number;
  commentText: string;
  date: Date;
}

export interface IGameComment extends IGameCommentDTO {
  _id: string;
  __v: number;
}
