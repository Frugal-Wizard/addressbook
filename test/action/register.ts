import { Account } from '@frugal-wizard/contract-test-helper';
import { AddressBookAction } from './AddressBook';

export function createRegisterAction({ account }: {
    account: Account;
}): AddressBookAction {
    return {
        description: `register ${account}`,

        apply(state) {
            return state.register(account);
        },

        async execute(ctx) {
            await ctx.addressBook.register({ from: ctx[account] });
        },
    };
}
