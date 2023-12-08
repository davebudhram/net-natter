import { Express, Request, Response } from "express";
import UserController from "../controllers/userController";


// UserRoutes
function UserRoutes(app: Express) {

    // Get All Users 
    app.get('/api/users', async (req: Request, res: Response) => {
        await UserController.getAllUsers(req, res);
    });
    // Get User by User ID
    app.get('/api/users/:userId', async (req: Request, res: Response) => {
        await UserController.getUserById(req, res);
    });
    // Create Users
    app.post('/api/users', async (req: Request, res: Response) => {
        await UserController.createUser(req, res);
    });
    // Update User
    app.put('/api/users/:userId', async (req: Request, res: Response) => {
        await UserController.updateUser(req, res);
    });
    // Delete User
    app.delete('/api/users/:userId', async (req: Request, res: Response) => {
        await UserController.deleteUser(req, res);
    });
    // Add User to User Followers
    app.put('/api/users/:analystId/:userId', async (req: Request, res: Response) => {
        await UserController.addUserToFollowers(req, res);
    });
}

export default UserRoutes;

