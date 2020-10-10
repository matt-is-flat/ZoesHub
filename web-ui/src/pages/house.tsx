import React from 'react';
import { HouseSavingsChart } from 'components/charts';
import { PageTitle } from 'components/shared';
import { DataGetter, TransactionDataPoint } from '../../../common/models';
import axios from 'axios';

const httpClient = axios.create();

const dataGetters: DataGetter[] = [
    {
        key: 'matts-bank-savings',
        label: 'Matt\'s ING Savings',
        backgroundColour: '#5899DA',
        getData: (): Promise<TransactionDataPoint[]> => {
            return new Promise<TransactionDataPoint[]>((resolve, reject) => {
                httpClient.get<TransactionDataPoint[]>('http://localhost:5000/accounts/49736782/dailyValue?startDate=2020-09-01&endDate=2020-10-10')
                    .then(response => resolve(response.data))
                    .catch(err => console.error(err));
            });
        }
    }
]

const House = (): JSX.Element => {
    return <>
        <PageTitle primary={"House Savings"} />
        <HouseSavingsChart dataGetters={dataGetters} />
    </>;
}

export { House };