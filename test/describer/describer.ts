import { RegisterAction } from '../action/RegisterAction';
import { AddrTestScenario } from '../scenario/AddrTestScenario';
import { IdTestScenario } from '../scenario/IdTestScenario';
import { RegisterTestScenario } from '../scenario/RegisterTestScenario';
import { DeployTestScenario } from '../scenario/DeployTestScenario';
import { ConfigurableDescriber, describeSetupActions } from '@theorderbookdex/contract-test-helper';

export const describer = new ConfigurableDescriber<never>();

describer.addDescriber(DeployTestScenario, function() {
    return 'deploy';
});

describer.addDescriber(RegisterTestScenario, function({ accountIndex, setupActions }) {
    return `register account #${accountIndex+1}${describeSetupActions(setupActions)}`;
});

describer.addDescriber(RegisterAction, function({ accountIndex }) {
    return `register account #${accountIndex+1}`;
});

describer.addDescriber(IdTestScenario, function({ accountIndex, setupActions }) {
    return `get id of account #${accountIndex+1}${describeSetupActions(setupActions)}`;
});

describer.addDescriber(AddrTestScenario, function({ id, setupActions }) {
    return `get address of id #${id}${describeSetupActions(setupActions)}`;
});
