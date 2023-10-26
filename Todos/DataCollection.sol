// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DataCollection {
    struct Data {
        string location;
        string date;
        uint256 sales;
        uint256 expenses;
    }

    mapping(address => Data) public userToData;

    function collectData(string memory location, string memory date, uint256 sales, uint256 expenses) public {
        userToData[msg.sender] = Data(location, date, sales, expenses);
    }
}