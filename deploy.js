const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const Secrets = require('./secrets.js');

const provider = new HDWalletProvider(Secrets.mnemonic, Secrets.infuraLink);
const web3 = new Web3(provider);




// the below function is ideally not required, but only to avail the functionality of async, we have defined this function and then called it below
const deployment_function = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('we are deploying the contract from this account:');
    console.log(accounts[0]);
    const deployed_inbox_contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            //arguments: ['Hi Dipesh!']
        })
        .send({ from: accounts[0], gas: '1000000' });
    console.log('the address of the contract that is deployed on the rinkeby network is:');
    console.log(deployed_inbox_contract.options.address);
    // const whatIsTheMessage = await deployed_inbox_contract.methods.message().call();
    // console.log(whatIsTheMessage);
}

deployment_function()





// console.log(Secrets.mnemonic);
// console.log(Secrets.infuraLink);


