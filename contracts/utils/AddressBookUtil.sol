// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import { IAddressBook } from "../interfaces/IAddressBook.sol";

library AddressBookUtil {
    /**
     * Error thrown when an address has not been registered.
     */
    error NotRegistered();

    /**
     * Error thrown when an id is not valid.
     */
    error InvalidId();

    /**
     * Get the id matching an address, reverts if not registered.
     *
     * @param  addressBook the address book
     * @param  addr        the address
     * @return             the id
     */
    function safeId(IAddressBook addressBook, address addr) internal view returns (uint40) {
        uint40 id = addressBook.id(addr);
        if (id == 0) {
            revert NotRegistered();
        }
        return id;
    }

    /**
     * Get the address matching an id, reverts if not a valid id.
     *
     * @param  addressBook the address book
     * @param  id          the id
     * @return             the address
     */
    function safeAddr(IAddressBook addressBook, uint40 id) internal view returns (address) {
        if (id == 0 || id > addressBook.lastId()) {
            revert InvalidId();
        }
        return addressBook.addr(id);
    }
}
