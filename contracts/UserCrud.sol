pragma solidity ^0.4.17;

contract UserCrud {

    struct UserStruct {
        bytes32 userEmail;
        uint userAge;
        uint index;
    }

    mapping(address => UserStruct) private userStructs;
    address[] private userIndex;

    event LogNewUser(address indexed userAddress, uint index, bytes32 userEmail, uint userAge);
    event LogUpdateUser(address indexed userAddress, uint index, bytes32 userEmail, uint userAge);
    event LogDeleteUser(address indexed userAddress, uint index);

    modifier isUser(address userAddress) {
        require(userIndex.length != 0);
        require(userIndex[userStructs[userAddress].index] == userAddress);
        _;
    }

    modifier userDoesNotExist(address userAddress) {
        if (userIndex.length != 0) {
            require(userIndex[userStructs[userAddress].index] != userAddress);
        }
        _;
    }

    function insertUser(address userAddress, bytes32 userEmail, uint userAge)
    public
    userDoesNotExist(userAddress)
    returns (uint index)
    {
        userStructs[userAddress].userEmail = userEmail;
        userStructs[userAddress].userAge = userAge;
        userStructs[userAddress].index = userIndex.push(userAddress) - 1;
        LogNewUser(userAddress, userStructs[userAddress].index, userEmail, userAge);
        return userIndex.length - 1;
    }

    function deleteUser(address userAddress)
    public
    isUser(userAddress)
    returns (uint index)
    {
        uint rowToDelete = userStructs[userAddress].index;
        address keyToMove = userIndex[userIndex.length - 1];
        userIndex[rowToDelete] = keyToMove;
        userStructs[keyToMove].index = rowToDelete;
        userIndex.length--;
        LogDeleteUser(userAddress, rowToDelete);
        LogUpdateUser(keyToMove, rowToDelete, userStructs[keyToMove].userEmail, userStructs[keyToMove].userAge);
        return rowToDelete;
    }

    function getUser(address userAddress)
    public
    constant
    isUser(userAddress)
    returns (bytes32 userEmail, uint userAge, uint index)
    {
        return (userStructs[userAddress].userEmail,
        userStructs[userAddress].userAge,
        userStructs[userAddress].index);
    }

    function updateUserEmail(address userAddress, bytes32 userEmail)
    public
    isUser(userAddress)
    returns (bool success)
    {
        userStructs[userAddress].userEmail = userEmail;
        LogUpdateUser(
            userAddress,
            userStructs[userAddress].index,
            userEmail,
            userStructs[userAddress].userAge);
        return true;
    }

    function updateUserAge(address userAddress, uint userAge)
    public
    isUser(userAddress)
    returns (bool success)
    {
        userStructs[userAddress].userAge = userAge;
        LogUpdateUser(
            userAddress,
            userStructs[userAddress].index,
            userStructs[userAddress].userEmail,
            userAge);
        return true;
    }

    function getUserCount()
    public
    constant
    returns (uint count)
    {
        return userIndex.length;
    }

    function getUserAtIndex(uint index)
    public
    constant
    returns (address userAddress)
    {
        return userIndex[index];
    }
}
