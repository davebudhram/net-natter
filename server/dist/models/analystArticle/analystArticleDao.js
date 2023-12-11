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
//analystArticleDao.ts
const analystArticle_1 = __importDefault(require("./analystArticle"));
class AnalystArticleDao {
    static getAllAnalystArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield analystArticle_1.default.find();
                return articles;
            }
            catch (error) {
                throw new Error("Error fetching articles from the database");
            }
        });
    }
    static getArticlesByAuthorId(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield analystArticle_1.default.find({
                    authorId: authorId,
                }).exec();
                return articles;
            }
            catch (error) {
                throw new Error("Error fetching articles from the database");
            }
        });
    }
    static getArticleById(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = yield analystArticle_1.default.findById(articleId);
                return article;
            }
            catch (error) {
                throw new Error("Error fetching articles from the database");
            }
        });
    }
    static createAnalystArticle(articleData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newArticle = yield analystArticle_1.default.create(articleData);
                return newArticle;
            }
            catch (error) {
                throw Error("Error creating article in the database");
            }
        });
    }
    static updateAnalystArticle(articleId, updatedArticleData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedArticle = yield analystArticle_1.default.findByIdAndUpdate(articleId, updatedArticleData, { new: true });
                return updatedArticle;
            }
            catch (error) {
                throw new Error("Error updating article in the database");
            }
        });
    }
    static deleteArticle(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield analystArticle_1.default.findByIdAndDelete(articleId);
            }
            catch (error) {
                throw new Error("Error deleting article from the database");
            }
        });
    }
}
exports.default = AnalystArticleDao;
