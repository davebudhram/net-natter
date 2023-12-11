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
const userPlayerLikeDao_1 = __importDefault(require("../models/userPlayerLike/userPlayerLikeDao"));
class UserPlayerLikeController {
    static getAllUserPlayerLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield userPlayerLikeDao_1.default.getAllUserPlayerLikes();
                res.json(articles);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getUserFollowedPlayers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const playerIds = yield userPlayerLikeDao_1.default.getUserFollowedPlayers(userId);
                res.json(playerIds);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getPlayerFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { playerId } = req.params;
                const userIds = yield userPlayerLikeDao_1.default.getPlayerFollowers(playerId);
                res.json(userIds);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static createUserPlayerLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userPlayerLikeDao_1.default.createUserPlayerLike(req.body);
                res.status(200).send("Successfully followed player");
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static deleteUserPlayerLikeByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userPlayerLikeDao_1.default.deleteUserPlayerLike(req.params.userId, parseInt(req.params.playerId));
                res.json({ message: "Successfully unfollowed player" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.default = UserPlayerLikeController;
