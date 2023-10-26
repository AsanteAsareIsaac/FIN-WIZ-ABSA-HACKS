// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract FinWiz is Ownable {
    using SafeMath for uint256;

    struct UserData {
        string location;
        string date;
        uint256 sales;
        uint256 expenses;
    }

    struct Report {
        address user;
        string date;
        uint256 sales;
        uint256 expenses;
    }

    struct CreditScore {
        uint256 score;
    }

    mapping(address => UserData) public userData;
    mapping(address => Report[]) public userReports;
    mapping(address => CreditScore) public userCreditScores;

    IERC20 public token; // Example: If your DApp uses a specific token, you can store it here.

    event DataCollected(address indexed user, string location, string date, uint256 sales, uint256 expenses);
    event ReportCreated(address indexed user, string date, uint256 sales, uint256 expenses);
    event CreditScoreCalculated(address indexed user, uint256 score);

    constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Invalid token address");
        token = IERC20(_tokenAddress);
    }

    function collectData(string memory location, string memory date, uint256 sales, uint256 expenses) public {
        userData[msg.sender] = UserData(location, date, sales, expenses);
        emit DataCollected(msg.sender, location, date, sales, expenses);
    }

    function createReport(string memory date, uint256 sales, uint256 expenses) public {
        userReports[msg.sender].push(Report(msg.sender, date, sales, expenses));
        emit ReportCreated(msg.sender, date, sales, expenses);
    }

    function calculateCreditScore() public {
        UserData memory user = userData[msg.sender];

        // Simple credit score calculation algorithm based on sales and expenses
        uint256 score;
        if (user.sales >= user.expenses) {
            score = user.sales.sub(user.expenses);
        } else {
            score = user.sales.sub(user.expenses.div(2));
        }

        userCreditScores[msg.sender] = CreditScore(score);
        emit CreditScoreCalculated(msg.sender, score);
    }

    // Allow the owner to withdraw any tokens sent to this contract (if applicable)
    function withdrawTokens(address _token, uint256 _amount) public onlyOwner {
        IERC20(_token).transfer(owner(), _amount);
    }
}