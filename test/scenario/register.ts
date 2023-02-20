import { AddressBookScenario, createAddressBookScenario } from './AddressBook';
import { Account, describeSetupActions, EthereumSetupContext, executeSetupActions, TestSetupContext } from '@frugalwizard/contract-test-helper';
import { AddressBookAction } from '../action/AddressBook';
import { AddressBookState, ReadOnlyAddressBookState } from '../state/AddressBook';
import { ContractError, Transaction } from '@frugalwizard/abi2ts-lib';
import { AddressBook } from '../../src/AddressBook';

export type RegisterScenario = {
    readonly account: Account;
    readonly expectedError?: ContractError;
    readonly state: ReadOnlyAddressBookState;
} & AddressBookScenario<TestSetupContext & EthereumSetupContext & {
    addressBook: AddressBook;
    account: string;
    execute(): Promise<Transaction>;
    executeStatic(): Promise<bigint>;
}>;

export function createRegisterScenario({ account, only, description, setupActions = [], expectedError }: {
    account: Account;
    only?: boolean;
    description?: string;
    setupActions?: AddressBookAction[],
    expectedError?: ContractError,
}): RegisterScenario {
    return {
        account,
        expectedError,
        state: setupActions.reduce((state, action) => action.apply(state), new AddressBookState()),

        ...createAddressBookScenario({
            only,
            description: description ?? `register ${account}${describeSetupActions(setupActions)}`,

            async setup(ctx) {
                await executeSetupActions(setupActions, { ...ctx });
                ctx.addContext('account', account);
                return {
                    ...ctx,
                    account: ctx[account],
                    execute: () => ctx.addressBook.register({ from: ctx[account] }),
                    executeStatic: () => ctx.addressBook.callStatic.register({ from: ctx[account] }),
                };
            },
        }),
    };
}
