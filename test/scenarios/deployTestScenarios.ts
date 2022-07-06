import { describer } from '../describer/describer';
import { DeployTestScenario } from '../scenario/DeployTestScenario';

export const deployTestScenarios: Iterable<DeployTestScenario> = [
    new DeployTestScenario({ describer })
];
