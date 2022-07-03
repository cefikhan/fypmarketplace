//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import "./NFTCollection.sol";

contract CollectionDeployer {
    function createCollection(
        string memory name,
        string memory symbol,
        address colOwner
    ) external returns (address) {
        address adres;
        bytes memory _code = getByteCode(name, symbol, colOwner);
        assembly {
            adres := create(callvalue(), add(_code, 0x20), mload(_code))
        }
        require(adres != address(0), "Unable to deploy successfully");
        return adres;
    }

    function getByteCode(
        string memory name,
        string memory symbol,
        address colOwner
    ) private returns (bytes memory) {
        bytes memory byteCode = type(NFTcollection).creationCode;
        return abi.encodePacked(byteCode, abi.encode(name, symbol, colOwner));
    }
}
