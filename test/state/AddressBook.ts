import { Account } from '@frugal-wizard/contract-test-helper';

export interface ReadOnlyAddressBookState {
    id(account: Account): bigint | undefined;

    account(id: bigint): Account | undefined;
}

export class AddressBookState implements ReadOnlyAddressBookState {
    lastId: bigint;
    ids: Map<Account, bigint>;
    accounts: Map<bigint, Account>;

    constructor() {
        this.lastId = 0n;
        this.ids = new Map();
        this.accounts = new Map();
    }

    register(account: Account) {
        if (this.ids.has(account)) throw new Error('already registered');
        this.lastId++;
        this.ids.set(account, this.lastId);
        this.accounts.set(this.lastId, account);
        return this;
    }

    id(account: Account) {
        return this.ids.get(account);
    }

    account(id: bigint) {
        return this.accounts.get(id);
    }
}
