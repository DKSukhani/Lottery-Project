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
    
    function totalPoolsize() public view returns (uint256) {
        return poolSize;
    }
    

    // the following function is to try and potentially generate a random number
    // keccak256 is the sha3 algorithm
    // in the latest solidity documentation keccak256 can accept only a single argument of the type "bytes"
    // hence the arguments are first parsed as abi.encodePacked()
    function random() private view returns (uint256) {
        uint(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }
    
    
    function pickWinner() {
        
    }

    
}

