import { createRegisterAction } from '../action/register';
import { createRegisterScenario } from '../scenario/register';
import { Account, generatorChain, permutations } from '@frugal-wizard/contract-test-helper';
import { AddressBookState } from '../state/AddressBook';
import { AlreadyRegistered } from '../../src/AddressBook';

export const registerTestScenarios = generatorChain(function*() {
    for (const account of [ Account.MAIN, Account.SECOND ]) {
        yield { account };
    }

}).then(function*(properties) {
    for (const accounts of permutations([ Account.MAIN, Account.SECOND ])) {
        const setupActions = accounts.map(account => createRegisterAction({ account }));
        yield { ...properties, setupActions };
    }

}).then(function*(properties) {
    const state = new AddressBookState();
    properties.setupActions.forEach(action => action.apply(state));

    if (state.id(properties.account)) {
        yield { ...properties, expectedError: new AlreadyRegistered() };

    } else {
        yield properties;
    }

}).then(function*(properties) {
    yield createRegisterScenario(properties);
});
