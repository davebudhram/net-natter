"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the userPlayerLike schema
const userPlayerLike = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    playerId: { type: Number, required: true },
}, { collection: "userPlayerLikes" });
// Create the userPlayerLike model
const userPlayerLikeModel = mongoose_1.default.model("UserPlayerLike", userPlayerLike);
exports.default = userPlayerLikeModel;
