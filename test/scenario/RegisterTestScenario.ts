import { Transaction } from 'abi2ts-lib';
import { AddressBookTestContext, AddressBookTestScenario, AddressBookTestScenarioProperties } from './AddressBookTestScenario';
import { AddContextFunction } from 'contract-test-helper';

export interface RegisterTestContext extends AddressBookTestContext {
    readonly account: string;
}

export interface RegisterTestScenarioProperties extends AddressBookTestScenarioProperties {
    readonly accountIndex: number;
}

export class RegisterTestScenario extends AddressBookTestScenario<RegisterTestContext, Transaction, bigint> {
    readonly accountIndex: number;

    constructor({ accountIndex, ...rest }: RegisterTestScenarioProperties) {
        super(rest);
        this.accountIndex = accountIndex;
    }

    addContext(addContext: AddContextFunction): void {
        addContext('account', `account #${this.accountIndex+1}`);
        super.addContext(addContext);
    }

    async _setup(): Promise<RegisterTestContext> {
        const ctx = await super._setup();
        const account = ctx.accounts[this.accountIndex];
        return { ...ctx, account };
    }

    async setup() {
        return await this._setup();
    }

    async execute({ addressBook, account }: RegisterTestContext) {
        return await addressBook.register({ from: account });
    }

    async executeStatic({ addressBook, account }: RegisterTestContext) {
        return await addressBook.callStatic.register({ from: account });
    }
}
