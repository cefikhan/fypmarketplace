//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTcollection is ERC721URIStorage, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public collectionOwner;

    constructor(
        string memory collectionName,
        string memory collectionSymbol,
        address _collectionOwner
    ) ERC721(collectionName, collectionSymbol) {
        collectionOwner = _collectionOwner;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        require(collectionOwner == msg.sender, "Only owner can mint tokens");
        _tokenIds.increment();
        uint256 _newItemId = _tokenIds.current();
        _mint(msg.sender, _newItemId);
        _setTokenURI(_newItemId, tokenURI);

        return _newItemId;
    }

    function AllTokenIds() public view returns (uint256[] memory arr) {
        uint256 count = totalSupply();
        uint256[] memory barr = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            barr[i] = tokenByIndex(i);
        }
        return barr;
    }

    function getAllTokensbyAddress(address adr)
        public
        view
        returns (uint256[] memory arr)
    {
        uint256 blc = balanceOf(adr);

        uint256[] memory barr = new uint256[](blc);

        for (uint256 i = 0; i < blc; i++) {
            barr[i] = tokenOfOwnerByIndex(adr, i);
        }
        return barr;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enumerable, ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // done
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    //done
    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return ERC721URIStorage.tokenURI(tokenId);
    }
}
