import { Express, Request, Response } from "express";
import UserController from "../controllers/userController";


// UserRoutes
function UserRoutes(app: Express) {

    // Get All Users 
    app.get('/api/users', UserController.getAllUsers);
    // Get User by User ID
    app.get('/api/users/:userId', UserController.getUserById);
    // Create Users
    app.post('/api/users', UserController.createUser); 
    // Update User
    app.put('/api/users/:userId', UserController.updateUser); 
    // Delete User
    app.delete('/api/users/:userId', UserController.deleteUser); 
    // Get Followers by User ID
    app.get('/api/users/followers/:userId', UserController.getAllFollowers);
    // Get Followees by User ID
    app.get('/api/users/followings/:userId', UserController.getAllFollowees);
    // Add the followee to the follower
    app.put('/api/users/follow/:followerId/:followeeId', UserController.addUserToFollowers);
    // Remove the followee from the follower
    app.put('/api/users/unfollow/:followerId/:followeeId', UserController.removeUserFromFollowers);
}

export default UserRoutes;

