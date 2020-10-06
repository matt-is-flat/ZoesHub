import { Money } from "./money";

export interface Transaction {
    date: string;
    description: string;
    credit: Money;
    debit: Money;
    balance: Money;
}