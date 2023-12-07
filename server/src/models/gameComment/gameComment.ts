import mongoose from "mongoose";

export interface IGameComment{
  userId: mongoose.Schema.Types.ObjectId;
  gameId: number;
  commentText: string;
  date: Date;
}

// Define the user schema
const gameCommentSchema = new mongoose.Schema<IGameComment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: Number, required: true },
  commentText: String,
  date: Date
},
  { collection: "gameComments" });

// Create the user model
const gameCommentModel = mongoose.model("GameComment", gameCommentSchema);

export default gameCommentModel;
