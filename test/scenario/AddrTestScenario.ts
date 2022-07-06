import { AddContextFunction } from 'contract-test-helper';
import { AddressBookTestContext, AddressBookTestScenario, AddressBookTestScenarioProperties } from './AddressBookTestScenario';

export interface AddrTestScenarioProperties extends AddressBookTestScenarioProperties {
    readonly id: bigint;
}

export class AddrTestScenario extends AddressBookTestScenario<AddressBookTestContext, string, string> {
    readonly id: bigint;

    constructor({ id, ...rest }: AddrTestScenarioProperties) {
        super(rest);
        this.id = id;
    }

    addContext(addContext: AddContextFunction): void {
        addContext('id', String(this.id));
        super.addContext(addContext);
    }

    async setup() {
        return await this._setup();
    }

    async execute(ctx: AddressBookTestContext): Promise<string> {
        return await this.executeStatic(ctx);
    }

    async executeStatic({ addressBook }: AddressBookTestContext): Promise<string> {
        return addressBook.addr(this.id);
    }
}
