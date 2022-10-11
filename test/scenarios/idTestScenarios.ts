import { RegisterAction } from '../action/RegisterAction';
import { describer } from '../describer/describer';
import { generatorChain, permutations, range } from '@frugal-wizard/contract-test-helper';
import { IdTestScenario } from '../scenario/IdTestScenario';

export const idTestScenarios: Iterable<IdTestScenario> = generatorChain(function*() {
    for (const accountIndex of range(0, 1)) {
        yield { accountIndex };
    }

}).then(function*({ ...rest }) {
    for (const accountIndexes of permutations(range(0, 1))) {
        const setupActions = accountIndexes.map(accountIndex => new RegisterAction({ accountIndex, describer }));
        yield { ...rest, setupActions };
    }

}).then(function*({ accountIndex, setupActions }) {
    yield new IdTestScenario({ accountIndex, setupActions, describer });
});
