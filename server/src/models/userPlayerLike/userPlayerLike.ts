import mongoose from "mongoose";
import { IUserPlayerLikeDTO } from '../../interfaces/userPlayerLike';

// Define the userPlayerLike schema
const userPlayerLike = new mongoose.Schema<IUserPlayerLikeDTO>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  playerId: { type: Number, required: true },
},
  { collection: "userPlayerLikes"});

// Create the userPlayerLike model
const userPlayerLikeModel = mongoose.model("UserPlayerLike", userPlayerLike);

export default userPlayerLikeModel;
