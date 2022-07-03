//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract AuctionMarket {
    using Counters for Counters.Counter;
    Counters.Counter private _itemId;
    Counters.Counter private totalItems;
    struct item {
        uint256 itemId; //1
        address nftaddress; //2
        uint256 nftid; //3
        address payable seller; //4
        uint256 endat; //5
        address highestBidder; //6
        uint256 highestBid; //7
        bool ended; //8
        bool started; //9
    }

    struct itemx {
        address x;
        uint256 value;
    }

    mapping(uint256 => mapping(address => uint256)) bids;

    mapping(uint256 => item) AuctionItems;

    mapping(uint256 => itemx[]) public biddersAndValues;

    function startAuction(
        address _nftaddress,
        uint256 _tokenid,
        uint256 _duration,
        uint256 _startingBid
    ) public {
        _itemId.increment();
        uint256 id = _itemId.current();

        AuctionItems[id] = item({
            nftaddress: _nftaddress,
            nftid: _tokenid,
            seller: payable(msg.sender),
            highestBid: _startingBid,
            itemId: id,
            endat: uint256(block.timestamp + _duration),
            ended: false,
            highestBidder: address(0),
            started: true
        });
        IERC721(_nftaddress).transferFrom(msg.sender, address(this), _tokenid);
    }

    function getAuctions() public view returns (item[] memory) {
        uint256 totalItems = _itemId.current();

        uint256 count = 0;
        for (uint256 i = 1; i <= totalItems; i++) {
            if (!AuctionItems[i].ended) {
                count = count + 1;
            }
        }
        item[] memory arr = new item[](count);
        uint256 index;
        for (uint256 i = 1; i <= totalItems; i++) {
            if (!AuctionItems[i].ended) {
                arr[index] = AuctionItems[i];
                index += 1;
            }
        }
        return arr;
    }

    function bid(uint256 id) external payable {
        //we check if the auction has started
        require(AuctionItems[id].started, "not started");
        // we make sure that auction hasnt ended
        require(block.timestamp < AuctionItems[id].endat);
        //current bid is higher than current highest bid
        require(
            bids[id][msg.sender] + msg.value > AuctionItems[id].highestBid,
            "value < highest bid"
        );

        if (AuctionItems[id].highestBidder != address(0)) {
            bids[id][AuctionItems[id].highestBidder] = AuctionItems[id]
                .highestBid;

            itemx[] memory barr = biddersAndValues[id];
            for (uint256 i = 0; i < barr.length; i++) {
                if (barr[i].x == msg.sender) {
                    barr[i].value = barr[i].value + msg.value;
                } else {
                    biddersAndValues[id].push(itemx(msg.sender, msg.value));
                }
            }
        }

        AuctionItems[id].highestBid += msg.value;
        AuctionItems[id].highestBidder = msg.sender;
    }

    function withdraw(uint256 id) external {
        uint256 bal = bids[id][msg.sender];
        bids[id][msg.sender] = 0;
        payable(msg.sender).transfer(bal);
    }

    function end(uint256 id) external {
        require(AuctionItems[id].started, "not started");
        require(!AuctionItems[id].ended, "ended");
        require(block.timestamp >= AuctionItems[id].endat, "not ended");

        AuctionItems[id].ended = true;

        if (AuctionItems[id].highestBidder != address(0)) {
            IERC721(AuctionItems[id].nftaddress).transferFrom(
                address(this),
                AuctionItems[id].highestBidder,
                AuctionItems[id].nftid
            );
            AuctionItems[id].seller.transfer(AuctionItems[id].highestBid);
        } else {
            IERC721(AuctionItems[id].nftaddress).transferFrom(
                address(this),
                AuctionItems[id].seller,
                AuctionItems[id].nftid
            );
        }
    }
}
