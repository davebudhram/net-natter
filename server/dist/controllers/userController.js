"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userDao_1 = __importDefault(require("../models/user/userDao"));
class UserController {
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userDao_1.default.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const user = yield userDao_1.default.getUserById(userId);
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).json({ error: "User not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield userDao_1.default.createUser(req.body);
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const status = yield userDao_1.default.updateUser(userId, req.body);
                if (status) {
                    const currentUser = yield userDao_1.default.getUserById(userId);
                    req.session["currentUser"] = currentUser;
                    res.status(204).json(status);
                }
                else {
                    res.status(404).json({ error: "User not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                yield userDao_1.default.deleteUser(userId);
                res.status(204).json({ message: "User deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getAllFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const followers = yield userDao_1.default.getAllFollowers(userId);
                res.status(200).json(followers);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getAllFollowees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const followees = yield userDao_1.default.getAllFollowees(userId);
                res.status(200).json(followees);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static addUserToFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { followerId, followeeId } = req.params;
                yield userDao_1.default.addUserToFollowers(followerId, followeeId);
                res.status(200).json({ message: "User added to followers successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static removeUserFromFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { followerId, followeeId } = req.params;
                yield userDao_1.default.removeUserFromFollowers(followerId, followeeId);
                res.status(200).json({ message: "User added to followers successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static userSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userDao_1.default.userSignUp(req.body);
                res.status(200).json({ message: "User signed up successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static userSignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield userDao_1.default.userSignIn(email, password);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static userSignOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.session.destroy;
                res.status(200).json({ message: "User signed out successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static userAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.currentUser === undefined) {
                    console.log("This not good");
                    throw new Error("Current User does not exists");
                }
                console.log("This is good");
                console.log(req.session.currentUser);
                res.status(200).json(req.session.currentUser);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getUserFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const followers = yield userDao_1.default.getUserFollowers(userId);
                res.status(200).json(followers);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getUserFollowees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const followees = yield userDao_1.default.getUserFollowees(userId);
                res.status(200).json(followees);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.default = UserController;
