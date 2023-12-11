"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const gameCommentRoutes_1 = __importDefault(require("./routes/gameCommentRoutes"));
const analystArticleRoutes_1 = __importDefault(require("./routes/analystArticleRoutes"));
const userPlayerLikeRoutes_1 = __importDefault(require("./routes/userPlayerLikeRoutes"));
// Create a new express app instance
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
    cookie: {},
    proxy: true,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use((0, express_session_1.default)(sessionOptions));
// Connect to MongoDB
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "";
if (!CONNECTION_STRING) {
    throw new Error("DB_CONNECTION_STRING is not defined in the environment variables");
}
try {
    mongoose_1.default.connect(CONNECTION_STRING);
}
catch (error) {
    console.log(error);
}
app.get("/hello", (req, res) => {
    const currentUser = req.session["currentUser"];
    req.session["currentUser"] = currentUser;
    console.log(currentUser);
    console.log(req.body);
    res.send("Hello World!");
});
app.use(express_1.default.json());
(0, userRoutes_1.default)(app);
(0, gameCommentRoutes_1.default)(app);
(0, analystArticleRoutes_1.default)(app);
(0, userPlayerLikeRoutes_1.default)(app);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
