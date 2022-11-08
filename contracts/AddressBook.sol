// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import { IAddressBook } from "./interfaces/IAddressBook.sol";

contract AddressBook is IAddressBook {
    /**
     * The id of the last registered address.
     */
    uint40 private _lastId;

    /**
     * The address to id map.
     */
    mapping(address => uint40) private _id;

    /**
     * The id to address map.
     */
    mapping(uint40 => address) private _addr;

    function register() external returns (uint40) {
        if (_id[msg.sender] != 0) {
            revert AlreadyRegistered();
        }

        uint40 id_ = _lastId + 1;
        _lastId = id_;

        _id[msg.sender] = id_;
        _addr[id_] = msg.sender;

        emit Registered(msg.sender, id_);

        return id_;
    }

    function lastId() external view returns (uint40) {
        return _lastId;
    }

    function id(address addr_) external view returns (uint40) {
        return _id[addr_];
    }

    function addr(uint40 id_) external view returns (address) {
        return _addr[id_];
    }
}
