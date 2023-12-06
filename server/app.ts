import express, {Request, Response} from 'express';
import mongoose from 'mongoose';

// Create a new express app instance
const app = express();
const port = 4000;

// Connect to MongoDB
const CONNECTION_STRING: string | undefined = process.env.DB_CONNECTION_STRING as string;
if (!CONNECTION_STRING) {
  throw new Error('DB_CONNECTION_STRING is not defined in the environment variables');
}
mongoose.connect(CONNECTION_STRING);


app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});