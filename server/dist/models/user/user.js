"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the user schema
const userSchema = new mongoose_1.default.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["ANALYST", "ADMIN", "USER"],
        default: "USER"
    },
    favoriteTeamID: { type: Number, required: false },
    goatID: { type: Number, required: false },
    followers: { type: [String], required: false },
    followings: { type: [String], required: false },
}, { collection: "users" });
// Create the user model
const userModel = mongoose_1.default.model("user", userSchema);
exports.default = userModel;
