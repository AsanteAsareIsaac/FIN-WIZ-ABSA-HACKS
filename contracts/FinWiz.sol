// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

contract FinWiz {
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

    event DataCollected(address indexed user, string location, string date, uint256 sales,  uint256 expenses);
    event ReportCreated(address indexed user, string date, uint256 sales, uint256 expenses);
    event CreditScoreCalculated(address indexed user, uint256 score);

    constructor() {
        // Constructor logic (No special setup is needed for this example)
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
            score = user.sales - user.expenses;
        } else {
            score = user.sales - user.expenses / 2;
        }

        userCreditScores[msg.sender] = CreditScore(score);
        emit CreditScoreCalculated(msg.sender, score);
    }

    // Additional functions and logic for your DApp can be added here
}
