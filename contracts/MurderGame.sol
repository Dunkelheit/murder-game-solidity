pragma solidity ^0.4.17;

import './LibCLL.sol';
import './UserCrud.sol';

contract MurderGame {
    using LibCLLu for LibCLLu.CLL;
    UserCrud userCrud;

    LibCLLu.CLL internal list;

    function MurderGame(address _userCrud) public {
        userCrud = UserCrud(_userCrud);
        userCrud.insertUser(0x627306090abaB3A6e1400e9345bC60c78a8BEf57, 'arturo@icemobile.com', 10);
        userCrud.insertUser(0xf17f52151EbEF6C7334FAD080c5704D77216b732, 'willem@icemobile.com', 10);
        userCrud.insertUser(0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef, 'leon@icemobile.com', 10);
        userCrud.insertUser(0x821aEa9a577a9b44299B9c15c88cf3087F3b5544, 'christian@icemobile.com', 10);
        userCrud.insertUser(0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2, 'frank@icemobile.com', 10);
        userCrud.insertUser(0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e, 'rolf@icemobile.com', 10);
        userCrud.insertUser(0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5, 'yury@icemobile.com', 10);
    }

    function startGame() public {
        uint userCount = userCrud.getUserCount();
        for (uint i = 0; i < userCount; i++) {
            LibCLLu.push(list, i, true);
        }
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
