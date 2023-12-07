import mongoose from "mongoose";

export interface IGameComment{
  userID: string;
  gameID: number;
  commentText: string;
  date: Date;
}

// Define the user schema
const gameCommentSchema = new mongoose.Schema<IGameComment>({
  userID: { type: String, required: true },
  gameID: { type: Number, required: true },
  commentText: String,
  date: Date
},
  { collection: "gameComments" });

// Create the user model
const gameCommentModel = mongoose.model("gameComments", gameCommentSchema);

export default gameCommentModel;
