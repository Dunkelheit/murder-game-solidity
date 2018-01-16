pragma solidity ^0.4.17;

import './LibCLL.sol';
import './UserCrud.sol';

contract MurderGame {
    using LibCLLu for LibCLLu.CLL;
    UserCrud userCrud;

    LibCLLu.CLL internal list;

    event GameStarted(uint participants);

    function MurderGame(address _userCrud) public {
        userCrud = UserCrud(_userCrud);
    }

    function startGame() public {
        uint userCount = userCrud.getUserCount();
        for (uint i = 0; i < userCount; i++) {
            LibCLLu.push(list, i, true);
        }
        GameStarted(userCount);
    }

    function getAssignments(uint i) public view returns (uint[2] assignments) {
        return LibCLLu.getNode(list, i);
    }

    function getMurderer(uint i) public view returns (uint murderer) {
        return LibCLLu.getNode(list, i)[0];
    }

    function getMurderee(uint i) public view returns (uint murderer) {
        return LibCLLu.getNode(list, i)[1];
    }

    function sizeOfAssignment() public view returns (uint sizeOf) {
        return LibCLLu.sizeOf(list);
    }

    function doSomething() public pure returns (string result) {
        return 'Me cago en dios';
    }

    function countSomething() public pure returns (uint result) {
        return 152;
    }
}
