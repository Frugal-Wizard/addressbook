export class AddressBookState {
    lastId: bigint;
    ids: Map<number, bigint>;
    accountIndexes: Map<bigint, number>;

    constructor() {
        this.lastId = 0n;
        this.ids = new Map();
        this.accountIndexes = new Map();
    }

    register(accountIndex: number) {
        if (this.ids.has(accountIndex)) throw new Error('already registered');
        this.lastId++;
        this.ids.set(accountIndex, this.lastId);
        this.accountIndexes.set(this.lastId, accountIndex);
        return this;
    }

    id(accountIndex: number) {
        return this.ids.get(accountIndex);
    }

    accountIndex(id: bigint) {
        return this.accountIndexes.get(id);
    }
}
