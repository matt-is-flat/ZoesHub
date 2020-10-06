import { login as ingLogin } from '../helpers/ing-login';
import puppeteer from 'puppeteer';
import axios from 'axios';
import moment from 'moment';
import qs from 'qs';
import csvParse from 'csv-parse';
import { Transaction } from "@common/models/transaction";
import { Money } from '@common/models/money';

const dataExportType = 'csv';
const puppeteerSettings: puppeteer.LaunchOptions = {
    headless: true
};

/**
 * Gets a list of transactions for a particular ING account
 * @param accountNo The account number to extract history from 
 * @param startDate The start date for transactions
 * @param endDate End end date for transactions
 */
const getTransactionHistory = async (accountNo: string, startDate: string, endDate: string): Promise<Transaction[]> => {
    if (!accountNo.length || !startDate.length || !endDate.length) {
        throw new Error("accountNo, startDate and endDate must be provided");
    }

    if (!process.env.CLIENT_ID || !process.env.ACCESS_CODE) {
        throw new Error("Client ID and Access Code must be set");
    }

    if (!process.env.ING_EXPORT_URL) {
        throw new Error("ING export URL must be set");
    }

    const browser = await puppeteer.launch(puppeteerSettings);
    const page = await browser.newPage();
    const token = await ingLogin(page, process.env.CLIENT_ID, process.env.ACCESS_CODE);

    const requestData: any = {
        'X-AuthToken': token,
        AccountNumber: accountNo,
        Format: dataExportType,
        FilterStartDate: moment(startDate).format('YYYY-MM-DDTHH:mm:ssZZ'),
        FilterEndDate: moment(endDate).format('YYYY-MM-DDTHH:mmssZZ'),
        IsSpecific: 'false'
    };

    const csvData = (await axios.post(process.env.ING_EXPORT_URL, qs.stringify(requestData))).data as string;
    const parsedData = (await new Promise((resolve, reject) => {
        csvParse(csvData, (err, output) => {
            err ? reject(err.message) : resolve(output);
        })
    }) as any[]);

    return parsedData.slice(1).map<Transaction>((transaction: any[]): Transaction => {
        return {
            date: transaction[0],
            description: transaction[1],
            credit: getMoney(transaction[2]),
            debit: getMoney(transaction[3]),
            balance: getMoney(transaction[4])
        };
    });
};

/**
 * Gets a Money object from a dollars and cents string (e.g. '15.20')
 * @param dollarsAndCents The combined string to parse
 */
const getMoney = (dollarsAndCents: string): Money => {
    if (!dollarsAndCents.length) {
        return {
            dollars: 0,
            cents: 0
        };
    }

    return {
        dollars: parseInt(dollarsAndCents.split('.')[0]),
        cents: parseInt(dollarsAndCents.split('.')[1])
    };
}

export { getTransactionHistory };