import { TestSetupAction, TestSetupActionProperties } from '@frugal-wizard/contract-test-helper';
import { AddressBookTestContext } from '../scenario/AddressBookTestScenario';

export type AddressBookActionProperties = TestSetupActionProperties;

export abstract class AddressBookAction extends TestSetupAction<AddressBookTestContext> {
    constructor(properties: AddressBookActionProperties) {
        super(properties);
    }

    abstract execute(ctx: AddressBookTestContext): Promise<void>;
}
