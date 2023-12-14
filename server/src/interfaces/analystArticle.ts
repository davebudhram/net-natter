import mongoose from "mongoose";

export interface IAnalystArticleDTO {
  authorId: mongoose.Schema.Types.ObjectId;
  authorName: string;
  title: string;
  text: string;
  date: Date;
}

export interface IAnalystArticle
  extends mongoose.Document,
    IAnalystArticleDTO {}
