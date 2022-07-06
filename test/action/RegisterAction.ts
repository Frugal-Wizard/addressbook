import { AddressBookTestContext } from '../scenario/AddressBookTestScenario';
import { AddressBookState } from '../state/AddressBookState';
import { AddressBookAction, AddressBookActionProperties } from './AddressBookAction';

export interface RegisterActionProperties extends AddressBookActionProperties {
    readonly accountIndex: number;
}

export class RegisterAction extends AddressBookAction {
    readonly accountIndex: number;

    constructor({ accountIndex, ...rest }: RegisterActionProperties) {
        super(rest);
        this.accountIndex = accountIndex;
    }

    async execute({ accounts, addressBook }: AddressBookTestContext): Promise<void> {
        const from = accounts[this.accountIndex];
        await addressBook.register({ from });
    }

    apply<T>(state: T): T {
        if (state instanceof AddressBookState) {
            return state.register(this.accountIndex);
        } else {
            return state;
        }
    }
}
