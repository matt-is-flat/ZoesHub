import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { formatTransactionsToDailyValue, getTransactionHistory } from './controllers/account-controller';

dotenv.config();
const app = express();
app.use(cors());

app.get('/accounts/:id/transactionHistory', async (req: Request, res: Response) => {
    const account = req.params.id || '';
    const startDate = req.query.startDate as string || '';
    const endDate = req.query.endDate as string || '';
    const result = await getTransactionHistory(account, startDate, endDate);

    res.json(result);
});

app.get('/accounts/:id/dailyValue', async (req: Request, res: Response) => {
    const account = req.params.id || '';
    const startDate = req.query.startDate as string || '';
    const endDate = req.query.endDate as string || '';
    const transactionHistory = await getTransactionHistory(account, startDate, endDate);
    const result = formatTransactionsToDailyValue(transactionHistory, startDate, endDate);

    res.json(result);
})

app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`));