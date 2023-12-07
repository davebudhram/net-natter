import express, {Request, Response} from 'express';
import session from "express-session";
import mongoose from 'mongoose';
import cors from "cors";
import "dotenv/config";
import { IUser } from './models/user/user';
<<<<<<< HEAD
import UserRoutes from './routes/userRoutes';
=======
import GameCommentRoutes from './routes/gameCommentRoutes';
>>>>>>> 2df1182 (Finish Game Comment Routes)

declare module 'express-session' {
  interface SessionData {
    currentUser: IUser | null;
  }
}


// Create a new express app instance
const app = express();

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
app.use(session(sessionOptions));


// Connect to MongoDB
const CONNECTION_STRING: string = process.env.DB_CONNECTION_STRING || '';
if (!CONNECTION_STRING) {
  throw new Error('DB_CONNECTION_STRING is not defined in the environment variables');
}
try {
  mongoose.connect(CONNECTION_STRING,)
}
catch (error) {
  console.log(error);
}


app.get('/hello', (req: Request, res: Response) => {
  const currentUser = req.session['currentUser'] as IUser | null;
  req.session['currentUser'] = currentUser;
  console.log(currentUser);
  console.log(req.body)
    res.send('Hello World!');
});

app.use(express.json()); 
<<<<<<< HEAD
UserRoutes(app);
=======
GameCommentRoutes(app);
>>>>>>> 2df1182 (Finish Game Comment Routes)

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});