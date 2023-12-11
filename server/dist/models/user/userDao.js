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
// userDao.ts
const user_1 = __importDefault(require("./user"));
class UserDao {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find();
                return users;
            }
            catch (error) {
                throw new Error("Error fetching users from the database");
            }
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(userId);
                return user;
            }
            catch (error) {
                throw new Error("Error fetching user from the database");
            }
        });
    }
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_1.default.create(userData);
                return newUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateUser(userId, updatedUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield user_1.default.findByIdAndUpdate(userId, updatedUserData, { new: true });
                return updatedUser;
            }
            catch (error) {
                throw new Error("Error updating user in the database");
            }
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.default.findByIdAndDelete(userId);
            }
            catch (error) {
                throw new Error("Error deleting user from the database");
            }
        });
    }
    static getAllFollowers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(userId);
                if (user) {
                    const followers = user.followers || [];
                    return followers;
                }
                else {
                    throw new Error("Error finding user in database");
                }
            }
            catch (error) {
                throw new Error("Error fetching userPlayerLikes from the database");
            }
        });
    }
    static getAllFollowees(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(userId);
                if (user) {
                    const followees = user.followings || [];
                    return followees;
                }
                else {
                    throw new Error("Error finding user in database");
                }
            }
            catch (error) {
                throw new Error("Error fetching userPlayerLikes from the database");
            }
        });
    }
    static addUserToFollowers(followerId, followeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const follower = yield user_1.default.findById(followerId);
                const followee = yield user_1.default.findById(followeeId);
                if (follower && followee) {
                    yield user_1.default.findByIdAndUpdate(followerId, { $push: { followers: followeeId } }, { new: true });
                    yield user_1.default.findByIdAndUpdate(followeeId, { $push: { followings: followerId } }, { new: true });
                }
                else {
                    throw new Error("Error adding fake user to analyst followers");
                }
            }
            catch (error) {
                throw new Error("Error adding user to analyst followers");
            }
        });
    }
    static removeUserFromFollowers(followerId, followeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const follower = yield user_1.default.findById(followerId);
                const followee = yield user_1.default.findById(followeeId);
                if (follower && followee) {
                    yield user_1.default.findByIdAndUpdate(followerId, { $pull: { followers: followeeId } }, { new: true });
                    yield user_1.default.findByIdAndUpdate(followeeId, { $pull: { followings: followerId } }, { new: true });
                }
                else {
                    throw new Error("Error removing fake user to analyst followers");
                }
            }
            catch (error) {
                throw new Error("Error removing user to analyst followers");
            }
        });
    }
    static userSignUp(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_1.default.create(userData);
                return newUser;
            }
            catch (error) {
                throw new Error("Error creating user");
            }
        });
    }
    static userSignIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signedUser = yield user_1.default.findOne({
                    email: email,
                    password: password,
                }).exec();
                if (signedUser) {
                    return signedUser;
                }
                else {
                    throw new Error("Error signing in user");
                }
            }
            catch (error) {
                throw new Error("Error signing user");
            }
        });
    }
    static getUserFollowers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(userId);
                if (user) {
                    const followers = user.followers || [];
                    const followerUsers = yield user_1.default.find({ _id: { $in: followers } });
                    return followerUsers;
                }
                else {
                    throw new Error("Error finding user in database");
                }
            }
            catch (error) {
                throw new Error("Error fetching userPlayerLikes from the database");
            }
        });
    }
    static getUserFollowees(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(userId);
                if (user) {
                    const followees = user.followings || [];
                    const followeeUsers = yield user_1.default.find({ _id: { $in: followees } });
                    return followeeUsers;
                }
                else {
                    throw new Error("Error finding user in database");
                }
            }
            catch (error) {
                throw new Error("Error fetching userPlayerLikes from the database");
            }
        });
    }
}
exports.default = UserDao;
