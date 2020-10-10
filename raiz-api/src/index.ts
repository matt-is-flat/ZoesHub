import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import { login } from '../helpers/raiz-login';

dotenv.config();
const app = express();

const puppeteerSettings: puppeteer.LaunchOptions = {
    headless: true
};

app.get('/', async (req: Request, res: Response) => {
    const browser = await puppeteer.launch(puppeteerSettings);
    const token = await login(browser);

    res.json({ token });
});

app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`));