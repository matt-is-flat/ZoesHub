import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';

dotenv.config();
const app = express();

app.get('/', (req: Request, res: Response) => {
    console.log("Here")
    res.json({ message: "hi" });
});

app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`));