"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userPlayerLikeController_1 = __importDefault(require("../controllers/userPlayerLikeController"));
// UserRoutes
function UserPlayerLikesRoutes(app) {
    // Get All UserPlayerLikes (will most likely not be used)
    app.get("/api/userPlayerLike", userPlayerLikeController_1.default.getAllUserPlayerLikes);
    // Get PlayerIds by User ID
    app.get("/api/userPlayerLike/players/:userId", userPlayerLikeController_1.default.getUserFollowedPlayers);
    // Get UserIds by Player ID
    app.get("/api/userPlayerLike/users/:playerId", userPlayerLikeController_1.default.getPlayerFollowers);
    // Create UserPlayerLike
    app.post("/api/userPlayerLike", userPlayerLikeController_1.default.createUserPlayerLike);
    // Delete UserPlayerLike
    app.delete("/api/userPlayerLike/:userId/:playerId", userPlayerLikeController_1.default.deleteUserPlayerLikeByUserId);
}
exports.default = UserPlayerLikesRoutes;
