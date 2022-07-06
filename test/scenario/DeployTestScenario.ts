import { BaseTestContext, TestScenario } from 'contract-test-helper';
import { AddressBook } from '../../dist/AddressBook';

export class DeployTestScenario extends TestScenario<BaseTestContext, AddressBook, string> {
    async setup() {
        return await this._setup();
    }

    async execute() {
        return await AddressBook.deploy();
    }

    async executeStatic() {
        return await AddressBook.callStatic.deploy();
    }
}
