import { applySetupActions, BaseTestContext, TestScenario, TestScenarioProperties } from 'contract-test-helper';
import { AddressBook } from '../../dist/AddressBook';
import { AddressBookState } from '../state/AddressBookState';

export interface AddressBookTestContext extends BaseTestContext {
    readonly addressBook: AddressBook;
}

export type AddressBookTestScenarioProperties = TestScenarioProperties<AddressBookTestContext>;

export abstract class AddressBookTestScenario<TestContext extends AddressBookTestContext, ExecuteResult, ExecuteStaticResult>
    extends TestScenario<TestContext, ExecuteResult, ExecuteStaticResult>
{
    constructor(properties: AddressBookTestScenarioProperties) {
        super(properties);
    }

    async _setup(): Promise<AddressBookTestContext> {
        const ctx = await super._setup();
        const addressBook = await AddressBook.deploy();
        return { ...ctx, addressBook };
    }

    get stateAfterSetup() {
        return applySetupActions(this.setupActions, new AddressBookState());
    }
}
