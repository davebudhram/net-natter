"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the user schema
const gameCommentSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    userFullName: { type: String, required: true },
    gameId: { type: Number, required: true },
    commentText: String,
    date: Date,
}, { collection: "gameComments" });
// Create the user model
const gameCommentModel = mongoose_1.default.model("GameComment", gameCommentSchema);
exports.default = gameCommentModel;
