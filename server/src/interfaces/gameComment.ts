import mongoose from 'mongoose';

export interface IGameCommentDTO {
  userId: mongoose.Schema.Types.ObjectId;
  gameId: number;
  commentText: string;
  date: Date;
}

export interface IGameComment extends mongoose.Document, IGameCommentDTO{
}
