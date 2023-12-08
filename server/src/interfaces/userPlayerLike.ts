import mongoose from 'mongoose';

export interface IUserPlayerLikeDTO {
  userId: mongoose.Schema.Types.ObjectId,
  playerId: Number,
}

export interface IUserPlayerLike extends mongoose.Document, IUserPlayerLikeDTO{
}
