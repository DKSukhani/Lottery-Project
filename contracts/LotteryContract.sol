pragma solidity ^0.4.17;

contract Lottery {
    address public manager; // this varaible is public so that we can at any point of time see who(which account) was the creater of this LotteryContract
    address[] public players; // array of the players who have enetered the LotteryContract
    uint256 public poolSize;
    
    constructor () public {
    manager = msg.sender;
    // "msg" is a global varaible and is readily available
    }

    function enterLotteryContract() public payable {
        require(msg.value >= .01 ether);
        players.push(msg.sender);
        poolSize = poolSize + msg.value;
    }
    
    
    function random() private view returns (uint256) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public {
        require(msg.sender == manager);
        uint256 indexNumber = random() % players.length;
        players[indexNumber].transfer(poolSize); //.transfer(this.balance) can also be used to send out the entire balance in the SC
        poolSize = 0;
        delete players;
    }
    
    
}

