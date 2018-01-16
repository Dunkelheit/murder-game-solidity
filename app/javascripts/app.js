import '../stylesheets/app.css';

import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

import userCrudArtifacts from '../../build/contracts/UserCrud.json';
import murderGameArtifacts from '../../build/contracts/MurderGame.json';

const UserCrud = contract(userCrudArtifacts);
const MurderGame = contract(murderGameArtifacts);

let accounts;
let account;
let userDiv;
let matchesDiv;

window.App = {
    start: function () {
        userDiv = document.getElementById('users');
        matchesDiv = document.getElementById('matches');
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
                    const { userAddress, userEmail } = result.args;
                    console.log('Added user ' + web3.toAscii(userEmail));
                    userDiv.insertAdjacentHTML('beforeend',
                        '<p><code>' + userAddress + '</code> ' + web3.toAscii(userEmail) + '</p>');
                });

                instance.getUserCount.call(account, { from: account }).then(function (value) {
                    for (let i = 0; i < value.toString(10); i++) {
                        App.getUserAtIndex(i).then(function (address) {
                            App.getUser(address).then((result) => {
                                console.log('Read user ' + web3.toAscii(result[0]));
                                userDiv.insertAdjacentHTML('beforeend',
                                    '<p><code>' + address + '</code> ' + web3.toAscii(result[0]) + '</p>');
                            });
                        });
                    }
                });
                return;
            }).then(function () {
                MurderGame.deployed().then(function (instance) {
                    const event = instance.GameStarted();
                    event.watch(function (err, result) {
                        if (err) {
                            console.log('ERROR!');
                            console.log(err);
                            return;
                        }

                        const participants = result.args.participants.toString(10);
                        matchesDiv.innerHTML = '<p>Game started with ' + participants + ' participant(s)</p>';

                        for (let i = 0; i < participants; i++) {
                            App.getAssignments(i).then(function (value) {
                                matchesDiv.insertAdjacentHTML('beforeend',
                                    'Player ' + i + ' is target of player ' + value[0].toString(10) +
                                    ' and has to kill player ' + value[1].toString(10) + '<br/>');
                            });
                        }
                    });
                });

            });
        });
    },

    insertUser: function (userAddress, userEmail, userAge) {
        return UserCrud.deployed().then(function (instance) {
            return instance.insertUser(userAddress, userEmail, userAge, { gas: 140000, from: account });
        }).then(function (value) {
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
        return UserCrud.deployed().then(function (instance) {
            return instance.getUser(address, { from: account });
        }).then(function (value) {
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    getUserAtIndex: function (i) {
        return UserCrud.deployed().then(function (instance) {
            return instance.getUserAtIndex(i, { from: account });
        }).then(function (value) {
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    startGame: function () {
        return MurderGame.deployed().then(function (instance) {
            return instance.startGame({ gas: 500000, from: account });
        }).then(function (value) {
            return value;
        }).catch(function (err) {
            console.error(err);
        });
    },

    getAssignments: function (i) {
        return MurderGame.deployed().then(function (instance) {
            return instance.getAssignments(i, { from: account });
        }).then(function (value) {
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
    },

    batchInsert: function() {
        return App.insertUser('0x627306090abaB3A6e1400e9345bC60c78a8BEf57', 'arturo@icemobile.com', 10)
            .then(function () {
                return App.insertUser('0xf17f52151EbEF6C7334FAD080c5704D77216b732', 'willem@icemobile.com', 10);
            }).then(function () {
                return App.insertUser('0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef', 'leon@icemobile.com', 10);
            }).then(function () {
                return App.insertUser('0x821aEa9a577a9b44299B9c15c88cf3087F3b5544', 'christian@icemobile.com', 10);
            }).then(function () {
                return App.insertUser('0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2', 'frank@icemobile.com', 10);
            }).then(function () {
                return App.insertUser('0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e', 'rolf@icemobile.com', 10);
            }).then(function () {
                return App.insertUser('0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5', 'yury@icemobile.com', 10);
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
