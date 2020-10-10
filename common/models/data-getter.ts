import { TransactionDataPoint } from './transaction-data-point';

export interface DataGetter {
    key: string;
    label: string;
    getData: () => Promise<TransactionDataPoint[]>;
    backgroundColour?: string;
}