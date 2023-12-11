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
const userPlayerLike_1 = __importDefault(require("./userPlayerLike"));
class UserPlayerLikeDao {
    static getAllUserPlayerLikes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield userPlayerLike_1.default.find();
                return articles;
            }
            catch (error) {
                throw new Error("Error fetching userPlayerLikes from the database");
            }
        });
    }
    static getUserFollowedPlayers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userPlayerLikes = yield userPlayerLike_1.default
                    .find({ userId: userId })
                    .exec();
                const userPlayerLikesIds = userPlayerLikes.map((userPlayerLike) => {
                    return userPlayerLike.playerId;
                });
                return userPlayerLikesIds;
            }
            catch (error) {
                throw new Error("Error fetching userPlayerLikes from the database");
            }
        });
    }
    static getPlayerFollowers(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userPlayerLikes = yield userPlayerLike_1.default
                    .find({ playerId: playerId })
                    .exec();
                const userPlayerLikesIds = userPlayerLikes.map((userPlayerLike) => {
                    return userPlayerLike.userId;
                });
                return userPlayerLikesIds;
            }
            catch (error) {
                throw new Error("Error fetching userPlayerLikes from the database");
            }
        });
    }
    static createUserPlayerLike(userPlayerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userPlayerLike_1.default
                    .findOneAndDelete({
                    userId: userPlayerData.userId,
                    playerId: userPlayerData.playerId,
                })
                    .exec();
                if (data) {
                    throw new Error("User player like already exists");
                }
                yield userPlayerLike_1.default.create(userPlayerData);
            }
            catch (error) {
                throw Error("Error creating article in the database");
            }
        });
    }
    static deleteUserPlayerLike(userId, playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userPlayerLike_1.default
                    .findOneAndDelete({ userId: userId, playerId: playerId })
                    .exec();
            }
            catch (error) {
                throw new Error("Error deleting user player like from the database");
            }
        });
    }
}
exports.default = UserPlayerLikeDao;
