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
// gameCommentDao.ts
const gameComment_1 = __importDefault(require("./gameComment"));
class GameCommentDao {
    static getAllGameComments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameComments = yield gameComment_1.default.find();
                return gameComments;
            }
            catch (error) {
                throw new Error('Error fetching Game Comments from the database');
            }
        });
    }
    static getGameCommentsByGameId(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameComments = yield gameComment_1.default.find({ gameId: gameId }).exec();
                return gameComments;
            }
            catch (error) {
                throw new Error('Error fetching Game Comments by game id from the database');
            }
        });
    }
    static getGameCommentById(gameCommentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameComment = yield gameComment_1.default.findById(gameCommentId);
                return gameComment;
            }
            catch (error) {
                throw new Error('Error fetching Game Comment from the database');
            }
        });
    }
    static createGameComment(gameCommentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newGameComment = yield gameComment_1.default.create(gameCommentData);
                return newGameComment;
            }
            catch (error) {
                throw new Error('Error creating Game Comment in the database');
            }
        });
    }
    static updateGameComment(gameCommentId, updatedGameCommentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedGameComment = yield gameComment_1.default.findByIdAndUpdate(gameCommentId, updatedGameCommentData, { new: true });
                return updatedGameComment;
            }
            catch (error) {
                throw new Error('Error updating Game Comment in the database');
            }
        });
    }
    static deleteGameComment(gameCommentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield gameComment_1.default.findByIdAndDelete(gameCommentId);
            }
            catch (error) {
                throw new Error('Error deleting Game Comment from the database');
            }
        });
    }
}
exports.default = GameCommentDao;
