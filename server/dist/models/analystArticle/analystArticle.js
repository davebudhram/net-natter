"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the user schema
const analystArticle = new mongoose_1.default.Schema({
    authorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true },
}, { collection: "analystArticles" });
// Create the user model
const analystArticleModel = mongoose_1.default.model("AnalystArticle", analystArticle);
exports.default = analystArticleModel;
