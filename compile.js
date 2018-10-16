const path = require('path'); //this will generate the valid path
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'LotteryContract.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');
module.exports = solc.compile(source, 1).contracts[':Lottery'];
console.log(solc.compile(source, 1).contracts[':Lottery'])