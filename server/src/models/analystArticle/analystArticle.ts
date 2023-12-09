import mongoose from "mongoose";
import {IAnalystArticleDTO} from "../../interfaces/analystArticle";

// Define the user schema
const analystArticle = new mongoose.Schema<IAnalystArticleDTO>(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: Date, required: true},
  },
  {collection: "analystArticles"}
);

// Create the user model
const analystArticleModel = mongoose.model("AnalystArticle", analystArticle);

export default analystArticleModel;
