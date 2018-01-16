import '../stylesheets/app.css';

import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

import userCrudArtifacts from '../../build/contracts/UserCrud.json';
import murderGameArtifacts from '../../build/contracts/MurderGame.json';

const UserCrud = contract(userCrudArtifacts);
const MurderGame = contract(murderGameArtifacts);

let accounts;
let account;

window.App = {
    start: function () {
        UserCrud.setProvider(web3.currentProvider);
        MurderGame.setProvider(web3.currentProvider);

        web3.eth.getAccounts((err, accs) => {
            if (err !== null) {
                alert('There was an error fetching your accounts.');
                return;
            }

            if (accs.length === 0) {
                alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
                return;
            }

            accounts = accs;
            account = accounts[0];

            UserCrud.deployed().then(function (instance) {
                const event = instance.LogNewUser();
                event.watch(function (err, result) {
                    if (err) {
                        console.log('ERROR!');
                        console.log(err);
                        return;
                    }
                    console.log('LOGNEWUSER');
                    console.log(result);
                });
            });
        });
    },

    insertUser: function (userAddress, userEmail, userAge) {
        UserCrud.deployed().then(function (instance) {
            return instance.insertUser(userAddress, userEmail, userAge, { gas: 140000, from: account });
        }).then(function (value) {
            console.log(value);
            console.log(value.valueOf());
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    doSomething: function () {
        MurderGame.deployed().then(function (instance) {
            console.log(instance);
            return instance.doSomething.call(account, { from: account });
        }).then(function (value) {
            console.log(value.valueOf());
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    countSomething: function () {
        MurderGame.deployed().then(function (instance) {
            console.log(instance);
            return instance.countSomething.call(account, { from: account });
        }).then(function (value) {
            console.log(value.toString(10));
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    getUserCount: function () {
        UserCrud.deployed().then(function (instance) {
            return instance.getUserCount.call(account, { from: account });
        }).then(function (value) {
            console.log(value);
            console.log(value.toString());
            console.log(value.valueOf());
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    getUser: function (address) {
        UserCrud.deployed().then(function (instance) {
            return instance.getUser(address, { from: account });
        }).then(function (value) {
            console.log(value);
            console.log(value[0].valueOf());
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    getUserAtIndex: function (i) {
        UserCrud.deployed().then(function (instance) {
            return instance.getUserAtIndex.call(account, i, { from: account });
        }).then(function (value) {
            console.log(value);
            console.log(value.toString());
            console.log(value.valueOf());
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    startGame: function () {
        MurderGame.deployed().then(function (instance) {
            return instance.startGame({ gas: 500000, from: account });
        }).then(function (value) {
            console.log(value);
            console.log(value.toString());
            console.log(value.valueOf());
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    getMurderer: function (i) {
        MurderGame.deployed().then(function (instance) {
            return instance.getMurderer(i, { from: account });
        }).then(function (value) {
            console.log(value.toString(10));
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    getMurderee: function (i) {
        MurderGame.deployed().then(function (instance) {
            return instance.getMurderee(i, { from: account });
        }).then(function (value) {
            console.log(value.toString(10));
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    sizeOfAssignment: function () {
        MurderGame.deployed().then(function (instance) {
            return instance.sizeOfAssignment.call(account, { from: account });
        }).then(function (value) {
            console.log(value.toString(10));
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    }
};

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn('Using web3 detected from external source. If you find that your accounts don\'t appear or you ' +
            'have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following ' +
            'link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask');
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn('No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when ' +
            'you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More ' +
            'info here: http://truffleframework.com/tutorials/truffle-and-metamask');
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
    }

    App.start();
});
