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
const analystArticleDao_1 = __importDefault(require("../models/analystArticle/analystArticleDao"));
class AnalystArticleController {
    static getAllArticles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield analystArticleDao_1.default.getAllAnalystArticles();
                res.json(articles);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static getAllArticlesByAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorId } = req.params;
                const articles = yield analystArticleDao_1.default.getArticlesByAuthorId(authorId);
                res.json(articles);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static getArticleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { articleId } = req.params;
                const article = yield analystArticleDao_1.default.getArticleById(articleId);
                if (article) {
                    res.json(article);
                }
                else {
                    res.status(404).json({ error: 'Article not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static createAnalystArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newArticle = yield analystArticleDao_1.default.createAnalystArticle(req.body);
                res.status(201).json(newArticle);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static updateAnalystArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { articleId } = req.params;
                const article = yield analystArticleDao_1.default.updateAnalystArticle(articleId, req.body);
                if (article) {
                    res.json(article);
                }
                else {
                    res.status(404).json({ error: 'Article not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static deleteAnalystArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { articleId } = req.params;
                yield analystArticleDao_1.default.deleteArticle(articleId);
                res.json({ message: 'Article deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = AnalystArticleController;
