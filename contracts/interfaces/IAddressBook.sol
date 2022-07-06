// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

/**
 * Contract that keeps an address book.
 *
 * The address book maps addresses to 32 bits ids so that they can be used to reference
 * an address using less data.
 */
interface IAddressBook {
    /**
     * Event emitted when an address is registered in the address book.
     *
     * @param addr  the address
     * @param id    the id
     */
    event Registered(address indexed addr, uint40 indexed id);

    /**
     * Error thrown when an address has already been registered.
     */
    error AlreadyRegistered();

    /**
     * Register the address of the caller in the address book.
     *
     * @return  the id
     */
    function register() external returns (uint40);

    /**
     * The id of the last registered address.
     *
     * @return  the id of the last registered address
     */
    function lastId() external view returns (uint40);

    /**
     * The id matching an address.
     *
     * @param  addr the address
     * @return      the id
     */
    function id(address addr) external view returns (uint40);

    /**
     * The address matching an id.
     *
     * @param  id   the id
     * @return      the address
     */
    function addr(uint40 id) external view returns (address);
}
