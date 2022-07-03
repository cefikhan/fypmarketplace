//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Test {
    address x = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
    event disp(string j);
    event seconddisp(string x);

    function checksaffi() public {
        require(x != address(0), "x  has zero address");
        emit disp("address wasnt zero");
        emit seconddisp("hi there");
    }
}
