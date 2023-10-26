// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract UserManagement {
    mapping(address => bool) public registeredUsers;

    function register() public {
        registeredUsers[msg.sender] = true;
    }

    function login() public view returns (bool) {
        return registeredUsers[msg.sender];
    }
}