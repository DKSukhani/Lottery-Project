const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: '100000000' });
});

describe('LotteryContract', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  // following are the old test from the Inbox boilerplate contract.
  // it('has a default message', async () => {
  //   const message = await inbox.methods.message().call();
  //   assert.equal(message, 'Hi there!');
  // });

  // it('can change the message', async () => {
  //   await inbox.methods.setMessage('bye').send({ from: accounts[0] });
  //   const message = await inbox.methods.message().call();
  //   assert.equal(message, 'bye');
  // });
});