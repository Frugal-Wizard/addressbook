import { Account, describeSetupActions, EthereumSetupContext, executeSetupActions, TestSetupContext } from '@frugalwizard/contract-test-helper';
import { AddressBook } from '../../src/AddressBook';
import { AddressBookAction } from '../action/AddressBook';
import { AddressBookState, ReadOnlyAddressBookState } from '../state/AddressBook';
import { AddressBookScenario, createAddressBookScenario } from './AddressBook';

export type IdScenario = {
    readonly account: Account;
    readonly state: ReadOnlyAddressBookState;
} & AddressBookScenario<TestSetupContext & EthereumSetupContext & {
    addressBook: AddressBook;
    execute(): Promise<bigint>;
}>;

export function createIdScenario({ account, only, description, setupActions = [] }: {
    account: Account;
    only?: boolean;
    description?: string;
    setupActions?: AddressBookAction[],
}): IdScenario {
    return {
        account,
        state: setupActions.reduce((state, action) => action.apply(state), new AddressBookState()),

        ...createAddressBookScenario({
            only,
            description: description ?? `get id of ${account}${describeSetupActions(setupActions)}`,

            async setup(ctx) {
                await executeSetupActions(setupActions, { ...ctx });
                ctx.addContext('account', account);
                return {
                    ...ctx,
                    execute: () => ctx.addressBook.id(ctx[account]),
                };
            },
        }),
    };
}
