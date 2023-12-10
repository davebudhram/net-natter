import mongoose from "mongoose";
import {IGameCommentDTO} from "../../interfaces/gameComment";

// Define the user schema
const gameCommentSchema = new mongoose.Schema<IGameCommentDTO>(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    userFullName: {type: String, required: true},
    gameId: {type: Number, required: true},
    commentText: String,
    date: Date,
  },
  {collection: "gameComments"}
);

// Create the user model
const gameCommentModel = mongoose.model("GameComment", gameCommentSchema);

export default gameCommentModel;
