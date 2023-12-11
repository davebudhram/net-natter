"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gameCommentController_1 = __importDefault(require("../controllers/gameCommentController"));
// UserRoutes
function GameCommentRoutes(app) {
    // Get All Game Comment
    app.get("/api/gameComment", gameCommentController_1.default.getAllGameComments);
    // Get Game Comment by Game Id
    app.get("/api/gameComment/:gameId", gameCommentController_1.default.getGameCommentsByGameId);
    // Get Game Comment by Game Comment Id
    app.get("/api/gameComment/:gameCommentId", gameCommentController_1.default.getGameCommentById);
    // Create Game Comments
    app.post("/api/gameComment", gameCommentController_1.default.createGameComment);
    // Update Game Comment
    app.put("/api/gameComment/:gameCommentId", gameCommentController_1.default.updateGameComment);
    // Delete Game Comment
    app.delete("/api/gameComment/:gameCommentId", gameCommentController_1.default.deleteGameComment);
}
exports.default = GameCommentRoutes;
