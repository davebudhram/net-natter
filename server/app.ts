import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import "dotenv/config";

// Create a new express app instance
const app = express();
const port = 4000;

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
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});