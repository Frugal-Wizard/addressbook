import { AddContextFunction } from '@frugal-wizard/contract-test-helper';
import { AddressBookTestContext, AddressBookTestScenario, AddressBookTestScenarioProperties } from './AddressBookTestScenario';

export interface IdTestScenarioProperties extends AddressBookTestScenarioProperties {
    readonly accountIndex: number;
}

export class IdTestScenario extends AddressBookTestScenario<AddressBookTestContext, bigint, bigint> {
    readonly accountIndex: number;

    constructor({ accountIndex, ...rest }: IdTestScenarioProperties) {
        super(rest);
        this.accountIndex = accountIndex;
    }

    addContext(addContext: AddContextFunction): void {
        addContext('account', `account #${this.accountIndex+1}`);
        super.addContext(addContext);
    }

    async setup() {
        return await this._setup();
    }

    async execute(ctx: AddressBookTestContext): Promise<bigint> {
        return await this.executeStatic(ctx);
    }

    async executeStatic({ addressBook, accounts }: AddressBookTestContext): Promise<bigint> {
        return addressBook.id(accounts[this.accountIndex]);
    }
}
