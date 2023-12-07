import mongoose from "mongoose";

export interface IGameComment{
  userID: mongoose.Schema.Types.ObjectId;
  gameID: number;
  commentText: string;
  date: Date;
}

// Define the user schema
const gameCommentSchema = new mongoose.Schema<IGameComment>({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameID: { type: Number, required: true },
  commentText: String,
  date: Date
},
  { collection: "gameComments" });

// Create the user model
const gameCommentModel = mongoose.model("GameComment", gameCommentSchema);

export default gameCommentModel;
