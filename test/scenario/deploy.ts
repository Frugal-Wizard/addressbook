import { createEthereumScenario, EthereumScenario, EthereumSetupContext, TestSetupContext } from '@frugalwizard/contract-test-helper';
import { AddressBook } from '../../src/AddressBook';

export type DeployScenario = EthereumScenario<TestSetupContext & EthereumSetupContext & {
    execute(): Promise<AddressBook>;
}>;

export function createDeployScenario({ only }: {
    only?: boolean;
}): DeployScenario {
    return {
        ...createEthereumScenario({
            only,
            description: `deploy`,

            async setup(ctx) {
                return {
                    ...ctx,
                    execute: () => AddressBook.deploy(),
                };
            },
        })
    };
}
