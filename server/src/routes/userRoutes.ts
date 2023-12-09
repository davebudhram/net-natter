import {Express, Request, Response} from "express";
import UserController from "../controllers/userController";

// UserRoutes
function UserRoutes(app: Express) {
  // Get All Users
  app.get("/api/users", UserController.getAllUsers);

  // Get User by User ID
  app.get("/api/users/:userId", UserController.getUserById);

  // Create Users
  app.post("/api/users", UserController.createUser);

  // Update User
  app.put("/api/users/:userId", UserController.updateUser);

  // Delete User
  app.delete("/api/users/:userId", UserController.deleteUser);

  // Get Followers by User ID
  app.get("/api/users/:userId/followerIds", UserController.getAllFollowers);

  // Get Followees by User ID
  app.get("/api/users/:userId/followeeIds", UserController.getAllFollowees);

  // Add the followee to the follower
  app.post(
    "/api/users/follow/:followerId/:followeeId",
    UserController.addUserToFollowers
  );

  // Remove the followee from the follower
  app.post(
    "/api/users/unfollow/:followerId/:followeeId",
    UserController.removeUserFromFollowers
  );

  // Sign Up
  app.post("/api/auth/signup", UserController.userSignUp);

  // Sign In
  app.post("/api/auth/signin", UserController.userSignIn);

  // Sign Out
  app.post("/api/auth/signout", UserController.userSignOut);

  // Get User Account
  app.get("/api/auth/account", UserController.userAccount);

  app.get("/api/users/:userId/followers", UserController.getUserFollowers);

  app.get("/api/users/:userId/followees", UserController.getUserFollowees);
}

export default UserRoutes;
