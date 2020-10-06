import { observable } from 'mobx';
import { Transaction } from '../../../common/models/transaction';

class HouseSavingsStore {
    @observable mattsTransactions: Transaction[];
    @observable georgiasTransactions: Transaction[];

    constructor() {
        this.mattsTransactions = [];
        this.georgiasTransactions = [];
    }
}

export { HouseSavingsStore };