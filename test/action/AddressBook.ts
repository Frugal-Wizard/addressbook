import { EthereumSetupContext, SetupAction } from '@frugalwizard/contract-test-helper';
import { AddressBook } from '../../src/AddressBook';
import { AddressBookState } from '../state/AddressBook';

export interface AddressBookAction extends SetupAction<{
    addressBook: AddressBook;
} & EthereumSetupContext> {
    apply(state: AddressBookState): AddressBookState;
}
