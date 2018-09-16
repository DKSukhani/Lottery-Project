const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let lottery;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('LotteryContract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  it('lets 1 address to enter', async () => {
    await lottery.methods.enterLotteryContract().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    const players_list = await lottery.methods.getPlayers().call(
      {
        from: accounts[0]
      });

    assert.equal(accounts[0], players_list[0]);
    assert.equal(1, players_list.length);
  });

  it('lets multiple addresses to enter', async () => {
    await lottery.methods.enterLotteryContract().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    await lottery.methods.enterLotteryContract().send({
      from: accounts[1],
      value: web3.utils.toWei('2', 'ether')
    });

    await lottery.methods.enterLotteryContract().send({
      from: accounts[2],
      value: web3.utils.toWei('2', 'ether')
    });

    const players_list = await lottery.methods.getPlayers().call(
      {
        from: accounts[0]
      });

    assert.equal(accounts[0], players_list[0]);
    assert.equal(accounts[1], players_list[1]);
    assert.equal(accounts[2], players_list[2]);
    assert.equal(3, players_list.length);
  });

  it('needs the minimum eth', async () => {
    try {
      await lottery.methods.enterLotteryContract().send({
        from: accounts[3],
        value: web3.utils.toWei('1', 'ether')
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });



});