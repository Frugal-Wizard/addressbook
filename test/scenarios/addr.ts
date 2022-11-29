import { Account, generatorChain, permutations, range } from '@frugal-wizard/contract-test-helper';
import { createAddrScenario } from '../scenario/addr';
import { createRegisterAction } from '../action/register';

export const addrTestScenarios = generatorChain(function*() {
    for (const id of range(1n, 2n)) {
        yield { id };
    }

}).then(function*(properties) {
    for (const accounts of permutations([ Account.MAIN, Account.SECOND ])) {
        const setupActions = accounts.map(account => createRegisterAction({ account }));
        yield { ...properties, setupActions };
    }

}).then(function*(properties) {
    yield createAddrScenario(properties);
});
