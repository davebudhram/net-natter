import mongoose from "mongoose";

export interface IGameCommentDTO {
  userId: mongoose.Schema.Types.ObjectId;
  userFullName: string;
  gameId: number;
  commentText: string;
  date: Date;
}

export interface IGameComment extends mongoose.Document, IGameCommentDTO {}
