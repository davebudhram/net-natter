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
const gameCommentDao_1 = __importDefault(require("../models/gameComment/gameCommentDao"));
class GameCommentController {
    static getAllGameComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameComments = yield gameCommentDao_1.default.getAllGameComments();
                res.json(gameComments);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static getGameCommentsByGameId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gameId } = req.params;
                const gameComments = yield gameCommentDao_1.default.getGameCommentsByGameId(parseInt(gameId));
                res.json(gameComments);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static getGameCommentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gameCommentId } = req.params;
                const gameComment = yield gameCommentDao_1.default.getGameCommentById(gameCommentId);
                if (gameComment) {
                    res.json(gameComment);
                }
                else {
                    res.status(404).json({ error: 'Game Comment not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static createGameComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newGameComment = yield gameCommentDao_1.default.createGameComment(req.body);
                res.status(201).json(newGameComment);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static updateGameComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gameCommentId } = req.params;
                const status = yield gameCommentDao_1.default.updateGameComment(gameCommentId, req.body);
                if (status) {
                    const currentUser = yield gameCommentDao_1.default.getGameCommentById(gameCommentId);
                    res.json(status);
                }
                else {
                    res.status(404).json({ error: 'Game Comment not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static deleteGameComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gameCommentId } = req.params;
                yield gameCommentDao_1.default.deleteGameComment(gameCommentId);
                res.json({ message: 'Game Comment deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = GameCommentController;
