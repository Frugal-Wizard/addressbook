# README

## What is this?

This is a Solidity smart contract created for the purpose of storing an address using 40 bits instead of the required 160 bits.

Instead of storing the address, users register on the address book which assigns their address an id, which another smart contract can use instead of the address.

Using an address book also has the beneficial side-effect of helping prevent the use of addresses that might not be under someone's control, for example it could help prevent sending funds to a wrongly typed address.

## Should I use this?

The Solidity source code might be used as is and is not expected to change.

The package also distributes javascript code generated using [abi2ts](https://github.com/Frugal-Wizard/abi2ts), which is not currently stable, so don't rely on it.

## How do I use this?

```solidity
import { IAddressBook } from "@frugalwizard/addressbook/contracts/interfaces/IAddressBook.sol";
import { AddressBookUtil } from "@frugalwizard/addressbook/contracts/utils/AddressBookUtil.sol";

contract CrudeExample {
    using AddressBookUtil for IAddressBook;

    error Unathorized();

    IAddressBook private immutable _addressBook;

    uint40 private ownerId;

    constructor(IAddressBook addressBook_) {
        _addressBook = addressBook_;
        // safeId will fail if address is not registered
        ownerId = addressBook_.safeId(msg.sender);
    }

    function transferOwner(address addr) external {
        if (_addressBook.addr(ownerId) != msg.sender) {
            revert Unathorized();
        }
        ownerId = _addressBook.safeId(addr);
    }

    function owner() external view returns (address) {
        return _addressBook.addr(ownerId);
    }
}
```
