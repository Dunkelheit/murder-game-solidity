pragma solidity ^0.4.17;

import './LibCLL.sol';
import './UserCrud.sol';

contract MurderGame {
    using LibCLLu for LibCLLu.CLL;
    UserCrud userCrud;

    function MurderGame(address _userCrud) public {
        userCrud = UserCrud(_userCrud);
        userCrud.insertUser(0x627306090abaB3A6e1400e9345bC60c78a8BEf57, 'dunkelheit1@gmail.com', 10);
        userCrud.insertUser(0xf17f52151EbEF6C7334FAD080c5704D77216b732, 'dunkelheit2@gmail.com', 10);
        userCrud.insertUser(0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef, 'dunkelheit3@gmail.com', 10);
    }

    function doSomething() public pure returns (string result) {
        return 'Me cago en dios';
    }
}
