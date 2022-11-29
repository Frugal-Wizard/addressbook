import { describeSetupActions, EthereumSetupContext, executeSetupActions, TestSetupContext } from '@frugal-wizard/contract-test-helper';
import { AddressBook } from '../../src/AddressBook';
import { AddressBookAction } from '../action/AddressBook';
import { AddressBookState, ReadOnlyAddressBookState } from '../state/AddressBook';
import { AddressBookScenario, createAddressBookScenario } from './AddressBook';

export type AddrScenario = {
    readonly id: bigint;
    readonly state: ReadOnlyAddressBookState;
} & AddressBookScenario<TestSetupContext & EthereumSetupContext & {
    addressBook: AddressBook;
    execute(): Promise<string>;
}>;

export function createAddrScenario({ id, only, description, setupActions = [] }: {
    id: bigint;
    only?: boolean;
    description?: string;
    setupActions?: AddressBookAction[],
}): AddrScenario {
    return {
        id,
        state: setupActions.reduce((state, action) => action.apply(state), new AddressBookState()),

        ...createAddressBookScenario({
            only,
            description: description ?? `get address of id #${id}${describeSetupActions(setupActions)}`,

            async setup(ctx) {
                await executeSetupActions(setupActions, { ...ctx });
                ctx.addContext('id', id);
                return {
                    ...ctx,
                    execute: () => ctx.addressBook.addr(id),
                };
            },
        }),
    };
}
