import { Account, generatorChain, permutations } from '@frugal-wizard/contract-test-helper';
import { createRegisterAction } from '../action/register';
import { createIdScenario } from '../scenario/id';

export const idTestScenarios = generatorChain(function*() {
    for (const account of [ Account.MAIN, Account.SECOND ]) {
        yield { account };
    }

}).then(function*(properties) {
    for (const accounts of permutations([ Account.MAIN, Account.SECOND ])) {
        const setupActions = accounts.map(account => createRegisterAction({ account }));
        yield { ...properties, setupActions };
    }

}).then(function*(properties) {
    yield createIdScenario(properties);
});
