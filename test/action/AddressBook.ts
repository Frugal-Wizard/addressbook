import { EthereumSetupContext, SetupAction } from '@frugal-wizard/contract-test-helper';
import { AddressBook } from '../../src/AddressBook';
import { AddressBookState } from '../state/AddressBook';

export interface AddressBookAction extends SetupAction<{
    addressBook: AddressBook;
} & EthereumSetupContext> {
    apply(state: AddressBookState): AddressBookState;
}
