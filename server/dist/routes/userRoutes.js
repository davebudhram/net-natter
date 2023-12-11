"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/userController"));
// UserRoutes
function UserRoutes(app) {
    // Get All Users
    app.get("/api/users", userController_1.default.getAllUsers);
    // Get User by User ID
    app.get("/api/users/:userId", userController_1.default.getUserById);
    // Create Users
    app.post("/api/users", userController_1.default.createUser);
    // Update User
    app.put("/api/users/:userId", userController_1.default.updateUser);
    // Delete User
    app.delete("/api/users/:userId", userController_1.default.deleteUser);
    // Get Followers by User ID
    app.get("/api/users/:userId/followerIds", userController_1.default.getAllFollowers);
    // Get Followees by User ID
    app.get("/api/users/:userId/followeeIds", userController_1.default.getAllFollowees);
    // Add the followee to the follower
    app.post("/api/users/follow/:followerId/:followeeId", userController_1.default.addUserToFollowers);
    // Remove the followee from the follower
    app.post("/api/users/unfollow/:followerId/:followeeId", userController_1.default.removeUserFromFollowers);
    // Sign Up
    app.post("/api/auth/signup", userController_1.default.userSignUp);
    // Sign In
    app.post("/api/auth/signin", userController_1.default.userSignIn);
    // Sign Out
    app.post("/api/auth/signout", userController_1.default.userSignOut);
    // Get User Account
    app.get("/api/auth/account", userController_1.default.userAccount);
    app.get("/api/users/:userId/followers", userController_1.default.getUserFollowers);
    app.get("/api/users/:userId/followees", userController_1.default.getUserFollowees);
}
exports.default = UserRoutes;
