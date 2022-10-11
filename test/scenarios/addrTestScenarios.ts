import { RegisterAction } from '../action/RegisterAction';
import { describer } from '../describer/describer';
import { generatorChain, permutations, range } from '@frugal-wizard/contract-test-helper';
import { AddrTestScenario } from '../scenario/AddrTestScenario';

export const addrTestScenarios: Iterable<AddrTestScenario> = generatorChain(function*() {
    for (const id of range(1n, 2n)) {
        yield { id };
    }

}).then(function*({ ...rest }) {
    for (const accountIndexes of permutations(range(0, 1))) {
        const setupActions = accountIndexes.map(accountIndex => new RegisterAction({ accountIndex, describer }));
        yield { ...rest, setupActions };
    }

}).then(function*({ id, setupActions }) {
    yield new AddrTestScenario({ id, setupActions, describer });
});
