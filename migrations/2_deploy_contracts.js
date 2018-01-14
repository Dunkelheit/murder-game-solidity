const MurderGame = artifacts.require('./MurderGame.sol');
const LibCLL = artifacts.require('./LibCLLu.sol');
const UserCrud = artifacts.require('./UserCrud.sol');

module.exports = function (deployer) {
    deployer.deploy(LibCLL);
    deployer.link(LibCLL, MurderGame);
    deployer.deploy(UserCrud).then(function () {
        return deployer.deploy(MurderGame, UserCrud.address);
    });
}
