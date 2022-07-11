import { RegisterAction } from '../action/RegisterAction';
import { describer } from '../describer/describer';
import { RegisterTestScenario } from '../scenario/RegisterTestScenario';
import { applySetupActions, generatorChain, permutations, range, TestError } from '@theorderbookdex/contract-test-helper';
import { AddressBookState } from '../state/AddressBookState';
import { AlreadyRegistered } from '../../dist/AddressBook';

export const registerTestScenarios: Iterable<RegisterTestScenario> = generatorChain(function*() {
    for (const accountIndex of range(0, 1)) {
        yield { accountIndex };
    }

}).then(function*({ ...rest }) {
    for (const accountIndexes of permutations(range(0, 1))) {
        const setupActions = accountIndexes.map(accountIndex => new RegisterAction({ accountIndex, describer }));
        yield { ...rest, setupActions };
    }

}).then(function*({ accountIndex, setupActions }) {
    let expectedError: TestError | undefined;
    const state = applySetupActions(setupActions, new AddressBookState());
    if (state.id(accountIndex) !== undefined) {
        expectedError = AlreadyRegistered;
    }
    yield new RegisterTestScenario({ accountIndex, setupActions, expectedError, describer });
});
