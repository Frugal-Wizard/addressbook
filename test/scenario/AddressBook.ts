import { createEthereumScenario, EthereumScenario, EthereumSetupContext, TestSetupContext } from '@frugal-wizard/contract-test-helper';
import { AddressBook } from '../../src/AddressBook';

export type AddressBookScenario<Context> = EthereumScenario<Context>;

export function createAddressBookScenario<Context>({ only, description, setup }: {
    only?: boolean;
    description: string;
    setup(ctx: TestSetupContext & EthereumSetupContext & { addressBook: AddressBook }): Context | Promise<Context>;
}): AddressBookScenario<Context> {
    return {
        ...createEthereumScenario({
            only, description,

            async setup(ctx) {
                const addressBook = await AddressBook.deploy();
                return setup({
                    ...ctx,
                    addressBook,
                });
            },
        }),
    };
}
